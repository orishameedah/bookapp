import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import ManagePage from "./pages/ManagePage";
import AuthPage from "./pages/AuthPage";
import BookForm from "./pages/BookForm";

import {
  registerUser,
  loginUser,
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "./api";
import "./index.css";

const getSavedUser = () => {
  const storedUser = localStorage.getItem("bookshelf_user"); // read saved user from browser storage
  return storedUser ? JSON.parse(storedUser) : null; // parse JSON or return null
};

function App() {
  const [user, setUser] = useState(getSavedUser()); // user state, initialized from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("bookshelf_token") || "",
  ); // auth token state from localStorage
  const [books, setBooks] = useState([]); // books list state
  const [message, setMessage] = useState(""); // message state for alerts

  useEffect(() => {
    loadBooks(); // when component mounts, load books
  }, []); // empty dependency array means run once

  const saveAuth = (userData, tokenValue) => {
    localStorage.setItem("bookshelf_user", JSON.stringify(userData)); // save user data
    localStorage.setItem("bookshelf_token", tokenValue); // save token
    setUser(userData); // update user state
    setToken(tokenValue); // update token state
  };

  const logout = () => {
    localStorage.removeItem("bookshelf_user"); // remove saved user
    localStorage.removeItem("bookshelf_token"); // remove saved token
    setUser(null); // clear user state
    setToken(""); // clear token state
  };

  const loadBooks = async () => {
    const result = await fetchBooks(); // call API to fetch books
    if (Array.isArray(result)) {
      setBooks(
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      ); // sort books by newest update first
    }
  };

  const refreshBooks = async () => {
    await loadBooks(); // reload books
    setMessage(""); // clear any existing message
  };

  return (
    <BrowserRouter>
      <div className="page">
        <Navbar user={user} onLogout={logout} />{" "}
        {/* show navbar with auth info */}
        <div className="content">
          {message && <div className="message">{message}</div>}{" "}
          {/* show message if exists */}
          <Routes>
            <Route path="/" element={<HomePage books={books} />} />{" "}
            {/* home route */}
            <Route
              path="/manage"
              element={
                <ProtectedRoute user={user}>
                  <ManagePage
                    books={books}
                    user={user}
                    onDelete={deleteBook}
                    token={token}
                    refreshBooks={refreshBooks}
                    setMessage={setMessage}
                  />
                </ProtectedRoute>
              }
            />{" "}
            {/* protected manage page route */}
            <Route
              path="/create"
              element={
                <ProtectedRoute user={user}>
                  <BookForm
                    action="create"
                    token={token}
                    refreshBooks={refreshBooks}
                  />
                </ProtectedRoute>
              }
            />{" "}
            {/* protected create book route */}
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute user={user}>
                  <BookForm
                    action="edit"
                    token={token}
                    books={books}
                    refreshBooks={refreshBooks}
                  />
                </ProtectedRoute>
              }
            />{" "}
            {/* protected edit book route */}
            <Route
              path="/login"
              element={
                <AuthPage
                  type="login"
                  onSuccess={saveAuth}
                  navigateTo="/manage"
                  setMessage={setMessage}
                />
              }
            />{" "}
            {/* login route */}
            <Route
              path="/signup"
              element={
                <AuthPage
                  type="signup"
                  onSuccess={saveAuth}
                  navigateTo="/manage"
                  setMessage={setMessage}
                />
              }
            />{" "}
            {/* signup route */}
            <Route path="*" element={<Navigate to="/" replace />} />{" "}
            {/* catch-all redirect */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; // export App component
