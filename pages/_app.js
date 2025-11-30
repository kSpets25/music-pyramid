
import React, {createContext,} from 'react';
import '../styles/globals.css'
import './index.jsx'


export const AppContext = createContext() ;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
  
}

export default MyApp
