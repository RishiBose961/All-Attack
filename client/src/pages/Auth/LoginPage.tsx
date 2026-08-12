import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  ArrowRight,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const LOGIN_API = "http://localhost:3000/user/login-vulnerable";

interface LoginResponse {
  users: unknown[];
  sql?: string;
  message?: string;
  token?: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const loginUser = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  console.log("Login API response status:", response);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Login failed (${response.status})`
    );
  }

  return response.json();
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data, variables) => {
      // Store login information in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "customerId",
        variables.username
      );

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      // If your API returns a token, store it separately
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      console.log("Login successful:", data);

      navigate("/");
    },

    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({
      username: customerId,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-linear-to-br from-blue-950 via-slate-950 to-slate-950" />

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  NovaBank
                </h1>

                <p className="text-xs text-slate-400">
                  Banking made simple
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                <ShieldCheck className="h-4 w-4" />
                Secure Banking
              </div>

              <h2 className="text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
                Your money.
                <br />
                <span className="text-blue-500">
                  Your future.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Manage your finances securely, transfer money,
                track your spending, and stay in control of your
                financial future.
              </p>

              <div className="mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <LockKeyhole className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                  <p className="font-medium">
                    Bank-grade security
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Your account and transactions are protected 24/7.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              © 2026 NovaBank. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-slate-50 px-6 py-12 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  NovaBank
                </h1>

                <p className="text-xs text-slate-500">
                  Banking made simple
                </p>
              </div>
            </div>

            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Welcome back
                </CardTitle>

                <CardDescription className="mt-2 text-base">
                  Sign in to securely access your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Customer ID */}
                  <div className="space-y-2">
                    <Label htmlFor="customerId">
                      Username
                    </Label>

                    <Input
                      id="customerId"
                      type="text"
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="h-12 rounded-xl"
                      value={customerId}
                      onChange={(e) =>
                        setCustomerId(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">
                        Password
                      </Label>

                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="h-12 rounded-xl pr-12"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {loginMutation.isError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                      {loginMutation.error instanceof Error
                        ? loginMutation.error.message
                        : "Login failed. Please try again."}
                    </div>
                  )}

                  {/* Success */}
                  {loginMutation.isSuccess && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-500">
                      Login successful. Redirecting...
                    </div>
                  )}

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loginMutation.isPending
                      ? "Signing in..."
                      : "Sign in"}

                    {!loginMutation.isPending && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>

                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-50 px-3 text-slate-500 dark:bg-slate-950">
                        New to NovaBank?
                      </span>
                    </div>
                  </div>

                  {/* Register */}
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl text-base"
                    asChild
                  >
                    <Link to="/register">
                      Open an account
                    </Link>
                  </Button>
                </form>

                <div className="mt-8 flex gap-3 rounded-xl border bg-slate-100/70 p-4 dark:border-white/10 dark:bg-white/5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                  <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                    We will never ask for your password, PIN, or
                    one-time security code through email or phone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

