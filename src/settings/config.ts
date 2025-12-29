// Configure base URLs for API calls
const BASE_URL =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_REACT_APP_PRO_URL}`
    : `${import.meta.env.VITE_REACT_APP_DEV_URL}`;

const API_URL = `${BASE_URL}/api/v1`;

export { API_URL, BASE_URL };

// Configure IMAGE_URL (alias for BASE_URL to keep compatibility)
const IMAGE_URL = BASE_URL;

export { IMAGE_URL };
