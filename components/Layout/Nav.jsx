import { Avatar } from '../Avatar';
import { Button, ButtonLink } from '../Button';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { fetcher } from '../../lib/fetch';
import { useCurrentUser } from '../../lib/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Container from './Container';
import styles from './Nav.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next';
import { Popover, Transition } from '@headlessui/react';
import { ChartBarIcon, CursorClickIcon, ShieldCheckIcon, ChevronDownIcon } from '@heroicons/react/outline'

const languages = [
  {
    name: '繁體中文',
    description: 'tr',
    icon: ChartBarIcon
  },
  {
    name: '簡體中文',
    description: 'zh',
    icon: CursorClickIcon
  },
  { 
    name: 'English',
    description: "en",
    icon: ShieldCheckIcon 
  }
]

const UserMenu = ({ user, mutate }) => {
  const menuRef = useRef();
  const avatarRef = useRef();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const onRouteChangeComplete = () => setVisible(false);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () =>
      router.events.off('routeChangeComplete', onRouteChangeComplete);
  });

  useEffect(() => {
    // detect outside click to close menu
    const onMouseDown = (event) => {
      if (
        !menuRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const onSignOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      });
      toast.success('You have been signed out');
      mutate({ user: null });
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return (
    <div className={styles.user}>
      <button
        className={styles.trigger}
        ref={avatarRef}
        onClick={() => setVisible(!visible)}
      >
        <Avatar size={32} username={user.username} url={user.profilePicture} />
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-hidden={visible}
        className={styles.popover}
      >
        {visible && (
          <div className={styles.menu}>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>Profile</a>
            </Link>
            <Link passHref href="/settings">
              <a className={styles.item}>Settngs</a>
            </Link>
            <div className={styles.item} style={{ cursor: 'auto' }}>
              <Container alignItems="center">
                <span>{t('NAV.THEME')}</span>
                <Spacer size={0.5} axis="horizontal" />
                <ThemeSwitcher />
              </Container>
            </div>
            <button onClick={onSignOut} className={styles.item}>
              {t('NAV.SIGN_UP')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Nav = () => {
  const { data: { user } = {}, mutate } = useCurrentUser();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };

  return (
    <nav className={styles.nav}>
      <Wrapper className={styles.wrapper}>
        <Container
          className={styles.content}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link passHref href="/feed">
            {/* <a className={styles.logo}>Next.js MongoDB App</a> */}
            <a className={styles.logo}>
              <img width={32} 
              src="/favicon/give-love.png"
              alt=""/>
            </a>
          </Link>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                ><span>{t('NAV.LANGUAGE')}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-400',
                      'ml-2 h-5 w-5 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {languages.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            onClick={() => changeLanguage(item.description)}
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">{item.name}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <Container>
            {user ? (
              <>
                <UserMenu user={user} mutate={mutate} />
              </>
            ) : (
              <>
                <Link passHref href="/login">
                  <ButtonLink
                    size="small"
                    type="success"
                    variant="ghost"
                    color="link"
                  >
                    {t('NAV.SIGN_IN')}
                  </ButtonLink>
                </Link>
                <Spacer axis="horizontal" size={0.25} />
                <Link passHref href="/sign-up">
                  <Button size="small" type="success">
                    {t('NAV.SIGN_UP')}
                  </Button>
                </Link>
              </>
            )}
          </Container>
        </Container>
      </Wrapper>
    </nav>
  );
};

export default Nav;
