import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";
import CardProducts from "../components/cards/CardProducts";
import CrudButton from "../components/buttons/CrudButton";
import ProductsModal from "../components/modals/ProductsModal";
import ConfirmCancelButtons from "../components/buttons/ConfirmCancelButtons";

const TelaProdutoPage = () => {
    const classe1 = document.querySelector("#mudal_INS");
    const classe2 = document.querySelector("#mudal_EDIT");
    const classe3 = document.querySelector("#mudal_DEL");
    const classe4 = document.querySelector("#tudao");
    const [products, setProducts] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [selectedProductData, setSelectedProductData] = useState(null);
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await axios.get('http://localhost:5000/produtos'); // Substitua pela URL correta da sua API
                setProducts(response.data); // Atualize o estado com os produtos obtidos da API
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }

        fetchProdutos();
    }, []);

    const attList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produtos');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleCreateProduct = async () => {
        // Crie um objeto com os dados do novo produto
        const newProductData = {
            nome,
            preco: parseFloat(preco),
            quantidade: parseFloat(quantidade),
        };

        try {
            // Envie os dados do novo produto para o servidor
            const response = await axios.post("http://localhost:5000/cadProduto", newProductData);

            if (response.status === 201) {

                // Atualize o estado local para refletir a criação do novo produto
                attList()
                sumir(classe1)

            } else {

                // Lidar com erros
                alert("Erro ao criar o produto");

            }
        } catch (error) {
            console.error("Erro ao enviar a solicitação:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            // Realize uma solicitação de exclusão ao servidor
            await axios.delete(`http://localhost:5000/produto/${productId}`);

            // Atualize o estado local para refletir a exclusão
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id_produto !== productId)
            );

            sumir(classe2);

        } catch (error) {
            alert.error(`Erro ao excluir o produto: ${error}`);
        }
    };

    const handleEditProduct = (productId) => {
        const productToEdit = products.find((product) => product.id_produto === productId);

        if (productToEdit) {
            // Preencha os campos de edição com os dados do item selecionado
            setNome(productToEdit.nome);
            setPreco(productToEdit.preco.toString()); // Converte para string para exibição
            setQuantidade(productToEdit.quantidade.toString()); // Converte para string para exibição
            setSelectedProductData(productToEdit); // Armazena os dados do item selecionado
            aparecer(classe2); // Mostra o modal de edição
        }
    };

    const handleEditConfirmation = async (productId) => {
        // Crie um objeto com os dados atualizados do produto
        const updatedProductData = {
            nome,
            preco: parseFloat(preco),
            quantidade: parseFloat(quantidade),
        };

        try {
            // Envie os dados atualizados para o servidor
            const response = await axios.put(`http://localhost:5000/produto/${productId}`, updatedProductData);

            if (response.status === 200) {
                // Atualize o estado local para refletir a edição
                attList();
                sumir(classe2); // Esconda o modal de edição
            } else {
                // Lidar com erros
                alert("Erro ao editar o produto");
            }
        } catch (error) {
            console.error("Erro ao enviar a solicitação:", error);
        }
    };

    const aparecer = (element) => {
        element.classList.remove("hidden")
        classe4.classList.add("blur-3xl")
    };
    const sumir = (element) => {
        element.classList.add("hidden")
        classe4.classList.remove("blur-3xl")
    };

    const toggleItemSelection = (itemId) => {
        if (selectedItemId === itemId) {
            // Se o item já está selecionado, desmarque-o
            setSelectedItemId(null);
            setIsVisible(false)
        } else {
            // Caso contrário, marque o novo item como selecionado
            setSelectedItemId(itemId);
            setIsVisible(true)
        }
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center p-3">

            <NavbarComp />

            <div id="mudal_INS" className="absolute top-[200px] right-[460px] z-20 bg-[#d9d9d9] w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex-col justify-center items-center hidden">
                <div id="item_para_excluir" className="w-full h-3/4 flex justify-center items-center rounded-t-md flex-col relative">

                    <h1 className="absolute top-10 text-2xl">Inserir um produto</h1>

                    <label htmlFor="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />

                    <label htmlFor="preco">Preço:</label>
                    <input type="text" id="preco" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required />

                    <label htmlFor="quantidade">Quantidade:</label>
                    <input type="text" id="quantidade" name="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />

                </div>

                <div id="botoes" className="w-full h-1/4 flex justify-around items-center rounded-b-md">
                    <button id="ConfirmInsert"
                        onClick={() => handleCreateProduct()}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Sim </button>
                    <button id="CancelInsert"
                        onClick={() => sumir(classe1)}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Não </button>
                </div>
            </div>

            <div id="mudal_EDIT" className="absolute top-[200px] right-[460px] z-20 bg-[#d9d9d9] w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex flex-col justify-center items-center hidden">
                <div id="item_para_excluir" className="w-full h-3/4 flex justify-center items-center rounded-t-md flex-col relative">

                    <h1 className="absolute top-10 text-2xl">Editando um produto</h1>

                    <label htmlFor="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />

                    <label htmlFor="preco">Preço:</label>
                    <input type="text" id="preco" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required />

                    <label htmlFor="quantidade">Quantidade:</label>
                    <input type="text" id="quantidade" name="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />

                </div>

                <div id="botoes" className="w-full h-1/4 flex justify-around items-center rounded-b-2xl">
                    <button id="ConfirmEdit"
                        onClick={() => handleEditConfirmation(selectedProductData.id_produto)}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Sim </button>
                    <button id="CancelEdit"
                        onClick={() => sumir(classe2)}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Não </button>
                </div>
            </div>

            <div id="mudal_DEL" className="absolute top-[200px] right-[460px] z-20 bg-[#d9d9d9] w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex flex-col justify-center items-center hidden">
                <div id="item_para_excluir" className="w-full h-3/4 flex justify-center items-center rounded-t-md flex-col relative">

                    <h1 className="absolute top-10 text-2xl">Deletando um produto</h1>

                    <label className="text-xl"> Tem certeza que seja excluir o produto {selectedItemId} ? </label>

                </div>

                <div id="botoes" className="w-full h-1/4  flex justify-around items-center rounded-b-2xl">
                    <button id="ConfirmDelete"
                        onClick={() => { handleDeleteProduct(selectedItemId); sumir(classe3) }}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Sim </button>
                    <button id="CancelDelete"
                        onClick={() => sumir(classe3)}
                        className="w-[30%] h-[50%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white"> Não </button>
                </div>
            </div>

            <div id="tudao" className="w-4/5 h-full flex justify-between items-center flex-row bg-[#d9d9d9] rounded-xl border-[1px] shadow-2xl p-4" >


                <div id="CartProducts" className="flex justify-center items-center w-2/4 h-3/4 flex-col border-[8px] border-gray-400 p-2 rounded-xl">
                    <div id="titulo-cart" className="flex bg-[#226777] text-white w-full justify-around">
                        <h1 className="text-xl text-center w-1/3"> ID </h1>
                        <h1 className="text-xl text-center w-1/3"> Nome </h1>
                        <h1 className="text-xl text-center w-1/3"> Valor </h1>
                    </div>
                    <div id="itens-cart" className="w-full overflow-auto h-full">
                        {products.map((product) => (
                            <ul className={`cursor-pointer flex w-full justify-around ${selectedItemId === product.id_produto ? "border-[2px] border-[#333333]" : ""}`}
                                key={product.id_produto}
                                onClick={() => toggleItemSelection(product.id_produto)}
                            >
                                <li className="text-center w-1/3 text-xl" key={`id_${product.id_produto}`}> {product.id_produto}</li>
                                <li className="text-center w-1/3 text-xl" key={`nome_${product.id_produto}`}> {product.nome}</li>
                                <li className="text-center w-1/3 text-xl" key={`preco${product.id_produto}`}> {product.preco}</li>
                            </ul>
                        ))}
                    </div>
                </div>

                <div className="h-[80%] w-1/5 bg-slate-400 flex flex-col justify-center items-center gap-10 rounded-[10px]">

                    {/* <CrudButton isVisible={true} texto={selectedItemId !== null ? selectedItemId : 0} /> */}

                    <div
                        className="w-[90%] h-[15%] flex justify-center items-center gap-3 bg-blue-500 rounded-[10px] text-2xl text-white">
                        {selectedItemId !== null ? selectedItemId : 0}
                    </div>

                    <CrudButton id="BtnInserir" isVisible={true} texto="Inserir novo produto" onClick={() => aparecer(classe1)} />

                    <CrudButton id="BtnEditar" isVisible={isVisible} texto="Editar o produto" onClick={() => handleEditProduct(selectedItemId)} />

                    <CrudButton id="BtnDeletar" isVisible={isVisible} texto="Deletar o produto" onClick={() => aparecer(classe3)} />

                </div>

            </div>
        </div>
    );
};

export default TelaProdutoPage;