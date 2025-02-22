"use client";
import { usePathname } from "next/navigation";
export default function Navbar() {
    const pathname = usePathname(); // Get the current route

  // Define public routes where the Navbar should not be displayed
  const isPublicPage = ["/", "/sign-in", "/sign-up"].includes(pathname);
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
  
  
  