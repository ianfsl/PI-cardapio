import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const Titulo = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
`;

export const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  gap: 1rem;
`;

export const ItemInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.3rem;
  }

  span {
    font-size: 0.9rem;
    color: #c1440e;
    font-weight: 700;
  }
`;

export const QuantidadeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background-color: #eee;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    color: #333;

    &:hover {
      background-color: #ddd;
    }
  }

  span {
    font-size: 0.95rem;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }
`;

export const RemoverBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1.2rem;

  &:hover {
    color: #c1440e;
  }
`;

export const Rodape = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`;

export const Total = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;

  span {
    color: #c1440e;
  }
`;

export const FinalizarBtn = styled.button`
  width: 100%;
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    background-color: #c1440e;
  }
`;

export const CarrinhoVazio = styled.p`
  text-align: center;
  color: #999;
  margin-top: 3rem;
  font-size: 0.95rem;
`;
