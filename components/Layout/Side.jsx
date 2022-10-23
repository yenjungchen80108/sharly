import { useTranslation } from 'react-i18next';
import { sideUpInfo, sideDownInfo } from './sideData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pushRotate as Menu } from 'react-burger-menu';

const Side = () => {
const { t } = useTranslation();

  return (
    <Menu>  
        <ul className="space-y-2">
            {sideUpInfo.map((item, id) => {
                let tempName = t(item.name).split(' ').join('');
                return (<li key={id}>
                <Link passHref href={`/side/${tempName}`}>
                    <a href="#" className="flex items-center p-2 font-normal light:text-gray-400 rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-300">
                        <item.icon className="flex-shrink-0 h-6 w-6 text-red-600" aria-hidden="true" />
                        <span className="ml-3">{t(item.name)}</span>
                    </a>
                </Link>
                </li>)
            })}
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-400">
            {sideDownInfo.map((item, id) => {
                let tempName = t(item.name).split(' ').join('');
                return (<li key={id}>
                <Link passHref
                    href={{
                    pathname: `/side/[title]`,
                    query: {
                      title: tempName,
                      trans: t(item.name),
                    },
                  }}
                  as={`/side/${tempName}`}
                >
                    <a href="#" className="flex items-center p-2 font-normal light:text-gray-400 rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-300">
                        <item.icon className="flex-shrink-0 h-6 w-6 text-red-600" aria-hidden="true" />
                        <span className="ml-3">{t(item.name)}</span>
                    </a>
                </Link>
                </li>)
            })}
        </ul>
    </Menu>
  );
};

export default Side;