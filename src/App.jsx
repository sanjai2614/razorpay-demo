import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
