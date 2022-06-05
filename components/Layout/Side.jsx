import { useTranslation } from 'react-i18next';
import { sideUpInfo, sideDownInfo } from './sideData';
import Link from 'next/link';

const Side = () => {
const { t } = useTranslation();

  return (
    <aside className="h-screen top-40 w-50" aria-label="Sidebar">
    <div className="overflow-y-auto py-16 px-3 bg-white-50 rounded dark:bg-white-800">
        <ul className="space-y-2">
            {sideUpInfo.map((item, id) => {
                let tempName = t(item.name).split(' ').join('');
                return (<li key={id}>
                <Link passHref href={`/side/${tempName}`}>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                        <span className="ml-3">{t(item.name)}</span>
                    </a>
                </Link>
                </li>)
            })}
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {sideDownInfo.map((item, id) => {
                let tempName = t(item.name).split(' ').join('');
                return (<li key={id}>
                <Link passHref
                    href={{
                    pathname: `/side/[title]`,
                    query: {
                      title: tempName, // should be `title` not `id`
                    },
                  }}
                  as={`/side/${tempName}`}
                >
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                        <span className="ml-3">{t(item.name)}</span>
                    </a>
                </Link>
                </li>)
            })}
        </ul>
    </div>
    </aside>
  );
};

export default Side;