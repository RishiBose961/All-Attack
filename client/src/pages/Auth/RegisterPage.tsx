import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add registration API here
    console.log("Register submitted");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
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
                Start your
                <br />
                <span className="text-blue-500">
                  financial journey.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Open your NovaBank account and get access to
                secure payments, money transfers, savings tools,
                and complete control over your finances.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="font-medium">
                      Secure by design
                    </p>

                    <p className="text-sm text-slate-500">
                      Your personal information stays protected.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                    <LockKeyhole className="h-5 w-5 text-blue-400" />
                  </div>

                  <div>
                    <p className="font-medium">
                      Bank-grade encryption
                    </p>

                    <p className="text-sm text-slate-500">
                      Your account is protected around the clock.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-sm text-slate-500">
              © 2026 NovaBank. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center bg-slate-50 px-6 py-10 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
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
                  Open your account
                </CardTitle>

                <CardDescription className="mt-2 text-base">
                  Create your secure NovaBank account.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* NAME */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First name
                      </Label>

                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last name
                      </Label>

                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email address
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* PHONE */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone number
                    </Label>

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">

                    <Label htmlFor="password">
                      Password
                    </Label>

                    <div className="relative">

                      <Input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        className="h-12 rounded-xl pr-12"
                        required
                        minLength={8}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>

                    <p className="text-xs text-slate-500">
                      Use at least 8 characters with a mix of
                      letters, numbers, and symbols.
                    </p>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="space-y-2">

                    <Label htmlFor="confirmPassword">
                      Confirm password
                    </Label>

                    <div className="relative">

                      <Input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="h-12 rounded-xl pr-12"
                        required
                        minLength={8}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>
                  </div>

  

                  {/* REGISTER BUTTON */}
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
                  >
                    Create account

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* LOGIN */}
                  <div className="text-center text-sm text-slate-500">

                    Already have an account?{" "}

                    <Link
                      to="/login"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Sign in
                    </Link>

                  </div>

                </form>

                {/* SECURITY */}
                <div className="mt-7 flex gap-3 rounded-xl border bg-slate-100/70 p-4 dark:border-white/10 dark:bg-white/5">

                  <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                  <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Your information is encrypted and protected.
                    Never share your password or verification codes
                    with anyone.
                  </p>

                </div>

              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}