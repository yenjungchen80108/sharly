import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Table.module.css';

const Table = forwardRef(function Table(
  {
    className
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <table></table>
    </div>
  );
});

export default Table;
