import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { searchQuery } = await req.json();

  try {
    const searchResponse = await axios.get(
      "https://api.bing.microsoft.com/v7.0/search",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.BING_SEARCH_API_KEY,
        },
        params: {
          q: searchQuery, // Use the refined query
          count: 20, // Number of results to return
          responseFilter: "Webpages", // Focus on webpages
        },
      }
    );

    console.log(searchResponse?.data?.webPages?.value);

    return NextResponse.json({
      results: searchResponse?.data?.webPages?.value,
    });
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
