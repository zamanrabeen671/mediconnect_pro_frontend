// Configure API_URL
const API_URL =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_REACT_APP_PRO_URL}/api/v1`
    : `${import.meta.env.VITE_REACT_APP_DEV_URL}/api/v1`;

export { API_URL };

// Configure IMAGE_URL
const IMAGE_URL =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_REACT_APP_PRO_URL}`
    : `${import.meta.env.VITE_REACT_APP_DEV_URL}`;

export { IMAGE_URL };
