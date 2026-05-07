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

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
  padding: 0;

  @media (min-width: 768px) {
    align-items: center;
    padding: 1rem;
  }
`;

export const ModalContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  animation: subir 0.25s ease-out;

  @keyframes subir {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    max-width: 500px;
    border-radius: 12px;
    animation: aparecer 0.2s ease-out;

    @keyframes aparecer {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

export const ModalCabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #eee;
`;

export const ModalTitulo = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #c1440e;
`;

export const FecharBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #888;
  padding: 0.2rem 0.5rem;

  &:hover {
    color: #c1440e;
  }
`;

export const AdicionaisLista = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

export const AdicionalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #fff8f0;
  }
`;

export const AdicionalCheckbox = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid ${(props) => (props.$marcado ? "#e85d04" : "#ccc")};
  background-color: ${(props) => (props.$marcado ? "#e85d04" : "#fff")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
`;

export const AdicionalNome = styled.span`
  flex: 1;
  font-size: 0.95rem;
  color: #333;
`;

export const AdicionalValor = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #c1440e;
`;

export const ModalRodape = styled.div`
  border-top: 1px solid #eee;
  padding: 1rem 1.2rem;
  background-color: #f9f9f9;
`;

export const TotalModal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.8rem;

  span:last-child {
    color: #c1440e;
  }
`;

export const BotoesModal = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const CancelarBtn = styled.button`
  flex: 1;
  background-color: transparent;
  color: #888;
  border: 1px solid #ddd;
  padding: 0.7rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    background-color: #f0f0f0;
    color: #555;
  }
`;

export const ConfirmarModalBtn = styled.button`
  flex: 2;
  background-color: #e85d04;
  color: #fff;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 700;

  &:hover {
    background-color: #c1440e;
  }
`;

export const ListaVazia = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem 1rem;
  font-size: 0.9rem;
`;

export const ModalTituloWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const ModalSubtitulo = styled.span`
  font-size: 1rem;
  color: #555;
  font-weight: 600;
`;
