import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AddPartnerForm from '../../../../page-components/Partner/AddPartnerForm';
import { useRouter } from 'next/router';
import Wrapper from '../../../../components/Layout/Wrapper';

const AddPartnerPage = ({ sideAdd }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{sideAdd.title}</title>
      </Head>
      {router.query.trans === t('SIDE.COOPERATE_PARTY') ? 
      <AddPartnerForm /> :
      <Wrapper>Coming Soon...</Wrapper>}
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
  // console.log('context',context); // return { title: 'Mortal Kombat' }
  const sideAdd = context.params;
  return { props: { sideAdd }}
}

export default AddPartnerPage;