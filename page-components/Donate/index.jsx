import { Spacer, Wrapper } from '../../components/Layout';
import { Item } from '../../components/Item';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { LoadingDots } from '../../components/LoadingDots';
import { useRouter } from 'next/router';
import { useDonateItems } from '../../lib/donateItem';
import styles from './Donate.module.css';
import { useTranslation } from 'react-i18next';
// import { Post as PostItem } from '../../components/Post';
// import Commenter from './Commenter';
// import CommentList from './CommentList';
// import { useCards } from '../../lib/card';

export const Donate = ({ item }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useDonateItems();
  const { cardId, category } = router.query;
  const { t } = useTranslation();
  // router.query.category = 'book';
  // router.push(router);
  // const { data } = useCards();
  // if (!data) return <div></div>;
  return (
    <div className={styles.root}>
      <Link
        passHref
        href={{
        pathname: `/card/[cardId]/[category]/add`,
        // category: 'book',
        query: {
          cardId: cardId,
          category: category
        },
      }}
      as={`/card/[cardId]/[category]/add`}>
        <div className="flex text-gray-400 text-center px-1 py-1 m-3">
          <Button>
            {t('ITEM.TITLE')}
          </Button>
        </div>
      </Link>
      <div className={styles.box}>
      {data ? data.donateItems
      .filter(data => data.category === category)
      .map((item, id) => (
          <Link
            key={item._id}
            href={`/card/${item._id}`}
            passHref
          ><Item item={item} key={item._id}></Item>
          </Link>
        )) : <LoadingDots className={styles.loading} />}
      </div>
      {/* <h3>Donate-test</h3> */}
      {/* <Commenter post={post} />
      <CommentList post={post} /> */}
    </div>
  );
};
