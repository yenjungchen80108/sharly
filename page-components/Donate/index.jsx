import { Spacer, Wrapper } from '../../components/Layout';
import { Item } from '../../components/Item';
import Link from 'next/link';
import { Button } from '../../components/Button';
// import { Post as PostItem } from '../../components/Post';
// import Commenter from './Commenter';
// import CommentList from './CommentList';
import styles from './Donate.module.css';
// import { useCards } from '../../lib/card';
import { useRouter } from 'next/router';

export const Donate = ({ item }) => {
  const router = useRouter();
  const { cardId } = router.query;
  // router.query.category = 'book';
  // router.push(router);
  // console.log('router',router);
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
          category: 'book'
        },
      }}
      as={`/card/[cardId]/[category]/add`}>
        <div className="flex text-gray-400 text-center px-1 py-1 m-3">
          <Button type="success">
            機構填寫需求單
          </Button>
        </div>
      </Link>
      <Item />
      {/* <h3>Donate-test</h3> */}
      {/* <Commenter post={post} />
      <CommentList post={post} /> */}
    </div>
  );
};
