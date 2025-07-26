declare global {
  interface Window {
    __STOREIT_API_BASE_URL__: string;
  }
}

const BASE_URL = window.__STOREIT_API_BASE_URL__;
const API_URL = `${BASE_URL}/api`;

export { API_URL };
