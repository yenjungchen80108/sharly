import { Button } from '../../components/Button';
import { Post } from '../../components/Post';
import Link from 'next/link';
import { Card } from '../../components/Card';
import { LoadingDots } from '../../components/LoadingDots';
import clsx from 'clsx';
import { Input } from '../../components/Input';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { Text, TextLink } from '../../components/Text';
import { fetcher } from '../../lib/fetch';
import { usePartners } from '../../lib/partner';
import { useCurrentUser } from '../../lib/user';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
// import styles from './Settings.module.css';
import { use } from 'i18next';
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from 'next/router';
import AddPartnerForm from './AddPartnerForm';
// import { useNavigate } from 'react-router-dom';

const classes = {
    inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
    tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
    tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
    iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
    modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
    modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
    modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}

// add pagination swr
const PartnerList = () => {
    const router = useRouter();
    const [showAddPartnerForm, setShowAddPartnerForm] = useState(false);
    const [partnerElement, setPartnerElement] = useState([]);
    // const navigate = useNavigate();
    const editPartner = ((element, index) => {
        // console.log('element',element);
        // router.push(
        //     { pathname: "/side/8/add", query: { name: element } },
        //     "/side/8/add"
        // );
        // navigate('/side/[title]/add', {state: { name: element}} );
        setShowAddPartnerForm(true);
        setPartnerElement(element);
    });

    const deletePartner = ((element) => {
    //   setShowDeleteModal(true);
    //   setPartnerElement(element);
    //   setPartnerIndex(index);
    });

    useEffect(() => {
        // console.log('partner',partner);
        if (partnerElement) {
            setPartnerElement(partnerElement);
        }
    }, [editPartner]);
   
    // const { data } = useCards();
    const { data, isLoading, isError } = usePartners();
    if (!data) return <div></div>;
    // if (!data) return <LoadingDots className={styles.loading} />;
    // const posts = data?.[0]?.message?.length === 0 && data === null ? [] : data.reduce((acc, val) => [...acc, ...val.posts], []);
    const header = ["PartnerId", "Title", "Year", "URL", "Tags"];
  
  return (
    <div>
      <Spacer axis="vertical" size={1} />
        {/* {data ? data.cards.map((card, id) => (
          <Link
            key={card._id}
            href={`/card/${card._id}`}
            passHref
          >
            <div className="flex-1 text-gray-400 text-center px-4 py-2 m-2">
              <Card className={styles.post} card={card} key={card._id}></Card>
            </div>
          </Link>
        )) : <LoadingDots className={styles.loading} />} */}
        {isLoading ? (
            <LoadingDots>Loading</LoadingDots>
            ) : data?.partners ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center">
                      <thead className="border-b">
                        <tr>{header.map((h, i) => <th scope="col" className={classes.tableHead} key={i}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                      {data.partners.map((partner, id) => (
                        <tr className="border-b" key={id}>
                          <td className={classes.tableRow}>{partner.partnerId}</td>
                          <td className={classes.tableRow}>{partner.title}</td>
                          <td className={classes.tableRow}>{partner.year}</td>
                          {/* <td className={classes.tableRow}>{partner.content}</td> */}
                          <td className={classes.tableRow}><a href={partner.image}>URL-{id + 1}</a></td>
                          <td className={classes.tableRow}>{partner.tags.length > 0 ? partner.tags.join(",") : []}</td>
                          <td>
                            <Link 
                                passHref
                                href={{
                                pathname: `/side/[title]/add`,
                                query: {
                                title: 'CooperatePartner',
                                },
                            }}
                            as={`/side/[title]/add`}
                            >
                            <button className={classes.iconTableRow} onClick={() => 
                            editPartner(partner, id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                            </Link>
                          </td>
                          <td><button className={classes.iconTableRow} onClick={() =>
                            deletePartner(partner)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                    {showAddPartnerForm ?
                      <AddPartnerForm
                      partner={partnerElement}/> : <></>}
                    {/* {showDeleteModal ?
                      <DeleteHintModal
                        closeDeleteModal={closeDeleteModal}
                        partnerElement={partnerElement}
                      /> : <></>} */}
                  </div>
                </div>
              </div>
            </div>) : (<span>no data</span>)}
        
        {/* <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more posts are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </Container> */}
      {/* </Wrapper> */}
    </div>
  );
};

export default PartnerList;
