import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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

export default function PedidoConcluido() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!state?.idPedido) {
      navigate("/");
      return;
    }

    const buscarPedido = async () => {
      try {
        const response = await fetch(`${API_URL}/pedidos/${state.idPedido}`);
        if (!response.ok) throw new Error("não encontrado");
        const data = await response.json();
        setPedido(data);
      } catch {
        if (state.nomeCliente) {
          setPedido({
            idPedido: state.idPedido,
            NomeCliente: state.nomeCliente,
            NomeProdutoPedido: state.itens
              ? state.itens.map((i) => `${i.quantidade}x ${i.nomeProduto}`).join(", ")
              : "—",
            ValorFinalPedido: state.valorTotal,
            Observacoes: state.observacoes || null,
            DataPedido: new Date().toISOString(),
            MetodoPagamento: state.metodo,
            StatusPagamento:
              state.aprovado !== false ? "approved" : "rejected",
          });
        } else {
          setErro("Pedido não encontrado.");
        }
      } finally {
        setCarregando(false);
      }
    };

    buscarPedido();
  }, [state, navigate]);

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

  const statusPagamento = pedido.StatusPagamento;
  const recusado =
    statusPagamento === "rejected" ||
    statusPagamento === "erro" ||
    state?.aprovado === false;
  const emAnalise =
    !recusado &&
    (statusPagamento === "in_process" || statusPagamento === "pendente");
  const aprovado = !recusado;

  const formatarHorario = (dataString) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    return `às ${horas}h${minutos}`;
  };

  const itensLista = pedido.NomeProdutoPedido
    ? pedido.NomeProdutoPedido
        .split(/,\s*|\s*\|\s*/)
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  let icone = "✅";
  let titulo = "Pedido Recebido!";

  if (recusado) {
    icone = "❌";
    titulo = "Pagamento Recusado";
  } else if (emAnalise) {
    icone = "🕐";
    titulo = "Pagamento em Análise";
  }

  return (
    <Container>
      <Cabecalho>
        <NumeroPedido>
          {icone} Pedido #{pedido.idPedido}
        </NumeroPedido>
        <NomeCliente>{pedido.NomeCliente}</NomeCliente>
        <HorarioPedido>
          {titulo} — Recebido {formatarHorario(pedido.DataPedido)}
        </HorarioPedido>
        {recusado && (
          <p style={{ color: "#c1440e", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Não foi possível processar seu pagamento. Verifique os dados e tente
            novamente.
          </p>
        )}
      </Cabecalho>

      {aprovado && (
        <EstimativaBox>
          <EstimativaTitulo>Tempo estimado</EstimativaTitulo>
          <EstimativaTempo>
            {emAnalise
              ? "Aguardando confirmação do pagamento"
              : "25 a 35 minutos"}
          </EstimativaTempo>
        </EstimativaBox>
      )}

      {aprovado && (
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
      )}

      <ItensBox>
        <ItensTitulo>Seu pedido</ItensTitulo>
        {itensLista.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
        <ValorTotal>
          <span>Total</span>
          <span>
            R${" "}
            {pedido.ValorFinalPedido != null
              ? Number(pedido.ValorFinalPedido).toFixed(2)
              : "—"}
          </span>
        </ValorTotal>
      </ItensBox>

      {pedido.Observacoes && (
        <ObservacoesBox>
          <ObservacoesTitulo>Observações</ObservacoesTitulo>
          <ObservacoesTexto>{pedido.Observacoes}</ObservacoesTexto>
        </ObservacoesBox>
      )}

      <VoltarBtn onClick={() => navigate("/")}>
        {recusado ? "Tentar novamente" : "Voltar ao cardápio"}
      </VoltarBtn>
    </Container>
  );
}