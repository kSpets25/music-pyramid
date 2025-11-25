import Head from "next/head";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/similarBands.module.css";
import Header from "../components/header";
import MusicSearch from "../components/musicSearch"; // uses updated routing
import { useRouter } from "next/router";
import Footer from "../components/footer";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user || null;
    const isLoggedIn = !!user;
    
    let userquery = query.userquery || "";
    // No search? No fetch
    if (!userquery && req.session.lastQuery) {
      userquery = req.session.lastQuery;
    }

    // Save latest query to session
    if (userquery) {
      req.session.lastQuery = userquery;
      await req.session.save();
    }
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
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const baseUrl = `${protocol}://${req.headers.host}`;
      const res = await fetch(
        `${baseUrl}/api/similarBands?userquery=${encodeURIComponent(userquery)}`
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
        <title>Search Similar Bands</title>
        <meta name="description" content="Music similarity search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user?.username} />

      <main className={styles.main}>
        <h1>Search for Similar Bands</h1>
        {/* Reusable Search component */}
        <MusicSearch initialQuery={userquery} />

        {userquery && <h2>Similar music to: "{userquery}"</h2>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Music Search Results */}
        {results.length > 0 ? (
          <ul className={styles.results_list}>
            {results.map((item, i) => {
              const name = item.name || "Unknown Artist";
              const img = item.wImg || "/default-artist.png";

              return (
                <li key={i} className={styles.result_item}>
                  <div className={styles.artist_card}>
                    <a
                      href={item.wUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={img} alt={name} className={styles.artist_image} />
                    </a>

                    <div className={styles.artist_info}>
                      <h3 className={styles.artist_name}>
                        {item.wUrl ? (
                          <a href={item.wUrl} target="_blank" rel="noreferrer">
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </h3>

                      {item.wTeaser && <p className={styles.teaser}>{item.wTeaser}</p>}

                      <div className={styles.links}>
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
                        } else {
                          alert(data.error || "Failed to save band");
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
      <Footer className={styles.footer} />
     
    </div>
  );
}
