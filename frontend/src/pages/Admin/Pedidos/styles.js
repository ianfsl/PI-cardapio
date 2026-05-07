import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Titulo = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
`;

export const BotaoSair = styled.button`
  background: none;
  border: 1px solid #ccc;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #666;

  &:hover {
    border-color: #c1440e;
    color: #c1440e;
  }
`;

export const BarraStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.4rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const AtualizadoTexto = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const AtualizarBtn = styled.button`
  background-color: transparent;
  color: #c1440e;
  border: 1px solid #c1440e;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    background-color: #c1440e;
    color: #fff;
  }
`;

export const ListaPedidos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PedidoCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  border-left: 4px solid #e85d04;
`;

export const PedidoCabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

export const NumeroPedido = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #c1440e;
`;

export const HorarioPedido = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const NomeCliente = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.6rem;
`;

export const ItensLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.6rem;
  padding: 0.6rem 0.8rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

export const ItemPedido = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

export const ObservacoesArea = styled.div`
  background-color: #fffaf3;
  border-left: 3px solid #f48c06;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  margin-bottom: 0.6rem;
`;

export const ObservacoesTitulo = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.2rem;
`;

export const ObservacoesTexto = styled.p`
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
`;

export const ValorPedido = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #c1440e;
  text-align: right;
`;

export const ListaVazia = styled.p`
  text-align: center;
  color: #888;
  font-size: 0.95rem;
  padding: 2rem 1rem;
`;
