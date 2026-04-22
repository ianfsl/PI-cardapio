import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 1rem;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Titulo = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
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

export const BotaoLogin = styled.button`
  width: 100%;
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.5rem;

  &:hover {
    background-color: #c1440e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Erro = styled.p`
  color: red;
  font-size: 0.85rem;
  text-align: center;
`;
