const API_URL = 'http://localhost:5000/api';

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Get token
function getToken() {
    return localStorage.getItem('token');
}

// Get user data
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Save auth data
function saveAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

// Update navigation based on auth status
function updateNavigation() {
    const loginNav = document.getElementById('loginNav');
    const registerNav = document.getElementById('registerNav');
    const logoutNav = document.getElementById('logoutNav');
    const coursesNav = document.getElementById('coursesNav');
    const dashboardNav = document.getElementById('dashboardNav');

    if (isLoggedIn()) {
        if (loginNav) loginNav.style.display = 'none';
        if (registerNav) registerNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
        if (coursesNav) coursesNav.style.display = 'block';
        if (dashboardNav) dashboardNav.style.display = 'block';
    } else {
        if (loginNav) loginNav.style.display = 'block';
        if (registerNav) registerNav.style.display = 'block';
        if (logoutNav) logoutNav.style.display = 'none';
        if (coursesNav) coursesNav.style.display = 'none';
        if (dashboardNav) dashboardNav.style.display = 'none';
    }
}

// API request helper
async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});
