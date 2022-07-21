import clsx from 'clsx';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { Text, TextLink } from '../../components/Text';
import { fetcher } from '../../lib/fetch';
import { useCards, useCard } from '../../lib/card';
import { useCurrentUser } from '../../lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './Settings.module.css';
import { use } from 'i18next';
import useSWR, { useSWRConfig } from "swr";

const classes = {
  inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
  tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
  tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
  iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
  modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
  modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
  modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}
  // change to react hook form
  // const [state, setState] = useState({
  //   ...state || null
  // });
const HomeCardEditModal = ({ closeEditModal, handleKeyDown, cardElement, cardIndex }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const tagsRef = useRef();
  const { mutate } = useSWRConfig();
  
  const [state, setState] = useState({
    cardId: cardElement._id || null,
    title: cardElement.title || null,
    content: cardElement.content || null,
    image: cardElement.image || null,
    tags: cardElement.tags || null,
  });

  const handleInputChange = (e) => {
    let { value } = e.target;
    setState({ ...state, [e.target.name]: value });
  };

  useEffect(() => { // this hook will get called every time when myArr has changed
  // perform some action which will get fired every time when myArr gets updated
    // setState({ ...state });    
    handleInputChange.bind(this);
    // console.log('Updated State', state);
  }, [state]);

  const [isLoading, setIsLoading] = useState(false);  
  const { cardId } = state;

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/cards', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // newState
            _id: cardId,
            title: titleRef.current.value,
            content: contentRef.current.value,
            image: imageRef.current.value,
            tags: tagsRef.current.value !== null ? [...tagsRef.current.value.split(',')] : null,
          }),
        });

        mutate('/api/cards');
        toast.success('Card has been updated');
      } catch (e) {
        // console.log('e',e);
        toast.error(e.message);
      } finally {
        setIsLoading(false);
        closeEditModal();
      }
    },
    [cardId, mutate, closeEditModal]
  );
  return (
    <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-6 w-full max-w-2xl h-full md:h-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <button className="bg-transparent border-0 text-black float-right"
                    onClick={() => closeEditModal()}>
                    <span className={styles.close}>x</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-left">
                  <form className="shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={onSubmit}>
                    <label className={styles.label}>TITLE
                      <input
                        name="title"
                        ref={titleRef}
                        value={state.title}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Title" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>CONTENT
                      <input
                        name="content"
                        ref={contentRef}
                        value={state.content}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Content" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>IMAGE URL
                      <input
                        name="image"
                        ref={imageRef}
                        value={state.image}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Image URL" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>TAGS
                      <input
                        name="tags"
                        ref={tagsRef}
                        value={state.tags}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Type some tags" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    {/* <div className={styles.tags_input_container}>
                      { tags.map((tag, index) => (
                      <div className="tag-item" key={index}>
                        <span className={classes.inlineTag}>{tag}</span>
                        <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
                      </div>
                      )) }
                    </div> */}
                    <div className={classes.modalContainer}>
                      <button className={classes.modalClose}
                        type="button"
                        onClick={() => closeEditModal()}>Close</button>
                      <button
                        type="submit"
                        className={classes.modalSave}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        {/* </>
      ) : null} */}
    </>
  );
};

const DeleteHintModal = ({ closeDeleteModal, cardElement}) => {
  const { mutate } = useSWRConfig();
  const deleteCard = useCallback(
    async () => {
      // e.preventDefault();
      try {
        // setIsLoading(true);
        await fetcher('/api/cards', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: cardElement._id
          }),
        });

        mutate('/api/cards');
        toast.success('Card has been deleted');
      } catch (e) {
        // console.log('e',e);
        toast.error(e.message);
      } finally {
        closeDeleteModal();
        // setIsLoading(false);
      }
    },
    [mutate, closeDeleteModal]
  );
  return (
    <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-6 w-full max-w-2xl h-full md:h-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <button className="bg-transparent border-0 text-black float-right"
                    onClick={() => closeDeleteModal()}>
                    <span className={styles.close}>x</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-left">
                    <form className="shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <div>Are you sure you wan to delete?</div>
                      <Spacer size={0.5} axis="vertical" />
                      <div className={classes.modalContainer}>
                        <button className={classes.modalClose}
                          type="button"
                          onClick={() => closeDeleteModal()}>NO</button>
                        <button
                          type="button"
                          className={classes.modalSave}
                          onClick={() => deleteCard()}>YES</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

const HomeCardSettingsInner = () => {
  const { data, isLoading, mutate } = useCards();

  const [titleRef, contentRef, imageRef] = [...Array(3)].map(useRef);
  const [tags, setTags] = useState([]);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardElement, setCardElement] = useState({});
  // const [cardIndex, setCardIndex] = useState(null);

  const closeEditModal = () => {
    setShowEditModal(false);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }
  
  const handleKeyDown = function(e) {
    if(e.key !== 'Enter') return;
    const value = e.target.value;
    if(!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = null;
  }

  const removeTag = function(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const editCard = ((element, index) => {
    setShowEditModal(true);
    setCardElement(element);
    // setCardIndex(index);
  });

  const deleteCard = ((element) => {
    setShowDeleteModal(true);
    setCardElement(element);
  });

  const onAdd = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const formField = [titleRef, contentRef, imageRef];
        const response = await fetcher('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              title: titleRef.current.value,
              content: contentRef.current.value,
              image: imageRef.current.value,
              tags: tags
        }),
        });
        toast.success('You have added a category successfully');
        formField.map((item) => {
          item.current.value = ''
        });
        setTags([]);
        mutate('/api/cards', { cards: response.cards }, false);
      } catch (e) {
        toast.error(e.message);
      }
    },
    [tags, mutate]
  );

  const header = ["Title", "Content", "URL", "Tags"];

  return (
    <section className={styles.card}>
        <h4 className={styles.sectionTitle}>Home Page Card Settings</h4>
        {isLoading ? (
          <LoadingDots>Loading</LoadingDots>
          ) : data?.cards ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center">
                    <thead className="border-b">
                      <tr>{header.map((h, i) => <th scope="col" className={classes.tableHead} key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                    {data.cards.map((card, id) => (
                      <tr className="border-b" key={id}>
                        <td className={classes.tableRow}>{card.title}</td>
                        <td className={classes.tableRow}>{card.content}</td>
                        <td className={classes.tableRow}><a href={card.image}>URL-{id + 1}</a></td>
                        <td className={classes.tableRow}>{card.tags.length > 0 ? card.tags.join(",") : []}</td>
                        <td><button className={classes.iconTableRow} onClick={() => 
                          editCard(card, id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button></td>
                        <td><button className={classes.iconTableRow} onClick={() =>
                          deleteCard(card)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg></button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  {showEditModal ?
                    <HomeCardEditModal
                      closeEditModal={closeEditModal}
                      handleKeyDown={handleKeyDown}
                      cardElement={cardElement}
                    /> : <></>}
                  {showDeleteModal ?
                    <DeleteHintModal
                      closeDeleteModal={closeDeleteModal}
                      cardElement={cardElement}
                    /> : <></>}
                </div>
              </div>
            </div>
          </div>) : (<span>no data</span>)}
        <form>
          <Input
          ref={titleRef}
          label="Title" 
          placeholder="Title" />
          <Spacer size={0.5} axis="vertical" />
          <Input
          ref={contentRef}
          label="Content" 
          placeholder="Content" />
          <Spacer size={0.5} axis="vertical" />
          <Input
          ref={imageRef}
          label="Image"
          placeholder="Image URL" />
          <Spacer size={0.5} axis="vertical" />
          <Input onKeyDown={handleKeyDown}
            className={styles.tags_input} label="Tag"
            placeholder="Type some tags and press enter"/>
          <Spacer size={0.5} axis="vertical" />
          <div className={styles.tags_input_container}>
            { tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className={classes.inlineTag}>{tag}</span>
              <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
            </div>
            )) }
          </div>
          <Spacer size={0.5} axis="vertical" />
          <Button type="button" loading={isLoading}
          onClick={onAdd}>Add New Card</Button>
        </form>
    </section>
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