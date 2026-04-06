import { useState } from "react";
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

const mockCategorias = [
  { idCategoria: 1, nomeCategoria: "Lanches" },
  { idCategoria: 2, nomeCategoria: "Bebidas" },
  { idCategoria: 3, nomeCategoria: "Adicionais" },
];

const mockProdutos = [
  {
    idProduto: 1,
    nomeProduto: "Big Gula Clássico",
    valorProduto: 22.9,
    idCategoria: 1,
    imagem:
      "https://controlenamao.com.br/blog/wp-content/uploads/2025/05/Hamburguer-Tradicional.webp",
  },
  {
    idProduto: 2,
    nomeProduto: "X-Bacon",
    valorProduto: 25.9,
    idCategoria: 1,
    imagem: "https://vocegastro.com.br/app/uploads/2021/11/x-bacon.jpg",
  },
  {
    idProduto: 3,
    nomeProduto: "X-Salada",
    valorProduto: 20.9,
    idCategoria: 1,
    imagem:
      "https://static.codepill.com.br/domains/7e4e09e5-31af-44d5-bd1e-428319709832/products/gallery_6a868b45-ddf4-4a4f-b030-dd9172b363fb.jpg",
  },
  {
    idProduto: 4,
    nomeProduto: "Coca-Cola 350ml",
    valorProduto: 6.0,
    idCategoria: 2,
    imagem:
      "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/15962/medium/refrigerante-coca-cola-350ml_125680.jpg",
  },
  {
    idProduto: 5,
    nomeProduto: "Suco de Laranja",
    valorProduto: 8.0,
    idCategoria: 2,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPGQrqWDEthzM7oyKPXHpDO7hunwbJQBxjw&s",
  },
  {
    idProduto: 6,
    nomeProduto: "Bacon Extra",
    valorProduto: 4.0,
    idCategoria: 3,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyT0se58dgFiYBTa8zvEhepXUe3fi1CXv2cg&s",
  },
];

export default function Cardapio() {
  const [produtos] = useState(mockProdutos);
  const [categorias] = useState(mockCategorias);
  const { adicionarItem } = useCarrinho();

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
              <CategoriaTitulo>{categoria.nomeCategoria}</CategoriaTitulo>
              {produtosDaCategoria.map((produto) => (
                <ProdutoCard key={produto.idProduto}>
                  <ProdutoInfo>
                    <h3>{produto.nomeProduto}</h3>
                    <span>
                      R$ {parseFloat(produto.valorProduto).toFixed(2)}
                    </span>
                    <br />
                    <AdicionarBtn onClick={() => adicionarItem(produto)}>
                      + Adicionar
                    </AdicionarBtn>
                  </ProdutoInfo>
                  {produto.imagem && (
                    <ProdutoImagem
                      src={produto.imagem}
                      alt={produto.nomeProduto}
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
