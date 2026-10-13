
import { NextResponse } from "next/server";

const VIDEO_ID = "t77teduBprc";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key is not configured." },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", VIDEO_ID);
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to retrieve YouTube video duration." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const isoDuration: string | undefined =
      data.items?.[0]?.contentDetails?.duration;

    if (!isoDuration) {
      return NextResponse.json(
        { error: "Video duration is unavailable." },
        { status: 404 }
      );
    }

    const match = isoDuration.match(
      /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
    );

    if (!match) {
      return NextResponse.json(
        { error: "Invalid duration format." },
        { status: 500 }
      );
    }

    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const formattedDuration =
      hours > 0
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        : `${minutes}:${String(seconds).padStart(2, "0")}`;

    return NextResponse.json({
      duration: formattedDuration,
      totalSeconds,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
