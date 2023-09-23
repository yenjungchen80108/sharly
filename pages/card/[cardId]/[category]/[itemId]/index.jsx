import { findDonateItemById } from "../../../../../api-lib/db/donateItem";
import { database } from "../../../../../api-lib/middlewares";
import { ItemContainer } from "../../../../../page-components/ItemContainer";
import nc from "next-connect";
import Head from "next/head";

export default function ItemPage({ item }) {
  if (typeof item.createdAt !== "string") {
    item.createdAt = new Date(item.createdAt);
  }
  return (
    <>
      <Head>
        <title>{item.itemName}</title>
      </Head>
      <ItemContainer item={item} />
    </>
  );
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const item = await findDonateItemById(context.req.db, context.params.itemId);
  if (!item) {
    console.log("not found");
    return {
      notFound: true,
    };
  }

  item._id = String(item._id);
  item.createdAt = item.createdAt.toJSON();
  return { props: { item } };
}
