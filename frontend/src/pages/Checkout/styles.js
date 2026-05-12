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

export const CheckoutBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
`;

export const Secao = styled.section`
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #eee;
  }
`;

export const MetodosPagamento = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const ResumoContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.75rem;
  }
`;

export const Total = styled.div`
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

export const Titulo = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
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

export const Form = styled.form`
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

  &:disabled {
    background: #f5f5f5;
    color: #aaa;
  }
`;

export const MetodoBtn = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 2px solid ${({ $ativo }) => ($ativo ? "#c1440e" : "#ddd")};
  background-color: ${({ $ativo }) => ($ativo ? "#fff5f2" : "#fff")};
  color: ${({ $ativo }) => ($ativo ? "#c1440e" : "#555")};

  &:hover:not(:disabled) {
    border-color: #c1440e;
    color: #c1440e;
  }
`;

export const CampoCartao = styled.div`
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 0.5rem;
  background: #fff;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

export const PixBox = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  p {
    font-size: 0.95rem;
    color: #333;
  }
`;

export const QrImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PixCopiaECola = styled.p`
  font-size: 0.7rem;
  color: #555;
  word-break: break-all;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  max-height: 60px;
  overflow-y: auto;
`;

export const CopiarBtn = styled.button`
  background: #16a34a;
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #15803d;
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
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #c1440e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.75rem;
`;

export const Select = styled.select`
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;
  background-color: #fff;
  font-family: inherit;
  width: 100%;

  &:focus {
    border-color: #c1440e;
  }

  &:disabled {
    background: #f5f5f5;
    color: #aaa;
  }
`;
