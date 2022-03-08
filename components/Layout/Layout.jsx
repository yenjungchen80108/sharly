import Head from 'next/head';
import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Sharly</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description"/>
        <meta property="og:title" content="sharly App" />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
