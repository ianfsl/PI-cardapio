import styled from "styled-components";

export const BotaoFlutuante = styled.a`
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  width: 56px;
  height: 56px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 90;
  transition:
    transform 0.2s,
    background-color 0.2s;

  &:hover {
    background-color: #1ebe5a;
    transform: scale(1.08);
  }

  @media (min-width: 768px) {
    bottom: 1.8rem;
    right: 1.8rem;
    width: 60px;
    height: 60px;
  }
`;
