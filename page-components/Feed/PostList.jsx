import { Button } from "../../components/Button";
import { Container, Spacer } from "../../components/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import { Post } from "../../components/Post";
import { Text } from "../../components/Text";
import { LoadingDots } from "../../components/LoadingDots";
import { usePostPages } from "../../lib/post";
import Link from "next/link";
import styles from "./PostList.module.css";

const PostList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  if (!data) return <div></div>;
  const posts =
    data?.[0]?.posts.length === 0 || data?.[0]?.length === 0
      ? []
      : data.reduce((acc, val) => [...acc, ...val.posts], []);
  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {posts ? (
          posts.map((post) => (
            <Link
              key={post._id}
              href={`/user/${post.creator.username}/post/${post._id}`}
              passHref
            >
              <div className={styles.wrap}>
                <Post className={styles.post} post={post} />
              </div>
            </Link>
          ))
        ) : (
          <LoadingDots className={styles.loading} />
        )}
        <Container justifyContent="center">
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
        </Container>
      </Wrapper>
    </div>
  );
};

export default PostList;
