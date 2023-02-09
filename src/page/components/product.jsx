import React, { useState, useRef, useEffect } from "react";
import styles from "./product.module.css";

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
    <div className={styles.product} onClick={onClick}>
      {delBtn}
      <img className={styles.productImg} src={productImg} alt={productName} />
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{productName}</h2>
        <div className={styles.priceTagBox}>
          <h3 className={styles.productPrice}>{price}$</h3>
          <div className={styles.productTag}>{tag}</div>
        </div>
        <div
          className={styles.description}
          ref={descriptionRef}
          data-state={state}
        >
          {description}
        </div>
        {quantityInfo}
      </div>
      {state === "3줄이상펼쳐보기전" || state === "3줄이상펼쳐본후" ? (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => {
            setState(
              state === "3줄이상펼쳐보기전"
                ? "3줄이상펼쳐본후"
                : "3줄이상펼쳐보기전"
            );
          }}
        >
          {state === "3줄이상펼쳐보기전" ? "펼치기" : "접기"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Product;
