import styles from './Partner.module.css';
import PartnerList from './PartnerList';
import Link from 'next/link';
import { Button } from '../../components/Button';

export const Partner = () => {
  return (
    <div className={styles.root}>
      <Link
        passHref
        href={{
        pathname: `/side/[title]/add`,
        query: {
          title: 'CooperatePartner',
        },
      }}
      as={`/side/[title]/add`}
      >
        <Button type="success">
            Add new partner
        </Button>
      </Link>
      <PartnerList />
    </div>
  );
};
