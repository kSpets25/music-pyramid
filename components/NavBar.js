// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/about" className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}>
          About
        </Link>
      </div>
    </nav>
  );
}
