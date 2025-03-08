import { setToken, getToken } from "./token";
import { checkResponse } from "./api";
import { baseUrl } from "./constants";

// Register (No auth token needed)
function register({ name, avatar, email, password }) {
  console.log("register");
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

// Login no auth token needed
function authorize({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      console.log("API Response:", data); // Logs API response
      if (!data.token) {
        throw new Error("No token received from API");
      }
      setToken(data.token); // Save token
      return data;
    });
}

// Verify token and get user data (Requires token)
function getUserData() {
  const token = getToken();
  console.log("Token being sent:", token);
  if (!token) return Promise.reject("No token found");

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export { authorize, register, getUserData };
