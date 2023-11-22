import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import { format } from 'date-fns';

const TelaVendidosPage = () => {
    const [sales, setSales] = useState([]);
    const [selectedSaleId, setSelectedSaleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSaleItems, setSelectedSaleItems] = useState([]);

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

    const toggleItemSelection = async (saleId) => {
        setSelectedSaleId(saleId);
        setIsModalOpen(true);

        try {
            const response = await axios.get(`http://localhost:5000/vendidos/${saleId}`);
            const items = response.data || [];
            setSelectedSaleItems(Array.isArray(items) ? items : [items]);
        } catch (error) {
            console.error('Erro ao buscar detalhes dos itens vendidos:', error);
        }
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
                                <li className="text-center w-1/3 text-xl" key={`id_${sale.id_venda}`}> {sale.id_venda}</li>
                                <li className="text-center w-1/3 text-xl" key={`nome_${sale.id_venda}`}> {sale.valor_total}</li>
                                <li className="text-center w-1/3 text-xl" key={`preco${sale.id_venda}`}> {format(new Date(sale.data_hora), 'dd/MM/yyyy HH:mm:ss')}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Detalhes da Venda</h2>
                        <p>ID Venda: {selectedSaleId}</p>
                        <h3 className="text-xl font-bold mt-4">Itens:</h3>
                        <ul>
                            {selectedSaleItems.map((item) => (
                                <li key={item.id_venda}>
                                    Produto: {item.id_produto}, Quantidade: {item.quantidade}, Valor Unitário: {item.preco}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setIsModalOpen(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaVendidosPage;
