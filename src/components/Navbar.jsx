// import { Link } from "react-router-dom";

// function Navbar({ user, onLogout }) {
//   return (
//     <header className="navbar">
//       <div className="brand">BookShelf</div>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         {user ? (
//           <>
//             <Link to="/manage">Manage Books</Link>
//             <button className="btn-link" onClick={onLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/signup" className="button">
//               Signup
//             </Link>
//             <Link to="/login" className="button button-secondary">
//               Login
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="brand">BookShelf</div>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        <i className={`bx ${open ? "bx-x" : "bx-menu"}`} />
      </button>

      <nav className={`nav-links ${open ? "active" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>

        {user ? (
          <>
            <Link to="/manage" onClick={() => setOpen(false)}>
              Manage Books
            </Link>
            <button
              className="btn-link"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="button"
              onClick={() => setOpen(false)}
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="button button-secondary"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
