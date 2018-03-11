let backendHost;
//const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

// TODO : configure hosts
if (hostname === 'floradorable.demifili.com') {
  backendHost = 'https://floradorable.demifili.com:3001';
} else if (hostname === 'localhost') {
  backendHost = `http://${hostname}:3001`;
} else {
  backendHost = `http://${hostname}:3001`;
}

export const API_ROOT = `${backendHost}`;
