function BookCard({ book }) {
  return (
    <div className="card">
      {book.image && (
        <img className="card-image" src={book.image} alt={book.title} />
      )}
      <div className="card-content">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.copies} copies</p>
        <p className="muted">
          Updated: {new Date(book.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
