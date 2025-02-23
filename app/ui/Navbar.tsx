"use client";
import { usePathname } from "next/navigation";
import styles from './nav.module.css';
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname(); // Get the current route

    // Define public routes where the Navbar should not be displayed
    const isPublicPage = ["/", "/sign-in", "/sign-up"].includes(pathname);
    if (isPublicPage) return null;

    return (
     
      <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <ul className={styles["navbar-list"]}>
          <li>
            <Link href="/" className={styles["navbar-item"]}>
              <img src="/pictures/white-rabbit.png" alt="White Rabbit" />
              <span className={`${pathname === "/" ? "bg-yellow-400 text-white " : ""} rounded-full p-2 px-3`}>HOME</span>
            </Link>
          </li>
          <li>
            <Link href="/collections" className={styles["navbar-item"]}>
              <img src="/pictures/mad-hatter.png" alt="Mad Hatter" />
              <span className={`${pathname === "/collections" ? "bg-yellow-400 text-white " : ""} rounded-full p-2 px-3`}>COLLECTION</span>
            </Link>
          </li>
          <li>
            <Link href="/party" className={styles["navbar-item"]}>
              <img src="/pictures/teapot.png" alt="Teapot" />
              <span className={`${pathname === "/party" ? "bg-yellow-400 text-white " : ""} rounded-full p-2 px-3`}>PARTY</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className={styles["navbar-item"]}>
              <img src="/pictures/mirror.png" alt="Mirror" />
              <span className={`${pathname === "/profile" ? "bg-yellow-400 text-white " : ""} rounded-full p-2 px-3`}>PROFILE</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    );
  }
  

  
  