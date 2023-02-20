import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";

const IsDarkBtn = styled.button`
  left: 10px;
  bottom: 10px;
  font-size: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  padding: 0;
  height: 20px;
  line-height: 0;
`;

const DarkModeBtn = (props) => {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const windowDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorage.getItem("theme") !== "정해지지 않음") return;
    if (windowDarkMode) {
      setTheme("다크모드");
    } else {
      setTheme("라이트모드");
    }
  }, [setTheme]);

  useEffect(() => {
    let nextTheme;
    if (theme === "정해지지 않음") {
      nextTheme = "light";
    } else if (theme === "라이트모드") {
      nextTheme = "light";
    } else {
      nextTheme = "dark";
    }

    document.body.dataset.theme = nextTheme;
  }, [theme]);

  const darkModeToggle = () => {
    if (theme === "라이트모드") {
      setTheme("다크모드");
    } else setTheme("라이트모드");
  };

  return (
    <IsDarkBtn onClick={darkModeToggle}>
      {theme === "다크모드" ? "🌝" : "🌚"}
    </IsDarkBtn>
  );
};

export default DarkModeBtn;
