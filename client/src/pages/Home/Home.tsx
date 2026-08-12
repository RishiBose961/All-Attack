import {
    ArrowRight,
    CreditCard,
    IndianRupee,
    LogOut,
    Wallet
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UseGetHook from "@/hooks/UseGetHook";
import UseGetTransation from "@/hooks/UseGetTransation";
import PayMoney from "../Transation/PayMoney";

const Home = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  // eslint-disable-next-line no-useless-assignment
  let user = null;

  try {
    const data = JSON.parse(storedUser || "null");
    user = data?.users?.[0] || null;
  } catch {
    user = null;
  }

  const { isPending, fetchedDataCard } = UseGetHook({ id: user?.id }) as {
    isPending: boolean;
    fetchedDataCard: {
      cards: {
        id: number;
        card_number: string;
        card_type: string;
        amount: number;
      }[];
    };
  };

  const { isPending: isTransactionPending, fetchedTransaction } =
    UseGetTransation({ id: user?.id }) as {
      isPending: boolean;
      fetchedTransaction: {
        transactions: {
          id: number;
          senderCardId: number;
          receiverCardId: number;
          amount: number;
        }[];
      };
    };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (isTransactionPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading transactions...</p>
      </div>
    );
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold">Please login</h2>

            <Button asChild className="mt-4 w-full">
              <Link to="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
              <Wallet className="h-5 w-5" />
            </div>

            <span className="font-semibold">NovaBank</span>
          </div>

          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Hello, {user.first_name}</h1>

          <p className="text-sm text-muted-foreground">
            Welcome to your account.
          </p>
        </div>

        {/* Balance */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Available Balance</p>

            <p className="mt-2 text-3xl font-bold">
              ₹{fetchedDataCard?.cards?.[0]?.amount || "0.00"}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Savings Account{" "}
              {fetchedDataCard?.cards?.[0]?.card_number
                ?.replace(/\D/g, "")
                .replace(/(.{4})/g, "$1-")
                .replace(/-$/, "")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground uppercase">
              Card Name {fetchedDataCard?.cards?.[0]?.card_type}
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <PayMoney id={user.id} />
        </div>

        {fetchedTransaction?.transactions?.map(
          (transaction: {
            id: number;
            senderCardId: number;
            receiverCardId: number;
            amount: number;
          }) => (
            <Card key={transaction.id} className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Transaction #{transaction.id}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  {/* Sender */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">From Card</p>
                      <p className="font-medium">{transaction.senderCardId}</p>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground" />

                  {/* Receiver */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">To Card</p>
                      <p className="font-medium">
                        {transaction.receiverCardId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      Amount
                    </span>
                  </div>

                  <span className="text-lg font-semibold">
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ),
        )}

        {/* Account */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Account Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>

              <p className="text-sm font-medium">
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Customer ID</p>

              <p className="text-sm font-medium">{user.id}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email</p>

              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
