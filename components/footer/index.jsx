import styles from "./style.footer.module.css";
//import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    
    return (
        <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/tasteDive_Logo.png" alt="tasteDive Logo" width={120} height={60} />
          </span>
        </a>
      </footer>
    );
}