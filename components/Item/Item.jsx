import clsx from "clsx";
import styles from "./Item.module.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../lib/cart/hooks";

const Item = ({ item }) => {
  const { img, itemName, partnerId } = item;
  const { t } = useTranslation();
  const router = useRouter();
  const { addItem } = useCart();
  const { cardId, category } = router.query;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(item);
  };

  return (
    <div className={styles.itemWrap}>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={img}
          alt="image"
        />
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.contentInnerWrap}>
          <div className="flex justify-center items-center text-gray-900 font-bold text-xl">
            {itemName}
          </div>
          <div className="flex justify-center items-center">
            <div className="text-sm">
              <p className="text-gray-600">{partnerId}</p>
            </div>
          </div>
          <button
            className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4
            border-b-4 border-pink-700 hover:border-pink-500 rounded"
            onClick={handleAdd}
          >
            {t("COMMON.ADD_CART")}
          </button>
          <Link
            key={item._id}
            href={{
              pathname: `/card/[cardId]/[category]/[itemId]`,
              query: {
                cardId: cardId,
                category: category,
                itemId: item?._id,
              },
            }}
            as={`/card/[cardId]/[category]/[itemId]`}
            passHref
          >
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4
            border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              {t("COMMON.VIEW_MORE")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
