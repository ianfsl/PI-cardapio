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

export const Titulo = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
`;

export const ResumoBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const ResumoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
  padding: 0.3rem 0;

  span:last-child {
    font-weight: 600;
    color: #333;
  }
`;

export const ResumoTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  border-top: 1px solid #ddd;
  margin-top: 0.5rem;
  padding-top: 0.5rem;

  span:last-child {
    color: #c1440e;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

export const ConfirmarBtn = styled.button`
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
