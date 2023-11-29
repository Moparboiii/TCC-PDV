import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import { format } from 'date-fns';
import ProductsModal from "../components/modals/ProductsModal";
import X from '../assets/icons8-x-50.png';

const TelaVendidosPage = () => {
    const [sales, setSales] = useState([]);
    const [selectedSaleId, setSelectedSaleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchVendas() {
            try {
                const response = await axios.get('http://localhost:5000/vendidos');
                setSales(response.data);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        }

        fetchVendas();
    }, []);

    async function toggleItemSelection(saleId) {
        setSelectedSaleId(saleId);
        setIsModalOpen(true);
        console.log('to doido', saleId);

        try {
            const response = await axios.get(`http://localhost:5000/vendidosById/${saleId}`);
            const items = response.data || [];
            setProdutos(Array.isArray(response.data) ? response.data : []);
            console.log(produtos)
            console.log(response.data)

        } catch (error) {
            console.error('Erro ao buscar detalhes dos itens vendidos:', error);
        }
    };


    const formatarData = (data) => {
        return format(new Date(data), 'dd/MM/yyyy HH:mm:ss');
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center p-3">
            <NavbarComp />

            <div id="tudao" className="w-4/5 h-full flex justify-between items-center flex-row bg-[#d9d9d9] rounded-xl border-[1px] shadow-2xl p-4">
                <div id="CartProducts" className="flex justify-center items-center w-full h-full flex-col border-[8px] border-gray-400 p-2 rounded-xl">
                    <div id="titulo-cart" className="flex bg-[#226777] text-white w-full justify-around">
                        <h1 className="text-xl text-center w-1/3"> ID Venda </h1>
                        <h1 className="text-xl text-center w-1/3"> Valor Total </h1>
                        <h1 className="text-xl text-center w-1/3"> Data e Hora </h1>
                    </div>
                    <div id="itens-cart" className="w-full overflow-auto h-full">
                        {sales.map((sale) => (
                            <ul className={`cursor-pointer flex w-full justify-around ${selectedSaleId === sale.id_venda ? "border-[2px] border-[#333333]" : ""}`}
                                key={sale.id_venda}
                                onClick={() => toggleItemSelection(sale.id_venda)}
                            >
                                <li className="text-center w-1/3 text-xl" > {sale.id_venda}</li>
                                <li className="text-center w-1/3 text-xl" > {sale.valor_total}</li>
                                <li className="text-center w-1/3 text-xl" > {formatarData(sale.data_hora)}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ProductsModal>
                    <button className="absolute top-5 right-6" onClick={() => setIsModalOpen(false)}>
                        <img src={X} alt="" className="w-6 h-6" />
                    </button>
                    <h3 className="text-2xl">ID da venda: {selectedSaleId}</h3>
                    <div className="w-full h-[90%] flex items-baseline justify-center">
                        <div id="CartProducts" className="flex justify-center items-center w-full h-full flex-col border-[8px] border-gray-400 p-2 rounded-xl">
                            <div id="titulo-cart" className="flex bg-[#226777] text-white w-full justify-around">
                                <h1 className="text-xl text-center w-1/4"> ID </h1>
                                <h1 className="text-xl text-center w-1/4"> Nome Produto </h1>
                                <h1 className="text-xl text-center w-1/4"> Preco </h1>
                                <h1 className="text-xl text-center w-1/4"> Quantidade </h1>
                            </div>
                            <div id="itens-cart" className="w-full overflow-auto h-full">
                                {produtos.map((produto) => (
                                    <ul className={`cursor-pointer flex w-full justify-around`} key={produto.id_produto}>
                                        <li className="text-center w-1/4 text-xl" > {produto.id_produto}</li>
                                        <li className="text-center w-1/4 text-xl" > {produto.nome}</li>
                                        <li className="text-center w-1/4 text-xl" > {produto.preco}</li>
                                        <li className="text-center w-1/4 text-xl" > {produto.quantidade}</li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </ProductsModal>
            )}
        </div>
    );
};

export default TelaVendidosPage;
