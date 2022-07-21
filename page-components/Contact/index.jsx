import styles from './Partner.module.css';
import AddContact from './AddContact';
import Link from 'next/link';
import { Button } from '../../components/Button';

export const Contact = () => {
  return (
    <div className={styles.root}>
      <AddContact />
    </div>
  );
};