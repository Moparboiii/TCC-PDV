import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import Modal from "../components/Modal";


const TelaVendaPage = () => {
  const [productIdInput, setProductIdInput] = useState('');
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [soldOrders, setSoldOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let classe1 = document.querySelector("#mudal");

  const aparecer = (classe1) => {

    classe1.classList.remove("hidden")
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  };

  const handleProductIdInputChange = (event) => {
    setProductIdInput(event.target.value);
  };

  const addProductToCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/produto/${productIdInput}`);
      const fetchedProduct = response.data;

      setSoldOrders([]);
      closeModal();

      if (fetchedProduct) {
        const updatedCart = [...cart, fetchedProduct];
        setCart(updatedCart);
        setProductIdInput(''); // Limpar o input
      }
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  };

  const completeSale = () => {
    if (cart.length > 0) {
      setSoldOrders([...soldOrders, cart]);
      openModal(); // Abrir o modal
    }
  };

  const getTotalSaleValue = () => {
    const total = cart.reduce((sum, product) => sum + parseFloat(product.preco), 0);
    return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
  };

  return (

    <div className="flex justify-center items-center">

      <NavbarComp />

      <div id="mudal" className="absolute top-[200px] right-[300px] z-20 bg-purple-300 w-[50%] h-[50%] rounded-2xl hidden">
        <div className="flex justify-center items-center flex-col">
          <h2>Resumo da Venda:</h2>
          <ul className="w-full">
            {soldOrders.map((order, index) => (
              <li key={index} className="w-full bg-red-400">
                {order.map((product) => (
                  <div key={product.id_produto} className="flex justify-around w-full bg-orange-300">
                    <div id="nomes" className="w-[30%]">
                      {product.nome}
                    </div>
                    <div id="precos" className="w-[30%]">
                      R${product.preco}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <div id="totais" className="absolute bottom-12"> Total da venda: R${getTotalSaleValue()}</div>
          <button className="w-[30%] h-[10%] border-solid border-2 border-indigo-500/100 bg-gradient-to-br from-indigo-400 rounded-lg shadow-xl hover:animate-jump bottom-0 absolute ">
            Concluir Venda
          </button>
        </div>
      </div>

      <div id="tudao" className="w-4/5 h-screen flex justify-center items-center flex-col bg-blue-500">
        <div className="pt1 bg-red-100 w-full h-2/3 flex justify-around relative">
          <div id="Codigos produtos" className=" flex justify-center items-center w-1/3" >
            <div className="bg-purple-200 absolute top-0 text-center">
              Código
            </div>
            <div className="flex flex-col justify-center items-center">
              {cart.map((product) => (
                <ul>
                  <li className="  w-full" key={product.id_produto}>
                    <li> {product.id_produto}</li>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <div id="Codigos produtos" className=" flex justify-center items-center w-1/3" >
            <div className="bg-purple-200 absolute top-0 text-center">
              Nome
            </div>
            <div className="flex flex-col justify-center items-center">
              {cart.map((product) => (
                <ul>
                  <li className="  w-full" key={product.id_produto}>
                    <li> {product.nome}</li>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <div id="Codigos produtos" className=" flex justify-center items-center w-1/3" >
            <div className="bg-purple-200 absolute top-0 text-center">
              Preço
            </div>
            <div className="flex flex-col justify-center items-center">
              {cart.map((product) => (
                <ul>
                  <li className="  w-full" key={product.id_produto}>
                    <li> {product.preco}</li>
                  </li>
                </ul>
              ))}
            </div>
          </div>

        </div>

        <div className="pt2 w-full bg-blue-600 h-1/3 flex flex-col items-center justify-around relative">
          <div className="h-1/5 bg-orange-600 w-full flex items-center justify-center">
            <input
              type="text"
              placeholder="Digite o ID do produto"
              value={productIdInput}
              onChange={handleProductIdInputChange}
            />
            <button onClick={addProductToCart}>Adicionar ao Carrinho</button>

            <button className="ml-11" onClick={() => {
              completeSale()
              aparecer(classe1);
            }}>Prosseguir Venda</button>
          </div>

        
        </div>
      </div>


    </div>
  );
};

export default TelaVendaPage;