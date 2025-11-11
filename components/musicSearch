// components/MusicSearch.js
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

export default function MusicSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Automatically focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Route to the same page with query param
    router.replace(`/?userquery=${encodeURIComponent(trimmedQuery)}`);

    // Clear the input and focus it again
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
          if (e.key === 'Enter') handleSubmit(e); // handle Enter key
        }}
      />
      <button className="search-button" type="submit">
        Search Similar Music
      </button>
    </form>
  );
}
