import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SobrePage from "./pages/Sobre";
import NotFoundPage from "./pages/NotFoundPage";
import TelaVendaPage from "./pages/TelaVenda";
import LoginPage from "./pages/LoginPage";
import TelaProdutoPage from "./pages/TelaProdutos";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<LoginPage />} path="/login"/>
        <Route element={<SobrePage/>} path="/sobre" />
        <Route element={<TelaVendaPage/>} path="/venda" />
        <Route element={<TelaProdutoPage/>} path="/produtos" />
        <Route element={<NotFoundPage/>} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
