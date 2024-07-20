import styles from "./Stepper.module.scss";
// import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../lib/cart/hooks";
import Cart from "../Cart/Cart";

const Stepper = () => {
  const { t } = useTranslation();
  const { cart, removeItem } = useCart();
  console.log("cart", cart);

  return (
    <div className={styles.sideBar}>
      <div className="flex flex-col justify-start items-end mx-2 ">
        <div className="w-full flex justify-center items-center border border-grey-200 mt-3 text-lg text-gray-600">
          {t("CART.TITLE")}
        </div>
        <div className="h-96 w-full overflow-y-scroll">
          {cart.length > 0 &&
            cart?.map((data) => (
              <div key={data._id} className={styles.item}>
                <Cart {...data} onRemove={() => removeItem(data._id)} />
              </div>
            ))}
          {cart.length === 0 && (
            <div className="flex justify-center items-center h-full   text-md text-gray-500">
              <span>{t("CART.STATUS.EMPTY")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
