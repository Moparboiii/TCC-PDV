import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Home.css";
import NavbarComp from "../components/NavbarComp";

const HomePage = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Faça uma chamada à rota do servidor para buscar os dados do banco de dados
    axios
      .get("http://localhost:5000/api/dados")
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <NavbarComp></NavbarComp>

      <div className="bg-red-500 w-4/5 h-screen flex justify-center items-center">
        <h1 className="text-7xl"> Bem vindo a Casa De Carnes kanaa </h1>
        
      </div>
    </div>
  );
};

export default HomePage;
