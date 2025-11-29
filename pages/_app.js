import "./index.jsx"
import React, {createContext,} from 'react';
import '../styles/globals.css'
import Header from "../components/header";


export const AppContext = createContext() ;

function MyApp({ Component, pageProps }) {
  return(
  <>
    <Component {...pageProps} />
  </> 
 ); 
}

export default MyApp
