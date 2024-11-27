import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthSignInSignOutFormBtn from "./SignIn";
import { BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// We can make the component async because this is a server side component
export default async function Navbar() {
  const session = await auth();

  // At first it says the session.id property doesnt exist but for that we create a new file next-auth.d.ts
  // And declare a module in it by modifying the session type only then that error will be gone
  console.log("session obtained: ", session?.id);
  return (
    <header className="z-20 sticky top-0 px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="yc-directory-logo"
            width={144}
            height={30}
          />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="text-black font-semibold hidden md:block">
                  Create
                </span>
                <BadgePlus className="size-6 md:hidden" />
              </Link>

              <AuthSignInSignOutFormBtn btnText="Logout" authAction="signout" />

              <Link href={`/user/${session.id}`}>
                <Avatar>
                  <Image
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                    width={50}
                    height={50}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <AuthSignInSignOutFormBtn btnText="Signin" authAction="signin" />
          )}
        </div>
      </nav>
    </header>
  );
}
