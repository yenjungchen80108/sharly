import { Spacer, Wrapper } from "../../components/Layout";
import { LoadingDots } from "../../components/LoadingDots";
import { Text, TextLink } from "../../components/Text";
import { fetcher } from "../../lib/fetch";
import { usePartners } from "../../lib/partner";
import { useCards, useCardPages } from "../../lib/card";
import { useDonateItems } from "../../lib/donateItem";
import { useCurrentUser } from "../../lib/user";
import Link from "next/link";
import React, { useCallback, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./Settings.module.css";
import { use } from "i18next";
import { useSWRConfig } from "swr";
import { withRouter } from "next/router";
import { Label } from "../../components/Label";
import { SingleTableList } from "../../components/SingleTable";
import { columns } from "./constant";
import { useTranslation } from "react-i18next";

// common form for add, edit, delete mode
export const CategoryForm = (props) => {
  const { t } = useTranslation();
  const { handleChange, handleAddTag, removeTag, values, tags } = props;

  return (
    <section>
      <h5>{t("CATEGORY.MODAL_TITLE")}</h5>
      <Label name="title" value={values.title} onChange={handleChange}></Label>
      <Label
        name="content"
        value={values.content}
        onChange={handleChange}
      ></Label>
      <Label name="image" value={values.image} onChange={handleChange}></Label>
      <Label
        name="category"
        type="select"
        value={values.category}
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

export const HomeCardSettingsInner = () => {
  const init = {
    // cardId: '',
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
  };
  const [values, setValues] = useState(init);
  const [tags, setTags] = useState([]);
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const tableRef = useRef();
  const { data, isLoading, isError } = useCardPages(1);

  const onSubmit = async (e, mode) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      // add/edit item when submit
      await fetcher("/api/cards", {
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
      mutate(`/api/cards?page=${tableRef.current.pageId}`);
      mutate(`/api/cards`);
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
      await fetcher("/api/cards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: data._id,
        }),
      });

      mutate(`/api/cards?page=${tableRef.current.pageId}`);
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
    setValues({ ...values, [e.target.name]: e.target.value });
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
        ) : data.cards ? (
          <>
            <SingleTableList
              ref={tableRef}
              name={t("CATEGORY.TITLE")}
              initVal={init}
              columns={columns}
              fields={data.cards}
              usePages={useCardPages}
              setValue={setValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              isShowDelete={false}
            >
              <CategoryForm
                handleChange={handleChange}
                handleAddTag={handleAddTag}
                removeTag={removeTag}
                values={values}
                tags={tags}
              ></CategoryForm>
            </SingleTableList>
          </>
        ) : (
          <span>no data</span>
        )}
      </div>
    </Wrapper>
  );
};

const HomeCardSettings = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : (
          <HomeCardSettingsInner />
        )}
      </div>
    </Wrapper>
  );
};

export default HomeCardSettings;
