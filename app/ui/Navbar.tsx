export default function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li>
              <a href="/" className="navbar-link">BACK</a>
            </li>
            <li>
              <a href="/collection" className="navbar-link">COLLECTION</a>
            </li>
            <li>
              <a href="/party" className="navbar-link">PARTY</a>
            </li>
            <li>
              <a href="/profile" className="navbar-link">PROFILE</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
  
  