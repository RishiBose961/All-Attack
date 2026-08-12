import { prisma } from "../db.js";

export const CardAvlVulnerable = async (req, res) => {
  const { id } = req.query;
  const query = `
    SELECT id, card_number, card_type, amount
    FROM "CardAvl"
    WHERE id = ${id}
  `;
  // console.log("SQL:", query);
  const cards = await prisma.$queryRawUnsafe(query);
 //sql: query
  res.json({  cards });
};

export const CreateTransactionVulnerable = async (req, res) => {
  const {
    amount,
    senderCardId,
    receiverCardId,
  } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Get sender
      const sender = await tx.cardAvl.findUnique({
        where: {
          id: Number(senderCardId),
        },
      });

      // Get receiver
      const receiver = await tx.cardAvl.findUnique({
        where: {
          id: Number(receiverCardId),
        },
      });

      if (!sender) {
        throw new Error("Sender card not found");
      }

      if (!receiver) {
        throw new Error("Receiver card not found");
      }

      const transferAmount = Number(amount);

      if (transferAmount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      if (sender.amount < transferAmount) {
        throw new Error("Insufficient balance");
      }

   
      const updatedSender = await tx.cardAvl.update({
        where: {
          id: Number(senderCardId),
        },
        data: {
          amount: {
            decrement: transferAmount,
          },
        },
      });

    
      const updatedReceiver = await tx.cardAvl.update({
        where: {
          id: Number(receiverCardId),
        },
        data: {
          amount: {
            increment: transferAmount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          amount: transferAmount,
          senderCardId: senderCardId,
          receiverCardId: receiverCardId,
        },
      });

      return {
        transaction
      };
    });

    return res.status(201).json({
      status: "created",
      message: "Transaction successful",
      data: result,
    });
  } catch (error) {
    console.error("Transaction error:", error);

    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getTransactionsBySender = async (req, res) => {
  try {
    const senderCardId = Number(req.params.senderCardId);

    if (!Number.isInteger(senderCardId) || senderCardId <= 0) {
      return res.status(400).json({
        message: "Invalid sender card ID",
      });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        senderCardId: senderCardId,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get transactions error:", error);

    return res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};