import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

import Layout from "../layouts/Layout";
import Login from '../pages/Login/Login';
import EsqueciSenha from "../pages/EsqueciSenha/EsqueciSenha";
import EsqueciSenhaCodigo from "../pages/EsqueciSenhaCodigo/EsqueciSenhaCodigo";
import RedefinirSenhaCodigo from "../pages/RedefinirSenhaCodigo/RedefinirSenhaCodigo";

import Home from '../pages/Home/Home';
import Animal from '../pages/Animal';
import CadastroAnimal from '../pages/CadastroAnimal';
import VisualizarAnimal from '../pages/VisualizarAnimal';
import Doador from '../pages/Doador';
import CadastroDoador from '../pages/CadastroDoador';
import VisualizarDoador from '../pages/VisualizarDoador';
import Evento from "../pages/Evento";
import CadastroEvento from '../pages/CadastroEvento';
import VisualizarEvento from '../pages/VisualizarEvento';
import Adotante from "../pages/Adotante";
import CadastroAdotante from '../pages/CadastroAdotante';
import VisualizarAdotante from '../pages/VisualizarAdotante';
import Adocao from "../pages/Adocao";
import CadastroAdocao from '../pages/CadastroAdocao';
import VisualizarAdocao from '../pages/VisualizarAdocao';
import Perfil from "../pages/Perfil/Perfil";
import AlterarSenha from "../pages/AlterarSenha/AlterarSenha";

import Voluntario from '../pages/Voluntario';
import CadastroVoluntario from '../pages/CadastroVoluntario';
import VisualizarVoluntario from '../pages/VisualizarVoluntario';
import PontoAdocao from "../pages/PontoAdocao";
import CadastroPontoAdocao from '../pages/CadastroPontoAdocao';
import VisualizarPontoAdocao from '../pages/VisualizarPontoAdocao';

import ComingSoon from '../pages/ComingSoon/ComingSoon';

const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/esqueci-senha" element={<EsqueciSenha/>} />
                <Route path="/esqueci-senha-whats" element={<EsqueciSenhaCodigo/>} />
                <Route path="/redefinir-senha-whats" element={<RedefinirSenhaCodigo/>} />

                <Route element={<Layout/>}>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element = {<Home/>} />
                        <Route path="/animal" element={<Animal/>} />
                        <Route path="/cadastro-animal" element={<CadastroAnimal/>} />
                        <Route path="/visualiza-animal/:id" element={<VisualizarAnimal />} />
                        <Route path="/doador" element={<Doador/>} />
                        <Route path="/cadastro-doador" element={<CadastroDoador/>} />
                        <Route path="/visualiza-doador" element={<VisualizarDoador/>} />
                        <Route path="/evento" element={<Evento/>} />
                        <Route path="/cadastro-evento" element={<CadastroEvento/>} />
                        <Route path="/visualiza-evento/:id" element={<VisualizarEvento/>} />
                        <Route path="/adotante" element={<Adotante/>} />
                        <Route path="/cadastro-adotante" element={<CadastroAdotante/>} />
                        <Route path="/visualiza-adotante" element={<VisualizarAdotante/>} />
                        <Route path="/adocao" element={<Adocao/>} />
                        <Route path="/cadastro-adocao" element={<CadastroAdocao/>} />
                        <Route path="/visualiza-adocao" element={<VisualizarAdocao/>} />
                        <Route path="/perfil" element={<Perfil/>} />
                        <Route path="/alterar-senha" element={<AlterarSenha/>} />
                            
                        {/* Rotas de admin */}
                        <Route element={<PrivateRoute requiredRole="Admin" />} >
                            <Route path="/voluntario" element={<Voluntario/>} />
                            <Route path="/cadastro-voluntario" element={<CadastroVoluntario/>}/>
                            <Route path="/visualiza-voluntario" element={<VisualizarVoluntario/>} />
                            <Route path="/ponto-adocao" element={<PontoAdocao/>} />
                            <Route path="/cadastro-ponto-adocao" element={<CadastroPontoAdocao/>} />
                            <Route path="/visualiza-ponto-adocao" element={<VisualizarPontoAdocao/>} />
                        </Route>

                        <Route path="*" element={<ComingSoon />}/>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default AppRouter;