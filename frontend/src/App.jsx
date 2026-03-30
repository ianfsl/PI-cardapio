import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <CarrinhoProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<h1>Admin</h1>} />
      </Routes>
    </CarrinhoProvider>
  );
}
