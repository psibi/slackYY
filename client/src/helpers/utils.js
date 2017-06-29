import fetch from 'isomorphic-fetch';

export function checkStatus(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetchJSON(url, opts) {
  const options = { ...opts };
  options.headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (('body' in options) && (typeof options.body !== 'string')) {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json());
}
