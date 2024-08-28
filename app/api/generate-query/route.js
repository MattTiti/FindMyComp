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

          1. An optimized search query to find official product websites or SaaS platforms.

          2. A summary of similar products or services that might match the description.

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
    const refinedSearchQuery = `${searchQuery} -review -blog -news -best -top -youtube`;

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
