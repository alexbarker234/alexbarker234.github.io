import type { TopArtistsResponse } from "@/types";

const TOP_ARTISTS_URL =
  "https://trackback.lexalot.dev/api/public/top?period=4weeks&limit=5";

export async function fetchTopArtists(): Promise<TopArtistsResponse> {
  const response = await fetch(TOP_ARTISTS_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch top artists (${response.status})`);
  }

  return response.json() as Promise<TopArtistsResponse>;
}
