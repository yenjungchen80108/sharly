import { Button } from '../../components/Button';
import { Container, Spacer } from '../../components/Layout';
import Wrapper from '../../components/Layout/Wrapper';
import { Post } from '../../components/Post';
import { Text } from '../../components/Text';
import { useCards } from '../../lib/card';
import Link from 'next/link';
import styles from './PostList.module.css';
import { Card } from '../../components/Card';
import { LoadingDots } from '../../components/LoadingDots';

const CategoryList = () => {
  const { data } = useCards();
  if (!data) return <div></div>;
  // if (!data) return <LoadingDots className={styles.loading} />;
  // const posts = data?.[0]?.message?.length === 0 && data === null ? [] : data.reduce((acc, val) => [...acc, ...val.posts], []);
  return (
    <div className="flex justify-center bg-pink-50">
      <Spacer axis="vertical" size={1} />
      {/* <Wrapper> */}
        {data ? data.cards.map((card, id) => (
          <Link
            key={card._id}
            href={{
              pathname: `/card/${card._id}`,
              query: {
                cardId: card._id,
                category: card.category
              },}}
            passHref
          >
            <div className="flex text-gray-400 text-center px-1 py-1 m-3 cursor-pointer">
              {/* <Post className={styles.post} post={post} /> */}
              <Card className={styles.post} card={card} key={card._id}></Card>
            </div>
          </Link>
        )) : <LoadingDots className={styles.loading} />}
        {/* <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more posts are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </Container> */}
      {/* </Wrapper> */}
    </div>
  );
};

export default CategoryList;
