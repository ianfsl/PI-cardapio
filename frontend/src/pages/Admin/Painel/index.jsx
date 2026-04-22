import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import {
  Container,
  Cabecalho,
  Titulo,
  BotaoSair,
  BotaoAdicionar,
  TabelaProdutos,
  ProdutoItem,
  ProdutoNome,
  Acoes,
  BotaoEditar,
  BotaoDeletar,
  Modal,
  ModalCard,
  ModalTitulo,
  Form,
  Label,
  Input,
  Select,
  BotoesModal,
} from "./styles";

const produtoVazio = {
  nomeProduto: "",
  valorProduto: "",
  categoriaId: "",
  imagem: "",
};

export default function Painel() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [form, setForm] = useState(produtoVazio);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchDados = async () => {
    try {
      const [resProdutos, resCategorias] = await Promise.all([
        axios.get(`${API_URL}/produtos`),
        axios.get(`${API_URL}/categorias`),
      ]);
      setProdutos(resProdutos.data);
      setCategorias(resCategorias.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  const handleSair = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const abrirModalNovo = () => {
    setProdutoEditando(null);
    setForm(produtoVazio);
    setModalAberto(true);
  };

  const abrirModalEditar = (produto) => {
    setProdutoEditando(produto);
    setForm({
      nomeProduto: produto["Nome do produto"],
      valorProduto: produto["Valor do produto"],
      categoriaId: produto.idCategoria,
      imagem: produto.imagem || "",
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setForm(produtoVazio);
    setProdutoEditando(null);
  };

  const handleSalvar = async () => {
    try {
      if (produtoEditando) {
        await axios.put(
          `${API_URL}/produtos/${produtoEditando.idProduto}`,
          form,
          { headers },
        );
      } else {
        await axios.post(`${API_URL}/produtos`, form, { headers });
      }
      fecharModal();
      fetchDados();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;
    try {
      await axios.delete(`${API_URL}/produtos/${id}`, { headers });
      fetchDados();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <Container>
      <Cabecalho>
        <Titulo>Painel Admin</Titulo>
        <BotaoSair onClick={handleSair}>Sair</BotaoSair>
      </Cabecalho>

      <BotaoAdicionar onClick={abrirModalNovo}>+ Novo Produto</BotaoAdicionar>

      <TabelaProdutos>
        {produtos.map((produto) => (
          <ProdutoItem key={produto.idProduto}>
            <ProdutoNome>
              <h3>{produto["Nome do produto"]}</h3>
              <span>
                R$ {parseFloat(produto["Valor do produto"]).toFixed(2)}
              </span>
            </ProdutoNome>
            <Acoes>
              <BotaoEditar onClick={() => abrirModalEditar(produto)}>
                Editar
              </BotaoEditar>
              <BotaoDeletar onClick={() => handleDeletar(produto.idProduto)}>
                Deletar
              </BotaoDeletar>
            </Acoes>
          </ProdutoItem>
        ))}
      </TabelaProdutos>

      {modalAberto && (
        <Modal>
          <ModalCard>
            <ModalTitulo>
              {produtoEditando ? "Editar Produto" : "Novo Produto"}
            </ModalTitulo>
            <Form>
              <Label>
                Nome do produto
                <Input
                  type="text"
                  value={form.nomeProduto}
                  onChange={(e) =>
                    setForm({ ...form, nomeProduto: e.target.value })
                  }
                />
              </Label>
              <Label>
                Valor
                <Input
                  type="number"
                  step="0.01"
                  value={form.valorProduto}
                  onChange={(e) =>
                    setForm({ ...form, valorProduto: e.target.value })
                  }
                />
              </Label>
              <Label>
                Categoria
                <Select
                  value={form.categoriaId}
                  onChange={(e) =>
                    setForm({ ...form, categoriaId: e.target.value })
                  }
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat["Nome da categoria"]}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                URL da imagem
                <Input
                  type="text"
                  placeholder="https://..."
                  value={form.imagem}
                  onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                />
              </Label>
              <BotoesModal>
                <button onClick={handleSalvar}>Salvar</button>
                <button onClick={fecharModal}>Cancelar</button>
              </BotoesModal>
            </Form>
          </ModalCard>
        </Modal>
      )}
    </Container>
  );
}
