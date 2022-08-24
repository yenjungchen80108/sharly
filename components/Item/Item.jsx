import clsx from 'clsx';
import styles from './Item.module.css';

const Item = (props) => {
  return (
    <div className="grid grid-cols-2 gap-3">
    <div className={styles.itemWrap}>
      <img className={styles.imgWrap} src={'/png/book.png'} alt="default_img"/>
      <div className={styles.contentWrap}>
        <div className="text-gray-900 font-bold text-xl mb-2">Books</div>
        <div className="flex items-center">
          {/* <img className="w-10 h-10 rounded-full mr-4" src={'/png/donation.png'} alt="Avatar of Writer"/> */}
          <div className="text-sm">
            <p className="text-gray-600 leading-none">康福智能發展中心</p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4
            border-b-4 border-green-700 hover:border-green-500 rounded">查看更多</button>
      </div>
    </div>
    <div className={styles.itemWrap}>
    <img className={styles.imgWrap} src={'/png/book.png'} alt="default_img"/>
    <div className={styles.contentWrap}>
      <div className="text-gray-900 font-bold text-xl mb-2">Books</div>
      <div className="flex items-center">
        {/* <img className="w-10 h-10 rounded-full mr-4" src={'/png/donation.png'} alt="Avatar of Writer"/> */}
        <div className="text-sm">
          <p className="text-gray-600 leading-none">康福智能發展中心</p>
        </div>
      </div>
      <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4
          border-b-4 border-green-700 hover:border-green-500 rounded">查看更多</button>
    </div>
  </div>
  </div>
  );
};

export default Item;
