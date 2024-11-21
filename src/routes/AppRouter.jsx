import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from '../Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Voluntario from '../pages/Voluntario';
import CadastroVoluntario from '../pages/CadastroVoluntario';
import AlterarVoluntario from '../pages/AlterarVoluntario';
import Animal from '../pages/Animal';
import CadastroAnimal from '../pages/CadastroAnimal';
import AlterarAnimal from '../pages/AlterarAnimal';
import Doador from '../pages/Doador';
import CadastroDoador from '../pages/CadastroDoador';
import AlterarDoador from '../pages/AlterarDoador';
import Evento from "../pages/Evento";
import CadastroEvento from '../pages/CadastroEvento';
import AlterarEvento from '../pages/AlterarEvento';
import PontoAdocao from "../pages/PontoAdocao";

import ComingSoon from '../pages/ComingSoon';



const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/voluntario" element={<Voluntario />}/>
                    <Route path="/cadastro-voluntario" element={<CadastroVoluntario />}/>
                    <Route path="/altera-voluntario" element={<AlterarVoluntario />}/>
                    <Route path="/animal" element={<Animal />}/>
                    <Route path="/cadastro-animal" element={<CadastroAnimal />}/>
                    <Route path="/altera-animal" element={<AlterarAnimal />}/>
                    <Route path="/doador" element={<Doador />}/>
                    <Route path="/cadastro-doador" element={<CadastroDoador />}/>
                    <Route path="/altera-doador" element={<AlterarDoador />}/>
                    <Route path="/evento" element={<Evento />}/>
                    <Route path="/cadastro-evento" element={<CadastroEvento />}/>
                    <Route path="/altera-evento" element={<AlterarEvento />}/>
                    <Route path="/ponto-adocao" element={<PontoAdocao />}/>
                    <Route path="*" element={<ComingSoon />}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;