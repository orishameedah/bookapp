import BookCard from "../components/BookCard";

function HomePage({ books }) {
  return (
    <section>
      <h1>All Books</h1>
      <div className="card-grid">
        {books.length === 0 ? (
          <p>No books available yet.</p>
        ) : (
          books.map((book) => <BookCard key={book._id} book={book} />)
        )}
      </div>
    </section>
  );
}

export default HomePage;
