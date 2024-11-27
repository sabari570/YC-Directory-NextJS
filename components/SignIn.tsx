import { signIn, signOut } from "@/auth";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

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
        <span
          className={`text-primary font-semibold ${
            btnText === "Logout" ? "hidden md:block" : ""
          }`}
        >
          {btnText}
        </span>
        {btnText === "Logout" && (
          <LogOut className={`size-6 text-red-500 md:hidden`} />
        )}
      </Button>
    </form>
  );
}

interface AuthSignInSignOutFormBtnProps {
  btnText: string;
  authAction: string;
}
