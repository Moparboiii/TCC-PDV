import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "../components/NavbarComp";

const TelaProdutoPage = () => {
    let classe1 = document.querySelector("#mudal_INS");
    let classe2 = document.querySelector("#mudal_EDIT");
    let classe3 = document.querySelector("#mudal_DEL");
    let classe4 = document.querySelector("#BtnEditar");
    let classe5 = document.querySelector("#BtnlDeletar");
    const [products, setProducts] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [selectedProductData, setSelectedProductData] = useState(null);

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

    const aparecer = (classe1) => {
        classe1.classList.remove("hidden")
    };
    const sumir = (classe1) => {
        classe1.classList.add("hidden")
    };

    const toggleItemSelection = (itemId) => {
        if (selectedItemId === itemId) {
            // Se o item já está selecionado, desmarque-o
            setSelectedItemId(null);
            sumir(classe4)
            sumir(classe5)
        } else {
            // Caso contrário, marque o novo item como selecionado
            setSelectedItemId(itemId);
            aparecer(classe4)
            aparecer(classe5)
        }
    };

    return (
        <div className="flex justify-center items-center">

            <NavbarComp />

            <div id="mudal_INS" className="absolute top-[200px] right-[460px] z-20 bg-slate-400 w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex flex-col justify-center items-center hidden">
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
                    <button id="ConfirmInsert" onClick={() => handleCreateProduct()} className="bg-gradient-to-br from-indigo-500 rounded-full h-[60%] w-[40%] text-2xl"> Sim </button>
                    <button id="CancelInsert" onClick={() => sumir(classe1)} className="bg-gradient-to-br from-indigo-500 h-[60%] w-[40%] text-2xl rounded-full"> Não </button>
                </div>
            </div>

            <div id="mudal_EDIT" className="absolute top-[200px] right-[460px] z-20 bg-slate-400 w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex flex-col justify-center items-center hidden">
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
                    <button id="ConfirmEdit" onClick={() => handleEditConfirmation(selectedProductData.id_produto)} className="bg-gradient-to-br from-indigo-500 rounded-full h-[60%] w-[40%] text-2xl"> Sim </button>
                    <button id="CancelEdit" onClick={() => sumir(classe2)} className="bg-gradient-to-br from-indigo-500  h-[60%] w-[40%] text-2xl rounded-full"> Não </button>
                </div>
            </div>


            <div id="mudal_DEL" className="absolute top-[200px] right-[460px] z-20 bg-slate-400 w-[50%] h-[50%] rounded-2xl border-solid border-8 border-black text-center flex flex-col justify-center items-center hidden">
                <div id="item_para_excluir" className="w-full h-3/4 flex justify-center items-center rounded-t-md flex-col relative">

                    <h1 className="absolute top-10 text-2xl">Deletando um produto</h1>

                    <label className="text-xl"> Tem certeza que seja excluir o produto {selectedItemId} ? </label>

                </div>

                <div id="botoes" className="w-full h-1/4  flex justify-around items-center rounded-b-2xl">
                    <button id="ConfirmDelete" onClick={() => { handleDeleteProduct(selectedItemId); sumir(classe3) }} className="bg-gradient-to-br from-indigo-500 rounded-full h-[60%] w-[40%] text-2xl"> Sim </button>
                    <button id="CancelDelete" onClick={() => sumir(classe3)} className="bg-gradient-to-br from-indigo-500 h-[60%] w-[40%] text-2xl rounded-full"> Não </button>
                </div>
            </div>

            <div id="CartProducts" className="flex justify-center items-center bg-slate-400 w-3/5 h-screen flex-col border-dashed border-b-2 border-r-2 border-black">
                <div id="titulo-cart" className="flex bg-yellow-300 w-full justify-around">
                    <h1 className="text-xl text-center w-1/3"> ID </h1>
                    <h1 className="text-xl text-center w-1/3"> Nome </h1>
                    <h1 className="text-xl text-center w-1/3"> Valor </h1>
                </div>
                <div id="itens-cart" className="w-full overflow-auto h-full">
                    {products.map((product) => (
                        <ul className={`cursor-pointer flex w-full justify-around ${selectedItemId === product.id_produto ? "bg-blue-200" : ""}`}
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

            <div className="h-screen w-1/5 bg-slate-400 flex flex-col justify-center items-center gap-10">

                <div className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] bg-[#DCDCDC] opacity-70 w-[90%] h-[15%] flex flex-col items-center rounded-2xl">
                    <h1 className="text-xl text-center"> Código </h1>
                    <h2 className="text-xl mt-10"> {selectedItemId !== null ? selectedItemId : ""} </h2>
                </div>

                <button className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] bg-[#DCDCDC] opacity-70 w-[90%] h-[15%] flex flex-col justify-center items-center rounded-2xl" onClick={() => aparecer(classe1)} >
                    <h1 className="text-xl text-center"> Inserir um novo produto </h1>
                </button>

                <button id="BtnEditar" className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] bg-[#DCDCDC] opacity-70  w-[90%] h-[15%] flex flex-col justify-center items-center rounded-2xl hidden" onClick={() => handleEditProduct(selectedItemId)} >
                    <h1 className="text-xl text-center"> Editar o produto </h1>
                </button>

                <button id="BtnlDeletar" className="shadow-[0_35px_60px_35px_rgba(0,0,0,0.3)] bg-[#DCDCDC] opacity-70  w-[90%] h-[15%] flex flex-col justify-center items-center rounded-2xl hidden" onClick={() => aparecer(classe3)} >
                    <h1 className="text-xl text-center"> Deletar o produto </h1>
                </button>

            </div>

        </div>
    );
};

export default TelaProdutoPage;