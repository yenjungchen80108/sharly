import Head from "next/head";
import AddDonateForm from "../../../../page-components/Donate/AddDonateForm";
import { useTranslation } from "react-i18next";

const AddCard = ({ cardAdd }) => {
  return (
    <>
      <Head>
        <title>{cardAdd.category}</title>
      </Head>
      <AddDonateForm />
    </>
  );
};

export async function getServerSideProps(context) {
  const cardAdd = context.query;
  return { props: { cardAdd } };
}

export default AddCard;
