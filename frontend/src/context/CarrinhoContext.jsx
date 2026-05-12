import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarItem = (produto) => {
    setItens((prev) => {
      const itemExistente = prev.find((i) => i.idProduto === produto.idProduto);
      if (itemExistente) {
        return prev.map((i) =>
          i.idProduto === produto.idProduto
            ? { ...i, quantidade: i.quantidade + 1 }
            : i,
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerItem = (idProduto) => {
    setItens((prev) => prev.filter((i) => i.idProduto !== idProduto));
  };

  const alterarQuantidade = (idProduto, quantidade) => {
    if (quantidade <= 0) {
      removerItem(idProduto);
      return;
    }
    setItens((prev) =>
      prev.map((i) => (i.idProduto === idProduto ? { ...i, quantidade } : i)),
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const total = itens.reduce(
    (acc, item) => acc + item.valorProduto * item.quantidade,
    0,
  );

  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
        total,
        quantidadeTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
