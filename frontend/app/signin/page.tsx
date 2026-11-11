import { HeroSection } from "@/module/signin/hero_section";
import { SignInForm } from "@/module/signin/signin_form/components/signinForm";
import Image from "next/image";

export default function SignInPage() {
  return (
<div className="flex w-full items-center justify-evenly px-40">      
  <div className="flex h-full w-1/2 flex-col">
  <span className="mb-20">
        <Image src="/logo.png" alt="solara" width={152} height={39} priority />
  </span>
        <SignInForm />
      </div>
      <HeroSection />
    </div>
  );
}
