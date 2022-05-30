import clsx from 'clsx';
import styles from './Container.module.css';
import { forwardRef } from 'react';

const Container = forwardRef(
  function Container(
    {
      justifyContent,
      flex,
      alignItems,
      column,
      className,
      children,
    }, ref
  ) {
  return (
    <div
      className={clsx(styles.container, column && styles.column, className)}
      style={{
        justifyContent,
        flex,
        alignItems,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default Container;
