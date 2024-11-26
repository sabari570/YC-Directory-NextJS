import { signIn, signOut } from "@/auth";
import React from "react";
import { Button } from "./ui/button";

export default function AuthSignInSignOutFormBtn({
  btnText,
  authAction,
}: AuthSignInSignOutFormBtnProps) {
  return (
    <form
      action={async () => {
        "use server";
        authAction === "signin" ? await signIn("google") : await signOut();
      }}
    >
      <Button className="bg-white shadow-none hover:bg-inherit">
        <span className="text-primary font-semibold">{btnText}</span>
      </Button>
    </form>
  );
}

interface AuthSignInSignOutFormBtnProps {
  btnText: string;
  authAction: string;
}
