import React from "react";
import StartupCard, { StarupCardType } from "./StartupCard";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// This is a function written to demonstarte the concept of data fetching and caching in NextJS
// This function wil first fetch the data and cache it for 60 seconds that means for the first 60 seconds after fetching
// the data will be cached only after 60 seconds it will refetch the new data
const fetchStartups = unstable_cache(
  async (query?: string) => {
    return await prisma.startup.findMany({
      where: {
        authorId: 1,
        ...(query && {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      include: {
        author: true,
      },
    });
  },
  ["startups"],
  { revalidate: 60, tags: ["startups"] }
);

export default async function StartUpsSection({
  query,
}: {
  query: string | undefined;
}) {
  const posts = await prisma.startup.findMany({
    where: {
      ...(query && {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },
    include: {
      author: true,
    },
  });

  return (
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post: StarupCardType, index: number) => {
          return <StartupCard key={index} post={post} />;
        })
      ) : (
        <p className="no-result">No startups found</p>
      )}
    </ul>
  );
}
