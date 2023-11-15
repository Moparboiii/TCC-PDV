import React, { useState } from "react";


const ProductsModal = ({ texto, isVisible }) => {

    const [quantidade, setQuantidade] = useState("");
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    return (
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

           
        </div>
    );
};



export default ProductsModal;
