import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Banner = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 48%;
    opacity: 0.85;
  }

  @media (min-width: 768px) {
    height: 400px;
  }
`;

export const Conteudo = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const CategoriaSection = styled.section`
  margin-bottom: 2rem;
`;

export const CategoriaTitulo = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #c1440e;
  text-transform: uppercase;
  border-left: 4px solid #c1440e;
  padding-left: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ProdutoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  gap: 1rem;
`;

export const ProdutoInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 0.95rem;
    font-weight: 700;
    color: #c1440e;
  }
`;

export const ProdutoImagem = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 110px;
    height: 110px;
  }
`;

export const AdicionarBtn = styled.button`
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover {
    background-color: #c1440e;
  }
`;
