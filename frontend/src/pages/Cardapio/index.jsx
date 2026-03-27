import { useState } from "react";
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
    imagem: "https://via.placeholder.com/110",
  },
  {
    idProduto: 2,
    nomeProduto: "X-Bacon",
    valorProduto: 25.9,
    idCategoria: 1,
    imagem: "https://via.placeholder.com/110",
  },
  {
    idProduto: 3,
    nomeProduto: "X-Salada",
    valorProduto: 20.9,
    idCategoria: 1,
    imagem: "https://via.placeholder.com/110",
  },
  {
    idProduto: 4,
    nomeProduto: "Coca-Cola 350ml",
    valorProduto: 6.0,
    idCategoria: 2,
    imagem: "https://via.placeholder.com/110",
  },
  {
    idProduto: 5,
    nomeProduto: "Suco de Laranja",
    valorProduto: 8.0,
    idCategoria: 2,
    imagem: "https://via.placeholder.com/110",
  },
  {
    idProduto: 6,
    nomeProduto: "Bacon Extra",
    valorProduto: 4.0,
    idCategoria: 3,
    imagem: "https://via.placeholder.com/110",
  },
];

export default function Cardapio() {
  const [produtos] = useState(mockProdutos);
  const [categorias] = useState(mockCategorias);

  return (
    <Container>
      <Banner>
        <img src="" alt="Big Gula" />
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
                    <AdicionarBtn>+ Adicionar</AdicionarBtn>
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
