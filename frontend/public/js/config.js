// Configuration for API URLs
const config = {
    // Base URL for API - automatically set based on environment
    apiBaseUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000' 
        : 'https://tour-connect.onrender.com'
};

// If we are in production (hosted on Vercel), we can set the backend URL
// This can be set via an environment variable in Vercel
if (window.location.hostname.includes('vercel.app')) {
    // This will be replaced by the actual backend URL in production
    config.apiBaseUrl = 'https://tour-connect.onrender.com';
}