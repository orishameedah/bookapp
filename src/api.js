// On Development
// const API_BASE = "/api";

// on Production
const API_BASE = "https://crud-seven-wine.vercel.app/api" || "/api";

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books/getAllBooks`);
  return res.json();
}

export async function createBook(data, token) {
  const res = await fetch(`${API_BASE}/books/createBook`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBook(id, data, token) {
  const res = await fetch(`${API_BASE}/books/updateBook/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBook(id, token) {
  const res = await fetch(`${API_BASE}/books/deleteBook/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  return res.json();
}
