import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ title, left, right, cartProductsNum }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        {left}
      </button>
      <div className={styles.title}>{title}</div>
      <div
        className={styles.shoppingBasket}
        onClick={() => {
          navigate(`/shoppingBasket`);
        }}
      >
        <div className={styles.icon}>{right}</div>
        {right && (
          <div className={styles.basketNum}>
            <span>{cartProductsNum}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
