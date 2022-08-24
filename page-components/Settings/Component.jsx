import { Spacer, Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { Text, TextLink } from '../../components/Text';
import { fetcher } from '../../lib/fetch';
import { usePartners } from '../../lib/partner';
import { useCards } from '../../lib/card';
import { useDonateItems } from '../../lib/donateItem';
import { useCurrentUser } from '../../lib/user';
import Link from 'next/link';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './Settings.module.css';
import { use } from 'i18next';
import { useSWRConfig } from "swr";
import { withRouter } from 'next/router';
import { Label } from '../../components/Label';
import { SingleTableList } from '../../components/SingleTable';
import { columns } from './constant';

// common form for add, edit, delete mode
export const CategoryForm = (props) => {
  const { handleChange, handleAddTag, removeTag, values, tags } = props;

  return (
    <section>
        <h5>Category Info</h5> 
        <Label
          name="title"
          value={values.title}
          onChange={handleChange}
        ></Label>
        <Label
          name="content"
          value={values.content}
          onChange={handleChange}
        ></Label>
        <Label
          name="image"
          value={values.image}
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
        >
        </Label>
    </section>
  )
}

export const HomeCardSettingsInner = () => {
  const init = {
    // cardId: '',
    title: '',
    content: '',
    image: '',
    tags: [],
  }
  const [ values, setValues ] = useState(init);
  const [ tags, setTags ]= useState([]);
  const { data, isLoading, isError } = useCards();
  const { mutate } = useSWRConfig();

  const onSubmit = async (e, mode) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      // add/edit item when submit  
      await fetcher('/api/cards', {
        method: mode === 'add' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      toast.success('You have updated successfully');
      setValues(mode === 'add' ? init : values);
      mutate('/api/cards');
    } catch (e) {
      toast.error(e.message);
    } finally {
      // setShowModal(false);
      // setIsLoading(false);
    }
  };

  const onDelete = async (e, data) => {
    try {
      e.preventDefault();
      // delete item by id
      await fetcher('/api/cards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: data._id
        }),
      });

      mutate('/api/cards');
      toast.success('Card has been deleted');
    } catch (e) {
      toast.error(e.message);
    } finally {
      // setShowModal(false);
      // setIsLoading(false);
  }
};

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setValues({...values,
      [e.target.name]: e.target.value
    });
  }

  const handleAddTag = function(e) {
    e.preventDefault();
    setTags([...tags, values.tags]);
    setValues({...values, tags: [values.tags] })
  }

  // console.log({tags});

  const removeTag = function(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

    return (
      <Wrapper>
        <div>
        <Spacer axis="vertical" size={1} />
        {isLoading ? (
        <LoadingDots>Loading</LoadingDots>
        ) : data.cards ? 
        (<>
          <SingleTableList
            name="Category Settings"
            initVal={init}
            columns={columns}
            fields={data.cards}
            setValue={setValues}
            onSubmit={onSubmit}
            onDelete={onDelete}
            children={// eslint-disable-next-line
            <CategoryForm
              handleChange={handleChange}
              handleAddTag={handleAddTag}
              removeTag={removeTag}
              values={values}
              tags={tags}
            />}
          ></SingleTableList>
        </>)
        : (<span>no data</span>)}
      </div>
    </Wrapper>
    );
};

const HomeCardSettings = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    // <Wrapper>
      <div className={styles.root}>
        {/* <h3 className={styles.heading}>Share your thoughts</h3> */}
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <HomeCardSettingsInner/>
          // <HomeCardSettingsInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to update
          </Text>
        )}
      </div>
    // </Wrapper>
  );
};

export default HomeCardSettings;