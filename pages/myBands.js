
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import dbConnect from "../db/connection";
import Band from "../db/models/bands";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user || null;
    if (!user) {
      return {
        redirect: { destination: "/login", permanent: false },
      };
    }

    await dbConnect();

    const bands = await Band.find({ userId: user.id || user._id }).lean();

    return {
      props: { user, bands: JSON.parse(JSON.stringify(bands)) },
    };
  },
  sessionOptions
);

export default function MyBands({ user, bands }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Bands</title>
      </Head>

      <Header isLoggedIn={!!user} username={user?.username} />

      <main className={styles.main}>
        <h1>My Saved Bands</h1>
        {bands.length === 0 ? (
          <p>You have no saved bands.</p>
        ) : (
          <ul className="results-list">
            {bands.map((band) => (
              <li key={band._id} className="result-item">
                <div className="artist-card">
                  {band.image && <img src={band.image} alt={band.name} />}
                  <div>
                    <h3>{band.name}</h3>
                    {band.wiki && (
                      <a href={band.wiki} target="_blank" rel="noreferrer">
                        Wikipedia
                      </a>
                    )}
                    {band.youtube && (
                      <a href={band.youtube} target="_blank" rel="noreferrer">
                        YouTube
                      </a>
                    )}
                    {band.teaser && <p>{band.teaser}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}


