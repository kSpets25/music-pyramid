
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import styles from "../styles/about.module.css";
import Footer from "../components/footer";

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
        <title>About Music Pyramid</title>
        <meta name="description" content="Learn more about this application" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user?.username} />

      <main className={styles.main}>
        <h1>About Music Pyramid</h1>

        <h2>Inspiration</h2>

        <p>
          Music Pyramid is built for listeners who want to dive deeper 
          into their favorite genres and expand their personl music collection. The goal
          is to take the frustration out of the discovery and replace it with a fun, intuitive
          experience.
          <br></br>
          <br></br>
          Most music appls let users search for artists or save their favorites, 
          but very few make it easy to explore truly similar bands in a meaninful, 
          engaging way.  After researcing this gap, the idea for Music Pyramid was born. 
          <br></br>
          <br></br>
          <h2>Features</h2>
          Starting with one band, users can build their own "music pyramid" as the application 
          suggests similar artists to explore.  Each recommendation includes a band iage, name, 
          a Wikipedia link for background, and a YouTube link to instantly sample their sound.
          Every band you save is stored under your account so you can revisit them anytime in the{" "}
          <strong>My Bands</strong> page.
          <br></br>
          <br></br>
          With Music Pyramid, discoverng your next favorite band becomes simple organized and exciting.
          
        </p>
       
      </main>
      <Footer className={styles.footer} />
      
    </div>
  );
}