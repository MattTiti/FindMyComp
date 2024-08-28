"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
import Spinner from "@/components/Spinner";
import { SearchCheck } from "lucide-react";

export default function HomePage() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    // Trigger the fade-out transition
    if (loadingText) {
      setTransitionClass("opacity-0 -translate-y-2");
      const timer = setTimeout(() => {
        // Trigger the fade-in transition with new text
        setTransitionClass("opacity-100 translate-y-0");
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [loadingText]);

  const setLoadingTextWithTransition = (text) => {
    setTransitionClass("opacity-0 -translate-y-2");
    setTimeout(() => {
      setLoadingText(text);
    }, 150);
  };

  const handleSearch = async (description) => {
    setLoading(true);
    setLoadingTextWithTransition("Refining search query");

    try {
      const queryResponse = await fetch("/api/generate-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const queryData = await queryResponse.json();
      const searchQuery = queryData.searchQuery;
      const gptSummary = queryData.summary;

      setSummary(gptSummary);

      setLoadingTextWithTransition("Performing search");

      const searchResponse = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery }),
      });
      const searchData = await searchResponse.json();

      setResults(searchData.results);
    } catch (error) {
      console.error("Error during search:", error);
      setLoadingTextWithTransition("Error occurred during search");
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="flex items-center gap-2">
          <SearchCheck className="h-9 w-9 inline-block" />
          <h1 className="text-4xl font-bold">Find My Comp</h1>
        </div>
        <h2 className="text-md font-semibold mb-4 dark:text-zinc-400">
          Describe your product and find your competition
        </h2>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <div className="flex items-center mt-52">
            <Spinner />
            <span
              className={`ml-4 text-lg font-medium transition-all duration-150 transform ${transitionClass}`}
            >
              {loadingText}
            </span>
          </div>
        ) : (
          <Results results={results} summary={summary} />
        )}
      </div>
    </div>
  );
}
