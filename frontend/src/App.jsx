import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import AvisoRetirada from "./components/AvisoRetirada";
import Footer from "./components/Footer";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Pedido from "./pages/Pedido";
import LoginAdmin from "./pages/Admin/Login";
import Painel from "./pages/Admin/Painel";
import PedidosAdmin from "./pages/Admin/Pedidos";
import RotaProtegida from "./components/RotaProtegida";
import WhatsAppFlutuante from "./components/WhatsAppFlutuante";

export default function App() {
  return (
    <CarrinhoProvider>
      <GlobalStyles />
      <Header />
      <AvisoRetirada />
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedido/:id" element={<Pedido />} />
        <Route path="/pedido-concluido" element={<Pedido />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route
          path="/admin/painel"
          element={
            <RotaProtegida>
              <Painel />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/pedidos"
          element={
            <RotaProtegida>
              <PedidosAdmin />
            </RotaProtegida>
          }
        />
      </Routes>
      <Footer />
      <WhatsAppFlutuante />
    </CarrinhoProvider>
  );
}
