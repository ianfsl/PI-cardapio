import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import {
  Container,
  Card,
  Titulo,
  Form,
  Label,
  Input,
  BotaoLogin,
  Erro,
} from "./styles";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      const response = await axios.post(`${API_URL}/admin/login`, {
        email,
        senha,
      });

      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/painel");
    } catch (error) {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container>
      <Card>
        <Titulo>🍔 Admin — Big Gula</Titulo>
        <Form>
          <Label>
            E-mail
            <Input
              type="email"
              placeholder="admin@biggula.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          <Label>
            Senha
            <Input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Label>
          {erro && <Erro>{erro}</Erro>}
          <BotaoLogin onClick={handleLogin} disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </BotaoLogin>
        </Form>
      </Card>
    </Container>
  );
}
