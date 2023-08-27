import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SobrePage from "./pages/Sobre";
import NotFoundPage from "./pages/NotFoundPage";
import TelaVendaPage from "./pages/TelaVenda";
import LoginPage from "./pages/LoginPage";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<LoginPage />} path="/login"/>
        <Route element={<SobrePage/>} path="/sobre" />
        <Route element={<TelaVendaPage/>} path="/venda" />
        <Route element={<NotFoundPage/>} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
