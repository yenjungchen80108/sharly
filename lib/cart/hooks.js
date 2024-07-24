import useSWR, { mutate } from "swr";

const fetcher = (key) => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  }
  return [];
};

export function useCart() {
  const { data: cart, error } = useSWR("cart", fetcher, {
    fallbackData: [],
  });

  const getItem = (id) => {
    return cart.find((item) => item._id === id);
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    mutate("cart", updatedCart, false);
  };

  const addItem = (item) => {
    const existingItem = cart.find((i) => i._id === item._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    saveCartToLocalStorage(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    saveCartToLocalStorage(updatedCart);
  };

  const updateItem = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    saveCartToLocalStorage(updatedCart);
  };

  const filterCartItem = () => {
    const cartDetail = cart.reduce((acc, curr) => {
      const found = acc.find((item) => item.category === curr.category);

      if (found) {
        found.quantity += curr.quantity;
      } else {
        acc.push({ category: curr.category, quantity: curr.quantity });
      }
      return acc;
    }, []);

    return cartDetail.map((item) => ({
      category: item.category,
      quantity: `x ${item.quantity}`,
    }));
  };

  //   const increment = (id) => {
  //     const updatedCart = cart.map((item) =>
  //       item._id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     saveCartToLocalStorage(updatedCart);
  //   };

  //   const decrement = (id) => {
  //     const updatedCart = cart.map((item) =>
  //       item._id === id ? { ...item, quantity: item.quantity - 1 } : item
  //     ).filter((item) => item.quantity > 0);
  //     saveCartToLocalStorage(updatedCart);
  //   };

  return {
    cart,
    isLoading: !error && !cart,
    isError: error,
    // getItem,
    addItem,
    removeItem,
    updateItem,
    filterCartItem,
    // increment,
    // decrement,
  };
}
