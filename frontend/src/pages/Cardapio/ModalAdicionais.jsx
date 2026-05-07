import { useState } from "react";
import {
  Overlay,
  ModalContainer,
  ModalCabecalho,
  ModalTituloWrapper,
  ModalTitulo,
  ModalSubtitulo,
  FecharBtn,
  AdicionaisLista,
  AdicionalItem,
  AdicionalCheckbox,
  AdicionalNome,
  AdicionalValor,
  ModalRodape,
  TotalModal,
  BotoesModal,
  CancelarBtn,
  ConfirmarModalBtn,
  ListaVazia,
} from "./styles";

export default function ModalAdicionais({
  produto,
  adicionaisDisponiveis,
  onCancelar,
  onConfirmar,
}) {
  const [selecionados, setSelecionados] = useState([]);

  const toggleAdicional = (adicional) => {
    setSelecionados((prev) => {
      const jaTem = prev.some((a) => a.idAdicional === adicional.idAdicional);
      if (jaTem) {
        return prev.filter((a) => a.idAdicional !== adicional.idAdicional);
      }
      return [...prev, adicional];
    });
  };

  const valorAdicionais = selecionados.reduce(
    (acc, a) => acc + a.valorExtra,
    0,
  );
  const totalModal = produto.valorProduto + valorAdicionais;

  const handleConfirmar = () => {
    onConfirmar(selecionados);
  };

  return (
    <Overlay onClick={onCancelar}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalCabecalho>
          <ModalTituloWrapper>
            <ModalTitulo>
              {produto.categoria} {produto.nomeProduto}
            </ModalTitulo>
            <ModalSubtitulo>Adicionais</ModalSubtitulo>
          </ModalTituloWrapper>
          <FecharBtn onClick={onCancelar}>✕</FecharBtn>
        </ModalCabecalho>

        <AdicionaisLista>
          {adicionaisDisponiveis.length === 0 ? (
            <ListaVazia>Nenhum adicional disponível.</ListaVazia>
          ) : (
            adicionaisDisponiveis.map((adicional) => {
              const marcado = selecionados.some(
                (a) => a.idAdicional === adicional.idAdicional,
              );
              return (
                <AdicionalItem
                  key={adicional.idAdicional}
                  onClick={() => toggleAdicional(adicional)}
                >
                  <AdicionalCheckbox $marcado={marcado}>
                    {marcado && "✓"}
                  </AdicionalCheckbox>
                  <AdicionalNome>{adicional.nomeAdicional}</AdicionalNome>
                  <AdicionalValor>
                    + R$ {adicional.valorExtra.toFixed(2)}
                  </AdicionalValor>
                </AdicionalItem>
              );
            })
          )}
        </AdicionaisLista>

        <ModalRodape>
          <TotalModal>
            <span>Total</span>
            <span>R$ {totalModal.toFixed(2)}</span>
          </TotalModal>
          <BotoesModal>
            <CancelarBtn onClick={onCancelar}>Cancelar</CancelarBtn>
            <ConfirmarModalBtn onClick={handleConfirmar}>
              Adicionar ao carrinho
            </ConfirmarModalBtn>
          </BotoesModal>
        </ModalRodape>
      </ModalContainer>
    </Overlay>
  );
}
