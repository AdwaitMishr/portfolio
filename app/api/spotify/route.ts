const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
    "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

async function getAccessToken() {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    return response.json();
}

async function fetchSpotify(url: string, accessToken: string) {
    return fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
}

const cacheHeaders = {
    "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
};

function trackToJson(track: Record<string, unknown>, isPlaying: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = track as any;
    return {
        isPlaying,
        title: t.name,
        artist: t.artists.map((a: { name: string }) => a.name).join(", "),
        albumImageUrl: t.album.images[0]?.url,
        songUrl: t.external_urls.spotify,
    };
}

export async function GET() {
    try {
        const { access_token } = await getAccessToken();

        // Try currently playing first
        const response = await fetchSpotify(SPOTIFY_NOW_PLAYING_URL, access_token);

        if (response.status !== 204 && response.status < 400) {
            const song = await response.json();

            if (song.currently_playing_type === "track" && song.item) {
                return Response.json(trackToJson(song.item, song.is_playing), {
                    headers: cacheHeaders,
                });
            }
        }

        // Fall back to recently played
        const recentRes = await fetchSpotify(
            SPOTIFY_RECENTLY_PLAYED_URL,
            access_token
        );

        if (recentRes.ok) {
            const recent = await recentRes.json();
            const track = recent.items?.[0]?.track;

            if (track) {
                return Response.json(trackToJson(track, false), {
                    headers: cacheHeaders,
                });
            }
        }

        return Response.json({ isPlaying: false }, { headers: cacheHeaders });
    } catch {
        return Response.json({ isPlaying: false });
    }
}
