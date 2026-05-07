import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import AbasAdmin from "../../../components/AbasAdmin";
import {
  Container,
  Cabecalho,
  Titulo,
  BotaoSair,
  BarraStatus,
  AtualizadoTexto,
  AtualizarBtn,
  ListaPedidos,
  PedidoCard,
  PedidoCabecalho,
  NumeroPedido,
  HorarioPedido,
  NomeCliente,
  ItensLista,
  ItemPedido,
  ObservacoesArea,
  ObservacoesTitulo,
  ObservacoesTexto,
  ValorPedido,
  ListaVazia,
} from "./styles";

const INTERVALO_POLLING_MS = 30 * 1000;

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const navigate = useNavigate();
  const intervaloRef = useRef(null);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPedidos = async () => {
    try {
      setErro(null);
      const { data } = await axios.get(`${API_URL}/pedidos`, { headers });
      setPedidos(data);
      setUltimaAtualizacao(new Date());
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }
      setErro("Erro ao carregar pedidos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
    intervaloRef.current = setInterval(fetchPedidos, INTERVALO_POLLING_MS);
    return () => clearInterval(intervaloRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSair = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleAtualizar = () => {
    fetchPedidos();
  };

  const formatarHorario = (dataString) => {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    return `${dia}/${mes} às ${horas}h${minutos}`;
  };

  const formatarUltimaAtualizacao = (data) => {
    if (!data) return "";
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  return (
    <Container>
      <Cabecalho>
        <Titulo>Painel Admin</Titulo>
        <BotaoSair onClick={handleSair}>Sair</BotaoSair>
      </Cabecalho>

      <AbasAdmin />

      <BarraStatus>
        <AtualizadoTexto>
          {ultimaAtualizacao
            ? `Atualizado às ${formatarUltimaAtualizacao(ultimaAtualizacao)}`
            : "Carregando..."}
        </AtualizadoTexto>
        <AtualizarBtn onClick={handleAtualizar}>↻ Atualizar agora</AtualizarBtn>
      </BarraStatus>

      {carregando && pedidos.length === 0 && (
        <ListaVazia>Carregando pedidos...</ListaVazia>
      )}

      {erro && <ListaVazia style={{ color: "#c1121f" }}>{erro}</ListaVazia>}

      {!carregando && !erro && pedidos.length === 0 && (
        <ListaVazia>Nenhum pedido por enquanto.</ListaVazia>
      )}

      <ListaPedidos>
        {pedidos.map((pedido) => {
          const itens = pedido.NomeProdutoPedido.split(" | ").map((i) =>
            i.trim(),
          );
          return (
            <PedidoCard key={pedido.idPedido}>
              <PedidoCabecalho>
                <NumeroPedido>Pedido nº {pedido.idPedido}</NumeroPedido>
                <HorarioPedido>
                  {formatarHorario(pedido.DataPedido)}
                </HorarioPedido>
              </PedidoCabecalho>

              <NomeCliente>{pedido.NomeCliente}</NomeCliente>

              <ItensLista>
                {itens.map((item, idx) => (
                  <ItemPedido key={idx}>{item}</ItemPedido>
                ))}
              </ItensLista>

              {pedido.Observacoes && (
                <ObservacoesArea>
                  <ObservacoesTitulo>Observações:</ObservacoesTitulo>
                  <ObservacoesTexto>{pedido.Observacoes}</ObservacoesTexto>
                </ObservacoesArea>
              )}

              <ValorPedido>
                R$ {parseFloat(pedido.ValorFinalPedido).toFixed(2)}
              </ValorPedido>
            </PedidoCard>
          );
        })}
      </ListaPedidos>
    </Container>
  );
}
