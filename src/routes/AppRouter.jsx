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
import VisualizarAnimal from '../pages/VisualizarAnimal';
import Doador from '../pages/Doador';
import CadastroDoador from '../pages/CadastroDoador';
import VisualizarDoador from '../pages/VisualizarDoador';
import Evento from "../pages/Evento";
import CadastroEvento from '../pages/CadastroEvento';
import AlterarEvento from '../pages/AlterarEvento';
import PontoAdocao from "../pages/PontoAdocao";
import CadastroPontoAdocao from '../pages/CadastroPontoAdocao';
import AlterarPontoAdocao from '../pages/AlterarPontoAdocao';
import Adotante from "../pages/Adotante";
import CadastroAdotante from '../pages/CadastroAdotante';
import AlterarAdotante from '../pages/AlterarAdotante';
import Adocao from "../pages/Adocao";
import CadastroAdocao from '../pages/CadastroAdocao';
import AlterarAdocao from '../pages/AlterarAdocao';
import Perfil from "../pages/Perfil";

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
                    <Route path="/visualiza-animal" element={<VisualizarAnimal />}/>
                    <Route path="/doador" element={<Doador />}/>
                    <Route path="/cadastro-doador" element={<CadastroDoador />}/>
                    <Route path="/visualiza-doador" element={<VisualizarDoador />}/>
                    <Route path="/evento" element={<Evento />}/>
                    <Route path="/cadastro-evento" element={<CadastroEvento />}/>
                    <Route path="/altera-evento" element={<AlterarEvento />}/>
                    <Route path="/ponto-adocao" element={<PontoAdocao />}/>
                    <Route path="/altera-ponto-adocao" element={<AlterarPontoAdocao />}/>
                    <Route path="/cadastro-ponto-adocao" element={<CadastroPontoAdocao />}/>
                    <Route path="/adotante" element={<Adotante />}/>
                    <Route path="/altera-adotante" element={<AlterarAdotante />}/>
                    <Route path="/cadastro-adotante" element={<CadastroAdotante />}/>
                    <Route path="/adocao" element={<Adocao />}/>
                    <Route path="/altera-adocao" element={<AlterarAdocao />}/>
                    <Route path="/cadastro-adocao" element={<CadastroAdocao />}/>
                    <Route path="/perfil" element={<Perfil />}/>
                    <Route path="*" element={<ComingSoon />}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;