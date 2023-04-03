import { Button } from "../../Button";
import { Modal } from "../../Modal";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "../Dialog.module.css";

const classes = {
  addForm: "rounded px-8 pt-6 pb-8 w-full",
};

const AddDialog = (props) => {
  const { name, children, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <>
      <Modal onClose={onClose} title={t("COMMON.ADD") + ` ${name}`}>
        <form
          onSubmit={(e) => onSubmit(e, "add")}
          className={classNames(styles.formWrapper, classes.addForm)}
        >
          {children}
          <Button type="submit">{t("COMMON.ADD")}</Button>
        </form>
      </Modal>
    </>
  );
};

export default AddDialog;
