// Configuration for API URLs
const config = {
    // Base URL for API 
    apiBaseUrl: 'http://localhost:3000' // Default for development
};

// If we are in production (hosted on Vercel), we can set the backend URL
// This can be set via an environment variable in Vercel
if (window.location.hostname.includes('vercel.app')) {
    // This will be replaced by the actual backend URL in production
    config.apiBaseUrl = 'https://your-backend-url.onrender.com';
}