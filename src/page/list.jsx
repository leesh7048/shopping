import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Product from "./components/product";
import Header from "./components/header";
import { BsCart2 } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";
import { useCartProducts } from "./hooks/useCartProducts";

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--gray12);
`;

const Container = styled.div`
  position: relative;
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

  const bottomLineRef = useRef();

  const productClick = (productId) => {
    navigate(`/detail?id=${productId}`);
  };
  const [cartProducts] = useCartProducts();

  const cartProductNum = cartProducts.length;

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

    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        //isIntersecting:대상 요소가 현재 루트 요소 또는 뷰포트와 교차하는지 여부를 나타내는 boolean 값
        if (!entry.isIntersecting) return;
        if (loading) return;
        setCount((prev) => prev + 2);
      });
    };
    const observer = new IntersectionObserver(handleObserver);
    const bottomLineElement = bottomLineRef.current;
    observer.observe(bottomLineElement);

    return () => {
      observer.disconnect(bottomLineElement);
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
          <div ref={bottomLineRef} />
        </Products>
        <div>{loading && <LoadingSpinner />}</div>
      </Container>
    </Main>
  );
};

export default List;
