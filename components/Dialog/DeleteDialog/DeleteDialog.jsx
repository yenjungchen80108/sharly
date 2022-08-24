import styles from '../Dialog.module.css';
import Spacer from '../../../components/Layout/Spacer';

const classes = {
  modalContainer: "flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",
  modalOuterLayout: "relative p-6 w-full max-w-2xl h-60 md:h-auto",
  modalInnerLayout: "border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none",
  modalRowContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
  modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
  modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}

const DeleteDialog = (props) => {
  const { onClose, onDelete, rowData } = props;

  return (<>
    <div className={classes.modalContainer}>
      <div className={classes.modalOuterLayout}>
        <div className={classes.modalInnerLayout}>
          <div className={classes.modalClose}>
            <button className="bg-transparent border-0 text-black float-right"
              onClick={onClose}
              ><span className={styles.close}>x</span>
            </button>
          </div>
          <div className="relative p-6 flex-auto text-left">
              <form
                onSubmit={(e) => onDelete(e, rowData)}
                className="shadow-md rounded px-8 pt-6 pb-8 w-full">
                <div>Are you sure you want to delete?</div>
                <Spacer size={0.5} axis="vertical" />
                <div className={classes.modalRowContainer}>
                  <button className={classes.modalClose}
                    type="button"
                    onClick={onClose}
                    >NO</button>
                  <button
                    type="submit"
                    className={classes.modalSave}
                    >YES</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default DeleteDialog;