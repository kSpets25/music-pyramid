import Head from "next/head";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import MusicSearch from "../components/MusicSearch"; // uses updated routing
import { useRouter } from "next/router";
//import styles from "/styles/similarBands.module.css"


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user || null;
    const isLoggedIn = !!user;
    const userquery = query.userquery || "";

    // No search? No fetch
    if (!userquery) {
      return {
        props: {
          user,
          isLoggedIn,
          userquery: "",
          results: [],
        },
      };
    }

    try {
      // Internal API Route → FAST
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/similarBands?userquery=${encodeURIComponent(
          userquery
        )}`
      );

      const data = await res.json();

      return {
        props: {
          user,
          isLoggedIn,
          userquery,
          results: data.results || [],
          error: data.error || null,
        },
      };
    } catch (e) {
      return {
        props: {
          user,
          isLoggedIn,
          userquery,
          results: [],
          error: "Internal API failed",
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
                                        
                                          <button
                      
                      onClick={async () => {
                        const res = await fetch("/api/band", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: item.name,
                            image: item.wImg,
                            wiki: item.wUrl,
                            youtube: item.yUrl,
                            teaser: item.wTeaser,
                          }),
                        });

                        const data = await res.json();

                        if (data.success) {
                          alert(`${item.name} saved to My Bands!`);
                        }
                      }}
                    >
                      ⭐ Save Band
                    </button>

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
