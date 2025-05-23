import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

import Layout from "../layouts/Layout";
import Login from '../pages/Login/Login';
import EsqueciSenha from "../pages/EsqueciSenha/EsqueciSenha";
import EsqueciSenhaCodigo from "../pages/EsqueciSenhaCodigo/EsqueciSenhaCodigo";
import RedefinirSenhaCodigo from "../pages/RedefinirSenhaCodigo/RedefinirSenhaCodigo";
import EsqueciSenhaAdmin from "../pages/EsqueciSenhaAdmin/EsqueciSenhaAdmin";

import Home from '../pages/Home/Home';

import Adocao from "../pages/Adocoes/ListarAdocoes/ListarAdocoes";
import CadastroAdocao from '../pages/Adocoes/CadastrarAdocao/CadastrarAdocao';
import VisualizarAdocao from '../pages/Adocoes/VisualizarAdocao/VisualizarAdocao';
import Adotante from "../pages/Adotantes/ListarAdotantes/ListarAdotantes";
import CadastroAdotante from '../pages/Adotantes/CadastroAdotante/CadastroAdotante';
import VisualizarAdotante from '../pages/Adotantes/VisualizarAdotante/VisualizarAdotante';
import Animal from '../pages/Animais/ListarAnimais/ListarAnimais';
import CadastroAnimal from '../pages/Animais/CadastrarAnimal/CadastrarAnimal';
import VisualizarAnimal from '../pages/Animais/VisualizarAnimal/VisualizarAnimal';
import Doador from '../pages/Doadores/ListarDoadores/ListarDoadores';
import CadastroDoador from '../pages/Doadores/CadastrarDoador/CadastrarDoador';
import VisualizarDoador from '../pages/Doadores/VisualizarDoador/VisualizarDoador';
import Evento from "../pages/Eventos/ListarEventos/ListarEventos";
import CadastroEvento from '../pages/Eventos/CadastrarEvento/CadastrarEvento';
import VisualizarEvento from '../pages/Eventos/VisualizarEvento/VisualizarEvento';
import Perfil from "../pages/Perfil/Perfil";
import AlterarSenha from "../pages/AlterarSenha/AlterarSenha";
import DigiteNovaSenhaCelular from "../pages/DigiteNovaSenhaCelular/DigiteNovaSenhaCelular";
import Relatorio from "../pages/Relatorio/Relatorio";

import Voluntario from '../pages/Voluntarios/ListarVoluntarios/ListarVoluntarios';
import CadastroVoluntario from '../pages/Voluntarios/CadastrarVoluntario/CadastrarVoluntario';
import VisualizarVoluntario from '../pages/Voluntarios/VisualizarVoluntario/VisualizarVoluntario';
import PontoAdocao from "../pages/PontosAdocao/ListarPontosAdocao/ListarPontosAdocao";
import CadastroPontoAdocao from '../pages/PontosAdocao/CadastroPontoAdocao/CadastroPontoAdocao';
import VisualizarPontoAdocao from '../pages/PontosAdocao/VisualizarPontoAdocao/VisualizarPontoAdocao';

import ComingSoon from '../pages/EmBreve/ComingSoon/ComingSoon';

const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/esqueci-senha" element={<EsqueciSenha/>} />
                <Route path="/esqueci-senha-celular" element={<EsqueciSenhaCodigo/>} />
                <Route path="/redefinir-senha-celular" element={<RedefinirSenhaCodigo/>} />
                <Route path="/esqueci-senha-admin" element={<EsqueciSenhaAdmin/>} />
                <Route path="/digitar-senha-celular" element={<DigiteNovaSenhaCelular/>} />

                <Route element={<Layout/>}>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element = {<Home/>} />
                        <Route path="/listar-animais" element={<Animal/>} />
                        <Route path="/cadastrar-animal" element={<CadastroAnimal/>} />
                        <Route path="/visualizar-animal/:id" element={<VisualizarAnimal />} />

                        <Route path="/listar-doadores" element={<Doador/>} />
                        <Route path="/cadastrar-doador" element={<CadastroDoador/>} />
                        <Route path="/visualizar-doador/:id" element={<VisualizarDoador/>} />

                        <Route path="/listar-eventos" element={<Evento/>} />
                        <Route path="/cadastrar-evento" element={<CadastroEvento/>} />
                        <Route path="/visualizar-evento/:id" element={<VisualizarEvento/>} />

                        <Route path="/listar-adotantes" element={<Adotante/>} />
                        <Route path="/cadastrar-adotante" element={<CadastroAdotante/>} />
                        <Route path="/visualizar-adotante/:id" element={<VisualizarAdotante/>} />

                        <Route path="/listar-adocoes" element={<Adocao/>} />
                        <Route path="/cadastrar-adocao" element={<CadastroAdocao/>} />
                        <Route path="/visualizar-adocao/:id" element={<VisualizarAdocao/>} />
                        
                        <Route path="/perfil/:id" element={<Perfil/>} />
                        <Route path="/alterar-senha/:id" element={<AlterarSenha/>} />
                            
                        {/* Rotas de admin */}
                        <Route element={<PrivateRoute requiredRole="Admin" />} >
                            <Route path="/listar-voluntarios" element={<Voluntario/>} />
                            <Route path="/cadastrar-voluntario" element={<CadastroVoluntario/>}/>
                            <Route path="/visualizar-voluntario/:id" element={<VisualizarVoluntario/>} />
                            <Route path="/listar-pontos-adocao" element={<PontoAdocao/>} />
                            <Route path="/cadastrar-ponto-adocao" element={<CadastroPontoAdocao/>} />
                            <Route path="/visualizar-ponto-adocao/:id" element={<VisualizarPontoAdocao/>} />

                            <Route path="/relatorio" element={<Relatorio/>} />
                        </Route>

                        <Route path="*" element={<ComingSoon />}/>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default AppRouter;