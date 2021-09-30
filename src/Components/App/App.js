import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'My Love',
          artist: 'Michael Jackson',
          album: 'Annie'
        },
        {
          id: 2,
          name: 'Queen',
          artist: 'Laura Maria',
          album: 'Love'
        },
        {
          id: 3,
          name: 'No pain No gain',
          artist: 'The Master',
          album: 'Resurrection'
        }
    ],
    playlistName: 'Warzone',
    playlistTracks: [
      {
        id: 4,
          name: 'Mirage',
          artist: 'Thunderclap',
          album: 'The Rise'
      },
      {
        id: 5,
          name: 'Relax',
          artist: 'Brianna',
          album: '101'
      },
      {
        id: 6,
          name: 'Destiny',
          artist: 'Riot Games',
          album: 'Worlds 2021'
      },
    ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    const trackUris = tracks.map(track => track.uri);


  }

  render() {
    return (
      <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar/>
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack} 
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
        />
      </div>
    </div>
  </div>
    )
  }
}


export default App;