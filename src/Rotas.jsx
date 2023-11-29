import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SobrePage from "./pages/Sobre";
import NotFoundPage from "./pages/NotFoundPage";
import TelaProdutoPage from "./pages/TelaProdutos";
import TelaVendaPage from './pages/TelaVenda';
import TelaVendidosPage from "./pages/TelaVendidos";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/venda" element={<TelaVendaPage />} />
        <Route path="/vendas" element={<TelaVendidosPage />} />
        <Route path="/produtos" element={<TelaProdutoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
