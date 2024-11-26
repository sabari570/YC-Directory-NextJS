import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { unstable_cache } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// This is given inorder to tell NextJS that this page requires partial pre-rendering
// where only some components of the UI needs to be dynamically updated where others are cached
export const experimental_ppr = true;

// This is the point where we initialize the markdown object inorder to render the HMTL tags properly
const md = markdownit();

// Now in here the startup detail once fetched will be cached or 60 seconds and on reloading the page within the 60 seconds timframe
// returns you the already cached data only after 60 seconds you will get the fresh data from the database
// except the total views count which is a dynamic content of this page
const fetchStartupById = unstable_cache(
  async (id: string) => {
    try {
      const startup = await prisma.startup.findUnique({
        where: {
          id: parseInt(id, 10),
        },
        include: {
          author: true,
        },
      });
      return startup;
    } catch (error) {
      console.error("Error while fetching the startup: ", error);
      return null;
    }
  },
  ["startup_detail"],
  {
    revalidate: 60,
    tags: ["startup_detail"],
  }
);
console.log("Hello");

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const startup = isNaN(Number(id)) ? null : await fetchStartupById(id);

  // This is where we render the pitch using markdownit,
  // The parsedPitch contains only html tags in it
  const parsedPitch = md.render(startup?.pitch || "");
  if (!startup)
    return (
      <div className="h-[calc(100vh-60px)] flex items-center justify-center">
        <h1 className="no-result">No startup found with the given id</h1>
      </div>
    );
  return (
    <>
      <section className="pink_container !min-h-[320px]">
        <p className="tag">{formatDate(startup?.createdAt.toString())}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>

      <section className="section_container">
        <img
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author.image ?? ""}
                alt="avatar"
                width={64}
                height={64}
                className="h-[64px] w-[64px] rounded-full"
              />

              <div>
                <p className="text-20-medium">{startup.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup.author.email}
                </p>
              </div>
            </Link>

            <p className="category-tag hover:cursor-pointer">
              {startup.category}
            </p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedPitch ? (
            // This is how we actually display the parsed content using markdown inside an article tag
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedPitch }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* TODO: EDITOR SELCETED STARTUPS */}

        {/* THIS IS THE DYNAMIC CONTENT OF THIS PAGE, REMAINING COMPONENT REMAINS STATIS */}
        {/* WHENEVER YOU WANT ANY DYNAMIC CONTENT IN A PPR PAGE YOU WRAP IT INSIDE A SUSPENSE TAG */}
        <Suspense fallback={<Skeleton className="" />}>
          {/* Here is the code that renders dynamically */}
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}
