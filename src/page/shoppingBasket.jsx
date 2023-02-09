import React, { useEffect } from "react";
import Header from "./components/header";
import styles from "./shoppingBasket.module.css";
import { IoIosClose } from "react-icons/io";

import { BsArrowLeft } from "react-icons/bs";
import { useCartProducts } from "./hooks/useCartProducts";

import Product from "./components/product";

const ShoppingBasket = (props) => {
  const [cartProducts, setCartProducts] = useCartProducts();

  const totalPrice =
    cartProducts.length > 0 &&
    cartProducts
      .map((product) => product.price * product.num)
      .reduce((a, b) => a + b);

  useEffect(() => {
    window.addEventListener("storage", (e) => console.log(e));
  }, []);
  console.log(cartProducts);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Header left={<BsArrowLeft />} title="shoppingBasket" />
        {cartProducts.length ? (
          <div className={styles.products}>
            {cartProducts.map((product) => {
              const minusBtn = () => {
                if (product.num <= 1) return;

                const updatedCartProducts = cartProducts.map((cartProduct) => {
                  // 만약에 수량 변경해야되는 id면 변경
                  if (cartProduct.id === product.id) {
                    return {
                      ...product,
                      num: product.num - 1,
                    };
                  } else {
                    return cartProduct;
                  }

                  // 아니면 그대로
                });

                setCartProducts(updatedCartProducts);
              };
              const pluseBtn = () => {
                if (product.num >= 10) return;

                const updatedCartProducts = cartProducts.map((cartProduct) => {
                  // 만약에 수량 변경해야되는 id면 변경
                  if (cartProduct.id === product.id) {
                    return {
                      ...cartProduct,
                      num: cartProduct.num + 1,
                    };
                  } else {
                    return cartProduct;
                  }

                  // 아니면 그대로
                });

                setCartProducts(updatedCartProducts);
              };

              const delProduct = () => {
                const updatedCartProducts = cartProducts.filter(
                  (cartProduct) => cartProduct.id !== product.id
                );
                setCartProducts(updatedCartProducts);
              };

              return (
                <Product
                  key={product.id}
                  productName={product.name}
                  price={product.price}
                  tag={product.category}
                  productImg={product.image}
                  quantityInfo={
                    <div className={styles.productNum}>
                      <button onClick={minusBtn}>-</button>
                      <span>{product.num}</span>
                      <button onClick={pluseBtn}>+</button>
                    </div>
                  }
                  delBtn={
                    <button
                      className={styles.delProductBtn}
                      onClick={delProduct}
                    >
                      <IoIosClose />
                    </button>
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.first}>비</span>
            <span className={styles.second}>었</span>
            <span className={styles.third}>음</span>
          </div>
        )}
        {cartProducts.length ? (
          <div className={styles.totalPrice}>
            <span>총 결제 금액</span>
            <span className={styles.price}>{totalPrice}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShoppingBasket;
