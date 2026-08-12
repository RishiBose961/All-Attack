import fs from "fs";
import csv from "csv-parser";
import { prisma } from "../db.js";


export const uploadCardCsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "CSV file is required",
      });
    }

    const cards = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        cards.push({
          amount: Number(row.amount),
          card_number: row.card_number,
          card_type: row.card_type
        });
      })
      .on("end", async () => {
        try {
          const result = await prisma.cardAvl.createMany({
            data: cards,
            skipDuplicates: true,
          });

          fs.unlinkSync(req.file.path);

          return res.status(201).json({
            message: "CSV uploaded successfully",
            totalRows: cards.length,
            insertedRows: result.count,
          });
        } catch (error) {
          console.error(error);

          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }

          return res.status(500).json({
            message: "Failed to insert cards",
            error: error.message,
          });
        }
      })
      .on("error", (error) => {
        console.error(error);

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
          message: "Failed to read CSV",
          error: error.message,
        });
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};