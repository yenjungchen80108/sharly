import styles from './Stepper.module.scss';
import styled from 'styled-components';
import classnames from 'classnames';
import { useState } from 'react';

const donateBox = [
    {
        id: 1,
        name: "Donate List",
    },
    {
        id: 2,
        name: "Donor Info",
    },
    {
        id: 3,
        name: "Note",
    }
]

const donateList = [
  {
      id: 1,
      title: "Item List1",
  },
  {
      id: 2,
      title: "Item List2",
  },
]

const Stepper = () => {
    const [activeTab, setActiveTab] = useState(1)
    return (
      <div className={styles.donateSection}>
        <div className="mx-4 p-4">
            <div className="flex flex-start flex-col text-teal-600 relative">
                {donateBox?.map((data) => (<div key={data.id}>
                <TabNavItem {...data} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <ItemList list={donateList}/>
                </div>
                ))}
            </div>
          </div>
      </div>
    )
}

export default Stepper;

const TabNavItem = ({ id, name, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  
 return (
    <div onClick={handleClick} className={classnames(styles.boxBorder,
      {[styles.active]: activeTab === id})}>
      <div className={styles.circle}>{id}</div>
      <div>{name}</div>
    </div>
  );
 };

 const ItemList = ({ list }) => {
    return (
      <div className={styles.boxBorder}>{list.length > 0 ? 
        list?.map((data, id) => 
        <div key={id}>{data.title}</div>
       ) : <div>暫無資料</div>}
      </div>
    )
 }