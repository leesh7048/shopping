import React, { useEffect, useState } from "react";
import styles from "./detail.module.css";
import Header from "./components/header";
import { BsCart2 } from "react-icons/bs";

import { BsArrowLeft } from "react-icons/bs";

import Product from "./components/product";
import { useSearchParams } from "react-router-dom";
import { useCartProducts } from "./hooks/useCartProducts";

const Detail = (props) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const [cartProducts, setCartProducts] = useCartProducts();

  const isInCart = product && cartProducts.some(({ id }) => id === product.id);

  // 필요한 변수
  // 1. 장바구니에있는지없는지 확인하는 변수
  // 2. 잡바구니에 담긴 상품목록 (로컬스토리지에서 가져오고, 얘가 바뀔 때마다 로컬스토리지에 반영)

  const addShoppingBasket = () => {
    if (!isInCart) {
      const newProduct = {
        ...product,
        num: 1,
      };
      const addProduct = [...cartProducts, newProduct];
      setCartProducts(addProduct);
    } else {
      const subProduct = cartProducts.filter(({ id }) => id !== product.id);
      setCartProducts(subProduct);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://fakestoreapi.com/products/${searchParams.get("id")}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Header
          right={<BsCart2 />}
          left={<BsArrowLeft />}
          title="product"
          cartProductsNum={cartProducts.length}
        />
        {product && (
          <>
            <Product
              productImg={product.image}
              productName={product.title}
              price={product.price}
              tag={product.category}
              description={product.description}
            />
            <button
              className={styles.shoppingBasket}
              onClick={addShoppingBasket}
            >
              {isInCart ? "빼기" : "담기"}
            </button>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {loading && (
            <div className={styles.loading}>
              <span className={styles.first}>로</span>
              <span className={styles.second}>딩</span>
              <span className={styles.third}>중</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
