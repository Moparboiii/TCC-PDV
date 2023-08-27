import React from "react";
import morfeu from "../assets/morfeu.png"
import { Link } from "react-router-dom";



const LoginPage = () => {

    const handleClickSubmit = (values) => {
        console.log(values)
    }


    return (
        <div className="tudo flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-indigo-500">
            <div className="formulario h-[50%] w-[50%] flex justify-center items-center rounded-2xl shadow-black shadow-2xl  hover:drop-shadow-xl">
                <div className="login w-full h-[80%] flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <form action="" onSubmit={handleClickSubmit}  className="flex flex-col justify-center items-center gap-5 w-full h-full " vali>
                        <span className="text-xl mr-[370px]"> E-Mail </span>
                        <div className="email relative w-[90%] h-[20%]">
                            <img src={morfeu} alt="" srcset="" className=" absolute h-full w-12 rounded-l-md " />
                            <input type="email" name="email" placeholder="exemplo@hotmail.com" className="w-full h-full rounded-md indent-14 outline-none" />
                        </div>

                        <span className="text-xl mr-[370px]"> Senha </span>
                        <div className="senha relative w-[90%] h-[20%]" >
                            <img src={morfeu} alt="" srcset="" className=" absolute h-full w-12 rounded-l-md" />
                            <input type="password" name="senha" placeholder="Senha" className="w-full h-full rounded-md indent-14 outline-none" />
                        </div>
                        <button type="submit" className="w-[70%] h-[20%] border-solid border-2 border-indigo-500/100 bg-gradient-to-br from-indigo-400 rounded-lg shadow-xl hover:animate-jump ">Entrar</button>
                    </form>

                </div>
                <div className="divisao h-full border-2 border-indigo-500/75"></div>
                <div className="cad w-full h-full flex  flex-col items-center justify-center">
                    <h1 className="text-3xl ">Não possui cadastro?</h1>
                    <Link to="/Venda">Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;