import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import LoginAdmin from "./pages/Admin/Login";
import Painel from "./pages/Admin/Painel";
import RotaProtegida from "./components/RotaProtegida";

export default function App() {
  return (
    <CarrinhoProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route
          path="/admin/painel"
          element={
            <RotaProtegida>
              <Painel />
            </RotaProtegida>
          }
        />
      </Routes>
    </CarrinhoProvider>
  );
}
