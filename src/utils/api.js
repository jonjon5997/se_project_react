// import { getToken } from "./token";

// const baseUrl = "http://localhost:3001";

// function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }

// function request(url, options) {
//   return fetch(url, options).then(checkResponse);
// }

// // Public endpoint (no auth needed)
// function getItems() {
//   return request(`${baseUrl}/items`).then((res) => {
//     console.log("Fetched items:", res); // Logs the fetched data
//     return res;
//   });
// }

// // Protected endpoints (require auth token)
// function addItem({ name, imageUrl, weather }) {
//   const token = getToken(); // Retrieve token
//   return request(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ name, imageUrl, weather }),
//   });
// }

// function deleteItem(id) {
//   const token = getToken();
//   return request(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

// function updateUserProfile(userData) {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Adjust based on your auth system
//     },
//     body: JSON.stringify(userData),
//   }).then((res) => {
//     if (!res.ok) {
//       return Promise.reject(`Error: ${res.status}`);
//     }
//     return res.json();
//   });
// }

// function addCardLike(id, token) {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }

// function removeCardLike(id, token) {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }

// export {
//   getItems,
//   addItem,
//   deleteItem,
//   checkResponse,
//   updateUserProfile,
//   addCardLike,
//   removeCardLike,
// };

import { getToken } from "./token";
import { baseUrl } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

// Public endpoint (no auth needed)
function getItems() {
  return request(`${baseUrl}/items`);
}

// Protected endpoints (require auth token)
function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

function updateUserProfile(userData) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(userData),
  });
}

function addCardLike(id) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

function removeCardLike(id) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  checkResponse,
};
