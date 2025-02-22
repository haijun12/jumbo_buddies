"use client";
import { usePathname } from "next/navigation";
import styles from './nav.module.css';
export default function Navbar() {
    const pathname = usePathname(); // Get the current route

    // Define public routes where the Navbar should not be displayed
    const isPublicPage = ["/", "/sign-in", "/sign-up"].includes(pathname);
    return (
        
      <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <ul className={styles["navbar-list"]}>
          <li>
            <a href="/" className={styles["navbar-item"]}>
              <img src="/pictures/white-rabbit.png" alt="White Rabbit" />
              <span>BACK</span>
            </a>
          </li>
          <li>
            <a href="/collection" className={styles["navbar-item"]}>
              <img src="/pictures/mad-hatter.png" alt="Mad Hatter" />
              <span>COLLECTION</span>
            </a>
          </li>
          <li>
            <a href="/party" className={styles["navbar-item"]}>
              <img src="/pictures/teapot.png" alt="Teapot" />
              <span>PARTY</span>
            </a>
          </li>
          <li>
            <a href="/mirror" className={styles["navbar-item"]}>
              <img src="/pictures/mirror.png" alt="Mirror" />
              <span>PROFILE</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    );
  }
  
  
  