import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import { useCarrinho } from "../../context/CarrinhoContext";
import ModalAdicionais from "./ModalAdicionais";
import {
  Container,
  Banner,
  Conteudo,
  CategoriaSection,
  CategoriaTitulo,
  ProdutoCard,
  ProdutoInfo,
  ProdutoImagem,
  AdicionarBtn,
} from "./styles";
import bannerBigGula from "../../assets/banner.jpg";

const CATEGORIAS_LANCHE = ["BIG", "Baby"];

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [adicionais, setAdicionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [produtoNoModal, setProdutoNoModal] = useState(null);
  const { adicionarItem } = useCarrinho();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setCarregando(true);
        const [resProdutos, resCategorias, resAdicionais] = await Promise.all([
          axios.get(`${API_URL}/produtos`),
          axios.get(`${API_URL}/categorias`),
          axios.get(`${API_URL}/adicionais`),
        ]);

        const adicionaisComoProdutos = resAdicionais.data.map((a) => ({
          idProduto: `adicional-${a.idAdicional}`,
          NomeProduto: a.NomeProdutoAdicional,
          ValorProduto: a.ValorExtra,
          ImagemProdutos: a.ImagemProdutosAdicionais,
          idCategoria: a.idCategoria,
        }));

        const adicionaisParaModal = resAdicionais.data.map((a) => ({
          idAdicional: a.idAdicional,
          nomeAdicional: a.NomeProdutoAdicional,
          valorExtra: parseFloat(a.ValorExtra),
        }));

        setProdutos([...resProdutos.data, ...adicionaisComoProdutos]);
        setCategorias(resCategorias.data);
        setAdicionais(adicionaisParaModal);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErro("Erro ao carregar o cardápio. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  const handleAdicionar = (produto, nomeCategoria) => {
    const dadosProduto = {
      idProduto: produto.idProduto,
      nomeProduto: produto.NomeProduto,
      valorProduto: parseFloat(produto.ValorProduto),
      categoria: nomeCategoria,
    };

    if (CATEGORIAS_LANCHE.includes(nomeCategoria)) {
      setProdutoNoModal(dadosProduto);
    } else {
      adicionarItem(dadosProduto);
    }
  };

  const handleConfirmarModal = (adicionaisSelecionados) => {
    adicionarItem(produtoNoModal, adicionaisSelecionados);
    setProdutoNoModal(null);
  };

  if (carregando) {
    return (
      <Container>
        <p style={{ padding: "2rem" }}>Carregando cardápio...</p>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container>
        <p style={{ padding: "2rem", color: "red" }}>{erro}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Banner>
        <img src={bannerBigGula} alt="Big Gula" />
      </Banner>

      <Conteudo>
        {categorias.map((categoria) => {
          const produtosDaCategoria = produtos.filter(
            (p) => p.idCategoria === categoria.idCategoria,
          );

          if (produtosDaCategoria.length === 0) return null;

          return (
            <CategoriaSection key={categoria.idCategoria}>
              <CategoriaTitulo>{categoria.NomeCategoria}</CategoriaTitulo>
              {produtosDaCategoria.map((produto) => (
                <ProdutoCard key={produto.idProduto}>
                  <ProdutoInfo>
                    <h3>{produto.NomeProduto}</h3>
                    <span>
                      R$ {parseFloat(produto.ValorProduto).toFixed(2)}
                    </span>
                    <br />
                    <AdicionarBtn
                      onClick={() =>
                        handleAdicionar(produto, categoria.NomeCategoria)
                      }
                    >
                      + Adicionar
                    </AdicionarBtn>
                  </ProdutoInfo>
                  {produto.ImagemProdutos && (
                    <ProdutoImagem
                      src={produto.ImagemProdutos}
                      alt={produto.NomeProduto}
                    />
                  )}
                </ProdutoCard>
              ))}
            </CategoriaSection>
          );
        })}
      </Conteudo>

      {produtoNoModal && (
        <ModalAdicionais
          produto={produtoNoModal}
          adicionaisDisponiveis={adicionais}
          onCancelar={() => setProdutoNoModal(null)}
          onConfirmar={handleConfirmarModal}
        />
      )}
    </Container>
  );
}
