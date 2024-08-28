"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // Adjust the import path as needed
import { ChevronRight } from "lucide-react";
import NoResults from "@/app/no-results.svg";
import Promo from "@/components/Promo";

export default function Results({ results }) {
  if (!results || !results?.length)
    return (
      <div className="my-20">
        <NoResults />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 w-3/5 my-6">
      {results.map((result, index) => (
        <Card key={index} className="flex items-center p-4">
          {result.thumbnailUrl && (
            <img
              src={result.thumbnailUrl}
              alt={result.name}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
          )}
          <div className="flex flex-col justify-between flex-grow">
            <CardHeader className="p-0">
              <CardTitle>{result.name}</CardTitle>
              <CardDescription>{result.snippet}</CardDescription>
            </CardHeader>
          </div>
          <CardFooter className="p-0 ml-auto">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white"
            >
              <ChevronRight className="h-10 w-10 text-muted-foreground hover:text-white transition ease-in-out delay-75" />
            </a>
          </CardFooter>
        </Card>
      ))}
      <Promo />
    </div>
  );
}
