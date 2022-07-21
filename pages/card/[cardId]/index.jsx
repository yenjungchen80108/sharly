import { findCardById } from '../../api-lib/db';
import { database } from '../../api-lib/middlewares';
// import { UserPost } from '../../page-components/UserPost';
import nc from 'next-connect';
import Head from 'next/head';
import { Donate } from '../../page-components/Donate';

export default function CardPage({ card }) {
  // if (typeof card.createdAt !== 'string') {
  //   card.createdAt = new Date(card.createdAt);
  // }
  return (
    <>
      <Head>
        <title>
          {card.title}
        </title>
      </Head>
      <Donate/>
      {/* <UserPost /> */}
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

  const card = await findCardById(context.req.db, context.params.cardId);
  if (!card) {
    return {
      notFound: true,
    };
  }

  if (context.params.username !== card.creator.username) {
    // mismatch params in url, redirect to correct one
    // eg. post x belongs to user a, but url is /user/b/post/x
    return {
      redirect: {
        destination: `/card/${card._id}`,
        permanent: false,
      },
    };
  }
  card._id = String(card._id);
  card.creatorId = String(card.creatorId);
  card.creator._id = String(card.creator._id);
  card.createdAt = card.createdAt.toJSON();
  return { props: { card } };
}
