import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #2a1810;
  color: #fff;
  padding: 1.5rem 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Conteudo = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
`;

export const NomeEstabelecimento = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
`;

export const Endereco = styled.p`
  font-size: 0.85rem;
  color: #ddd;
  line-height: 1.4;
`;

export const MapsBtn = styled.a`
  display: inline-block;
  background-color: #e85d04;
  color: #fff;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.3rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c1440e;
  }
`;

export const Copyright = styled.p`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.8rem;
`;

export const Telefone = styled.a`
  font-size: 0.95rem;
  color: #fff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #25d366;
  }
`;
