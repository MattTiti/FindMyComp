import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { description } = await req.json();
  //   // Initialize the OpenAI client
  //   const openai = new OpenAI({
  //     apiKey: process.env.OPENAI_API_KEY,
  //   });
  try {
    //     // Step 1: Use GPT-4o-Mini to generate a relevant search query
    //     const completion = await openai.chat.completions.create({
    //       model: "gpt-4o-mini", // Use the gpt-4o-mini model
    //       messages: [
    //         {
    //           role: "system",
    //           content:
    //             "You are a search assistant. Generate an optimized search query based on the user-provided product or service description. The goal is to find official product websites or SaaS platforms. Include terms like 'official site', 'pricing', 'features', and avoid terms related to news articles, blogs, or reviews.",
    //         },
    //         {
    //           role: "user",
    //           content: `Create a search query to find websites, SaaS, or products similar to the following description:
    // ${description}`,
    //         },
    //       ],
    //     });

    //     // Extract the generated search query from the response
    //     const searchQuery = completion.choices[0].message.content.trim();
    const searchQuery = `${description}  -review -blog -news -best -top -youtube -reddit -comparison -vs -alternative -alternatives -rating -ratings -comparison -compare -compares -compared`;

    // Step 2: Use the Bing Search API to perform a search with the refined query
    const searchResponse = await axios.get(
      "https://api.bing.microsoft.com/v7.0/search",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.BING_SEARCH_API_KEY,
        },
        params: {
          q: searchQuery, // Use the refined query
          count: 8, // Number of results to return
          responseFilter: "Webpages", // Focus on webpages
        },
      }
    );

    // Log the search results
    console.log(searchResponse.data.webPages.value);

    // Step 3: Return the search results
    return NextResponse.json({ results: searchResponse.data.webPages.value });
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
