import React, { useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import CardProducts from '../components/cards/CardProducts';
import SalesModal from '../components/modals/SaleModal';
import IMGMinus from '../assets/minus.png'

const TelaVendaPage = () => {
    const [productIdInput, setProductIdInput] = useState('');
    const [cart, setCart] = useState([]);
    const [soldOrders, setSoldOrders] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("-");
    const [itemTotal, setItemTotal] = useState(0.00); // Estado para a quantidade do item selecionado
    const [quantities, setQuantities] = useState({});   // Use o estado para rastrear a quantidade de cada produto no carrinho
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [totalVenda, setTotalVenda] = useState(0)

    function exitmodal() {
        setIsModalOpen(false)
    }

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
            setSoldOrders((prevSoldOrders) => {
                const updatedSoldOrders = cart.reduce((acc, cartItem) => {
                    const newQuantity = quantities[cartItem.id_produto] || 0;

                    if (newQuantity > 0) {
                        // Adicionar ou atualizar apenas se a quantidade for maior que zero
                        const existingSoldItem = prevSoldOrders.find((soldItem) => soldItem.id_produto === cartItem.id_produto);

                        if (!existingSoldItem) {
                            // Se o item não existir no soldOrders, adicioná-lo
                            acc.push({
                                ...cartItem,
                                quantidade: newQuantity,
                            });
                        } else {
                            // Se o item já existir no soldOrders, atualizar a quantidade
                            existingSoldItem.quantidade = newQuantity;
                        }
                    } else {
                        // Remover o item se a quantidade for zero
                        acc = acc.filter((item) => item.id_produto !== cartItem.id_produto);
                    }

                    return acc;
                }, []);

                return updatedSoldOrders;
            });

            setIsModalOpen(true)

            // Limpar o carrinho de compras após a venda
            //setCart([]);
        }
    };

    const finishSale = async () => {
        // Se houver alterações no carrinho, atualize soldOrders

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        if (cart.length > 0) {
            // Construa o objeto com os detalhes da venda
            const vendaData = {
                itens: soldOrders, // Array de itens do carrinho
                data_hora: formattedDate, // Data/hora da venda
                valor_total: +getTotalOrderValue(), // Valor total do carrinho
            };

            try {
                // Faça uma solicitação POST para registrar a venda no servidor
                const response = await axios.post('http://localhost:5000/registrar-venda', vendaData);

                if (response.status === 201) {
                    alert('Venda registrada com sucesso!');
                    // Limpe os dados da venda, como itens selecionados, valor total, etc.
                    setSoldOrders([]);
                    setProductIdInput('');
                    setItemTotal("0,00");
                    setQuantities({});
                    setIsModalOpen(false)
                    setCart([])
                    selectedProductName = ''

                } else {
                    alert('Erro ao registrar a venda.');
                }
            } catch (error) {
                console.error('Erro ao registrar a venda:', error);
                alert('Erro ao registrar a venda. Verifique o console para detalhes.');
            }
        } else {
            alert('Carrinho vazio. Adicione itens ao carrinho antes de prosseguir.');
        }
    };

    const getTotalProductValue = () => {
        const totalVenda = itemTotal * quantities[selectedItemId];
        setTotalVenda(totalVenda.toFixed(2)); // Atualizar o estado aqui

        if (isNaN(totalVenda)) {
            return "0,00";
        }
        return totalVenda.toFixed(2);
    };


    const getTotalOrderValue = () => {
        const total = soldOrders.reduce((sum, item) => {
            const itemTotal = item.preco * (quantities[item.id_produto] || 0);
            return sum + itemTotal;
        }, 0);

        return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
    }

    const getTotalCartValue = () => {
        const total = cart.reduce((sum, item) => {
            const itemTotal = item.preco * (quantities[item.id_produto] || 0);
            return sum + itemTotal;
        }, 0);

        return total.toFixed(2); // Formatar o resultado para ter 2 casas decimais
    }

    const selectedProduct = cart.find((product) => product.id_produto === selectedItemId);
    let selectedProductName = selectedProduct ? selectedProduct.nome : '';

    const removeItemFromCart = (itemId) => {
        // Verifique se o item está no carrinho
        const isInCart = cart.some((product) => product.id_produto === itemId);

        if (isInCart) {
            // Verifique a quantidade atual do item
            const currentQuantity = quantities[itemId] || 0;

            if (currentQuantity > 1) {
                // Se a quantidade for maior que 1, apenas atualize a quantidade
                setQuantities({
                    ...quantities,
                    [itemId]: currentQuantity - 1,
                });
            } else {
                // Se a quantidade for 1, remova completamente o item do carrinho
                const updatedCart = cart.filter((product) => product.id_produto !== itemId);
                setCart(updatedCart);

                // Remova a quantidade do produto do estado
                const { [itemId]: removedQuantity, ...updatedQuantities } = quantities;
                setQuantities(updatedQuantities);
            }
        }
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center p-3">

            <NavbarComp id='navibar' />

            {isModalOpen &&
                <SalesModal id='mudal' onClick1={() => { finishSale() }} onClick2={() => { exitmodal() }} TotalValue={getTotalOrderValue().replace(".", ",")}>
                    {soldOrders.map((product) => (
                        <ul className="flex w-full justify-around border-dashed border-b-2 border-black" key={product.id} onClick={() => toggleItemSelection(product.id)}>
                            <li className="text-center w-1/3 border-dashed border-r-2 border-black"> {product.nome}</li>
                            <li className="text-center w-1/3 border-dashed border-r-2 border-black"> {product.preco}</li>
                            <li className="text-center w-1/3"> {quantities[product.id_produto]}</li> {/* Exiba a quantidade aqui */}
                        </ul>
                    ))}
                </SalesModal>
            }

            <div id='conteudo' className="w-4/5 h-full flex justify-center items-center flex-col bg-[#d9d9d9] rounded-xl border-[1px] shadow-2xl p-4">
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
                        <CardProducts name={'Valor Total'} code={getTotalCartValue().replace(".", ",")} className="" />
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
                                    className={`cursor-pointer flex w-full justify-around relative ${selectedItemId === product.id_produto ? "border-[2px] border-[#333333]" : ""}`}
                                    key={product.id_produto}
                                    onClick={() => toggleItemSelection(product.id_produto)}
                                >
                                    <li className="text-center w-1/3"> {product.id_produto}</li>
                                    <li className="text-center w-1/3"> {product.nome}</li>
                                    <li className="text-center w-1/3"> {product.preco}</li>
                                    <button
                                        className="h-1/2 text-white px-2 py-1 rounded absolute right-0"
                                        onClick={() => removeItemFromCart(product.id_produto)}
                                    >
                                        <img src={IMGMinus} alt="" className="w-5 h-5" />

                                    </button>
                                </ul>
                            ))}
                            <div className="absolute bottom-0 left-64 h-12 w-[30%]">
                                {cart.length > 0 && (
                                    <button
                                        id="BtnProsseguir"
                                        className='w-full h-full flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white'
                                        onClick={() => {
                                            completeSale();
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

export default TelaVendaPage;