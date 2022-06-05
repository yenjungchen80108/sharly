// import { Feed } from '../../page-components/Feed';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Partner } from '../../../page-components/Partner';

const SidePage = ({ side }) => {
  // const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{side.title}</title>
      </Head>
      {side.title === 'CooperatePartner' ? <Partner /> : <></>}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps(context) {
  // console.log(context.params); // return { title: 'Mortal Kombat' }
  const side = context.params;
  return { props: { side }}
}

export default SidePage;