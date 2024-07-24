import Head from "next/head";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import Nav from "./Nav";
import Side from "./Side";
import Stepper from "./Stepper";

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
        <meta name="description" />
        <meta property="og:title" content="sharly App" />
      </Head>
      {/* <main class="flex flex-col h-screen">
        <div class="flex">
          <div class="flex bg-gray-100 w-32 p-4"><Side /></div>
          <div class="flex flex-1 flex-col">
            <div class="flex bg-gray-300 h-16 p-4"><Nav /></div>
            <div class="flex flex-1 bg-blue-100 overflow-y-auto paragraph">
            <main className={styles.content}>{children}</main></div>
          </div>
        </div>
        <Footer />
      </main> */}
      <Nav />
      <div id="outer-container" className={styles.outerContainer}>
        <Side pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div className={styles.innerContainer}>
          <Stepper />
          <main id="page-wrap" className={styles.content}>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
