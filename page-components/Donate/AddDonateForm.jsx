import { Spacer, Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { Text, TextLink } from '../../components/Text';
import { fetcher } from '../../lib/fetch';
import { usePartners } from '../../lib/partner';
import { useDonateItems } from '../../lib/donateItem';
import { useCurrentUser } from '../../lib/user';
import Link from 'next/link';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './Donate.module.css';
import { useSWRConfig } from "swr";
import { withRouter } from 'next/router';
import { Label } from '../../components/Label';
import { SingleTableList } from '../../components/SingleTable';
import { columns } from './constant';

// common form for add, edit, delete mode
export const DonateForm = (props) => {
  const { handleChange, values } = props;
  const { data } = usePartners();
  let newRes = [];
  if (data) {
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
    }, {})
  }

  return (
    <section>
        {/* <h4>Donate Book Settings</h4> */}
        <h5>Book Info</h5> 
        <Label
          name="partnerId"
          type="select"
          items={newRes}
          value={values.partnerId}
          onChange={handleChange}
        ></Label>
        <Label
          name="itemName"
          value={values.itemName}
          onChange={handleChange}
        ></Label>
        <Label
          name="size"
          value={values.size} 
          onChange={handleChange}
        ></Label>
        <Label
          name="brand"
          value={values.brand}
          onChange={handleChange}
        ></Label>
        <Label
          name="info"
          value={values.info}
          onChange={handleChange}
        ></Label>
        <Label
          name="status"
          value={values.status}
          onChange={handleChange}
        ></Label>
        <Label
          name="time"
          value={values.time}
          onChange={handleChange}
        ></Label>
        <Label
          name="category"
          value={values.category}
          onChange={handleChange}
        ></Label>
        <Label
          name="img"
          value={values.img}
          onChange={handleChange}
        ></Label>
        <Label
          name="demand"
          value={values.demand}
          onChange={handleChange}
        ></Label>
    </section>
  )
}

export const DonateItemFormInner = () => {
  const init = {
    partnerId: '',
    itemName: '',
    size: '',
    brand: '',
    info: '',
    status: '',
    time: '',
    category: '',
    img: '',
    demand: ''
  }
  const [values, setValues] = useState(init);
  const { donateItemData, isLoading, isError } = useDonateItems();
  const { mutate } = useSWRConfig();

  const onSubmit = async (e, mode) => {
    try {
      e.preventDefault();
      // add/edit item when submit  
      await fetcher('/api/donateItems', {
        method: mode === 'add' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      toast.success('You have updated successfully');
      setValues(mode === 'add' ? init : values);
      mutate('/api/donateItems');
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
      await fetcher('/api/donateItems', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: data._id
        }),
      });

      mutate('/api/donateItems');
      toast.success('Donate Item has been deleted');
    } catch (e) {
      toast.error(e.message);
    } finally {
      // setShowModal(false);
      // setIsLoading(false);
  }
};

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

    return (
      <Wrapper>
        <div>
        <Spacer axis="vertical" size={1} />
        {isLoading ? (
        <LoadingDots>Loading</LoadingDots>
        ) : donateItemData.donateItems ? 
        (<>
          <SingleTableList
            name="Donate Item Settings"
            initVal={init}
            columns={columns}
            fields={donateItemData.donateItems}
            setValue={setValues}
            onSubmit={onSubmit}
            onDelete={onDelete}
            children={[<DonateForm
              handleChange={handleChange}
              values={values}
            />]}
          ></SingleTableList>
        </>)
        : (<span>no data</span>)}
      </div>
    </Wrapper>
    );
};

const AddDonateForm = () => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;

    return (
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data.user ? 
          (<DonateItemFormInner/>) : (
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
    );
  };

export default withRouter(AddDonateForm);