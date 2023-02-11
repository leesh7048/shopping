import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Product from "./components/product";
import Header from "./components/header";
import { BsCart2 } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--gray12);
`;

const Container = styled.div`
  background: var(--gray1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  min-height: 100vh;
`;

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;

  > div {
    flex-basis: 30%;
  }
`;

const spin = keyframes`
    0%{
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const LoadingSpinner = styled(RiLoader2Fill)`
  margin: var(--spacer-s);
  animation: ${spin} 1s linear infinite;
  font-size: var(--font-size-xl);
  color: var(--green11);
`;

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
    <Main>
      <Container>
        <Header
          title="shopping"
          right={<BsCart2 />}
          cartProductsNum={cartProductNum}
        />
        <Products>
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
        </Products>
        <div>{loading && <LoadingSpinner />}</div>
      </Container>
    </Main>
  );
};

export default List;
