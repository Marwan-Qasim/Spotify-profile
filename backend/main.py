from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

app = FastAPI(title="Spotify Profile API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Spotify API credentials
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI", "http://localhost:8000/callback")

# Spotify OAuth setup
sp_oauth = SpotifyOAuth(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET,
    redirect_uri=SPOTIFY_REDIRECT_URI,
    scope="user-top-read user-read-private user-read-email"
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Spotify Profile API", "status": "running"}

@app.get("/login")
async def login():
    """Initiate Spotify OAuth login"""
    auth_url = sp_oauth.get_authorize_url()
    return {"auth_url": auth_url}

@app.get("/callback")
async def callback(code: str = None):
    """Handle Spotify OAuth callback"""
    if code:
        try:
            token_info = sp_oauth.get_access_token(code)
            return {"access_token": token_info["access_token"]}
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Authentication failed: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Authorization code not provided")

@app.get("/profile")
async def get_profile(access_token: str):
    """Get user's Spotify profile"""
    try:
        sp = spotipy.Spotify(auth=access_token)
        profile = sp.current_user()
        return {
            "id": profile["id"],
            "display_name": profile["display_name"],
            "email": profile.get("email"),
            "followers": profile["followers"]["total"],
            "images": profile["images"],
            "country": profile.get("country")
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get profile: {str(e)}")

@app.get("/top-artists")
async def get_top_artists(access_token: str, limit: int = 20, time_range: str = "medium_term"):
    """Get user's top artists"""
    try:
        sp = spotipy.Spotify(auth=access_token)
        results = sp.current_user_top_artists(limit=limit, time_range=time_range)

        artists = []
        for item in results["items"]:
            artists.append({
                "id": item["id"],
                "name": item["name"],
                "genres": item["genres"],
                "popularity": item["popularity"],
                "followers": item["followers"]["total"],
                "images": item["images"],
                "external_urls": item["external_urls"]
            })

        return {
            "items": artists,
            "total": results["total"],
            "limit": limit,
            "time_range": time_range
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get top artists: {str(e)}")

@app.get("/top-tracks")
async def get_top_tracks(access_token: str, limit: int = 20, time_range: str = "medium_term"):
    """Get user's top tracks"""
    try:
        sp = spotipy.Spotify(auth=access_token)
        results = sp.current_user_top_tracks(limit=limit, time_range=time_range)

        tracks = []
        for item in results["items"]:
            track = item["track"] if "track" in item else item
            tracks.append({
                "id": track["id"],
                "name": track["name"],
                "artists": [{"name": artist["name"], "id": artist["id"]} for artist in track["artists"]],
                "album": {
                    "name": track["album"]["name"],
                    "id": track["album"]["id"],
                    "images": track["album"]["images"]
                },
                "popularity": track["popularity"],
                "duration_ms": track["duration_ms"],
                "preview_url": track.get("preview_url"),
                "external_urls": track["external_urls"]
            })

        return {
            "items": tracks,
            "total": results["total"],
            "limit": limit,
            "time_range": time_range
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get top tracks: {str(e)}")

@app.get("/refresh-token")
async def refresh_token(refresh_token: str):
    """Refresh expired access token"""
    try:
        token_info = sp_oauth.refresh_access_token(refresh_token)
        return {"access_token": token_info["access_token"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to refresh token: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)