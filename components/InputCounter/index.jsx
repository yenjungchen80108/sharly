import { useState, useEffect } from "react";
import { useCart } from "../../lib/cart/hooks";

const InputCounter = ({ id, className }) => {
  const [quantity, setQuantity] = useState(1);
  const { updateItem } = useCart();

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      updateItem(id, newQuantity);
    }
  };

  const handleIncrement = () => {
    updateQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(quantity - 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(value);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center my-1">
        <button
          type="button"
          id="decrement-button"
          onClick={handleDecrement}
          className="bg-white-100 dark:bg-white-700 dark:hover:bg-white-600 dark:border-white-600 
          hover:bg-white-200 border border-white-300 rounded-s-lg p-3 h-10 
          focus:ring-white-100 dark:focus:ring-white-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-white-900 dark:text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          value={quantity}
          onChange={handleChange}
          aria-describedby="helper-text-explanation"
          className="bg-white-50 border-x-0 border-white-300 h-10 
          text-center text-black-900 text-sm focus:ring-blue-500 focus:border-blue-500 block 
          w-5 py-2.5 dark:bg-white-700 
          dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0"
          required
        />
        <button
          type="button"
          id="increment-button"
          onClick={handleIncrement}
          className="bg-white-100 dark:bg-white-700 dark:hover:bg-white-600 
          dark:border-white-600 hover:bg-white-200 border border-white-300 
          rounded-e-lg p-3 h-10 focus:ring-white-100 dark:focus:ring-white-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-white-900 dark:text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputCounter;
