import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  // If not authenticated then dont give access to this page
  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>
    </>
  );
}
