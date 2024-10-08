import clsx from "clsx";
import styles from "./Cart.module.css";
import { TrashIcon } from "@heroicons/react/outline";
import InputCounter from "../InputCounter";
import { useTranslation } from "react-i18next";

const Cart = ({ _id, img, itemName, onRemove, className }) => {
  const { t } = useTranslation();
  return (
    <ul role="list" className="divide-y divide-gray-200">
      <li className="flex py-3">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            className="h-full w-full object-cover object-center"
            src={img}
            alt="image"
          />
        </div>
        <div className="ml-4 flex flex-col w-full">
          <div className="text-sm font-small text-gray-500 truncate w-20">
            {itemName}
          </div>
          <InputCounter id={_id} />
          <button className="flex items-center" onClick={onRemove}>
            <TrashIcon className="flex-shrink-0 h-6 w-6 mr-1 text-red-500" />
            <span className="text-sm text-red-400">
              {t("CART.ACTION.REMOVE")}
            </span>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Cart;
