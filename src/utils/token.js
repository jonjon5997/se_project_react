// src/utils/token.js

const TOKEN_KEY = "jwt"; // Key name for storing the token

// Save token to localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Retrieve token from localStorage
export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log("Retrieved Token:", token); // Debugging output
  return token;
}

// Remove token from localStorage (for logout)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Check if a token exists
export function hasToken() {
  return !!getToken(); // Returns true if token exists, false otherwise
}
