import React, { useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";

const TelaVendaPage = () => {
  let classe1 = document.querySelector("#BtnProsseguir");
  let classe2 = document.querySelector("#mudal");
  const [productIdInput, setProductIdInput] = useState('');
  const [cart, setCart] = useState([]);
  const [soldOrders, setSoldOrders] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("-");
  const [selectedItemQuantity, setSelectedItemQuantity] = useState("-"); // Estado para a quantidade do item selecionado
  const [itemTotal, setItemTotal] = useState("0,00"); // Estado para a quantidade do item selecionado

  const aparecer = (classe1) => {
    classe1.classList.remove("hidden")
  };

  const sumir = (classe1) => {
    classe1.classList.add("hidden")
  };

  const handleProductIdInputChange = (event) => {
    setProductIdInput(event.target.value);
  };

  const addProductToCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/produto/${productIdInput}`);
      const fetchedProduct = response.data;

      setSoldOrders([]);
      setItemTotal(itemTotal + itemTotal)
      aparecer(classe1)

      if (fetchedProduct) {
        // Verifica se o produto já está no carrinho
        const existingProductIndex = cart.findIndex((item) => item.id_produto === fetchedProduct.id_produto);

        if (existingProductIndex !== -1) {
          // O produto já está no carrinho, atualize a quantidade
          const updatedCart = [...cart];
          updatedCart[existingProductIndex].quantidade += 1; // Atualize a quantidade
          setCart(updatedCart);
        } else {
          // O produto não está no carrinho, adicione-o
          const updatedCart = [...cart, { ...fetchedProduct, quantidade: 1 }];
          setCart(updatedCart);
        }

        // Define o item recém-adicionado como selecionado
        toggleItemSelection(fetchedProduct.id_produto)

        setProductIdInput(''); // Limpar o input
      }
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  };

  const toggleItemSelection = (itemId) => {
    if (selectedItemId === itemId) {
      // Se o item já está selecionado, desmarque-o
      setSelectedItemId(itemId);
    } else {
      // Caso contrário, marque o novo item como selecionado
      setSelectedItemId(itemId);
    }

    // Atualize a quantidade do item selecionado
    const selectedProduct = cart.find((product) => product.id_produto === itemId);
    if (selectedProduct) {
      setSelectedItemQuantity(selectedProduct.quantidade || 0);
      setItemTotal(selectedProduct.quantidade * selectedProduct.preco || selectedProduct.preco)
    } else {
      setSelectedItemQuantity(1);
      setItemTotal(0); // Use 0 como padrão para o valor total
    }
  };

  const completeSale = () => {
    if (cart.length > 0) {
      // Adicionar os itens do carrinho à variável de itens vendidos
      setSoldOrders((prevSoldOrders) => [...prevSoldOrders, ...cart]);

      // Limpar o carrinho de compras após a venda
      setCart([]);
    }
  };

  const finishSale = () => {
    setSoldOrders([]);
    setSelectedItemQuantity("-")
    setSelectedItemId("-")
    getTotalSaleValue("-")
    setItemTotal("-")
  }

  const calculateAllItemsTotal = (item) => {
    return item.preco * item.quantidade;
  };

  const getTotalSaleValue = () => {
    const total = cart.reduce((sum, item) => {
      return sum + calculateAllItemsTotal(item);
    }, 0);

    return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
  }
  const getTotalOrderValue = () => {
    const total = soldOrders.reduce((sum, item) => {
      return sum + calculateAllItemsTotal(item);
    }, 0);

    return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
  }

  return (
    <div className="flex justify-center items-center">

      <NavbarComp />

      <div id="mudal" className="absolute top-[200px] right-[300px] z-20 bg-slate-400 w-[50%] h-[50%] rounded-2xl text-center border-solid border-8 border-black hidden">
        <h2 className="text-2xl border-dashed border-b-2 border-black">Resumo da Venda:</h2>
        <div className="flex justify-center items-center w-full h-[93%] ">
          <div id="SoldProducts" className="flex justify-center items-center bg-slate-400 w-1/2 h-full flex-col rounded-bl-3xl">
            <div id="titulo-sold" className="flex bg-yellow-300 w-full justify-around">
              <h1 className="text-xl text-center w-1/2"> Produto </h1> <h1 className="text-xl w-1/2 text-center"> Valor </h1>
            </div>
            <div id="itens-sold" className="w-full overflow-auto h-full border-dashed border-b-2 border-r-2 border-l-2 border-black">
              {soldOrders.map((product) => (
                <ul className="flex w-full justify-around border-dashed border-b-2 border-black" key={product.id} onClick={() => toggleItemSelection(product.id)}>
                  <li className="text-center w-1/2 border-dashed border-r-2 border-black"> {product.nome}</li>
                  <li className="text-center w-1/2"> {product.preco}</li>
                </ul>
              ))}
            </div>
          </div>
          <div id="FinishOrder" className="bg-slate-400 w-1/2 h-full flex justify-center items-center flex-col gap-20 rounded-br-3xl">
            <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[80%] h-[50%] flex flex-col items-center rounded-2xl">
              <h1 className="text-3xl text-center"> Valor Total da venda </h1>
              <h2 className="text-3xl mt-20">R$ {getTotalOrderValue().replace(".", ",")}</h2>
            </div>
            <button className="bg-gradient-to-br from-indigo-500 rounded-full w-[70%] h-[10%]" onClick={() => {sumir(classe2); finishSale()}}>Finalizar Venda</button>
          </div>
        </div>
      </div>

      <div id="tudao" className="w-4/5 h-screen flex justify-center items-center flex-col bg-slate-400 ">
        <div id="outrora" className="relative w-full h-2/3 ">
          <div className="pt1 flex justify-center items-center w-[40%] h-full absolute left-0 top-0">
            <div id="CartProducts" className="flex justify-center items-center border-dashed border-b-2 border-r-2 border-black w-full h-full flex-col">
              <div id="titulo-cart" className="flex bg-yellow-300 w-full justify-around">
                <h1 className="text-xl text-center w-1/3"> ID </h1>
                <h1 className="text-xl text-center w-1/3"> Nome </h1>
                <h1 className="text-xl text-center w-1/3"> Valor </h1>
              </div>
              <div id="itens-cart" className="w-full overflow-auto h-full">
                {cart.map((product) => (
                  <ul
                    className={`cursor-pointer flex w-full justify-around ${selectedItemId === product.id_produto ? "bg-blue-200" : ""}`}
                    key={product.id_produto}
                    onClick={() => toggleItemSelection(product.id_produto)}
                  >
                    <li className="text-center w-1/3"> {product.id_produto}</li>
                    <li className="text-center w-1/3"> {product.nome}</li>
                    <li className="text-center w-1/3"> {product.preco}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[28%] h-[40%] absolute top-8 right-[30rem] flex flex-col items-center rounded-2xl">
            <h1 className="text-3xl text-center"> Código </h1>
            <h2 className="text-2xl mt-24"> {selectedItemId !== null ? selectedItemId : ""} </h2>
          </div>

          <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[28%] h-[40%] absolute top-8 right-2 flex flex-col items-center rounded-2xl">
            <h1 className="text-3xl text-center"> Quantidade </h1>
            <h2 className="text-2xl mt-24">{selectedItemQuantity}</h2>
          </div>

          <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[28%] h-[40%] absolute bottom-8 right-[30rem] flex flex-col items-center rounded-2xl">
            <h1 className="text-3xl text-center"> Valor Total </h1>
            <h2 className="text-2xl mt-24">R$ {getTotalSaleValue().replace(".", ",")}</h2>
          </div>

          <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[28%] h-[40%] absolute bottom-8 right-2 flex flex-col items-center rounded-2xl">
            <h1 className="text-3xl text-center"> Valor Total Unitário </h1>
            <h2 className="text-2xl mt-24">R$ {itemTotal}</h2>
          </div>

        </div>

        <div className="pt2 w-full bg-blue-600 h-1/3 flex flex-col items-center justify-around">
          <div className="h-1/5 bg-orange-600 w-full flex items-center justify-center">
            <input
              type="text"
              placeholder="Digite o ID do produto"
              value={productIdInput}
              onChange={handleProductIdInputChange}
            />
            <button onClick={addProductToCart}>Adicionar ao Carrinho</button>

            <button id="BtnProsseguir" className="ml-11 hidden" onClick={() => {
              completeSale()
              aparecer(classe2);
            }}>Prosseguir Venda</button>
          </div>


        </div>
      </div>


    </div>
  );
};

export default TelaVendaPage;