// import { Feed } from '../../page-components/Feed';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Partner } from '../../../page-components/Partner';
import { Contact } from '../../../page-components/Contact';
import { useRouter } from 'next/router'

const SidePage = ({ side }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.trans}</title>
      </Head>
      {router.query.trans === t('SIDE.COOPERATE_PARTY') ? <Partner /> :
      router.query.trans === t('SIDE.CONTACT_US') ? <Contact /> :
      <section>Coming Soon...</section>}
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