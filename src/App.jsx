import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./page/list";
import Detail from "./page/detail";
import ShoppingBasket from "./page/shoppingBasket";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/shoppingBasket" element={<ShoppingBasket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
