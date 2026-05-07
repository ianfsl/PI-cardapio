import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/api";
import {
  Container,
  Cabecalho,
  NumeroPedido,
  NomeCliente,
  HorarioPedido,
  EstimativaBox,
  EstimativaTitulo,
  EstimativaTempo,
  ProgressoContainer,
  Etapa,
  Bolinha,
  EtapaTexto,
  Linha,
  ItensBox,
  ItensTitulo,
  Item,
  ValorTotal,
  ObservacoesBox,
  ObservacoesTitulo,
  ObservacoesTexto,
  VoltarBtn,
  MensagemEstado,
} from "./styles";

export default function Pedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarPedido = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/pedidos/${id}`);
        setPedido(data);
      } catch (err) {
        console.error("Erro ao buscar pedido:", err);
        if (err.response?.status === 404) {
          setErro("Pedido não encontrado.");
        } else {
          setErro("Erro ao carregar o pedido. Tente novamente.");
        }
      } finally {
        setCarregando(false);
      }
    };
    buscarPedido();
  }, [id]);

  if (carregando) {
    return (
      <Container>
        <MensagemEstado>Carregando pedido...</MensagemEstado>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container>
        <MensagemEstado>{erro}</MensagemEstado>
        <VoltarBtn as={Link} to="/">
          Voltar ao cardápio
        </VoltarBtn>
      </Container>
    );
  }

  const formatarHorario = (dataString) => {
    const data = new Date(dataString);
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    return `às ${horas}h${minutos}`;
  };

  const itensLista = pedido.NomeProdutoPedido.split(" | ").map((item) =>
    item.trim(),
  );

  return (
    <Container>
      <Cabecalho>
        <NumeroPedido>Pedido nº{pedido.idPedido}</NumeroPedido>
        <NomeCliente>{pedido.NomeCliente}</NomeCliente>
        <HorarioPedido>
          Recebido {formatarHorario(pedido.DataPedido)}
        </HorarioPedido>
      </Cabecalho>

      <EstimativaBox>
        <EstimativaTitulo>Tempo estimado</EstimativaTitulo>
        <EstimativaTempo>25 a 35 minutos</EstimativaTempo>
      </EstimativaBox>

      <ProgressoContainer>
        <Etapa>
          <Bolinha $ativa>1</Bolinha>
          <EtapaTexto $ativa>Recebido</EtapaTexto>
        </Etapa>
        <Linha />
        <Etapa>
          <Bolinha>2</Bolinha>
          <EtapaTexto>Em preparo</EtapaTexto>
        </Etapa>
        <Linha />
        <Etapa>
          <Bolinha>3</Bolinha>
          <EtapaTexto>Pronto</EtapaTexto>
        </Etapa>
      </ProgressoContainer>

      <ItensBox>
        <ItensTitulo>Seu pedido</ItensTitulo>
        {itensLista.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
        <ValorTotal>
          <span>Total</span>
          <span>R$ {pedido.ValorFinalPedido.toFixed(2)}</span>
        </ValorTotal>
      </ItensBox>

      {pedido.Observacoes && (
        <ObservacoesBox>
          <ObservacoesTitulo>Observações</ObservacoesTitulo>
          <ObservacoesTexto>{pedido.Observacoes}</ObservacoesTexto>
        </ObservacoesBox>
      )}

      <VoltarBtn onClick={() => navigate("/")}>Voltar ao cardápio</VoltarBtn>
    </Container>
  );
}
