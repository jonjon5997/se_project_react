import { setToken, getToken } from "./token";
import { checkResponse } from "./api";

const API_URL = "http://localhost:3001";

// Register (No auth token needed)
function register({ name, avatar, email, password }) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

// Login (No auth token needed)
function authorize({ email, password }) {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        setToken(data.token); // Save token
      }
      return data;
    });
}

// Verify token and get user data (Requires token)
function getUserData() {
  const token = getToken();
  if (!token) return Promise.reject("No token found");

  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }

export { authorize, register, getUserData };
