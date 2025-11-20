// components/musicSearch.js
// Note:  adjust CSS in globals.cc
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

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
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter an artist or song to find similar music..."
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
      <button className="search-button" type="submit">
        Search Similar Music
      </button>
    </form>
  );
}

