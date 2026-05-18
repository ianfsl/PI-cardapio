import { AvisoContainer, AvisoTexto, AvisoEndereco } from "./styles";

export default function AvisoRetirada() {
  return (
    <AvisoContainer
      role="note"
      aria-label="Informação sobre retirada de pedidos"
    >
      <AvisoTexto>
        ℹ️ Apenas pedidos para retirada no local! Não fazemos delivery
      </AvisoTexto>
      <AvisoEndereco>
        📍 Rua Vasco Altair, s/n — Praça Santa Cruz, São Pedro
      </AvisoEndereco>
    </AvisoContainer>
  );
}
