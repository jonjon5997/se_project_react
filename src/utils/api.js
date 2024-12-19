const baseUrl = "http://localhost:3001";

// const addClothingItem = (newItem) => {
//   addItem(newItem)
//     .then((addedItem) => {
//       setClothingItems((prevItems) => [addedItem, ...prevItems]); // Add the new item to the existing list
//     })
//     .catch((err) => console.error("Error adding item:", err));
// };

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export { getItems, addItem, deleteItem };
