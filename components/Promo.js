import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Adjust the import path as needed

export default function Promo() {
  return (
    <Card className="bg-gradient-to-r from-zinc-800 to-zinc-500 text-white shadow-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-white">Creating your own products</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm mt-2">
          Ship your startup in days, not weeks with shipfast:{" "}
          <a
            href="https://shipfa.st/?via=findmycomp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white"
          >
            https://shipfa.st/?via=findmycomp
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
