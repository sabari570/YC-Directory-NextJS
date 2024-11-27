import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartupCard from "@/components/UserStartupCard";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React, { Suspense } from "react";

export const experimental_ppr = true;

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const session = await auth();

  const user = isNaN(Number(id))
    ? null
    : await prisma.author.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

  if (!user)
    return (
      <div className="h-[calc(100vh-60px)] flex items-center justify-center">
        <h1 className="no-result">No user found with the given user id</h1>
      </div>
    );
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image ?? ""}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">@{user.email}</p>
        </div>

        <div className="flex-1 flex flex-col gap-3 lg:mt-5">
          <p className="text-30-bold">
            {session?.id == id ? "Your" : "All"} Startups
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartupCard id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
}
