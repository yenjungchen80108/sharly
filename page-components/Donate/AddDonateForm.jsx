import clsx from 'clsx';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { Text, TextLink } from '../../components/Text';
import { fetcher } from '../../lib/fetch';
import { usePartners, usePartner, usePartnerPages } from '../../lib/partner';
import { useCurrentUser } from '../../lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './Donate.module.css';
import { use } from 'i18next';
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';
import { Label } from '../../components/Label';

const classes = {
    inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
    tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
    tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
    iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
    modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
    modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
    modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}

const EditPartnerModal = ({ closeEditModal, partner }) => {
  const [partnerIdRef, titleRef, yearRef, contentRef, imageRef, tagsRef,
  bankNameRef, accountNameRef, accountNumRef] = [...Array(9)].map(useRef);
  const { mutate } = useSWRConfig();
  
  const [partnerState, setPartnerState] = useState({
    id: partner._id || null,
    partnerId: partner.partnerId || null,
    title: partner.title || null,
    year: partner.year || null,
    content: partner.content || null,
    image: partner.image || null,
    tags: partner.tags || null,
    bankName: partner.accountInfo.bankName || null,
    accountName: partner.accountInfo.accountName || null,
    accountNum: partner.accountInfo.accountNumber || null,
  });

  const handleInputChange = (e) => {
    // let { value } = e.target;
    // console.log('value', e.target.value, 'name', e.target.name);
    setPartnerState({ ...partnerState, [e.target.name]: e.target.value });
  };

  useEffect(() => { 
    handleInputChange.bind(this);
  }, [handleInputChange, partnerState]);

  const [isLoading, setIsLoading] = useState(false);  
  const { id } = partnerState;

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const accountInfo = {
          bankName: bankNameRef.current.value,
          accountName: accountNameRef.current.value,
          accountNumber: accountNumRef.current.value
        }
        setIsLoading(true);
        await fetcher('/api/partners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // newState
            _id: id,
            partnerId: partnerIdRef.current.value,
            title: titleRef.current.value,
            year: yearRef.current.value,
            content: contentRef.current.value,
            image: imageRef.current.value,
            tags: tagsRef.current.value !== null ? [...tagsRef.current.value.split(',')] : null,
            accountInfo: accountInfo
          }),
        });

        mutate('/api/partners');
        toast.success('Partner has been updated');
      } catch (e) {
        // console.log('e',e);
        toast.error(e.message);
      } finally {
        setIsLoading(false);
        closeEditModal();
      }
    },
    [mutate, closeEditModal]
  );
  return (
    <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-6 w-full max-w-2xl h-60 md:h-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <button className="bg-transparent border-0 text-black float-right"
                    onClick={() => closeEditModal()}>
                    <span className={styles.close}>x</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-left">
                  <form className="shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={onSubmit}>
                    <label className={styles.label}>PARTNER ID
                      <input
                        name="partnerId"
                        ref={partnerIdRef}
                        value={partnerState.partnerId}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Title" />
                    </label>
                    {/* <Label
                      id="PARTNER ID"
                      name="partnerId"
                      value={partnerState.partnerId}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Title"
                    ></Label> */}
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>TITLE
                      <input
                        name="title"
                        ref={titleRef}
                        value={partnerState.title}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Title" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>YEAR
                      <input
                        name="year"
                        ref={yearRef}
                        value={partnerState.year}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Title" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>CONTENT
                      <input
                        name="content"
                        ref={contentRef}
                        value={partnerState.content}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Content" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>IMAGE URL
                      <input
                        name="image"
                        ref={imageRef}
                        value={partnerState.image}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Image URL" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>TAGS
                      <input
                        name="tags"
                        ref={tagsRef}
                        value={partnerState.tags}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Type some tags" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>BANK NAME
                      <input
                        name="bankName"
                        ref={bankNameRef}
                        value={partnerState.bankName}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Bank Name" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>ACCOUNT NUMBER
                      <input
                        name="accountNum"
                        ref={accountNumRef}
                        value={partnerState.accountNum}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Account Number" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
                    <label className={styles.label}>ACCOUNT NAME
                      <input
                        name="accountName"
                        ref={accountNameRef}
                        value={partnerState.accountName}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Account Name" />
                    </label>
                    <Spacer size={0.5} axis="vertical" />
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

const DeletePartnerHintModal = ({ closeDeleteModal, partner}) => {
  const { mutate } = useSWRConfig();
  const deletePartner = useCallback(
    async () => {
      // e.preventDefault();
      try {
        // setIsLoading(true);
        await fetcher('/api/partners', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: partner._id
          }),
        });

        mutate('/api/partners');
        toast.success('Partner has been deleted');
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
                          onClick={() => deletePartner()}>YES</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

export const AddPartnerFormInner = () => {
  const { data, isLoading, isError } = usePartners();
  if (!data) return <div></div>;
  // const partners = data?.[0]?.partners.length === 0  || data?.[0]?.length === 0? [] : data.reduce((acc, val) => [...acc, ...val.partners], []);
  // console.log('partners',data ? data.reduce((acc, val) => [...acc, ...val.title], []) : '');
  // const test = data.filter((val) => val.year === '2003');
  
  let newRes = [];
  data.partners.reduce((acc, item) => {
    Object.entries(item).forEach((attr) => {
      // console.log(attr);
      const [key,value] = attr;
      if(value !== undefined) {
        if (key === 'title') {
          newRes.push(value);
        }
      }
    });
    // console.log(res);
    // return acc;
  }, {})
  // console.log('newRes',newRes);
  // const [partnerIdRef, titleRef, yearRef, contentRef, imageRef, bankNameRef, accountNameRef, accountNumRef] = [...Array(8)].map(useRef);
  // const [tags, setTags] = useState([]);
  // const [showAddPartnerForm, setShowAddPartnerForm] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [partnerElement, setPartnerElement] = useState({});
  // const header = ["PartnerId", "Title", "Year", "URL", "Tags"];
  const { mutate } = useSWRConfig();

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       const formField = [partnerIdRef, titleRef, yearRef, contentRef, imageRef, bankNameRef, accountNameRef, accountNumRef];
  //       const accountInfo = {
  //         bankName: bankNameRef.current.value,
  //         accountName: accountNameRef.current.value,
  //         accountNumber: accountNumRef.current.value
  //       }
  //       // setIsLoading(true);
  //       await fetcher('/api/partners', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //             partnerId: partnerIdRef.current.value,
  //             title: titleRef.current.value,
  //             year: yearRef.current.value,
  //             content: contentRef.current.value,
  //             image: imageRef.current.value,
  //             accountInfo: accountInfo,
  //             tags: tags
  //       }),
  //       });
  //       toast.success('You have updated successfully');
  //       formField.map((item) => {
  //           // console.log('item',item);
  //           item.current.value = ''
  //       });
  //       setTags([]);
  //       mutate('/api/partners');
  //     } catch (e) {
  //       toast.error(e.message);
  //     } finally {
  //       // setShowModal(false);
  //       // setIsLoading(false);
  //     }
  //   },
  //   [mutate]
  // );
  const editPartner = ((element, index) => {
    setShowAddPartnerForm(true);
    setPartnerElement(element);
  });

  const deletePartner = ((element) => {
    setShowDeleteModal(true);
    setPartnerElement(element);
    // setCardIndex(index);
  });

  const closeEditModal = () => {
    setShowAddPartnerForm(false);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }
  
  const handleKeyDown = function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    if(e.key !== 'Enter') return;
    const value = e.target.value;
    if(!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = null;
  }

  const removeTag = function(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

    return (
      <Wrapper>
        <div>
        <Spacer axis="vertical" size={1} />
        {isLoading ? (
        <LoadingDots>Loading</LoadingDots>
        ) : data.partners ? (
        // <div className="flex flex-col">
        //   <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        //     <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        //       <div className="overflow-hidden">
        //         <table className="min-w-full text-center">
        //           <thead className="border-b">
        //             <tr>{header.map((h, i) => <th scope="col" className={classes.tableHead} key={i}>{h}</th>)}</tr>
        //           </thead>
        //           <tbody>
        //           {data.partners.map((partner, id) => (
        //             <tr className="border-b" key={id}>
        //               <td className={classes.tableRow}>{partner.partnerId}</td>
        //               <td className={classes.tableRow}>{partner.title}</td>
        //               <td className={classes.tableRow}>{partner.year}</td>
        //               {/* <td className={classes.tableRow}>{partner.content}</td> */}
        //               <td className={classes.tableRow}><a href={partner.image}>URL-{id + 1}</a></td>
        //               <td className={classes.tableRow}>{partner.tags.length > 0 ? partner.tags.join(",") : []}</td>
        //               <td>
        //                 {/* <Link 
        //                     passHref
        //                     href={{
        //                     pathname: `/side/[title]/add`,
        //                     query: {
        //                     title: 'CooperatePartner',
        //                     },}} as={`/side/[title]/add`}
        //                 > */}
        //                   <button className={classes.iconTableRow} onClick={() => editPartner(partner, id)}>
        //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        //                   <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        //                   </svg>
        //                   </button>
        //                 {/* </Link> */}
        //               </td>
        //               <td><button className={classes.iconTableRow} onClick={() =>
        //                 deletePartner(partner)}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        //                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        //                 </svg></button>
        //               </td>
        //             </tr>
        //           ))}
        //           </tbody>
        //         </table>
        //         {showAddPartnerForm ?
        //         <EditPartnerModal
        //           closeEditModal={closeEditModal}
        //           handleKeyDown={handleKeyDown}
        //           partner={partnerElement}/> : <></>}
        //         {showDeleteModal ?
        //           <DeletePartnerHintModal
        //             closeDeleteModal={closeDeleteModal}
        //             partner={partnerElement}
        //           /> : <></>}
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <></>) : 
        (<span>no data</span>)}
       <section className={styles.partner}>
          <h4 className={styles.sectionTitle}>Donate Book Settings</h4>
          <form>
            <h5>Book Info</h5> 
            <Label
              name="partnerId"
              type="select"
              items={newRes}
            ></Label>
            <Label
              name="itemName"
              // value={partnerState.partnerId}
              // onChange={handleInputChange}
            ></Label>
            <Label
              name="size"
            ></Label>
            <Label
              name="brand"
            ></Label>
            <Label
              name="info"
            ></Label>
            <Label
              name="status"
            ></Label>
            <Label
              name="time"
            ></Label>
            <Label
              name="category"
            ></Label>
            <Label
              name="img"
            ></Label>
            <Label
              name="demand"
            ></Label>
            <Button type="button"
            // onClick={onSubmit}
            >Add</Button>
          </form>
      </section>
      </div>
    </Wrapper>
    );
};

const AddDonateForm = ({ partner }) => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;
    useEffect(() => {
    }, [partner]);
  
    return (
      // <Wrapper>
        <div className={styles.root}>
          {loading ? (
            <LoadingDots>Loading</LoadingDots>
          ) : data.user ? 
            (<AddPartnerFormInner partner={partner}/>) : (
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
  
  export default withRouter(AddDonateForm);