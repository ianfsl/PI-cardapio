import { Link } from "react-router-dom";
import { HeaderContainer, Logo, Nav, CarrinhoBtn } from "./styles";

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>🍔 Big Gula</Logo>
      <Nav>
        <Link to="/">Cardápio</Link>
        <Link to="/admin">Admin</Link>
        <CarrinhoBtn>🛒 Carrinho</CarrinhoBtn>
      </Nav>
    </HeaderContainer>
  );
}
