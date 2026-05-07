import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import {
  HeaderContainer,
  Logo,
  Nav,
  CarrinhoBtn,
  PedidoAtivoBtn,
} from "./styles";

const TEMPO_VALIDADE_MS = 2 * 60 * 60 * 1000;

export default function Header() {
  const { quantidadeTotal } = useCarrinho();
  const location = useLocation();
  const [pedidoAtivo, setPedidoAtivo] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("pedidoAtivo");
    if (!dadosSalvos) {
      setPedidoAtivo(null);
      return;
    }

    try {
      const { idPedido, timestamp } = JSON.parse(dadosSalvos);
      const tempoDecorrido = Date.now() - timestamp;

      if (tempoDecorrido < TEMPO_VALIDADE_MS) {
        setPedidoAtivo(idPedido);
      } else {
        localStorage.removeItem("pedidoAtivo");
        setPedidoAtivo(null);
      }
    } catch {
      localStorage.removeItem("pedidoAtivo");
      setPedidoAtivo(null);
    }
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <Logo as={Link} to="/">
        🍔 Big Gula
      </Logo>
      <Nav>
        <Link to="/">Cardápio</Link>
        {pedidoAtivo && (
          <PedidoAtivoBtn as={Link} to={`/pedido/${pedidoAtivo}`}>
            📋 Pedido nº{pedidoAtivo}
          </PedidoAtivoBtn>
        )}
        <CarrinhoBtn as={Link} to="/carrinho">
          🛒 {quantidadeTotal > 0 ? `(${quantidadeTotal})` : ""} Carrinho
        </CarrinhoBtn>
      </Nav>
    </HeaderContainer>
  );
}
