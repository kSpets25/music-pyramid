import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import Image from "next/image";

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.container}>
      {props.isLoggedIn ? (
        <>
          <p className={styles.navigation}>
            <Link href="/"><Image src="/images/electricGuitarLogo.png" 
            alt="Home" width={60} height={60} className={styles.homeImg}/>
            </Link>
            <Link href="/about">About</Link>
            <Link href="/similarBands">Similar Bands</Link>
            <Link href="/myBands">My Bands</Link>
          </p>
          <div className={styles.container}>
            <p>Welcome, {props.username}!</p>
            <p onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <>
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/login">Login</Link>
          </p>
        </>
      )}
    </header>
  );
}

