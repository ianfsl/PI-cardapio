import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import Cardapio from "./pages/Cardapio";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/carrinho" element={<h1>Carrinho</h1>} />
        <Route path="/checkout" element={<h1>Checkout</h1>} />
        <Route path="/admin" element={<h1>Admin</h1>} />
      </Routes>
    </>
  );
}
