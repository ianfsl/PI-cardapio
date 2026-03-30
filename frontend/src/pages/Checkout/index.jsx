import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
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

  const handleFinalizar = () => {
    if (!nome.trim()) {
      alert("Por favor, informe seu nome para continuar.");
      return;
    }

    alert(`Pedido de ${nome} realizado com sucesso! 🎉`);
    limparCarrinho();
    navigate("/");
  };

  if (itens.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <Container>
      <Titulo>Finalizar Pedido</Titulo>

      <ResumoBox>
        {itens.map((item) => (
          <ResumoItem key={item.idProduto}>
            <span>
              {item.nomeProduto} x{item.quantidade}
            </span>
            <span>R$ {(item.valorProduto * item.quantidade).toFixed(2)}</span>
          </ResumoItem>
        ))}
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
          />
        </Label>
      </Form>

      <ConfirmarBtn onClick={handleFinalizar} disabled={!nome.trim()}>
        Confirmar Pedido
      </ConfirmarBtn>
    </Container>
  );
}
