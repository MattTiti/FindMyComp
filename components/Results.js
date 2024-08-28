import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import NoResults from "@/app/no-results.svg";
import Promo from "@/components/Promo";
import { WandSparkles, Search } from "lucide-react";

export default function Results({ results, summary }) {
  if (!results || !results?.length)
    return (
      <div className="my-20">
        <NoResults />
      </div>
    );

  // Function to dynamically format the summary
  const formatSummary = (text) => {
    text = text.replace(/(\*\*)(.*?)\*\*/g, "<strong>$2</strong>");
    text = text.replace(/(\d\.\s)/g, "<br/>$1");
    text = text.replace(
      /(1\.\s[\s\S]*$)/g,
      '<ul class="list-disc list-inside my-1">$1</ul>'
    );

    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="flex flex-col gap-4 w-3/5 my-6">
      <h2 className="text-md text-muted-foreground -mb-2 font-bold">
        <WandSparkles className="h-4 w-4 inline-block" /> GPT Analysis
      </h2>
      <Card className="flex items-center p-4">
        <div className="flex flex-col justify-between flex-grow">
          <CardHeader className="p-0">
            <CardDescription>{formatSummary(summary)}</CardDescription>
          </CardHeader>
        </div>
      </Card>
      <h2 className="text-md text-muted-foreground -mb-2 font-bold">
        <Search className="h-4 w-4 inline-block mb-1" /> Search Results
      </h2>
      {results.map((result, index) => (
        <React.Fragment key={index}>
          <Card className="flex items-center p-4">
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
          {index === 6 && <Promo />}
        </React.Fragment>
      ))}
      <Promo />
    </div>
  );
}
