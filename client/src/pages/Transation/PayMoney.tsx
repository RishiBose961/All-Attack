import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const PayMoney = ({ id }: { id: number }) => {
  const [amount, setAmount] = useState("");

  const [receiverCardId, setReceiverCardId] = useState("");

 

  const createTransaction = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "http://localhost:3000/card/createtransaction-vulnerable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(amount),
            senderCardId: Number(id),
            receiverCardId: Number(receiverCardId),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Transaction failed");
      }

      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount ||  !receiverCardId) {
      return;
    }

    createTransaction.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Send className="mr-2 h-4 w-4" />
          Send Money
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>

          <DialogDescription>
            Enter the amount and card details to transfer money.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>

            <Input
              id="amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="receiverCardId">Receiver Card ID</Label>

            <Input
              id="receiverCardId"
              type="number"
              placeholder="1"
              value={receiverCardId}
              onChange={(e) => setReceiverCardId(e.target.value)}
            />
          </div>

          {createTransaction.isError && (
            <p className="text-sm text-red-500">
              {createTransaction.error.message}
            </p>
          )}

          {createTransaction.isSuccess && (
            <p className="text-sm text-green-600">
              Transaction successful!
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={createTransaction.isPending}
          >
            {createTransaction.isPending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Money
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PayMoney;