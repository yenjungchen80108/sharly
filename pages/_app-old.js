import '../styles/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';

function MyAppOld({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
      // Perform localStorage action
        //   if(typeof window !== "undefined") {
        //     if(localStorage.getItem("user")) {
        //       return JSON.parse(localStorage.getItem("user"))
        //     } else{
        //     return []
        //     }
        //  }
      // run auth check on initial load
      authCheck(router.asPath);

      // set authorized to false to hide page content while changing routes
      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      // run auth check on route change
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', authCheck);
      }
  }, []);

  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      const publicPaths = ['/login'];
      const path = url.split('?')[0];
      if (!userService.userValue && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
              pathname: '/login',
              query: { returnUrl: router.asPath }
          });
      } else {
          setAuthorized(true);
      }
  }
  return (
        <div className="container pt-4 pb-4">
          {authorized &&
              <Component {...pageProps} />
          }
        </div>
  )
}

export default MyAppOld
