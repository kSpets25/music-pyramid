// /pages/about.js
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

export const getServerSideProps = withIronSessionSsr(
  async function ({ req }) {
    const user = req.session.user || null;
    const isLoggedIn = !!user;

    return {
      props: {
        user,
        isLoggedIn,
      },
    };
  },
  sessionOptions
);

export default function About({ user, isLoggedIn }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>About This App</title>
        <meta name="description" content="Learn more about this application" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user?.username} />

      <main className={styles.main}>
        <h1>About This Application</h1>

        <p>
          This project helps users discover new music by finding bands similar
          to the artists they already love. Every band you save is stored under
          your account so you can revisit them anytime in the{" "}
          <strong>My Bands</strong> page.
        </p>

        <h2>Features</h2>
        <ul>
          <li>🎧 Search for bands and artists</li>
          <li>🔍 Explore biographies, Wikipedia links, and YouTube videos</li>
          <li>⭐ Save your favorite discoveries to your personal library</li>
          <li>🗂 View them anytime on the My Bands page</li>
          <li>🔐 User login handled with Iron Session</li>
          <li>🗄 MongoDB for data storage</li>
        </ul>

        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js (Pages Router)</li>
          <li>React</li>
          <li>Iron Session for user auth</li>
          <li>MongoDB for persistent storage</li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <p>Built with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}