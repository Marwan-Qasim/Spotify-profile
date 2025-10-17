# Spotify Profile App

A beautiful, responsive web application that displays your Spotify listening statistics, top artists, and favorite tracks with a sleek Spotify-inspired UI.

![Spotify Profile App](https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

## Features

- 🔐 **Spotify OAuth Authentication** - Secure login with your Spotify account
- 👤 **Profile Information** - View your Spotify profile details
- 🎵 **Top Artists** - Discover your most listened to artists with time range filtering
- 🎶 **Top Tracks** - See your favorite songs with play buttons
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🌙 **Dark Theme** - Beautiful dark UI inspired by Spotify's design
- ⚡ **Real-time Data** - Live data from Spotify Web API

## Tech Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **CSS3** - Custom styling with Spotify-inspired design
- **Responsive Design** - Mobile-first approach

### Backend
- **FastAPI** - High-performance Python web framework
- **Spotify Web API** - Official Spotify API integration
- **OAuth 2.0** - Secure authentication flow
- **CORS** - Cross-origin resource sharing enabled

## Prerequisites

Before running this application, you'll need:

1. **Python 3.11+** - For the FastAPI backend
2. **Node.js 16+** - For the React frontend
3. **Spotify Developer Account** - For API credentials

## Setup Instructions

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd SpotifyProfileProject
```

### 2. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (if Python is installed)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env file with your Spotify credentials:
# SPOTIFY_CLIENT_ID=your_client_id
# SPOTIFY_CLIENT_SECRET=your_client_secret
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Start Backend Server

```bash
# In a new terminal, navigate to backend directory
cd backend

# Activate virtual environment (if not already activated)
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Start FastAPI server
python main.py
# or
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add your redirect URI: `http://localhost:8000/callback`
4. Copy your Client ID and Client Secret
5. Update the `.env` file in the backend directory

## Running the Application

1. **Backend**: `http://localhost:8000`
2. **Frontend**: `http://localhost:3000`

The application will automatically handle the OAuth flow and redirect you to login with Spotify.

## Project Structure

```
SpotifyProfileProject/
├── backend/                 # FastAPI server
│   ├── main.py             # Main application file
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── .env               # Your environment variables
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.js    # Login page
│   │   │   ├── Navbar.js   # Navigation bar
│   │   │   ├── Profile.js  # User profile
│   │   │   ├── TopArtists.js # Top artists display
│   │   │   └── TopTracks.js # Top tracks display
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Global styles
│   │   └── index.js       # React entry point
│   └── package.json       # Node dependencies
└── README.md             # This file
```

## Features in Detail

### Authentication Flow
- Secure OAuth 2.0 integration with Spotify
- Automatic token refresh
- Persistent login sessions

### Data Visualization
- Top artists with popularity metrics
- Top tracks with duration and play buttons
- Time range filtering (1 month, 6 months, all time)
- Genre tags and follower counts

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status |
| `/login` | GET | Initiate OAuth login |
| `/callback` | GET | Handle OAuth callback |
| `/profile` | GET | Get user profile |
| `/top-artists` | GET | Get user's top artists |
| `/top-tracks` | GET | Get user's top tracks |
| `/refresh-token` | GET | Refresh access token |

## Development

### Available Scripts

#### Frontend
```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run eject  # Eject from Create React App
```

#### Backend
```bash
python main.py          # Start server
uvicorn main:app --reload # Start with auto-reload
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Spotify Developer Community](https://developer.spotify.com/community/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/docs)

---

Made with ❤️ for music lovers everywhere!