import Link from "next/link";

import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "../ui/button";

import {
  RegisterLink,
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRightIcon } from "lucide-react";
import UserAccountNav from "./user-account-nav";

export function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-purple-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>Goover</span>
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink className={buttonVariants({ size: "sm" })}>
                  <span className="pr-1.5">Get started</span>{" "}
                  <ArrowRightIcon className="h-5 w-5" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Pricing
                </Link>
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
