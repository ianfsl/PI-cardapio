import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #c1440e;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const Logo = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    font-size: 0.9rem;
    color: #fff;
    font-weight: 500;

    &:hover {
      color: #ffe0c2;
    }
  }
`;

export const CarrinhoBtn = styled.button`
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    background-color: #f48c06;
  }
`;
