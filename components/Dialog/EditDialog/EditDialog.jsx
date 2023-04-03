import { Button } from "../../Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../Modal";
import classNames from "classnames";
import styles from "../Dialog.module.css";

const classes = {
  editForm: "rounded px-8 pt-6 pb-8 w-full",
  btnStyle: "mb-8",
};

const EditDialog = (props) => {
  const { name, children, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <>
      <Modal onClose={onClose} title={t("COMMON.EDIT") + ` ${name}`}>
        <form
          onSubmit={(e) => onSubmit(e, "edit")}
          className={classNames(styles.formWrapper, classes.editForm)}
        >
          {children}
          <Button className={classes.btnStyle} type="submit">
            {t("COMMON.SAVE")}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditDialog;
