import SearchForm from "@/components/SearchForm";
import StartUpsSection from "@/components/StartUpsSection";
import React from "react";

export default async function Home({
  // This is how we extract the searchParams from the URL
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // Thsi is how we extract the queryparms from the promise returned
  const query = (await searchParams).query;
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, <br />
          Connect with Entreprenaurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on pitches, and get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <StartUpsSection query={query} />
      </section>
    </>
  );
}
