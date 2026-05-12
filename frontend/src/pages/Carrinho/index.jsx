import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import {
  Container,
  Titulo,
  ItemCard,
  ItemInfo,
  AdicionaisItem,
  AdicionalLinha,
  QuantidadeWrapper,
  RemoverBtn,
  Rodape,
  Total,
  FinalizarBtn,
  CarrinhoVazio,
} from "./styles";

export default function Carrinho() {
  const { itens, removerItem, alterarQuantidade, total, valorDoItem } =
    useCarrinho();
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

      {itens.map((item) => {
        const categoriasComPrefixo = ["BIG", "Baby"];
        const prefixo = categoriasComPrefixo.includes(item.categoria)
          ? `${item.categoria} `
          : "";

        return (
          <ItemCard key={item.idItem}>
            <ItemInfo>
              <h3>
                {prefixo}
                {item.nomeProduto}
              </h3>
              {item.adicionais.length > 0 && (
                <AdicionaisItem>
                  {item.adicionais.map((a) => (
                    <AdicionalLinha key={a.idAdicional}>
                      + {a.nomeAdicional}
                    </AdicionalLinha>
                  ))}
                </AdicionaisItem>
              )}
              <span>R$ {valorDoItem(item).toFixed(2)}</span>
            </ItemInfo>

            <QuantidadeWrapper>
              <button
                onClick={() =>
                  alterarQuantidade(item.idItem, item.quantidade - 1)
                }
              >
                −
              </button>
              <span>{item.quantidade}</span>
              <button
                onClick={() =>
                  alterarQuantidade(item.idItem, item.quantidade + 1)
                }
              >
                +
              </button>
            </QuantidadeWrapper>

            <RemoverBtn onClick={() => removerItem(item.idItem)}>✕</RemoverBtn>
          </ItemCard>
        );
      })}

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
