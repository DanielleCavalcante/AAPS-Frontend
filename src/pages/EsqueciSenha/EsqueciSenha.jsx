import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "/src/assets/aaps_logo1.png"
import './EsqueciSenha.css';

const EsqueciSenha = () => {
    const [formData, setFormData] = useState({
        peloCelular: false,
        peloAdministrador: false,
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            peloCelular: name === "celular",
            peloAdministrador: name === "administrador",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.peloCelular && !formData.peloAdministrador) {
            alert("Por favor, selecione uma opção de recuperação de senha.");
            return;
        }

        if (formData.peloCelular) {
            navigate("/esqueci-senha-celular");
        } else if (formData.peloAdministrador) {
            navigate("/esqueci-senha-admin");
        }
    };

    return (
        <div className="esqueci-senha-container">
            <form className="esqueci-senha-form" onSubmit={handleSubmit}>
                <img src={logo} alt="aaps-logo1" className="esqueci-login-image" />
                <div className="esqueci-form-group">
                    <label htmlFor="esqueciSenha">Esqueci minha senha</label>
                    <span>Selecione um método </span>
                    <span>para recuperar sua senha</span>
                </div>

                <div className="radio-group-esqueci">
                    <label className="radio-label-esqueci">
                        <input
                            type="radio"
                            name="celular"
                            value="Celular"
                            checked={formData.peloCelular}
                            onChange={handleInputChange}
                        />
                        Pelo celular
                        <p>um código será enviado para o seu WhatsApp</p>
                    </label>
                    <label className="radio-label-esqueci">
                        <input
                            type="radio"
                            name="administrador"
                            value="Administrador"
                            checked={formData.peloAdministrador}
                            onChange={handleInputChange}
                        />
                        Pelo administrador
                        <p>aguarde o contato do administrador</p>
                    </label>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-alterar-senha">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default EsqueciSenha;
