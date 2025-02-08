import { getToken } from "./token";

const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Public endpoint (no auth needed)
function getItems() {
  return request(`${baseUrl}/items`);
}

// Protected endpoints (require auth token)
function addItem({ name, imageUrl, weather }) {
  const token = getToken(); // Retrieve token
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(id) {
  const token = getToken();
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem, checkResponse };
