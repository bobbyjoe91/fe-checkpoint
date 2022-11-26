import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </SSRProvider>
  );
}

export default MyApp
