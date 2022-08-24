import styles from '../Dialog.module.css';
import { Button } from '../../Button';

const classes = {
  modalContainer: "flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",
  modalOuterLayout: "relative p-6 w-full max-w-2xl h-60 md:h-auto",
  modalInnerLayout: "border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none",
  modalClose: "flex items-start justify-between p-5 border-b border-solid rounded-t",
  modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1",
  modalFormContainer : "shadow-md rounded px-8 pt-6 pb-8 w-full",
  modalRowContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
}

const EditDialog = (props) => {
  const { name, children, onClose, onSubmit } = props;

  return (
    <>
      <div className={classes.modalContainer}>
        <div className={classes.modalOuterLayout}>
          <div className={classes.modalInnerLayout}>
            <div className={classes.modalClose}>
              <button className="bg-transparent border-0 text-black float-right"
                onClick={onClose}
                >
                <span className={styles.close}>x</span>
              </button>
              <h4 className="text-center">{`Edit ${name}`}</h4>
            </div>
            <div className={styles.innerForm}>
              <form
                onSubmit={(e) => onSubmit(e, 'edit')}
                className="shadow-md rounded px-8 pt-6 pb-8 w-full"
              >
                {children}
                <Button type="submit"
                >Save Edit</Button>
              </form>
            </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default EditDialog;
