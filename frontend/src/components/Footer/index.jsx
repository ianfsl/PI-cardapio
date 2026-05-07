import {
  FooterContainer,
  Conteudo,
  NomeEstabelecimento,
  Endereco,
  Telefone,
  MapsBtn,
  Copyright,
} from "./styles";

const ENDERECO =
  "Rua Vasco Altair, s/n - Praça Santa Cruz, São Pedro - SP, 13520-000";
const LINK_MAPS = "https://maps.app.goo.gl/RigG4rw9UV8xK89s8";
const TELEFONE_FORMATADO = "(19) 99669-1757";
const LINK_WHATSAPP = "https://wa.me/5519996691757";

export default function Footer() {
  return (
    <FooterContainer>
      <Conteudo>
        <NomeEstabelecimento>🍔 Big Gula</NomeEstabelecimento>
        <Endereco>{ENDERECO}</Endereco>
        <Telefone
          href={LINK_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        >
          📱 {TELEFONE_FORMATADO}
        </Telefone>
        <MapsBtn href={LINK_MAPS} target="_blank" rel="noopener noreferrer">
          📍 Ver no Google Maps
        </MapsBtn>
        <Copyright>© {new Date().getFullYear()} Big Gula</Copyright>
      </Conteudo>
    </FooterContainer>
  );
}
