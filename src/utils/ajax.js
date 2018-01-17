const ROOT = process.env.REACT_APP_ROOT || 'http://localhost:9001/api'; // use env var to build

export function url(path, access_token) {
  console.log(path, access_token);
  return `${ROOT}${path}` + (access_token ? `?access_token=${access_token}` : '');
}
