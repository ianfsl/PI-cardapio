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

export const BotaoAdicionar = styled.button`
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #c1440e;
  }
`;

export const TabelaProdutos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ProdutoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  gap: 1rem;
`;

export const ProdutoNome = styled.div`
  flex: 1;

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.2rem;
  }

  span {
    font-size: 0.85rem;
    color: #c1440e;
    font-weight: 600;
  }
`;

export const Acoes = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const BotaoEditar = styled.button`
  background-color: #f4a261;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;

  &:hover {
    background-color: #e76f51;
  }
`;

export const BotaoDeletar = styled.button`
  background-color: #e63946;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;

  &:hover {
    background-color: #c1121f;
  }
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
`;

export const ModalCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
`;

export const ModalTitulo = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.2rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Input = styled.input`
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: #c1440e;
  }
`;

export const Select = styled.select`
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;
  background-color: #fff;

  &:focus {
    border-color: #c1440e;
  }
`;

export const BotoesModal = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;

  button {
    flex: 1;
    padding: 0.8rem;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
  }

  button:first-child {
    background-color: #e85d04;
    color: #fff;

    &:hover {
      background-color: #c1440e;
    }
  }

  button:last-child {
    background-color: #eee;
    color: #333;

    &:hover {
      background-color: #ddd;
    }
  }
`;
