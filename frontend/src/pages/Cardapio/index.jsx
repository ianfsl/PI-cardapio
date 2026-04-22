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
        const [resProdutos, resCategorias] = await Promise.all([
          axios.get(`${API_URL}/produtos`),
          axios.get(`${API_URL}/categorias`),
        ]);
        setProdutos(resProdutos.data);
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
          src="https://scontent.fqps4-1.fna.fbcdn.net/v/t39.30808-6/514415600_24380730981525099_7211097753478312869_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=17oaKxfQWhEQ7kNvwFH7pqw&_nc_oc=AdotpeC3RObD7sykh-D6FOx2I2avQnZLzhGWQJP3nfsWM0L-3z5cwAgW668K5lQ95eI&_nc_zt=23&_nc_ht=scontent.fqps4-1.fna&_nc_gid=7IojjFddYCQY3ToLih40zw&_nc_ss=7a389&oh=00_AfyKZSRA_f1VTrzkBiTH26MMEAIpNovWa2TOW06v12hslw&oe=69D1F159"
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
              <CategoriaTitulo>
                {categoria["Nome da categoria"]}
              </CategoriaTitulo>
              {produtosDaCategoria.map((produto) => (
                <ProdutoCard key={produto.idProduto}>
                  <ProdutoInfo>
                    <h3>{produto["Nome do produto"]}</h3>
                    <span>
                      R$ {parseFloat(produto["Valor do produto"]).toFixed(2)}
                    </span>
                    <br />
                    <AdicionarBtn
                      onClick={() =>
                        adicionarItem({
                          idProduto: produto.idProduto,
                          nomeProduto: produto["Nome do produto"],
                          valorProduto: parseFloat(produto["Valor do produto"]),
                        })
                      }
                    >
                      + Adicionar
                    </AdicionarBtn>
                  </ProdutoInfo>
                  {produto.imagem && (
                    <ProdutoImagem
                      src={produto.imagem}
                      alt={produto["Nome do produto"]}
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
