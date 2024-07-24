import styles from "./Stepper.module.scss";
import { useTranslation } from "react-i18next";
import { useCart } from "../../lib/cart/hooks";
import Cart from "../Cart/Cart";
import Collapsible from "../Collapsible/Collapsible";
import CartDetail from "../CartDetail/CartDetail";
import Link from "next/link";

const Stepper = () => {
  const { t } = useTranslation();
  const { cart, removeItem, filterCartItem } = useCart();
  // console.log("cart", cart);
  const cartDetail = filterCartItem();

  return (
    <div className={styles.sideBar}>
      <Collapsible btnSuffix={t("CART.TITLE.1")}>
        <div className="flex flex-col justify-start items-end mx-2">
          <div
            className="h-84 sm:h-48 md:h-80 lg:h-84 xl:h-84 w-full 
        flex flex-col overflow-y-scroll"
          >
            {cart.length > 0 &&
              cart?.map((data, index) => (
                <>
                  <div key={data._id} className={styles.item}>
                    <Cart {...data} onRemove={() => removeItem(data._id)} />
                  </div>
                  {index + 1 !== cart.length && (
                    <div className={styles.hrLine} />
                  )}
                </>
              ))}
            {cart.length === 0 && (
              <div className="flex justify-center items-center h-full text-md text-gray-500">
                <span>{t("CART.STATUS.EMPTY")}</span>
              </div>
            )}
          </div>
        </div>
      </Collapsible>
      <Collapsible btnSuffix={t("CART.TITLE.2")} isDefaultOpen>
        <div className="flex flex-col justify-start items-end mx-2">
          <div
            className="h-56 sm:h-48 md:h-48 lg:h-48 xl:h-56 w-full 
        flex flex-col overflow-y-scroll"
          >
            <CartDetail data={cartDetail} />
          </div>
        </div>
      </Collapsible>
      <div className="flex">
        <Link passHref href="/checkout">
          <button
            className="bg-rose-400 hover:bg-rose-300 text-sm text-white py-1 w-full m-3
          border-b-4 border-rose-400 hover:border-rose-400 rounded"
          >
            {t("CART.ACTION.SUBMIT")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Stepper;
