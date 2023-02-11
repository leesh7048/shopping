import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ShopHeader = styled.header`
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: var(--spacer-m) var(--spacer-l);

  height: 30px;
  position: sticky;
  top: 0px;
  background-color: var(--gray1);
  border-bottom: 1px solid var(--gray6);
  z-index: 1;
`;

const BackBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: var(--font-size-l);
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-bold);
  color: var(--gray12);
`;

const ShoppingBasket = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CartIcon = styled.div`
  font-size: var(--font-size-l);
  position: absolute;
`;
const BackNum = styled.div`
  position: absolute;
  background-color: var(--green11);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  right: 0;
  top: -3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;

  span {
    position: absolute;
    font-size: 10px;
    color: var(--gray1);
  }
`;

const Header = ({ title, left, right, cartProductsNum }) => {
  const navigate = useNavigate();

  return (
    <ShopHeader>
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        {left}
      </BackBtn>
      <Title>{title}</Title>
      <ShoppingBasket
        onClick={() => {
          navigate(`/shoppingBasket`);
        }}
      >
        <CartIcon>{right}</CartIcon>
        {right && (
          <BackNum>
            <span>{cartProductsNum}</span>
          </BackNum>
        )}
      </ShoppingBasket>
    </ShopHeader>
  );
};

export default Header;
