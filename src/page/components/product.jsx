import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const StyledProduct = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray3);
  padding: var(--spacer-l);
  border-radius: var(--radius-m);
  margin: var(--spacer-m);
`;

const ProductImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-m);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const ProductName = styled.h2`
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-regular);
  margin: var(--spacer-s) 0px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--gray12);
`;

const PriceTagBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

const ProductPrice = styled.h3`
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  margin: var(--spacer-s) 0px;
  color: var(--gray12);
`;
const ProductTag = styled.div`
  background: var(--green2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-m);
  color: var(--green9);
  height: 20px;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
  padding: 0px var(--spacer-s);
`;
const Description = styled.div`
  font-size: var(--font-size-xs);
  background-color: var(--gray1);
  border-radius: 3px;
  width: 120px;
  text-align: start;
  color: var(--gray12);

  ${({ state }) =>
    state === "3줄이상펼쳐보기전" &&
    `
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  `};
`;

const ToggleBtn = styled.button`
  border: 1px solid var(--green6);
  color: var(--green9);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xs);
  background-color: var(--green3);
  border-radius: var(--radius-s);
  padding: var(--spacer-s);
  margin-top: var(--spacer-m);
  cursor: pointer;
`;

const Product = ({
  productName,
  price,
  tag,
  productImg,
  description,
  onClick,
  delBtn,
  quantityInfo,
}) => {
  const [state, setState] = useState("3줄미만");

  const descriptionRef = useRef();

  useEffect(() => {
    if (!description) return;

    if (descriptionRef.current.offsetHeight / 12 > 3) {
      setState("3줄이상펼쳐보기전");
    }
  }, [description]);
  return (
    <StyledProduct onClick={onClick}>
      {delBtn}
      <ProductImg src={productImg} alt={productName} />
      <ProductInfo>
        <ProductName>{productName}</ProductName>
        <PriceTagBox>
          <ProductPrice>{price}$</ProductPrice>
          <ProductTag>{tag}</ProductTag>
        </PriceTagBox>
        <Description state={state} ref={descriptionRef}>
          {description}
        </Description>
        {quantityInfo}
      </ProductInfo>
      {state === "3줄이상펼쳐보기전" || state === "3줄이상펼쳐본후" ? (
        <ToggleBtn
          type="button"
          onClick={() => {
            setState(
              state === "3줄이상펼쳐보기전"
                ? "3줄이상펼쳐본후"
                : "3줄이상펼쳐보기전"
            );
          }}
        >
          {state === "3줄이상펼쳐보기전" ? "펼치기" : "접기"}
        </ToggleBtn>
      ) : (
        <></>
      )}
    </StyledProduct>
  );
};

export default Product;
