import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import {
  Container,
  Titulo,
  ItemCard,
  ItemInfo,
  QuantidadeWrapper,
  RemoverBtn,
  Rodape,
  Total,
  FinalizarBtn,
  CarrinhoVazio,
} from "./styles";

export default function Carrinho() {
  const { itens, removerItem, alterarQuantidade, total } = useCarrinho();
  const navigate = useNavigate();

  if (itens.length === 0) {
    return (
      <Container>
        <Titulo>Meu Carrinho</Titulo>
        <CarrinhoVazio>Seu carrinho está vazio. 🛒</CarrinhoVazio>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>Meu Carrinho</Titulo>

      {itens.map((item) => (
        <ItemCard key={item.idProduto}>
          <ItemInfo>
            <h3>{item.nomeProduto}</h3>
            <span>R$ {(item.valorProduto * item.quantidade).toFixed(2)}</span>
          </ItemInfo>

          <QuantidadeWrapper>
            <button
              onClick={() =>
                alterarQuantidade(item.idProduto, item.quantidade - 1)
              }
            >
              −
            </button>
            <span>{item.quantidade}</span>
            <button
              onClick={() =>
                alterarQuantidade(item.idProduto, item.quantidade + 1)
              }
            >
              +
            </button>
          </QuantidadeWrapper>

          <RemoverBtn onClick={() => removerItem(item.idProduto)}>✕</RemoverBtn>
        </ItemCard>
      ))}

      <Rodape>
        <Total>
          Total: <span>R$ {total.toFixed(2)}</span>
        </Total>
        <FinalizarBtn onClick={() => navigate("/checkout")}>
          Finalizar Pedido
        </FinalizarBtn>
      </Rodape>
    </Container>
  );
}
