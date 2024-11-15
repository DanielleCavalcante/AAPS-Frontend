import { useState } from 'react';
import './cadastroDoador.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroDoador = () => {

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        rg: '',
        cpf: '',
        celular: '',
        cep: '',
        cidade: '',
        estado: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: ''
    });

    const closeModal = () => setShowModal(false);

    const openModal = () => {
        const { nome, rg, cpf, celular, cep, cidade, estado, endereco, numero, bairro } = formData;

        // Verifica se todos os campos estão preenchidos
        if (nome && rg && cpf && celular && cep && cidade && estado && endereco && numero && bairro) {
            setShowModal(true);
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({
            nome: '',
            rg: '',
            cpf: '',
            celular: '',
            cep: '',
            cidade: '',
            estado: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: ''
        });
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        id="nome" 
                        placeholder="Digite o nome do Doador/Tutor" 
                        value={formData.nome}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rg">RG</label>
                    <input 
                        type="text" 
                        id="rg" 
                        placeholder="Digite o rg do Doador/Tutor" 
                        value={formData.rg}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input 
                        type="text" 
                        id="cpf" 
                        placeholder="Digite o CPF do Doador/Tutor" 
                        value={formData.cpf}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="celular">Telefone</label>
                    <input
                        type="text"
                        id="celular"
                        placeholder="Digite o telefone"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input 
                        type="text" 
                        id="cep" 
                        placeholder="Digite o CEP do Doador/Tutor" 
                        value={formData.cep}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input 
                        type="text" 
                        id="cidade" 
                        placeholder="Digite a cidade do Doador/Tutor" 
                        value={formData.cidade}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <input 
                        type="text" 
                        id="estado" 
                        placeholder="Digite o estado do Doador/Tutor" 
                        value={formData.estado}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço</label>
                    <input 
                        type="text" 
                        id="endereco" 
                        placeholder="Digite o endereço do Doador/Tutor" 
                        value={formData.endereco}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numero">Nº</label>
                    <input 
                        type="text" 
                        id="numero" 
                        placeholder="Digite o nº do Doador/Tutor" 
                        value={formData.numero}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input 
                        type="text" 
                        id="complemento" 
                        placeholder="Digite o complemento do Doador/Tutor" 
                        value={formData.complemento}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bairro">Bairro</label>
                    <input 
                        type="text" 
                        id="bairro" 
                        placeholder="Digite o bairro do Doador/Tutor" 
                        value={formData.bairro}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoAlterar disabled={true} />
                    <BotaoLimpar />
                    <BotaoExcluir disabled={true} />
                </div>
            </form>
        </div>
    );
}

export default CadastroDoador;
