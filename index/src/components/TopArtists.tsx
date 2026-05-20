import FadeInImage from "@/components/FadeInImage";
import { useTopArtists } from "@/hooks/useTopArtists";
import { getSpotifyArtistUri } from "@/utils/spotify";

const artistRowClass =
  "flex items-center gap-3 rounded-lg border border-white/10 bg-bg-dark/30 p-3 text-left";

function TopArtistsSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-busy="true" aria-label="Loading top artists">
      {Array.from({ length: 5 }, (_, index) => (
        <li key={index} className={artistRowClass}>
          <div className="h-4 w-6 shrink-0 animate-pulse rounded bg-white/10" />
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-white/10" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-3/5 max-w-[12rem] animate-pulse rounded bg-white/10" />
            <div className="h-3 w-2/5 max-w-[8rem] animate-pulse rounded bg-white/10" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TopArtists() {
  const { artists, isLoading, error } = useTopArtists();

  if (isLoading) {
    return <TopArtistsSkeleton />;
  }

  if (error) {
    return (
      <span className="text-lg text-white/60 italic">{error}</span>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {artists.map((artist, index) => (
        <li key={artist.artistId}>
          <a
            href={getSpotifyArtistUri(artist.artistId)}
            className={`${artistRowClass} cursor-pointer transition-colors hover:border-white/20
              hover:bg-bg-dark/50`}
            aria-label={`Open ${artist.artistName} in Spotify`}
          >
            <span className="w-6 shrink-0 text-center text-sm font-semibold text-white/50">
              {index + 1}
            </span>
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <FadeInImage
                src={artist.artistImageUrl}
                alt=""
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{artist.artistName}</p>
              <p className="text-sm text-white/60">
                {Number(artist.listenCount).toLocaleString()}{" "}
                {Number(artist.listenCount) === 1 ? "listen" : "listens"}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
