import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import MusicSearch from '../components/musicSearch';
import NavBar from '../components/NavBar';

export default function Home({ results, userquery, error }) {
  return (
    
    <div className="container">
      <NavBar />
      
      <h1 className="title">🎧 MyBand — Search Similar Music</h1>

      <MusicSearch />

      {userquery && <h2 className="subtitle">Similar music to: "{userquery}"</h2>}

      {error && <p className="error">{error}</p>}

      {results?.length > 0 ? (
        <ul className="results-list">
        {results.map((item, idx) => {
  const artistName = item.name || "Unknown Artist"; // lowercase n
    // Use the artist image if it exists, otherwise fallback to music note image
  const artistImage = item.wImg || '/music-note.png'; // add image to /public/music-note.png  
  return (
    <li key={idx} className="result-item">
      <div className="artist-card">
        <a
          href={item.wUrl || '#'}
          target="_blank"
          rel="noreferrer"
          className="artist-image-link"
        >
          <img
            src={item.wImg || '/default-artist.png'}
            alt={artistName}
            className="artist-image"
          />
        </a>

        <div className="artist-info">
          <h3 className="artist-name">
            {item.wUrl ? (
              <a href={item.wUrl} target="_blank" rel="noreferrer">
                {artistName}
              </a>
            ) : (
              artistName
            )}
          </h3>

          {item.wTeaser && <p className="teaser">{item.wTeaser}</p>}

          <div className="links">
            {item.wUrl && (
              <a href={item.wUrl} target="_blank" rel="noreferrer">
                🔗 Wikipedia
              </a>
            )}
            {item.yUrl && (
              <a href={item.yUrl} target="_blank" rel="noreferrer">
                ▶️ YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
})}


        </ul>
      ) : (
        userquery && !error && <p className="no-results">No similar music found.</p>
      )}
    </div>
  );
}


export async function getServerSideProps(context) {
  const { userquery } = context.query;

  if (!userquery) {
    return { props: { results: [], userquery: null } };
  }

  const apiKey = process.env.TASTEDIVE_API_KEY || '';
  const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(
    userquery
  )}&type=music&info=1&limit=10&k=${apiKey}`;

  try {
    // 1️ Fetch from TasteDive
    const res = await fetch(apiUrl);
    const data = await res.json();

    let results = data?.similar?.results || [];

    // 2️ Fetch Wikipedia image for each result (if available)
    results = await Promise.all(
      results.map(async (item) => {
        if (item.wUrl) {
          try {
            // Extract the Wikipedia page title from the URL
            const pageTitle = decodeURIComponent(item.wUrl.split('/').pop());

            // Wikipedia REST API to get summary + thumbnail
            const wikiRes = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`
            );
            const wikiData = await wikiRes.json();
            console.log("🔍 API Results:", JSON.stringify(results, null, 2));

            if (wikiData.thumbnail?.source) {
              item.wImg = wikiData.thumbnail.source; //  add image URL
            } else {
              item.wImg = null; // no image available
            }
          } catch (err) {
            console.error('Failed to fetch Wikipedia image for:', item.Name);
            item.wImg = null;
          }
        }
        return item;
      })
    );

    return {
      props: {
        results,
        userquery,
      },
    };
  } catch (err) {
    console.error('Error fetching from TasteDive:', err);
    return {
      props: {
        results: [],
        userquery,
        error: 'Failed to fetch similar music from TasteDive or Wikipedia.',
      },
    };
  }
}

