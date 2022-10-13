import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const classes = {
  modalContainer: "flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",
  modalOuterLayout: "relative p-6 w-full max-w-2xl md:h-auto",
  modalInnerLayout: "border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none",
  modalClose: "flex items-start justify-between p-5 border-b border-solid rounded-t",
  closeBtn: 'bg-transparent border-0 text-black float-right',
}

const Modal = (props) => {
    return (
      <>
      <div className={classes.modalContainer}>
        <div className={classes.modalOuterLayout}>
          <div className={classes.modalInnerLayout}>
            <div className={classes.modalClose}>
              <button className={classes.closeBtn}
                onClick={props.onClose}
                >
                <span className={styles.close}>x</span>
              </button>
              <div>{props.title}</div>
            </div>
            <div className={styles.innerForm}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
    )
};

Modal.propTypes = {  
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default Modal;