import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const Cabecalho = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed #ddd;
`;

export const NumeroPedido = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #c1440e;
  margin-bottom: 0.3rem;
`;

export const NomeCliente = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.2rem;
`;

export const HorarioPedido = styled.p`
  font-size: 0.85rem;
  color: #888;
`;

export const EstimativaBox = styled.div`
  background-color: #fff4e6;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const EstimativaTitulo = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.3rem;
`;

export const EstimativaTempo = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #c1440e;
`;

export const ProgressoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
`;

export const Etapa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
`;

export const Bolinha = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$ativa ? "#e85d04" : "#ddd")};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
`;

export const EtapaTexto = styled.span`
  font-size: 0.75rem;
  color: ${(props) => (props.$ativa ? "#c1440e" : "#888")};
  font-weight: ${(props) => (props.$ativa ? "600" : "400")};
  text-align: center;
`;

export const Linha = styled.div`
  flex: 1;
  height: 2px;
  background-color: #ddd;
  margin: 0 0.3rem;
  margin-bottom: 1.4rem;
`;

export const ItensBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const ItensTitulo = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.7rem;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
`;

export const Item = styled.p`
  font-size: 0.9rem;
  color: #555;
  padding: 0.3rem 0;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ValorTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  border-top: 1px solid #ddd;
  margin-top: 0.5rem;
  padding-top: 0.7rem;

  span:last-child {
    color: #c1440e;
  }
`;

export const ObservacoesBox = styled.div`
  background-color: #fffaf3;
  border-left: 4px solid #f48c06;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const ObservacoesTitulo = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.3rem;
`;

export const ObservacoesTexto = styled.p`
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
`;

export const VoltarBtn = styled.button`
  width: 100%;
  background-color: transparent;
  color: #c1440e;
  border: 2px solid #c1440e;
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  display: block;

  &:hover {
    background-color: #c1440e;
    color: #fff;
  }
`;

export const MensagemEstado = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
  padding: 2rem 0;
`;
