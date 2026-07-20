import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function ManagePage({
  books,
  user,
  onDelete,
  token,
  refreshBooks,
  setMessage,
}) {
  const myBooks = books.filter(
    (book) => String(book.createdBy) === String(user.id),
  );

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    const result = await onDelete(bookId, token);

    if (result.message) {
      setMessage(result.message);
    }

    refreshBooks();
  };

  return (
    <section>
      <div className="manage-head">
        <h1>My Books</h1>
        <Link to="/create" className="button">
          Create New Book
        </Link>
      </div>

      {myBooks.length === 0 ? (
        <p>You have not created any books yet.</p>
      ) : (
        <div className="card-grid">
          {myBooks.map((book) => (
            <div key={book._id} className="card overlay-card">
              <BookCard book={book} />
              <div className="card-actions">
                <Link to={`/edit/${book._id}`} className="button button-small">
                  Edit
                </Link>
                <button
                  className="button button-small button-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ManagePage;
