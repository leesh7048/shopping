import { useEffect, useState } from "react";

export function useCartProducts() {
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCartProducts = localStorage.getItem("products");

    if (savedCartProducts === null) {
      return [];
    }

    return JSON.parse(savedCartProducts);
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return [cartProducts, setCartProducts];
}
