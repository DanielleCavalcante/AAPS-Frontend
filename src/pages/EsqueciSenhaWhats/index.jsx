import React from 'react';
import { useNavigate } from 'react-router-dom';
import './esqueciSenhaWhats.css';

const EsqueciSenhaWhats = () => {
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = (event) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página
        const celular = event.target.celular.value;

        if (!celular) {
            alert("Por favor, insira um número de celular válido.");
            return;
        }

        // Lógica para enviar o código pelo WhatsApp
        console.log("Número de celular:", celular);

        // Navegar para a página RedefinirSenhaWhats
        navigate('/redefinir-senha-whats'); // Altere o caminho conforme necessário
    };

    return (
        <div className="esqueci-senha-container">
            <form className="esqueci-senha-form" onSubmit={handleSubmit}>
                <img src="src/assets/aaps_logo1.png" alt="aaps-logo1" className="esqueci-login-image" />
                <div className="esqueci-form-group">
                    <label htmlFor="esqueciSenha">Esqueci minha senha</label>
                    <span>Confirme o número do seu celular com DDD para receber o código pelo WhatsApp</span>
                </div>

                <div className="esqueci-form-group">
                    <label htmlFor="celular" id="celular">DDD + celular</label>
                    <input
                        type="tel"
                        name="celular"
                        placeholder="Ex: 11 91234-5678"
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-alterar-senha">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default EsqueciSenhaWhats;
