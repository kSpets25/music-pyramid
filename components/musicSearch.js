// components/musicSearch.js
// Note:  adjust CSS in globals.cc
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import styles from "../styles/similarBands.module.css";

export default function MusicSearch({ initialQuery = '' }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update query state if the URL changes (user revisits or uses back button)
  useEffect(() => {
    if (router.query.userquery) {
      setQuery(router.query.userquery);
    }
  }, [router.query.userquery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Route to /similarBands with new query
    router.replace(`/similarBands?userquery=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form className={styles.search_form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Enter a band or song to find similar music..."
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
      <button className={styles.search_button} type="submit">
        Search Similar Music
      </button>
    </form>
  );
}

