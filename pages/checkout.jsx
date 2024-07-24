import { Checkout } from "../page-components/Checkout";
import Head from "next/head";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
