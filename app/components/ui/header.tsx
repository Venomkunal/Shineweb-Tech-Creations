import Image from "next/image";
import Link from "next/link";
import styles from "@stylesui/header.module.css";


export default function Header() {
  return (
   <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.logoContainer}>
      <Image src="/logo.svg" alt="Shineweb Tech Creations Logo" width={80} height={100}></Image>
      <h1 className={styles.logoText}>
            Shineweb Tech Creations
        </h1>
        <p className={styles.tagline}>Innovative Tech Solutions & Web Development</p>
    </div>
    <nav className={styles.nav} >
      <ul className={styles.navList}>
        <li>
          <Link href="#home">Home</Link>
        </li>
        <li>
          <Link href="#services">Services</Link>
        </li>
        <li>
          <Link href="#about">About Us</Link>
        </li>
        <li>
          <Link href="#contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
    <div className={styles.cta}>
    <Link href="#Demo" className={styles.btn}>
        Try Now
      </Link>
      <Link href="#LogIn" className={styles.btn}>
        Log In
      </Link>
    </div>
    </div>
   </header>
  );
}