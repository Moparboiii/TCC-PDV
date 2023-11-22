import React, { useState } from "react";
import axios from "axios";
import NavbarComp from "../../components/NavbarComp";
import CardProducts from "../../components/cards/CardProducts";
import SalesModal from '../../components/modals/SaleModal';

const TelaVendaPage = () => {
  let classe2 = document.querySelector("#mudal");
  const [productIdInput, setProductIdInput] = useState('');
  const [cart, setCart] = useState([]);
  const [soldOrders, setSoldOrders] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("-");
  //const [dataHora, setDataHora] = useState();
  const [itemTotal, setItemTotal] = useState(0.00); // Estado para a quantidade do item selecionado
  const [quantities, setQuantities] = useState({});   // Use o estado para rastrear a quantidade de cada produto no carrinho

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

      if (fetchedProduct) {
        const productId = fetchedProduct.id_produto;
        const currentQuantity = quantities[productId] || 0;

        setQuantities({
          ...quantities,
          [productId]: currentQuantity + 1,
        });

        const currentTotal = (currentQuantity + 1) * fetchedProduct.preco;

        setItemTotal(itemTotal + currentTotal);

        if (currentQuantity === 0) {
          // Adicione o produto ao carrinho apenas na primeira vez
          const updatedCart = [...cart, fetchedProduct];
          setCart(updatedCart);
        }

        toggleItemSelection(fetchedProduct.id_produto);
        setProductIdInput(''); // Limpar o input

        console.log(cart.length)
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

    // Atualize o valor total do item selecionado
    const selectedProduct = cart.find((product) => product.id_produto === itemId);
    if (selectedProduct) {
      setItemTotal(selectedProduct.quantidade * selectedProduct.preco || selectedProduct.preco)
    } else {
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

  const finishSale = async () => {
    // Construa o objeto com os detalhes da venda
    const vendaData = {
      itens: soldOrders, // Array de itens vendidos
      valorTotal: +getTotalOrderValue(), // Valor total da venda
      DataHora: new Date(), // Data/hora da venda
    };

    // if (!cart.length) {
    //   alert('Por favor, selecione itens e insira o valor da venda.');
    //   return;
    // }

    try {
      // Faça uma solicitação POST para registrar a venda no servidor
      const response = await axios.post('http://localhost:6000/registrar-venda', vendaData);

      if (response.status === 201) {
        alert('Venda registrada com sucesso!');
        // Limpe os dados da venda, como itens selecionados, valor total, etc.
        setSoldOrders([]);
        setCart([]);
        setProductIdInput('');
        setItemTotal("0,00");
        setQuantities({});
        sumir(classe2);
      } else {
        alert('Erro ao registrar a venda.');
      }
    } catch (error) {
      console.error('Erro ao registrar a venda:', error);
      alert('Erro ao registrar a venda. Verifique o console para detalhes.');
    }
  };

  const getTotalProductValue = () => {
    const total = itemTotal * quantities[selectedItemId];
    return total.toFixed(2);
  }

  const getTotalOrderValue = () => {
    const total = soldOrders.reduce((sum, item) => {
      const itemTotal = item.preco * (quantities[item.id_produto] || 0);
      return sum + itemTotal;
    }, 0);

    return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center p-3 relative">

      <NavbarComp />

      <SalesModal />

      <div id="tudao" className="w-4/5 h-full flex justify-center items-center flex-col bg-[#E8F7FF] rounded-xl border-[1px] shadow-2xl p-4 ">

        <div id="outrora" className="relative w-full h-full flex flex-row justify-center items-center gap-3">
          <div className="pt1 flex justify-center items-center w-full h-full">
            <div id="CartProducts" className="flex justify-center items-center w-full h-full flex-col">
              <div id="titulo-cart" className="flex bg-yellow-300 w-full justify-around">
                <h1 className="text-xl text-center w-1/3"> ID </h1>
                <h1 className="text-xl text-center w-1/3"> Nome </h1>
                <h1 className="text-xl text-center w-1/3"> Valor </h1>
              </div>
              <div id="itens-cart" className="w-full overflow-auto h-full border-dashed border-b-2 border-r-2 border-l-2 border-black">
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

          <div className="pt2 w-full h-full flex flex-col justify-center items-center gap-4">

            <div className="outrora2 w-full h-1/3 flex flex-col items-center justify-around">

              <h1 className="text-5xl">Nova Venda</h1>

              <input
                type="text"
                placeholder="Digite o ID do produto"
                value={productIdInput}
                onChange={handleProductIdInputChange}
                className="text-black w-full text-xs bg-transparent pl-3 border-[1px] rounded-md h-10 border-[#333333]"
              />

              <div className="w-full h-1/3 flex flex-row justify-evenly items-center ">

                <button
                  onClick={addProductToCart}
                  className='w-[40%] h-1/2 flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white'>
                  Adicionar ao Carrinho
                </button>


                {cart.length > 0 && (
                  <button
                    id="BtnProsseguir"
                    className='w-[40%] h-1/2 flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white'
                    onClick={() => {
                      completeSale();
                      aparecer(classe2);
                    }}
                  >
                    Prosseguir Venda
                  </button>
                )}


              </div>

            </div>

            <div className="pt2 w-full h-2/3 grid grid-cols-2 gap-4">

              <CardProducts name={'Código'} code={selectedItemId !== null ? selectedItemId : ""} className="" />
              <CardProducts name={'Quantidade'} code={quantities[selectedItemId]} className="" />
              <CardProducts name={'Valor Total'} code={getTotalProductValue().replace(".", ",")} className="" />
              <CardProducts name={'Valor unitário'} code={itemTotal} className="" />

            </div>
          </div>
        </div>



      </div>


    </div>
  );
};

export default TelaVendaPage;