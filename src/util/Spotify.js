const clientId = 'a26f20666ad24e9390fbf9ce8b1e4bdc'; // Hide this
const redirectURI = 'http://localhost:3000/';

let accessToken;

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}
            &response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            })
                
            )
            
        })
    },
    savePlaylist(name, trackURIs) {
        if(!name || !trackURIs) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID = '';

        return fetch(`https://api.spotify.com/v1/me`, 
        {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`),
            {
                headers: headers,
                method: 'POST',
                body: jsonResponse.stringify({name: name})
            }
        })
        .then(response => response.json() )
        .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`),
            {
                headers: headers,
                method: 'POST',
                body: jsonResponse.stringify({uris: trackURIs})
            }
        })
        
    }
}

export default Spotify