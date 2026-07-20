import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, updateBook } from "../api";

function BookForm({ action, token, refreshBooks, books }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = action === "edit";
  const foundBook = books?.find((book) => book._id === id);

  const [form, setForm] = useState({
    title: "",
    author: "",
    copies: 1,
    image: "",
  });

  useEffect(() => {
    if (isEdit && foundBook) {
      setForm({
        title: foundBook.title || "",
        author: foundBook.author || "",
        copies: foundBook.copies || 1,
        image: foundBook.image || "",
      });
    }
  }, [isEdit, foundBook]);

  const handleChange = (e) => {
    const value =
      e.target.name === "copies" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title || !form.author) return;

    const payload = {
      title: form.title,
      author: form.author,
      copies: form.copies,
      image: form.image || "",
    };

    if (isEdit) {
      await updateBook(id, payload, token);
    } else {
      await createBook(payload, token);
    }

    await refreshBooks();
    navigate("/");
  };

  return (
    <section className="auth-card">
      <div className="form-header">
        <h1>{isEdit ? "Edit Book" : "Create Book"}</h1>
        <button
          className="button button-secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Book title"
          />
        </label>
        <label>
          Author
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </label>
        <label>
          Copies Available
          <input
            name="copies"
            type="number"
            min="1"
            value={form.copies}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Optional image link"
          />
        </label>
        <button type="submit" className="button">
          {isEdit ? "Update Book" : "Create Book"}
        </button>
      </form>
    </section>
  );
}

export default BookForm;
