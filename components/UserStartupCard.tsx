import React from "react";
import StartupCard, { StarupCardType } from "./StartupCard";
import { prisma } from "@/lib/prisma";

const fetchAuthorStartupsByAuthorId = async (authorId: string) => {
  try {
    return await prisma.startup.findMany({
      where: {
        authorId: parseInt(authorId, 10),
      },
      include: {
        author: true,
      },
    });
  } catch (error) {
    console.log("Error while fetching user startups: ", error);
    return [];
  }
};

export default async function UserStartupCard({ id }: { id: string }) {
  const startups = await fetchAuthorStartupsByAuthorId(id);
  return (
    <>
      {startups.length > 0 ? (
        startups.map((post: StarupCardType, index: number) => (
          <StartupCard key={index} post={post} />
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
}
