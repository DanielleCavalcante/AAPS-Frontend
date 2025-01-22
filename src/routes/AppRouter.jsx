import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from '../Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Voluntario from '../pages/Voluntario';
import CadastroVoluntario from '../pages/CadastroVoluntario';
import VisualizarVoluntario from '../pages/VisualizarVoluntario';
import Animal from '../pages/Animal';
import CadastroAnimal from '../pages/CadastroAnimal';
import VisualizarAnimal from '../pages/VisualizarAnimal';
import Doador from '../pages/Doador';
import CadastroDoador from '../pages/CadastroDoador';
import VisualizarDoador from '../pages/VisualizarDoador';
import Evento from "../pages/Evento";
import CadastroEvento from '../pages/CadastroEvento';
import VisualizarEvento from '../pages/VisualizarEvento';
import PontoAdocao from "../pages/PontoAdocao";
import CadastroPontoAdocao from '../pages/CadastroPontoAdocao';
import VisualizarPontoAdocao from '../pages/VisualizarPontoAdocao';
import Adotante from "../pages/Adotante";
import CadastroAdotante from '../pages/CadastroAdotante';
import VisualizarAdotante from '../pages/VisualizarAdotante';
import Adocao from "../pages/Adocao";
import CadastroAdocao from '../pages/CadastroAdocao';
import VisualizarAdocao from '../pages/VisualizarAdocao';
import Perfil from "../pages/Perfil";
import AlterarSenha from "../pages/AlterarSenha";
import EsqueciSenha from "../pages/EsqueciSenha";
import EsqueciSenhaWhats from "../pages/EsqueciSenhaWhats";
import RedefinirSenhaWhats from "../pages/RedefinirSenhaWhats";


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
                    <Route path="/visualiza-voluntario" element={<VisualizarVoluntario />}/>
                    <Route path="/animal" element={<Animal />}/>
                    <Route path="/cadastro-animal" element={<CadastroAnimal />}/>
                    <Route path="/visualiza-animal" element={<VisualizarAnimal />}/>
                    <Route path="/doador" element={<Doador />}/>
                    <Route path="/cadastro-doador" element={<CadastroDoador />}/>
                    <Route path="/visualiza-doador" element={<VisualizarDoador />}/>
                    <Route path="/evento" element={<Evento />}/>
                    <Route path="/cadastro-evento" element={<CadastroEvento />}/>
                    <Route path="/visualiza-evento" element={<VisualizarEvento />}/>
                    <Route path="/ponto-adocao" element={<PontoAdocao />}/>
                    <Route path="/visualiza-ponto-adocao" element={<VisualizarPontoAdocao />}/>
                    <Route path="/cadastro-ponto-adocao" element={<CadastroPontoAdocao />}/>
                    <Route path="/adotante" element={<Adotante />}/>
                    <Route path="/visualiza-adotante" element={<VisualizarAdotante />}/>
                    <Route path="/cadastro-adotante" element={<CadastroAdotante />}/>
                    <Route path="/adocao" element={<Adocao />}/>
                    <Route path="/visualiza-adocao" element={<VisualizarAdocao />}/>
                    <Route path="/cadastro-adocao" element={<CadastroAdocao />}/>
                    <Route path="/perfil" element={<Perfil />}/>
                    <Route path="/alterar-senha" element={<AlterarSenha />}/>
                    <Route path="/esqueci-senha" element={<EsqueciSenha />}/>
                    <Route path="/esqueci-senha-whats" element={<EsqueciSenhaWhats />}/>
                    <Route path="/redefinir-senha-whats" element={<RedefinirSenhaWhats />}/>
                    <Route path="*" element={<ComingSoon />}/>
                    
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;