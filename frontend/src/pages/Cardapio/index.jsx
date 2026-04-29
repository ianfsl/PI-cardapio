import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import { useCarrinho } from "../../context/CarrinhoContext";
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

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
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

        const adicionaisFormatados = resAdicionais.data.map((a) => ({
          idProduto: `adicional-${a.idAdicional}`,
          NomeProduto: a.NomeProdutoAdicional,
          ValorProduto: a.ValorExtra,
          ImagemProdutos: a.ImagemProdutosAdicionais,
          idCategoria: a.idCategoria,
        }));

        setProdutos([...resProdutos.data, ...adicionaisFormatados]);
        setCategorias(resCategorias.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErro("Erro ao carregar o cardápio. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

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
        <img
          src="https://images.unsplash.com/photo-1550317138-10000687a72b?w=2000"
          alt="Big Gula"
        />
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
                        adicionarItem({
                          idProduto: produto.idProduto,
                          nomeProduto: produto.NomeProduto,
                          valorProduto: parseFloat(produto.ValorProduto),
                        })
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
    </Container>
  );
}
