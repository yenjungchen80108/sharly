import { Button } from '../../Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../Modal';

const EditDialog = (props) => {
  const { name, children, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <>
      <Modal
        onClose={onClose}
        title={t('COMMON.EDIT') + ` ${name}`}>
        <form
          onSubmit={(e) => onSubmit(e, 'edit')}
          className="shadow-md rounded px-8 pt-6 pb-8 w-full"
        >
          {children}
          <Button type="submit"
          >{t('COMMON.SAVE')}</Button>
        </form>
      </Modal>
  </>
  );
};

export default EditDialog;
