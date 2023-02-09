import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./list.module.css";
import Product from "./components/product";
import Header from "./components/header";
import { BsCart2 } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";

const List = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(10);
  const containerRef = useRef();

  const productClick = (productId) => {
    navigate(`/detail?id=${productId}`);
  };

  const cartProductNum = JSON.parse(localStorage.getItem("products")).length;

  useEffect(() => {
    if (count >= 20) return;

    setLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=${count}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      });
  }, [count]);

  useEffect(() => {
    if (count >= 20) return;
    const option = {};
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (loading) return;
        setCount((prev) => prev + 2);
      });
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const containerElement = containerRef.current;
    observer.observe(containerElement);

    return () => {
      observer.disconnect(containerElement);
    };
  }, [loading, count]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Header
          title="shopping"
          right={<BsCart2 />}
          cartProductsNum={cartProductNum}
        />
        <div className={styles.products}>
          {products.map((product) => (
            <Product
              key={product.id}
              productImg={product.image}
              productName={product.title}
              price={product.price}
              tag={product.category}
              onClick={() => {
                productClick(product.id);
              }}
            />
          ))}
          <div ref={containerRef} />
        </div>
        <div>{loading && <RiLoader2Fill className={styles.loadingIcon} />}</div>
      </div>
    </div>
  );
};

export default List;
