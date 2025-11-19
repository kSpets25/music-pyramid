// /pages/about.js
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import styles from "../styles/about.module.css";

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
        

        <h2>Tech Stack</h2>
       
      </main>

      <footer className={styles.footer}>
        <p>Built with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}