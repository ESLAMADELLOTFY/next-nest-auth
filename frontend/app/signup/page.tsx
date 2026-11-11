import { HeroSection } from "@/module/signin/hero_section";
import { SignupForm } from "@/module/signup/signup_form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex w-full items-center justify-evenly px-40">
      <div className="flex h-full w-1/2 flex-col">
        <span className="mb-20">
          <Image src="/logo.png" alt="solara" width={152} height={39} priority />
        </span>
        <SignupForm />
      </div>
      <HeroSection />
    </div>
  );
}
