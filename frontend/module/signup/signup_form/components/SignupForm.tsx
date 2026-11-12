"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePasswordVisibility } from "@/module/signin/signin_form/hooks/usePasswordVisibility";
import {
  EyeIcon,
  FacebookIcon,
  GoogleIcon,
} from "@/module/signin/signin_form/icons";
import { signUpSchema } from "../schemas/sign_up.schema";
import type { SignUpFormValues } from "../schemas/sign_up.schema";
import {
  getAuthErrorMessage,
  registerUser,
} from "../services/signup.service";

const inputClassName =
  "w-full rounded-xl border border-border bg-input px-4 py-3.5 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

const buttonClassName =
  "relative flex w-full items-center justify-center rounded-xl border border-ring bg-white px-4 py-3.5 text-center font-inter text-[16px] font-medium text-label transition hover:bg-surface";

export function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const password = usePasswordVisibility();
  const confirmPassword = usePasswordVisibility();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setServerError(null);

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (error: unknown) {
      setServerError(
        getAuthErrorMessage(error, "Something went wrong while creating your account"),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-16 flex w-full max-w-132 flex-col gap-10.5 font-inter"
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-[48px] font-bold leading-none text-foreground">
          Sign Up
        </h1>

        <p className="text-[18px] leading-[150%] text-muted">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary underline">
            Sign in
          </Link>
        </p>
      </div>

      {serverError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-500">
          {serverError}
        </div>
      ) : (
        <span className="p-4" />
      )}

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-muted">
            Full name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            autoComplete="name"
            placeholder="John Doe"
            className={inputClassName}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

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
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-muted">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={password.type}
              {...register("password")}
              autoComplete="new-password"
              placeholder="@#*%"
              className={`${inputClassName} pr-14`}
            />
            <button
              type="button"
              onClick={password.toggle}
              aria-label={password.visible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center gap-3 px-3 text-muted"
            >
              <span className="h-6 w-px bg-border" aria-hidden="true" />
              <EyeIcon open={password.visible} />
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm text-muted">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={confirmPassword.type}
              {...register("confirmPassword")}
              autoComplete="new-password"
              placeholder="@#*%"
              className={`${inputClassName} pr-14`}
            />
            <button
              type="button"
              onClick={confirmPassword.toggle}
              aria-label={
                confirmPassword.visible
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute inset-y-0 right-0 flex items-center gap-3 px-3 text-muted"
            >
              <span className="h-6 w-px bg-border" aria-hidden="true" />
              <EyeIcon open={confirmPassword.visible} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary px-4 py-3.5 text-[16px] font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-sm tracking-wide text-muted">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-8">
        <button type="button" className={buttonClassName}>
          <span className="absolute left-4">
            <GoogleIcon />
          </span>
          Continue with Google
        </button>

        <button type="button" className={buttonClassName}>
          <span className="absolute left-4">
            <FacebookIcon />
          </span>
          Continue with Facebook
        </button>
      </div>
    </form>
  );
}
