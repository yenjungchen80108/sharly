import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';
import { useCallback, useRef, useState, useMemo } from 'react';

const Input = forwardRef(
  function Input(
  {
    value,
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    required,
    onKeyDown
  },
  ref
) {
  // const [state, setState] = useState({
  //   ...state || null
  // });

  // const handleInputChange = (e) => {
  //   // state[e.target.name] = e.target.value;
  //   let { name, value } = e.target;
  //   // console.log('do run!', state, name, value);
  //   setState({ ...state, [name]: value });
  // };
  
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          value={value}
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  );
});

export default Input;
