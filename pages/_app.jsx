import '../assets/base.scss';
import '../styles/globals.css'
import { Layout } from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from '../page-components/i18n';
// import '../public/fonts';

export default function MyApp({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </I18nextProvider>
  );
}
