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
    <div className="flex justify-center items-center p-2 shadow">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={img}
          alt="image"
        />
      </div>
      <div className={styles.contentWrap}>
        <div className="w-3/6 flex flex-col justify-center items-center">
          <div className="w-40 truncate text-center text-gray-900 font-bold text-l">
            {itemName}
          </div>
          <div className="flex justify-center items-center">
            <div className="text-sm">
              <p className="text-gray-600">{partnerId}</p>
            </div>
          </div>
          <button
            className="bg-rose-400 hover:bg-rose-500 text-sm text-white py-1 mb-1 w-full
            border-b-4 border-rose-500 hover:border-rose-500 rounded"
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
              className="bg-rose-300 hover:bg-rose-400 text-sm text-white py-1 w-full
              border-b-4 border-rose-400 hover:border-rose-400 rounded"
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
