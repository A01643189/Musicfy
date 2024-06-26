import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from 'react';
import './Dashboard.css';
import { fetchSpotifyApi } from "../../api/spotifyAPI";

const Dashboard = () => {

    const clientId = "ad8dcf6615b64d11acd02379b00cc50a";
    const clientSecret = "c78be57b56214d7082a39ba143787bf6";
    const redirectUri = "http://localhost:5173/dashboard";
    const scopes = [
        'user-read-private', 
        'user-read-email', 
        'user-read-recently-played', 
        'user-modify-playback-state'
    ].join(' ');

    const [recentTracks, setRecentTracks] = useState([]);
    const [userData, setUserData] = useState(null);
    const [type, setType] = useState('');
    const [results, setResults] = useState([]);
    const [option, setOption] = useState('');
    const types = ["album", "artist", "playlist", "track", "show", "episode", "audiobook"];
    const [form, setForm] = useState({
        search: '',
        artist: '',
    })

    const handleChange = (e) => {
        console.log(e.target.value);
        const newValues = {
            ...form,
            [e.target.name]: e.target.value,
        }
        console.log(newValues);
        setForm(newValues);
        handleSearch();
    };

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        setOption(e.target.value);
    }

    const handleSearch = async () => {

        const params = new URLSearchParams();

        params.append('q', encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`));
        params.append('type', option);

        const queryString = params.toString();
        const url = "https://api.spotify.com/v1/search";
        const token = `Bearer ${localStorage.getItem('token')}`;

        const updateUrl = `${url}?${queryString}`;

        const response = await fetchSpotifyApi(
            updateUrl,
            'GET',
            null,
            'application/json',
            token
            );
            console.log(response);
            setResults(response.tracks.items);
    };

    const handleGetToken = async () => {
        // stored in the previous step
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        let codeVerifier = localStorage.getItem('code_verifier');
        console.log({ codeVerifier });
        const url = 'https://accounts.spotify.com/api/token';
        const clientId = 'a007140b6e204fa7803d6379c2014224';
        const redirectUri = 'http://localhost:5173/dashboard';
        const payload = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
              }),
            };
        
        const body = await fetch(url, payload);
        const response = await body.json();
        
        localStorage.setItem('token', response.access_token);
    };

    const getDeviceId = async () => {

        const token = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetchSpotifyApi(
            'https://api.spotify.com/v1/me/player/devices',
            'GET',
            null,
            'application/json',
            token
        );
        console.log(response);
        return response.devices.id;
    }

    const handlePlayMusic = async (song) => {
        const token = `Bearer ${localStorage.getItem('token')}`;
        const data = {
          uris: [song.uri],
        };
        

        const id_device = "6840b6cf46fe42c8171cf36b8f85b71dd1edd011";
        //const id_device = getDeviceId();
        //console.log(id_device);
        const playSong = await fetchSpotifyApi(
          `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
            'PUT',
            JSON.stringify(data),
              'application/json',
              token
            );
            console.log(playSong);
    };

    return (

        <div className="container">
            <div>
                <h1>Right foot creep oh walking with the heater</h1>
            </div>

            <div className="dashboard-container">
                <div className="get-buttons">
                    <button className="button" onClick={handleGetToken}>GetToken</button>
                    <button className="button" onClick={getDeviceId}>GetDeviceId</button>
                </div>
                <input className="input" placeholder='Search for music' type='text' name='search' value ={form.search} onChange={handleChange}/>
                <input className="input" placeholder='Artist' type='text' name='artist' value={form.artist} onChange={handleChange}/>
                <div className="searches">
                    <select className="type" name="types" onChange={handleSelectChange}>
                        <option value="valor1">Type of search</option>
                        {types.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="songs">
                    <div className="search-results">
                        {results.length > 0 && (
                            <div>
                                {results.map((item, idx) => (
                                    <div className="result-item" key = {item.id}>
                                        <img src={item.album.images[0].url}/>
                                        {idx +1+' ' + item.name}
                                        <button className="button" onClick={() => handlePlayMusic(item)}>
                                            Play
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="recent-tracks-item">
                        {recentTracks.map((track,index) => (
                            <div className="result-item" key = {track.id}>
                                <img src={track.track.album.images[0].url}/>
                                <p key={index}>{track.track.name} by {track.track.artists[0].name}</p>
                                <button className="button" onClick={() => handlePlayMusic(track.track)}>
                                            Play
                                        </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default Dashboard;