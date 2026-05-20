import { fetchTopArtists } from "@/api/trackback";
import type { TopArtist } from "@/types";
import { useEffect, useState } from "react";

export function useTopArtists() {
  const [artists, setArtists] = useState<TopArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchTopArtists()
      .then((data) => {
        if (!cancelled) {
          setArtists(data.artists);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setArtists([]);
          setError(
            err instanceof Error ? err.message : "Failed to load artists"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { artists, isLoading, error };
}
