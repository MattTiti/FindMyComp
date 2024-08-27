"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
import Spinner from "@/components/Spinner";
export default function HomePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (description) => {
    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl font-bold">Find My Comp</h1>
        <h2 className="text-md font-semibold mb-4 dark:text-zinc-400">
          Search for websites, SaaS, or products
        </h2>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <Spinner className="mt-52" />
        ) : (
          <Results results={results} />
        )}
      </div>
    </div>
  );
}
