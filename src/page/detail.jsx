import React, { useEffect, useState } from "react";
import Header from "./components/header";
import { BsCart2 } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import Product from "./components/product";
import { useSearchParams } from "react-router-dom";
import { useCartProducts } from "./hooks/useCartProducts";
import styled, { keyframes } from "styled-components";

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

const ShoppingBasket = styled.button`
  width: 90%;
  height: 50px;
  border-radius: var(--radius-m);
  border: none;
  background-color: var(--green9);
  color: white;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
`;

const animate = keyframes`
   0%,
  100% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0px);
  }
`;

const Loading = styled.div`
  position: relative;
  -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  margin-top: 50px;
  span {
    position: relative;
    display: inline-block;
    color: var(--gray12);
    font-size: var(--font-size-xl);
    animation: ${animate} 1.5s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
`;

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
    <Main>
      <Container>
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
            <ShoppingBasket onClick={addShoppingBasket}>
              {isInCart ? "빼기" : "담기"}
            </ShoppingBasket>
          </>
        )}
        <LoadingBox>
          {loading && (
            <Loading>
              <span>로</span>
              <span>딩</span>
              <span>중</span>
            </Loading>
          )}
        </LoadingBox>
      </Container>
    </Main>
  );
};

export default Detail;
