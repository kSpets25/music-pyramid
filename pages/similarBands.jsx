import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import NavBar from "../components/NavBar";


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user || null;
    const userquery = query.userquery || null;
    const apiKey = process.env.TASTEDIVE_API_KEY || "";
    let results = [];
    let error = null;

    if (userquery) {
      const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(
        userquery
      )}&type=music&info=1&limit=10&k=${apiKey}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        results = data?.Similar?.Results || [];

         // Fetch Wikipedia images
         results = await Promise.all(
          results.map(async (item) => {
            if (item.wUrl) {
              try {
                const pageTitle = decodeURIComponent(item.wUrl.split("/").pop());
                const wikiRes = await fetch(
                  `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`
                );
                const wikiData = await wikiRes.json();
                item.wImg = wikiData.thumbnail?.source || null;
              } catch {
                item.wImg = null;
              }
            }
            return item;
          })
        );
      } catch (err) {
        console.error("Error fetching from TasteDive:", err);
        error = "Failed to fetch similar music from TasteDive or Wikipedia.";
      }
    }

    return {
      props: {
        user,
        isLoggedIn: !!user,
        results,
        userquery,
        error,
      },
    };
  },
  sessionOptions
);

export default function SimilarBands({ user, isLoggedIn, results, userquery, error }) {
  const logout = useLogout();

  return (
    <div className={styles.container}>
      <Head>
        <title>Similar Bands | MyBand</title>
        <meta name="description" content="Search for similar music artists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user?.username} />
      <main className={styles.main}>
        <div className="container">
          <NavBar />

          <h1 className="title">🎧 MyBand — Search Similar Music</h1>

          <MusicSearch />

          {userquery && <h2 className="subtitle">Similar music to: "{userquery}"</h2>}
          {error && <p className="error">{error}</p>}

          {results?.length > 0 ? (
            <ul className="results-list">
              {results.map((item, idx) => {
                const artistName = item.Name || "Unknown Artist";
                const artistImage = item.wImg || "/music-note.png";

                return (
                  <li key={idx} className="result-item">
                    <div className="artist-card">
                      <a
                        href={item.wUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="artist-image-link"
                      >
                        <img
                          src={artistImage}
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

