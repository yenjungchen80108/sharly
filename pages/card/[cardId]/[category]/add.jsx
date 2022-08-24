import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AddDonateForm from '../../../../page-components/Donate/AddDonateForm';

const AddCard = ({ cardAdd }) => {
  // const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{cardAdd.category}</title>
      </Head>
       {cardAdd.category === 'book' ? <AddDonateForm /> : <></>}
    </>
  );
};

// export const getStaticPaths = async () => {
//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: 'blocking' //indicates the type of fallback
//   }
// }

export async function getServerSideProps(context) {
  // console.log('context',context); // return { title: 'Mortal Kombat' }
  const cardAdd = context.query;
  return { props: { cardAdd }}
}

export default AddCard;