
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/about.module.css";
import Header from "../components/header";
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
    <div className={styles.containerAbout}>
      <Head>
        <title>About Music Pyramid</title>
        <meta name="description" content="Learn more about this application" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user?.username} />

      <main className={styles.main}>
        <h1>About Music Pyramid</h1>

        <h2>Inspiration</h2>

        <p>
        Welcome to Music Pyramid! This application was developed by and for music lovers. Ever wish you could search, 
          explore, and store music similar to the bands you already listen to?
          Music Pyramid was built for those who want to do just that!   The goal
          is to take the frustration out of the discovery and replace it with a fun, interactive, and efficient
          experience.
          <br></br>
          <br></br>
          Most music applications let users search for artists or save their favorites, 
          but very few make it easy to truly explore similar bands in a meaninful and  
          relevant way.  After researcing this gap, the idea for Music Pyramid was born. 
          <br></br>
          <br></br>
          <h2>Features</h2>
          Starting with one band, users can build their own "music pyramid" as the application 
          suggests similar artists to explore.  Each recommendation includes a band image, name, 
          a Wikipedia link, for background information, and a YouTube link to instantly sample the music.
          Every band you save is stored under your account, and you can revisit the page anytime in the{" "}
          <strong>My Bands</strong> page. You can add or delete bands as you wish.
          <br></br>
          <br></br>
          With Music Pyramid, discoverng your next favorite band becomes simple, organized, and exciting!
          
        </p>
       
      </main>
      <Footer className={styles.footer} />
      
    </div>
  );
}