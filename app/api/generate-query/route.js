import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req) {
  const { description } = await req.json();

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Generate both the search query and a summary of similar products
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a search assistant. Generate two outputs based on the user-provided product or service description:

          1. An optimized search query for a Bing Search Engine to find product websites or SaaS platforms (do not specify with site: ).

          2. A summary of similar products or services that might match the description. Start off the summary with 1-2 sentences. If there are multiple products, list them as a numbered list. Ensure the list is clearly formatted for easy readability.

          Please format your response as follows:

          Search Query:
          [Insert the optimized search query here]

          Summary:
          [Insert the summary of similar products here]
          `,
        },
        {
          role: "user",
          content: `Create a search query and a summary to find websites, SaaS, or products similar to the following description:
          ${description}`,
        },
      ],
    });

    // Extract the completion content
    const completionContent = completion.choices[0].message.content.trim();

    // Extract the search query and summary based on the defined structure
    const searchQueryMatch = completionContent.match(/Search Query:\s*(.*)/);
    const summaryMatch = completionContent.match(/Summary:\s*([\s\S]*)/);

    let searchQuery = searchQueryMatch ? searchQueryMatch[1].trim() : "";
    const summary = summaryMatch ? summaryMatch[1].trim() : "";

    // Remove surrounding quotes from the searchQuery if present
    searchQuery = searchQuery.replace(/^["']|["']$/g, "");

    // Refine the search query further
    const refinedSearchQuery = `${searchQuery} -blog -news -best -top -youtube`;

    // Return both the search query and the summary
    return NextResponse.json({ searchQuery: refinedSearchQuery, summary });
  } catch (error) {
    console.error("Error generating search query and summary:", error);
    return NextResponse.json(
      { error: "Failed to generate search query and summary" },
      { status: 500 }
    );
  }
}
