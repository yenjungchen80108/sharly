import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Partner } from "../../../page-components/Partner";
import { Contact } from "../../../page-components/Contact";
import { useRouter } from "next/router";
import Wrapper from "../../../components/Layout/Wrapper";

const SidePage = ({ side }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.trans}</title>
      </Head>
      {router.query.trans === t("SIDE.COOPERATE_PARTY") ? (
        <Partner />
      ) : router.query.trans === t("SIDE.CONTACT_US") ? (
        <Contact />
      ) : (
        <Wrapper>Coming Soon...</Wrapper>
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  const side = context.params;
  return { props: { side } };
}

export default SidePage;
