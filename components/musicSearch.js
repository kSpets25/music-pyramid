// components/MusicSearch.js
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

export default function MusicSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Route to /similarBands instead of /
    router.replace(`/similarBands?userquery=${encodeURIComponent(trimmed)}`);

    setQuery('');
    inputRef.current?.focus();
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
