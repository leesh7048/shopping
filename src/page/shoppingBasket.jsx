import React from "react";
import Header from "./components/header";

import { IoIosClose } from "react-icons/io";
import { BsArrowLeft } from "react-icons/bs";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useCartProducts } from "./hooks/useCartProducts";
import Product from "./components/product";
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

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;

  > div {
    flex-basis: 30%;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px var(--spacer-l);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-l);
  span {
    color: var(--gray12);
  }
`;
const Price = styled.div`
  color: var(--green11);
`;
const ProductNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-xs);
  border: solid 1px var(--gray8);
  background-color: var(--gray3);
  border-radius: var(--radius-s);
  color: var(--gray12);

  button {
    border: none;
    border-radius: var(--radius-s);
    padding: 0px var(--spacer-s);
    background-color: var(--gray1);
    color: var(--gray12);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }
  span {
    margin: 0px var(--spacer-s);
  }
`;

const DelProductBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: var(--font-size-s);
  width: 15px;
  height: 15px;
  padding: 0;
  box-sizing: content-box;
  border: none;
  margin: var(--spacer-s);
  border-radius: var(--radius-s);
  background-color: var(--gray2);

  &:hover {
    background-color: var(--gray6);
    border-radius: var(--radius-s);
  }
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

const Empty = styled.div`
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

const ShoppingBasket = (props) => {
  const [cartProducts, setCartProducts] = useCartProducts();

  const totalPrice =
    cartProducts.length > 0 &&
    cartProducts
      .map((product) => product.price * product.num)
      .reduce((a, b) => a + b);

  return (
    <Main>
      <Container>
        <Header left={<BsArrowLeft />} title="shoppingBasket" />
        {cartProducts.length ? (
          <Products>
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
                    <ProductNum>
                      <button onClick={minusBtn}>
                        <BiMinus />
                      </button>
                      <span>{product.num}</span>
                      <button onClick={pluseBtn}>
                        <BiPlus />
                      </button>
                    </ProductNum>
                  }
                  delBtn={
                    <DelProductBtn onClick={delProduct}>
                      <IoIosClose />
                    </DelProductBtn>
                  }
                />
              );
            })}
          </Products>
        ) : (
          <Empty>
            <span>비</span>
            <span>었</span>
            <span>음</span>
          </Empty>
        )}
        {cartProducts.length ? (
          <TotalPrice>
            <span>총 결제 금액</span>
            <Price>{totalPrice}</Price>
          </TotalPrice>
        ) : null}
      </Container>
    </Main>
  );
};

export default ShoppingBasket;
