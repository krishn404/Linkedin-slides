import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse(JSON.stringify({ 
        error: "No URL provided", 
        details: "Please include a valid image URL in the query parameter" 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const { contentType, buffer } = await fetchExternalImageUrl(imageUrl);

      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Content-Type", contentType);
      headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate");

      return new NextResponse(buffer, {
        status: 200,
        headers,
      });
    } catch (fetchError) {
      console.error("Image fetch error:", fetchError);
      return new NextResponse(JSON.stringify({ 
        error: "Failed to fetch image", 
        details: fetchError instanceof Error ? fetchError.message : "Unknown error"
      }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Proxy route error:", error);
    return new NextResponse(JSON.stringify({ 
      error: "Internal proxy error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

async function fetchExternalImageUrl(imageUrl: string) {
  // Validate URL
  try {
    new URL(imageUrl);
  } catch {
    throw new Error("Invalid URL format");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  try {
    const response = await fetch(imageUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Next.js Image Proxy',
        'Accept': 'image/*',
      },
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    const contentLength = response.headers.get("Content-Length");

    // Limit image size (e.g., 10MB)
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      throw new Error("Image too large");
    }

    if (!contentType || !contentType.startsWith("image")) {
      throw new Error("Invalid content type");
    }

    const buffer = await response.arrayBuffer();

    return { 
      contentType, 
      buffer: Buffer.from(buffer)
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}