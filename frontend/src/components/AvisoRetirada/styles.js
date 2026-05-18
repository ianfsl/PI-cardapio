import styled from "styled-components";

export const AvisoContainer = styled.div`
  width: 100%;
  background-color: #fff5e6;
  border-bottom: 1px solid #ffd9a8;
  padding: 0.85rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 2rem;
  }
`;

export const AvisoTexto = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #8a3b0a;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.05rem;
  }
`;

export const AvisoEndereco = styled.span`
  font-size: 0.9rem;
  color: #a85a1f;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1rem;

    &::before {
      content: "•";
      margin-right: 1rem;
      color: #ffd9a8;
    }
  }
`;
