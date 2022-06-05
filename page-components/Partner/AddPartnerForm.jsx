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
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';
// import { useLocation } from 'react-router-dom';

const classes = {
    inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
    tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
    tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
    iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
    modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
    modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
    modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
}

// export const getStaticProps = async () => {

//     // Sending fetched data to the page component via props.
//     return {
//         props: {
//             partner: partner
//         }
//     }
// }

export const AddPartnerFormInner = ({ partner }) => {
    // const [partner, setPartners] = useState(undefined);
    // console.log('partnerData',partnerData);
    // const [state, setState] = useState({
    //     id: partner._id || null,
    //     partnerId: partner.partnerId || null,
    //     title: partner.title || null,
    //     year: partner.year || null,
    //     content: partner.content || null,
    //     image: partner.image || null,
    //     tags: partner.tags || null,
    //     bankName: partner.bankName || null,
    //     accountName: partner.accountName || null,
    //     accountNum: partner.accountNum || null,
    // });
    const [partnerIdRef, titleRef, yearRef, contentRef, imageRef,
    bankNameRef, accountNameRef, accountNumRef] = [...Array(8)].map(useRef);
    const handleInputChange = (e) => {
        let { value } = e.target;
        setState({ ...state, [e.target.name]: value });
    };
    // const [isLoading, setIsLoading] = useState(false);
    // const { data, isLoading, isError } = usePartners();
    const { mutate } = useSWRConfig();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        handleInputChange.bind(this);
        // setPartners(partner);
        setState({partner});
        console.log('data',partner);
    }, [partner]);
    
    const handleKeyDown = function(e) {
      // e.preventDefault();
      // e.stopPropagation();
      if(e.key !== 'Enter') return;
      const value = e.target.value;
      // console.log('value',value);
      if(!value.trim()) return;
      setTags([...tags, value]);
      e.target.value = null;
    }
  
    const removeTag = function(index) {
      setTags(tags.filter((el, i) => i !== index));
    }
  
    const onSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        const formField = [partnerIdRef, titleRef, yearRef, contentRef, imageRef, bankNameRef, accountNameRef, accountNumRef];
        // const newAccount = new Map();
        const accountInfo = {
            bankName: bankNameRef.current.value,
            accountName: accountNameRef.current.value,
            accountNumber: accountNumRef.current.value
        }
        // console.log(accountInfo);
        try {
          // setIsLoading(true);
          await fetcher('/api/partners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                partnerId: partnerIdRef.current.value,
                title: titleRef.current.value,
                year: yearRef.current.value,
                content: contentRef.current.value,
                image: imageRef.current.value,
                accountInfo: accountInfo,
                tags: tags
          }),
          });
          toast.success('You have updated successfully');
          formField.map((item) => {
              // console.log('item',item);
              item.current.value = ''
          });
          setTags([]);
          // refresh partner lists
          mutate('/api/partners');
        } catch (e) {
          // console.log('e',e);
          toast.error(e.message);
        } finally {
          // setShowModal(false);
          // setIsLoading(false);
        }
      },
      [tags, mutate]
    );
    
    return (
        <div>
        <Spacer axis="vertical" size={1} />
        <section className={styles.partner}>
          <h4 className={styles.sectionTitle}>Partner Settings</h4>
          <form>
            <h5>Partner Basic Info</h5>
            
            <div><Input
            ref={partnerIdRef}
            // value={partner.partnerId}
            // onChange={handleInputChange}
            label="PartnerId" 
            placeholder="PartnerId" />
            <Spacer size={0.5} axis="vertical" />
            <Input
            ref={titleRef}
            label="Title" 
            placeholder="Title" />
            <Spacer size={0.5} axis="vertical" />
            <Input
            ref={yearRef}
            label="Year" 
            placeholder="Year" />
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
            <h5>Partner Bank Account Info</h5>
            <Input
            ref={bankNameRef}
            label="Bank Name" 
            placeholder="Bank Name" />
            <Spacer size={0.5} axis="vertical" />
            <Input
            ref={accountNameRef}
            label="Account Name" 
            placeholder="Account Name" />
            <Spacer size={0.5} axis="vertical" />
            <Input
            ref={accountNumRef}
            label="Account Number" 
            placeholder="Account Number" />
            <Spacer size={0.5} axis="vertical" />
            <Button type="button"
            onClick={onSubmit}>Add/Save</Button></div>
          </form>
      </section>
      </div>
    );
};

const AddPartnerForm = ({ partner }) => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;
    // const [partner, setPartners] = useState(undefined);
    // const { location } = useLocation();
    useEffect(() => {
        // console.log('partner',partner);
        // if (partner) {
        //     setPartners(partner);
        // }
        // console.log('partner',partner);
    }, [partner]);
  
    return (
      // <Wrapper>
        <div className={styles.root}>
          {/* <h3 className={styles.heading}>Share your thoughts</h3> */}
          {loading ? (
            <LoadingDots>Loading</LoadingDots>
          ) : data?.user ? 
            (<AddPartnerFormInner partner={partner}/>
            // <HomepartnerSettingsInner user={data.user} />
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
  
  export default withRouter(AddPartnerForm);