import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCarrinho } from "../../context/CarrinhoContext";
import API_URL from "../../config/api";
import {
  Container,
  Titulo,
  ResumoBox,
  ResumoItem,
  ResumoAdicionais,
  ResumoAdicionalLinha,
  ResumoTotal,
  Form,
  Label,
  Input,
  ConfirmarBtn,
} from "./styles";

export default function Checkout() {
  const { itens, total, limparCarrinho, valorDoItem } = useCarrinho();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (itens.length === 0 && !enviando) {
      navigate("/");
    }
  }, [itens.length, enviando, navigate]);

  const handleFinalizar = async () => {
    if (!nome.trim()) {
      alert("Por favor, informe seu nome para continuar.");
      return;
    }

    setEnviando(true);

    try {
      const { data } = await axios.post(`${API_URL}/pedidos`, {
        nomeCliente: nome.trim(),
        itens: itens.map((item) => ({
          idProduto: item.idProduto,
          nomeProduto: item.nomeProduto,
          quantidade: item.quantidade,
          valorProduto: item.valorProduto,
          categoria: item.categoria,
          adicionais: item.adicionais.map((a) => ({
            idAdicional: a.idAdicional,
            nomeAdicional: a.nomeAdicional,
            valorExtra: a.valorExtra,
          })),
        })),
        valorTotal: total,
        observacoes: observacoes.trim() || null,
      });

      localStorage.setItem(
        "pedidoAtivo",
        JSON.stringify({
          idPedido: data.idPedido,
          timestamp: Date.now(),
        }),
      );
      limparCarrinho();
      navigate(`/pedido/${data.idPedido}`, { state: { recemCriado: true } });
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      alert("Erro ao finalizar o pedido. Tente novamente.");
      setEnviando(false);
    }
  };

  return (
    <Container>
      <Titulo>Finalizar Pedido</Titulo>

      <ResumoBox>
        {itens.map((item) => {
          const categoriasComPrefixo = ["BIG", "Baby"];
          const prefixo = categoriasComPrefixo.includes(item.categoria)
            ? `${item.categoria} `
            : "";

          return (
            <div key={item.idItem}>
              <ResumoItem>
                <span>
                  {prefixo}
                  {item.nomeProduto} x{item.quantidade}
                </span>
                <span>R$ {valorDoItem(item).toFixed(2)}</span>
              </ResumoItem>
              {item.adicionais.length > 0 && (
                <ResumoAdicionais>
                  {item.adicionais.map((a) => (
                    <ResumoAdicionalLinha key={a.idAdicional}>
                      + {a.nomeAdicional}
                    </ResumoAdicionalLinha>
                  ))}
                </ResumoAdicionais>
              )}
            </div>
          );
        })}
        <ResumoTotal>
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </ResumoTotal>
      </ResumoBox>

      <Form>
        <Label>
          Seu nome
          <Input
            type="text"
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={enviando}
          />
        </Label>

        <Label>
          Observações (opcional)
          <Input
            as="textarea"
            rows={3}
            placeholder="Ex: sem cebola, maionese à parte..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            disabled={enviando}
          />
        </Label>
      </Form>

      <ConfirmarBtn
        onClick={handleFinalizar}
        disabled={!nome.trim() || enviando}
      >
        {enviando ? "Enviando..." : "Confirmar Pedido"}
      </ConfirmarBtn>
    </Container>
  );
}
