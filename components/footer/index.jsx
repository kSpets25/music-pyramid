import styles from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    
    return (
        <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/tasteDive_Logo.png" alt="tasteDive Logo" width={120} height={60} />
          </span>
        </a>
      </footer>
    );
}