import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { useTranslation } from 'react-i18next';

const classes = {
  addForm: 'shadow-md rounded px-8 pt-6 pb-8 w-full'
}

const AddDialog = (props) => {
  const { name, children, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <>
      <Modal
        onClose={onClose}
        title={t('COMMON.ADD') + ` ${name}`}>
        <form
          onSubmit={(e) => onSubmit(e, 'add')}
          className={classes.addForm}
        >
          {children}
          <Button type="submit"
          >{t('COMMON.ADD')}test1</Button>
        </form>
      </Modal>
  </>
  );
};

export default AddDialog;
