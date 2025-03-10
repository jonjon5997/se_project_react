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
// function addItem({ name, imageUrl }) {
//   const payload = { name: name.trim(), imageUrl };

//   console.log("Sending request with body:", JSON.stringify(payload));
//   const token = getToken();
//   console.log("Token being sent:", token);
//   console.log("sending item:", { name, imageUrl });
//   return request(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify({ name, imageUrl }),
//   });
// }

function addItem(item) {
  console.log("Item being sent:", item); // Debugging
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(item),
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
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

function addCardLike(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

function removeCardLike(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
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
