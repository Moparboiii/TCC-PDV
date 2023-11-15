import React, { useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import CardProducts from './../components/cards/CardProducts';

const TelaVendaPage2 = () => {
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

    const addProductToCart = async (event) => {
        if (event.key === "Enter") {
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

    const selectedProduct = cart.find((product) => product.id_produto === selectedItemId);
    const selectedProductName = selectedProduct ? selectedProduct.nome : '';

    return (
        <div className="flex w-screen h-screen justify-center items-center p-3">

            <NavbarComp />


            <div id="mudal" className="absolute top-[250px] right-[350px] z-20 bg-[#BED5DD] w-[50%] h-[50%] rounded-2xl text-center border-solid border-8 border-black hidden">
                <h2 className="text-2xl border-dashed border-b-2 border-black">Resumo da Venda:</h2>
                <div className="flex justify-center items-center w-full h-[93%] ">
                    <div id="SoldProducts" className="flex justify-center items-center bg-[#BED5DD] w-1/2 h-full flex-col rounded-bl-3xl">
                        <div id="titulo-sold" className="flex bg-yellow-300 w-full justify-around">
                            <h1 className="text-xl w-1/3 text-center"> Produto </h1>
                            <h1 className="text-xl w-1/3 text-center"> Valor </h1>
                            <h1 className="text-xl w-1/3 text-center"> Quantidade </h1> {/* Adicione este item */}
                        </div>
                        <div id="itens-sold" className="w-full overflow-auto h-full border-dashed border-b-2 border-r-2 border-l-2 border-black">
                            {soldOrders.map((product) => (
                                <ul className="flex w-full justify-around border-dashed border-b-2 border-black" key={product.id} onClick={() => toggleItemSelection(product.id)}>
                                    <li className="text-center w-1/3 border-dashed border-r-2 border-black"> {product.nome}</li>
                                    <li className="text-center w-1/3 border-dashed border-r-2 border-black"> {product.preco}</li>
                                    <li className="text-center w-1/3"> {quantities[product.id_produto]}</li> {/* Exiba a quantidade aqui */}
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div id="FinishOrder" className="bg-[#BED5DD] w-1/2 h-full flex justify-center items-center flex-col gap-20 rounded-br-3xl">
                        <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] w-[80%] h-[50%] flex flex-col items-center rounded-2xl">
                            <h1 className="text-3xl text-center"> Valor Total da venda </h1>
                            <h2 className="text-3xl mt-20">R$ {getTotalOrderValue().replace(".", ",")}</h2>
                        </div>
                        <button className="bg-gradient-to-br from-indigo-500 rounded-full w-[70%] h-[10%]" onClick={() => { sumir(classe2); finishSale() }}>Finalizar Venda</button>
                    </div>
                </div>
            </div>


            <div className="w-4/5 h-full flex justify-center items-center flex-col bg-[#d9d9d9] rounded-xl border-[1px] shadow-2xl p-4">
                <div className="bg-[#226777] w-full h-1/5 rounded-[10px] flex justify-center items-center">
                    <h1 className="text-white text-5xl">{selectedProductName}</h1>

                </div>
                <div className="h-4/5 flex items-center justify-between w-full p-5">

                    <div className="w-fit flex flex-col h-[80%]">
                        <CardProducts
                            name={'Código'}
                            className=""
                            code={<input
                                type="text"
                                placeholder="Digite o código"
                                value={productIdInput}
                                onChange={handleProductIdInputChange}
                                className="w-full"
                                onKeyDown={addProductToCart}
                            />}
                        />

                        <CardProducts name={'Quantidade'} code={quantities[selectedItemId]} className="" />
                        <CardProducts name={'Valor Total'} code={getTotalProductValue().replace(".", ",")} className="" />
                        <CardProducts name={'Valor unitário'} code={itemTotal} className="" />
                    </div>

                    <div id="CartProducts" className="flex justify-center items-center w-2/4 h-3/4 flex-col border-[8px] border-gray-400 p-2 rounded-xl ">
                        <div id="titulo-cart" className="flex bg-[#226777] text-white w-full justify-around">
                            <h1 className="text-lg font-medium text-center w-1/3"> ID </h1>
                            <h1 className="text-lg font-medium text-center w-1/3"> Nome </h1>
                            <h1 className="text-lg font-medium text-center w-1/3"> Valor </h1>
                        </div>
                        <div id="itens-cart" className="w-full overflow-auto h-full relative">
                            {cart.map((product) => (
                                <ul
                                    className={`cursor-pointer flex w-full justify-around ${selectedItemId === product.id_produto ? "border-[2px] border-[#333333]" : ""}`}
                                    key={product.id_produto}
                                    onClick={() => toggleItemSelection(product.id_produto)}
                                >
                                    <li className="text-center w-1/3"> {product.id_produto}</li>
                                    <li className="text-center w-1/3"> {product.nome}</li>
                                    <li className="text-center w-1/3"> {product.preco}</li>
                                </ul>
                            ))}
                            <div className="absolute bottom-0 left-64 h-12 w-[30%]">
                                {cart.length > 0 && (
                                    <button
                                        id="BtnProsseguir"
                                        className='w-full h-full flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white'
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
                    </div>

                </div>
            </div>

        </div>
    );
};

export default TelaVendaPage2;