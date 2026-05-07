import { NavLink } from "react-router-dom";
import { AbasContainer, Aba } from "./styles";

export default function AbasAdmin() {
  return (
    <AbasContainer>
      <Aba as={NavLink} to="/admin/pedidos">
        Pedidos
      </Aba>
      <Aba as={NavLink} to="/admin/painel">
        Produtos
      </Aba>
    </AbasContainer>
  );
}
