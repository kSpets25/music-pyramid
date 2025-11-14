import Head from "next/head";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import MusicSearch from "../components/MusicSearch"; // uses updated routing
import { useRouter } from "next/router";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    const props = {};

    props.isLoggedIn = !!req.session.user;
    props.user = req.session.user || null;

    const userquery = query.userquery || "";
    props.userquery = userquery;

    // No search initiated
    if (!userquery) return { props: { ...props, results: [] } };

    const apiKey = process.env.TASTEDIVE_API_KEY || "";
    const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(
      userquery
    )}&type=music&info=1&limit=10&k=${apiKey}`;

    try {
      // TasteDive request
      const res = await fetch(apiUrl);
      const data = await res.json();
      let results = data?.similar?.results || [];

      // Add Wikipedia images
      results = await Promise.all(
        results.map(async (item) => {
          if (!item.wUrl) return item;

          try {
            const title = decodeURIComponent(item.wUrl.split("/").pop());
            const wiki = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
            );
            const wikiData = await wiki.json();
            item.wImg = wikiData.thumbnail?.source || null;
          } catch {
            item.wImg = null;
          }
          return item;
        })
      );

      return { props: { ...props, results } };
    } catch (error) {
      return {
        props: {
          ...props,
          results: [],
          error: "Failed to fetch similar music.",
        },
      };
    }
  },
  sessionOptions
);

export default function similarBands({
  isLoggedIn,
  user,
  results = [],
  userquery,
  error,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Similar Bands</title>
        <meta name="description" content="Music similarity search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER unchanged */}
      <Header isLoggedIn={isLoggedIn} username={user?.username} />

      <h1>My Application My similarBands Page</h1>

      <main className={styles.main}>
        {/* 🔍 Reusable Search component */}
        <MusicSearch />

        {userquery && <h2>Similar music to: "{userquery}"</h2>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 🎧 Results */}
        {results.length > 0 ? (
          <ul className="results-list">
            {results.map((item, i) => {
              const name = item.name || "Unknown Artist";
              const img = item.wImg || "/default-artist.png";

              return (
                <li key={i} className="result-item">
                  <div className="artist-card">
                    <a
                      href={item.wUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="artist-image-link"
                    >
                      <img src={img} alt={name} className="artist-image" />
                    </a>

                    <div className="artist-info">
                      <h3 className="artist-name">
                        {item.wUrl ? (
                          <a href={item.wUrl} target="_blank" rel="noreferrer">
                            {name}
                          </a>
                        ) : (
                          name
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
          userquery && !error && <p>No similar music found.</p>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
