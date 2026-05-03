import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCarrinho } from "../../context/CarrinhoContext";
import API_URL from "../../config/api";
import {
  Container,
  Titulo,
  ResumoBox,
  ResumoItem,
  ResumoTotal,
  Form,
  Label,
  Input,
  ConfirmarBtn,
} from "./styles";

export default function Checkout() {
  const { itens, total, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [enviando, setEnviando] = useState(false);

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
        })),
        valorTotal: total,
        observacoes: observacoes.trim() || null,
      });

      alert(`Pedido #${data.idPedido} de ${nome} realizado com sucesso! 🎉`);
      limparCarrinho();
      navigate("/");
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      alert("Erro ao finalizar o pedido. Tente novamente.");
      setEnviando(false);
    }
  };

  if (itens.length === 0) {
    navigate("/");
    return null;
  }

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
            <ResumoItem key={item.idProduto}>
              <span>
                {prefixo}
                {item.nomeProduto} x{item.quantidade}
              </span>
              <span>R$ {(item.valorProduto * item.quantidade).toFixed(2)}</span>
            </ResumoItem>
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
            placeholder="Ex: bacon no BIG Burger, sem cebola na Baby, maionese à parte..."
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
