import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";
import { Button } from "./ui/button";

export default function SearchForm({ query }: { query: string | undefined }) {
  return (
    <Form action="/" scroll={true} className="search-form">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
}
