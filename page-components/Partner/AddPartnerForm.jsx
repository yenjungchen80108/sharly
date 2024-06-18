import { Spacer, Wrapper } from "../../components/Layout";
import { LoadingDots } from "../../components/LoadingDots";
import { Text, TextLink } from "../../components/Text";
import { fetcher } from "../../lib/fetch";
import { usePartners, usePartnerPagination } from "../../lib/partner";
import { useDonateItems } from "../../lib/donateItem";
import { useCurrentUser } from "../../lib/user";
import Link from "next/link";
import React, { useCallback, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./Partner.module.css";
import { use } from "i18next";
import { useSWRConfig } from "swr";
import { withRouter } from "next/router";
import { Label } from "../../components/Label";
import { SingleTableList } from "../../components/SingleTable";
import { columns } from "./constant";
import { useTranslation } from "react-i18next";

// common form for add, edit, delete mode
export const PartnerForm = (props) => {
  const { t } = useTranslation();
  const { handleChange, handleAddTag, removeTag, values, tags } = props;

  return (
    <section>
      <h5>{t("PARTNER.MODAL_TITLE")}</h5>
      <Label
        name="partnerId"
        value={values.partnerId}
        onChange={handleChange}
      ></Label>
      <Label name="year" value={values.year} onChange={handleChange}></Label>
      <Label name="title" value={values.title} onChange={handleChange}></Label>
      <Label
        name="content"
        value={values.content}
        onChange={handleChange}
      ></Label>
      <Label name="image" value={values.image} onChange={handleChange}></Label>
      <Label
        name="bankName"
        value={values.accountInfo.bankName}
        onChange={handleChange}
      ></Label>
      <Label
        name="accountName"
        value={values.accountInfo.accountName}
        onChange={handleChange}
      ></Label>
      <Label
        name="accountNumber"
        value={values.accountInfo.accountNumber}
        onChange={handleChange}
      ></Label>
      <Label
        type="tag"
        name="tags"
        tags={tags}
        value={values.tags}
        onChange={handleChange}
        handleAddTag={handleAddTag}
        removeTag={removeTag}
      ></Label>
    </section>
  );
};

export const AddPartnerFormInner = () => {
  const init = {
    partnerId: "",
    title: "",
    year: "",
    content: "",
    image: "",
    accountInfo: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
    tags: [],
  };
  const [values, setValues] = useState(init);
  const [tags, setTags] = useState([]);
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const tableRef = useRef();
  const { data, isLoading, isError } = usePartnerPagination(1);

  const onSubmit = async (e, mode) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      // add/edit item when submit
      await fetcher("/api/partners", {
        method: mode === "add" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      toast.success(
        mode === "add"
          ? t("MESSAGE.CREATE_SUCCESS")
          : t("MESSAGE.UPDATE_SUCCESS")
      );
      setValues(mode === "add" ? init : values);
      mutate(`/api/partners?page=${tableRef.current.pageId}`);
    } catch (e) {
      toast.error(e.info.error.message);
    } finally {
      setTimeout(() => {
        tableRef.current.handleClose();
      }, 1000);
    }
  };

  const onDelete = async (e, data) => {
    try {
      e.preventDefault();
      // delete item by id
      await fetcher("/api/partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: data._id,
        }),
      });

      mutate(`/api/partners?page=${tableRef.current.pageId}`);
      toast.success(t("MESSAGE.DELETE_SUCCESS"));
    } catch (e) {
      toast.error(e.info.error.message);
    } finally {
      setTimeout(() => {
        tableRef.current.handleClose();
      }, 1000);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      accountInfo: {
        ...values.accountInfo,
        ...{ [e.target.name]: e.target.value },
      },
    });
  };

  const handleAddTag = function (e) {
    e.preventDefault();
    setTags([...tags, values.tags]);
    setValues({ ...values, tags: [values.tags] });
  };

  const removeTag = function (index) {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <Wrapper>
      <div>
        <Spacer axis="vertical" size={1} />
        {isLoading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data.partners ? (
          <>
            <SingleTableList
              ref={tableRef}
              name={t("PARTNER.TITLE")}
              initVal={init}
              columns={columns}
              fields={data.partners}
              usePages={usePartnerPagination}
              setValue={setValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
            >
              <PartnerForm
                handleChange={handleChange}
                handleAddTag={handleAddTag}
                removeTag={removeTag}
                values={values}
                tags={tags}
              ></PartnerForm>
            </SingleTableList>
          </>
        ) : (
          <span>no data</span>
        )}
      </div>
    </Wrapper>
  );
};

const AddPartnerForm = ({ partner }) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <div className={styles.root}>
      {loading ? (
        <LoadingDots>Loading</LoadingDots>
      ) : data.user ? (
        <AddPartnerFormInner partner={partner} />
      ) : (
        <Text color="secondary">
          Please{" "}
          <Link href="/login" passHref>
            <TextLink color="link" variant="highlight">
              sign in
            </TextLink>
          </Link>{" "}
          to update
        </Text>
      )}
    </div>
  );
};

export default withRouter(AddPartnerForm);
