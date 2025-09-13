// Configuration for API URLs
const config = {
    // Use your actual backend URL directly
    apiBaseUrl: 'https://tour-connect.onrender.com'
};

// Only use localhost when  developing on your computer
if (window.location.hostname === 'localhost') {
    config.apiBaseUrl = 'http://localhost:3000';
}