import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SobrePage from "./pages/Sobre";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import TelaProdutoPage from "./pages/TelaProdutos";
import TelaVendaPage2 from './pages/TelaVenda2';
import TelaVendidosPage from "./pages/TelaVendidos";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/venda" element={<TelaVendaPage2 />} />
        <Route path="/vendas" element={<TelaVendidosPage />} />
        <Route path="/produtos" element={<TelaProdutoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
