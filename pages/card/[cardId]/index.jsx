import { findCardById } from "../../../api-lib/db";
import { database } from "../../../api-lib/middlewares";
import nc from "next-connect";
import Head from "next/head";
import { Donate } from "../../../page-components/Donate/index";

export default function CardPage({ card }) {
  return (
    <>
      <Head>
        <title>{card.title}</title>
      </Head>
      <Donate />
    </>
  );
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const card = await findCardById(context.req.db, context.params.cardId);
  if (!card) {
    return {
      notFound: true,
    };
  }

  if (context.params.username !== card.creator.username) {
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
