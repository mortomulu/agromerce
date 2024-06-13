import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.NEXT_PUBLIC_TWITTER_APP_KEY,
  appSecret: process.env.NEXT_SECRET_TWITTER_APP_SECRET,
  accessToken: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.NEXT_SECRET_TWITTER_ACCESS_SECRET,
});

export async function POST(req) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const requestBody = await req.json();
    const { name, price, category, desc } = requestBody;

    const tweetText = `New Product Added: ${name}\nCategory: ${category}\nPrice: $${price}\nDescription: ${desc}`;

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE",
        },
      });
    }

    await client.v1.tweet(tweetText);
    console.log("Tweet posted successfully");

    return NextResponse.json({
      status: 201,
      statusText: "Created",
      headers: { ...headers },
      message: "Tweet posted successfully",
    });
  } catch (error) {
    console.error("Error posting tweet:", error);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      headers: { ...headers },
      message: "Error posting tweet",
    });
  }
}
