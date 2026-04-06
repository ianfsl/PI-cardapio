import { Link } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import { HeaderContainer, Logo, Nav, CarrinhoBtn } from "./styles";

export default function Header() {
  const { quantidadeTotal } = useCarrinho();

  return (
    <HeaderContainer>
      <Logo as={Link} to="/">
        🍔 Big Gula
      </Logo>
      <Nav>
        <Link to="/">Cardápio</Link>
        <Link to="/admin">Admin</Link>
        <CarrinhoBtn as={Link} to="/carrinho">
          🛒 {quantidadeTotal > 0 ? `(${quantidadeTotal})` : ""} Carrinho
        </CarrinhoBtn>
      </Nav>
    </HeaderContainer>
  );
}
