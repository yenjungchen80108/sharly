import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AddPartnerForm from '../../../../page-components/Partner/AddPartnerForm';

const AddPartnerPage = ({ sideAdd }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{sideAdd.title}</title>
      </Head>
      {sideAdd.title === 'CooperatePartner' ? <AddPartnerForm /> : <></>}
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