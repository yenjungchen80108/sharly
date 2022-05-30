import { findPostById } from '../../../../api-lib/db';
import { database } from '../../../../api-lib/middlewares';
import { UserPost } from '../../../../page-components/UserPost';
import nc from 'next-connect';
import Head from 'next/head';

export default function UserPostPage({ post }) {
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>
          {post.creator.name} ({post.creator.username}): {post.content}
        </title>
      </Head>
      <UserPost post={post} />
    </>
  );
}
// You should use getServerSideProps only if
// you need to render a page whose data must be fetched at request time
// 最大的差別在於，getStaticProps一定要配合 getStaticPaths 使用。
// 在開發期間，以上這三個 function 每次 request 都會被呼叫，
// 但在 build 時，Next.js 會參考 getStaticProps 裡的設定，直接產生靜態資源，
// 而getServerSideProps則是在每次的 request 會動態抓取指定資源
export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const post = await findPostById(context.req.db, context.params.postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  if (context.params.username !== post.creator.username) {
    // mismatch params in url, redirect to correct one
    // eg. post x belongs to user a, but url is /user/b/post/x
    return {
      redirect: {
        destination: `/user/${post.creator.username}/post/${post._id}`,
        permanent: false,
      },
    };
  }
  post._id = String(post._id);
  post.creatorId = String(post.creatorId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
