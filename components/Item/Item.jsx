import clsx from 'clsx';
import styles from './Item.module.css';

const Item = (props) => {
  const { img, itemName, partnerId } = props.item;
  return (
    <div className={styles.itemWrap}>
      <img className={styles.imgWrap} src={img} alt="default_img"/>
      <div className={styles.contentWrap}>
        <div className="text-gray-900 font-bold text-xl mb-2">{itemName}</div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-600 leading-none">{partnerId}</p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4
            border-b-4 border-green-700 hover:border-green-500 rounded">查看更多</button>
      </div>
    </div>
  );
};

export default Item;
