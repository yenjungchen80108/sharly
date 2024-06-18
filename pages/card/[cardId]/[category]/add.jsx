import Head from "next/head";
import { useTranslation } from "react-i18next";
import AddDonateForm from "../../../../page-components/Donate/AddDonateForm";

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
