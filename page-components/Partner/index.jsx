import styles from './Partner.module.css';
import PartnerList from './PartnerList';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';

export const Partner = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Link
        passHref
        href={{
        pathname: `/side/[title]/add`,
        query: {
          title: 'CooperatePartner',
          trans: t('SIDE.COOPERATE_PARTY')
        },
      }}
      as={`/side/[title]/add`}
      >
        <Button>
        {t('PARTNER.TITLE')}
        </Button>
      </Link>
      <PartnerList />
    </div>
  );
};
