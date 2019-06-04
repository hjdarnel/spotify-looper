import Spotify from 'spotify-web-api-node';
const spotifyApi = new Spotify();

export function redirectUrlToSpotifyForLogin() {
  const CLIENT_ID = "94f209c3ff924e75a0107fffcb36ce2c";
  const REDIRECT_URI = window.location.origin;

  const scopes = [
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ];

  return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
}

export function checkUrlForSpotifyAccessToken() {
  const params = getHashParams();
  const accessToken = params.access_token;
  const expiresAt = Date.now() + (parseInt(params.expires_in, 10) * 1000);
  if (!accessToken) {
    return false;
  }

  return {accessToken, expiresAt };
}

function getHashParams() {
  // helper function to parse the query string that spotify sends back when you log in
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  // eslint-disable-next-line
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export async function getCover() {
  const { body } = await spotifyApi.getMyCurrentPlayingTrack();
  return body.item.album.images[0];
}

export async function seek(positionMs) {
  return await spotifyApi.seek(positionMs);
}

export async function resumePlayback() {
  return await spotifyApi.play();
}

export async function pausePlayback() {
  return await spotifyApi.pause();
}

export function setAccessToken(accessToken) {
  spotifyApi.setAccessToken(accessToken);
}

export async function getMe() {
  return await spotifyApi.getMe();
}