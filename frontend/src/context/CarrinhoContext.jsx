import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

const mesmosAdicionais = (adA = [], adB = []) => {
  if (adA.length !== adB.length) return false;
  const idsA = adA.map((a) => a.idAdicional).sort();
  const idsB = adB.map((a) => a.idAdicional).sort();
  return idsA.every((id, i) => id === idsB[i]);
};

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarItem = (produto, adicionais = []) => {
    setItens((prev) => {
      const itemIgual = prev.find(
        (i) =>
          i.idProduto === produto.idProduto &&
          mesmosAdicionais(i.adicionais, adicionais),
      );

      if (itemIgual) {
        return prev.map((i) =>
          i.idItem === itemIgual.idItem
            ? { ...i, quantidade: i.quantidade + 1 }
            : i,
        );
      }

      return [
        ...prev,
        {
          ...produto,
          idItem: `${produto.idProduto}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          adicionais,
          quantidade: 1,
        },
      ];
    });
  };

  const removerItem = (idItem) => {
    setItens((prev) => prev.filter((i) => i.idItem !== idItem));
  };

  const alterarQuantidade = (idItem, quantidade) => {
    if (quantidade <= 0) {
      removerItem(idItem);
      return;
    }
    setItens((prev) =>
      prev.map((i) => (i.idItem === idItem ? { ...i, quantidade } : i)),
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const valorDoItem = (item) => {
    const valorAdicionais = item.adicionais.reduce(
      (acc, a) => acc + a.valorExtra,
      0,
    );
    return (item.valorProduto + valorAdicionais) * item.quantidade;
  };

  const total = itens.reduce((acc, item) => acc + valorDoItem(item), 0);

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
        valorDoItem,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
