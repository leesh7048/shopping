import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./page/list";
import Detail from "./page/detail";
import ShoppingBasket from "./page/shoppingBasket";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body[data-theme='light']{
    --green1: hsl(136, 50%, 98.9%);
  --green2: hsl(138, 62.5%, 96.9%);
  --green3: hsl(139, 55.2%, 94.5%);
  --green4: hsl(140, 48.7%, 91%);
  --green5: hsl(141, 43.7%, 86%);
  --green6: hsl(143, 40.3%, 79%);
  --green7: hsl(146, 38.5%, 69%);
  --green8: hsl(151, 40.2%, 54.1%);
  --green9: hsl(151, 55%, 41.5%);
  --green10: hsl(152, 57.5%, 37.6%);
  --green11: hsl(153, 67%, 28.5%);
  --green12: hsl(155, 40%, 14%);

  --gray1: hsl(0, 0%, 99%);
  --gray2: hsl(0, 0%, 97.3%);
  --gray3: hsl(0, 0%, 95.1%);
  --gray4: hsl(0, 0%, 93%);
  --gray5: hsl(0, 0%, 90.9%);
  --gray6: hsl(0, 0%, 88.7%);
  --gray7: hsl(0, 0%, 85.8%);
  --gray8: hsl(0, 0%, 78%);
  --gray9: hsl(0, 0%, 56.1%);
  --gray10: hsl(0, 0%, 52.3%);
  --gray11: hsl(0, 1%, 27%);
  --gray12: hsl(0, 0%, 9%);
  }
  body[data-theme='dark']{
    
  --green1: hsl(146, 30.0%, 7.4%);
  --green2: hsl(155, 44.2%, 8.4%);
  --green3: hsl(155, 46.7%, 10.9%);
  --green4: hsl(154, 48.4%, 12.9%);
  --green5: hsl(154, 49.7%, 14.9%);
  --green6: hsl(154, 50.9%, 17.6%);
  --green7: hsl(153, 51.8%, 21.8%);
  --green8: hsl(151, 51.7%, 28.4%);
  --green9: hsl(151, 55.0%, 41.5%);
  --green10: hsl(151, 49.3%, 46.5%);
  --green11: hsl(151, 50.0%, 53.2%);
  --green12: hsl(137, 72.0%, 94.0%);

  
  --gray1: hsl(0, 0%, 8.5%);
  --gray2: hsl(0, 0%, 11.0%);
  --gray3: hsl(0, 0%, 13.6%);
  --gray4: hsl(0, 0%, 15.8%);
  --gray5: hsl(0, 0%, 17.9%);
  --gray6: hsl(0, 0%, 20.5%);
  --gray7: hsl(0, 0%, 24.3%);
  --gray8: hsl(0, 0%, 31.2%);
  --gray9: hsl(0, 0%, 43.9%);
  --gray10: hsl(0, 0%, 49.4%);
  --gray11: hsl(0, 0%, 62.8%);
  --gray12: hsl(0, 0%, 93.0%);

}
  
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/shoppingBasket" element={<ShoppingBasket />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
