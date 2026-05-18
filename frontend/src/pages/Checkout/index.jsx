import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import axios from "axios";
import API_URL from "../../config/api";
import {
  Container,
  Titulo,
  Label,
  Input,
  MetodoBtn,
  ResumoItem,
  Form,
  ErrorMsg,
  Select,
  CheckoutBox,
  Secao,
  MetodosPagamento,
  ResumoContainer,
  Total,
  FinalizarBtn,
  PixBox,
  QrImg,
  PixCopiaECola,
  CopiarBtn,
} from "./styles";

const METODOS_CARTAO = ["credito", "debito"];

export default function Checkout() {
  const { itens, total, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");

  const [metodo, setMetodo] = useState("pix");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [pixQrBase64, setPixQrBase64] = useState("");
  const [pixCopiaCola, setPixCopiaCola] = useState("");
  const [mpReady, setMpReady] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [dadosPixPedido, setDadosPixPedido] = useState(null);

  const cardFormRef = useRef(null);

  useEffect(() => {
    if (itens.length === 0 && !pixQrBase64) {
      const timer = setTimeout(() => navigate("/"), 150);
      return () => clearTimeout(timer);
    }
  }, [itens, navigate, pixQrBase64]);

  useEffect(() => {
    if (!METODOS_CARTAO.includes(metodo)) return;
    if (!window.MercadoPago) {
      setErro("SDK do MercadoPago não carregou. Recarregue a página.");
      return;
    }
    if (mpReady) return;

    const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

    const cardForm = mp.cardForm({
      amount: total.toString(),
      iframe: false,
      form: {
        id: "form-cartao",
        cardNumber:          { id: "mp-cardNumber",          placeholder: "Número do Cartão" },
        expirationDate:      { id: "mp-expirationDate",      placeholder: "MM/AA" },
        securityCode:        { id: "mp-securityCode",        placeholder: "CVC" },
        cardholderName:      { id: "mp-cardholderName",      placeholder: "Como está no cartão" },
        issuer:              { id: "mp-issuer" },
        installments:        { id: "mp-installments" },
        identificationType:  { id: "mp-identificationType" },
        identificationNumber:{ id: "mp-identificationNumber" },
        cardholderEmail:     { id: "mp-email" },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) {
            console.warn("Erro ao montar formulário:", error);
            setErro("Erro ao carregar formulário do cartão.");
            return;
          }
          setMpReady(true);
          setErro("");
        },
        onSubmit: async (event) => {
          event.preventDefault();
          setEnviando(true);
          setErro("");

          const formData = cardForm.getCardFormData();

          if (!formData.token) {
            setErro("Não foi possível tokenizar o cartão. Verifique os dados e tente novamente.");
            setEnviando(false);
            return;
          }

          try {
            const response = await fetch(`${API_URL}/pagamentos`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                metodo,
                nomeCliente:      formData.cardholderName || nome,
                email:            formData.payer?.email || email,
                cpf:              formData.payer?.identification?.number || cpf.replace(/\D/g, ""),
                telefone,
                observacoes:      observacao,
                itens,
                valorTotal:       Number(total),
                token:            formData.token,
                installments:     metodo === "debito" ? 1 : Number(formData.installments) || 1,
                payment_method_id: formData.paymentMethodId,
                issuer_id:        formData.issuerId,
              }),
            });

            const result = await response.json();

            if (response.ok && result.sucesso) {
              const aprovado =
                result.status === "approved" || result.status === "in_process";
              limparCarrinho();
              navigate("/pedido-concluido", {
                state: {
                  idPedido:     result.idPedido,
                  nomeCliente:  result.nomeCliente,
                  valorTotal:   result.valorTotal,
                  metodo,
                  status:       result.status,
                  status_detail: result.status_detail,
                  aprovado,
                  itens,
                  observacoes:  observacao,
                },
              });
            } else {
              const mensagem =
                traduzirErroMP(result.status_detail) ||
                result.error ||
                "Falha no pagamento. Verifique os dados.";
              setErro(mensagem);
            }
          } catch (err) {
            console.error(err);
            setErro("Servidor indisponível no momento.");
          } finally {
            setEnviando(false);
          }
        },
        onError: (errors) => {
          console.error("Erros no cardForm:", errors);
        },
      },
    });

    cardFormRef.current = cardForm;

    return () => {
      try { cardForm.unmount(); } catch (_) {}
      cardFormRef.current = null;
      setMpReady(false);
    };
  }, [metodo]);

  const traduzirErroMP = (detail) => {
    const map = {
      cc_rejected_insufficient_amount:      "Saldo insuficiente no cartão.",
      cc_rejected_bad_filled_security_code: "CVV incorreto.",
      cc_rejected_bad_filled_date:          "Data de validade incorreta.",
      cc_rejected_bad_filled_card_number:   "Número de cartão incorreto.",
      cc_rejected_call_for_authorize:       "Pagamento não autorizado. Entre em contato com seu banco.",
      cc_rejected_card_disabled:            "Cartão desabilitado. Entre em contato com seu banco.",
      cc_rejected_duplicated_payment:       "Pagamento duplicado detectado.",
      cc_rejected_high_risk:                "Pagamento recusado por segurança.",
      pending_contingency:                  "Pagamento em processamento. Aguarde.",
      pending_review_manual:                "Pagamento em análise manual.",
    };
    return map[detail] || null;
  };

  const handleSubmitPix = async () => {
    if (!nome.trim() || !email.trim() || !cpf.trim()) {
      setErro("Preencha nome, e-mail e CPF para gerar o PIX.");
      return;
    }
    setEnviando(true);
    setErro("");

    try {
      const response = await fetch(`${API_URL}/pagamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metodo: "pix",
          nomeCliente: nome,
          email,
          cpf,
          telefone,
          observacoes: observacao,
          itens,
          valorTotal: Number(total),
        }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        setPixQrBase64(data.qr_code_base64);
        setPixCopiaCola(data.qr_code);
        setDadosPixPedido({
          idPedido:    data.idPedido,
          nomeCliente: data.nomeCliente,
          valorTotal:  data.valorTotal,
        });
        limparCarrinho();
      } else {
        setErro(data.error || "Erro ao gerar PIX.");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão com o servidor.");
    } finally {
      setEnviando(false);
    }
  };

  const handleCopiarPix = () => {
    navigator.clipboard.writeText(pixCopiaCola).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  };

  if (itens.length === 0 && !pixQrBase64) return null;

  if (pixQrBase64) {
    return (
      <Container>
        <CheckoutBox style={{ textAlign: "center" }}>
          <Titulo>Pagamento via PIX</Titulo>
          <PixBox>
            <QrImg src={`data:image/png;base64,${pixQrBase64}`} alt="QR Code PIX" />
            <p>Escaneie o QR Code acima ou use o código abaixo:</p>
            <PixCopiaECola>{pixCopiaCola}</PixCopiaECola>
            <CopiarBtn onClick={handleCopiarPix}>
              {copiado ? "✅ Copiado!" : "Copiar código PIX"}
            </CopiarBtn>
          </PixBox>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            O pedido será processado assim que o pagamento for confirmado.
          </p>
          <FinalizarBtn
            onClick={() =>
              navigate("/pedido-concluido", {
                state: {
                  idPedido:    dadosPixPedido?.idPedido,
                  nomeCliente: dadosPixPedido?.nomeCliente,
                  valorTotal:  dadosPixPedido?.valorTotal,
                  metodo:      "pix",
                  aprovado:    true,
                  observacoes: observacao,
                },
              })
            }
            style={{ marginTop: "1.5rem" }}
          >
            Já paguei — Ver meu pedido
          </FinalizarBtn>
          <FinalizarBtn
            onClick={() => navigate("/")}
            style={{ marginTop: "0.75rem", backgroundColor: "#888" }}
          >
            Voltar ao Menu
          </FinalizarBtn>
        </CheckoutBox>
      </Container>
    );
  }

  const isCartao = METODOS_CARTAO.includes(metodo);

  return (
    <Container>
      <CheckoutBox>
        <Titulo>Finalizar Pedido</Titulo>

        <Secao>
          <h3>Seus Dados</h3>
          <Label>
            Nome Completo
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              disabled={enviando}
            />
          </Label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Label style={{ flex: 1 }}>
              E-mail
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                disabled={enviando}
              />
            </Label>
            <Label style={{ flex: 1 }}>
              CPF
              <Input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                disabled={enviando}
              />
            </Label>
          </div>
          <Label>
            Telefone
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              disabled={enviando}
            />
          </Label>
          <Label>
            Observações
            <Input
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Ex: observação do pedido..."
              disabled={enviando}
            />
          </Label>
        </Secao>

        <Secao>
          <h3>Forma de Pagamento</h3>
          <MetodosPagamento>
            <MetodoBtn $ativo={metodo === "pix"} onClick={() => setMetodo("pix")}>
              PIX
            </MetodoBtn>
            <MetodoBtn $ativo={metodo === "credito"} onClick={() => setMetodo("credito")}>
              Crédito
            </MetodoBtn>
            <MetodoBtn $ativo={metodo === "debito"} onClick={() => setMetodo("debito")}>
              Débito
            </MetodoBtn>
          </MetodosPagamento>

          {isCartao && (
            <Form id="form-cartao">
              <Label>
                Número do Cartão
                <Input id="mp-cardNumber" placeholder="Número do Cartão" />
              </Label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Label style={{ flex: 1 }}>
                  Validade
                  <Input id="mp-expirationDate" placeholder="MM/AA" />
                </Label>
                <Label style={{ flex: 1 }}>
                  CVV
                  <Input id="mp-securityCode" placeholder="CVC" />
                </Label>
              </div>
              <Label>
                Nome Impresso no Cartão
                <Input id="mp-cardholderName" placeholder="Como está no cartão" />
              </Label>

              {metodo === "credito" ? (
                <Label>
                  Parcelamento
                  <select
                    id="mp-installments"
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                    }}
                  />
                </Label>
              ) : (
                <select id="mp-installments" style={{ display: "none" }} />
              )}

              <select id="mp-issuer"               style={{ display: "none" }} />
              <select id="mp-identificationType"   style={{ display: "none" }} />
              <input  id="mp-identificationNumber" style={{ display: "none" }} readOnly />
              <input  id="mp-email"                style={{ display: "none" }} readOnly />
            </Form>
          )}
        </Secao>

        <ResumoContainer>
          <h3>Itens no Pedido</h3>
          {itens.map((item) => (
            <ResumoItem key={item.idItem}>
              <span>{item.quantidade}x {item.nomeProduto}</span>
              <span>R$ {(item.valorProduto * item.quantidade).toFixed(2)}</span>
            </ResumoItem>
          ))}
          <Total>
            <span>Total a Pagar</span>
            <span>R$ {total.toFixed(2)}</span>
          </Total>
        </ResumoContainer>

        {erro && <ErrorMsg>{erro}</ErrorMsg>}

        {metodo === "pix" ? (
          <FinalizarBtn type="button" disabled={enviando} onClick={handleSubmitPix}>
            {enviando ? "Processando..." : "Gerar QR Code PIX"}
          </FinalizarBtn>
        ) : (
          <FinalizarBtn
            type="submit"
            form="form-cartao"
            disabled={enviando || !mpReady}
          >
            {!mpReady
              ? "Carregando formulário..."
              : enviando
              ? "Processando..."
              : metodo === "debito"
              ? "Pagar no Débito"
              : "Pagar no Crédito"}
          </FinalizarBtn>
        )}
      </CheckoutBox>
    </Container>
  );
}