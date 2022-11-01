import { Spacer } from '../../../components/Layout/Spacer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../Modal';

const classes = {
  modalRowContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
  modalClose: "text-pink-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
  modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}

const DeleteDialog = (props) => {
  const { onClose, onDelete, rowData, name, children } = props;
  const { t } = useTranslation();

  return (<>
    <Modal 
      onClose={onClose}
      title={t('COMMON.DELETE') + ` ${name}`}>
        <form
          onSubmit={(e) => onDelete(e, rowData)}
          className="shadow-md rounded px-8 pt-6 pb-8 w-full">
          <div>{t('MESSAGE.DELETE')}</div>
          {/* <Spacer size={0.5} axis="vertical" /> */}
          <div className={classes.modalRowContainer}>
            <button className={classes.modalClose}
              type="button"
              onClick={onClose}
              >{t('COMMON.NO')}</button>
            <button
              type="submit"
              className={classes.modalSave}
              >{t('COMMON.YES')}</button>
          </div>
          {/* {children} */}
        </form>
      </Modal>
  </>
  );
};

export default DeleteDialog;