"use client";
import Link from "next/link";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import { EyeIcon, FacebookIcon, GoogleIcon } from "../icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signInSchema } from "../schemas/sign_in.schema";
import type { SignInFormValues } from "../schemas/sign_in.schema";
import { signInUser } from "../services/signin.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
const inputClassName =
  "w-full rounded-xl border border-border bg-input px-4 py-3.5 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

const buttonClassName =
  "relative flex w-full items-center justify-center rounded-xl border border-ring bg-white px-4 py-3.5 text-center font-inter text-[16px] font-medium text-label transition hover:bg-surface";

export function SignInForm() {
  const { visible, toggle, type } = usePasswordVisibility();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setServerError(null); // delete any error  
    try {
      const response = await signInUser({
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
      console.log("Login success:", response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed:", error);
      setServerError(
        typeof error === "string" ? error : error?.message || "An error occurred while logging in"
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-16 flex w-full max-w-132 flex-col gap-10.5 font-inter"
    >
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-[48px] font-bold leading-none text-foreground">
          Sign In
        </h1>

        <p className="text-[18px] leading-[150%] text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline"
          >
            Create now
          </Link>
        </p>
      </div>

      {/* Server Error Message */}
      {serverError ? (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-500 border border-red-200">
          {serverError}
        </div>
      ):<span className="p-4"></span>}

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-muted">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="example@gmail.com"
            className={inputClassName}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-muted">
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={type}
              {...register("password")}
              autoComplete="current-password"
              placeholder="@#*%"
              className={`${inputClassName} pr-14`}
            />

            <button
              type="button"
              onClick={toggle}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center gap-3 px-3 text-muted"
            >
              <span
                className="h-6 w-px bg-border"
                aria-hidden="true"
              />
              <EyeIcon open={visible} />
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between gap-8">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="size-4 rounded border-checkbox accent-primary"            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-secondary-dark underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary px-4 py-3.5 text-[16px] font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-sm tracking-wide text-muted">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Social Login */}
      <div className="flex flex-col gap-8">
        <button
          type="button"
          className={buttonClassName}
        >
          <span className="absolute left-4">
            <GoogleIcon />
          </span>
          Continue with Google
        </button>

        <button
          type="button"
          className={buttonClassName}
        >
          <span className="absolute left-4">
            <FacebookIcon />
          </span>
          Continue with Facebook
        </button>
      </div>
    </form>
  );
}
