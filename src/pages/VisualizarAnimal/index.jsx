import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './visualizarAnimal.css';

import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const VisualizaAnimal = () => {
    const navigate = useNavigate();
    const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModalExcluir, setShowConfirmModalExcluir] = useState(false);
    const [showConfirmModalAlterar, setShowConfirmModalAlterar] = useState(false);
    const [foto, setFoto] = useState(null);

    //Modais para botão Alterar:
    const openModalAlterar = () => {
        setShowConfirmModalAlterar(false);
        setShowModalAlterar(true);
    }

    const closeModalAlterar = () => {
        setShowModalAlterar(false);
        navigate('/animal');
    }

    const openConfirmModalAlterar = () => {
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const raca = document.getElementById('raca').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const pelagem = document.getElementById('pelagem').value;
    
        if (nome && especie && raca && dataNascimento && pelagem) {
            setShowConfirmModalAlterar(true);
        }
    };
    
    const closeConfirmModalAlterar = () => setShowConfirmModalAlterar(false);

    //Modais para botão Excluir:
    const openModalExcluir = () => {
        setShowConfirmModalExcluir(false);
        setShowModalExcluir(true);
    };

    const closeModalExcluir = () => {
        setShowModalExcluir(false);
        navigate('/animal');
    }

    const openConfirmModalExcluir = () => {
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const raca = document.getElementById('raca').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const pelagem = document.getElementById('pelagem').value;
    
        if (nome && especie && raca && dataNascimento && pelagem) {
          setShowConfirmModalExcluir(true);
        }
    };

    const closeConfirmModalExcluir = () => setShowConfirmModalExcluir(false);


    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.statusAdocao.value = 1;
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.especie.value = '';
        event.currentTarget.elements.raca.value = '';
        event.currentTarget.elements.dataNascimento.value = '';
        event.currentTarget.elements.pelagem.value = '';
        event.currentTarget.elements.sexo.value = 1;
        event.currentTarget.elements.doador.value = 1;
    }

    return (
        <div className="visualizar-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusAdocao">Status</label>
                        <select id="statusAdocao" name="statusAdocao">
                            <option value="1">Adotado</option>
                            <option value="2">Disponível</option>
                        </select>
                    </div>

                    <div className="foto-upload">
                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do animal" className="foto" />}
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do animal" required />
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input type="text" id="especie" placeholder="Digite a espécie do animal" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input type="text" id="raca" placeholder="Digite a raça do animal" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="text" id="dataNascimento" placeholder="Digite a data de nascimento do animal" required />
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input type="text" id="pelagem" placeholder="cor e tipo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" name="sexo">
                            <option value="1">M</option>
                            <option value="2">F</option>
                        </select>
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="doador">Doador</label>
                        <select id="doador" name="doador">
                            <option value="1">Doador1</option>
                            <option value="2">Doador2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="coddoador">Código Doador</label>
                        <select id="coddoador" name="coddoador">
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                    </div>
                </div>

                <div id="group3">
                    <div className="form-group">
                        <button type="button" className="acompanhamento">
                            <img src="/src/assets/icone_acompanhamento.png" alt="Ícone acompanhamento" className="icon" />
                            Acompanhamento
                        </button>
                    </div>
                    <div className="button-group-crud">
                        <BotaoAlterar 
                            showModal={showModalAlterar}
                            showConfirmModalAlterar={showConfirmModalAlterar} 
                            openModal={openConfirmModalAlterar}
                            closeModal2={closeConfirmModalAlterar} 
                            closeModal={openModalAlterar}
                            closeModalAlterar={closeModalAlterar} />
                        <BotaoCancelar />
                        <BotaoExcluir 
                            showModal={showModalExcluir}
                            showConfirmModalExcluir={showConfirmModalExcluir}
                            openModal={openConfirmModalExcluir}
                            closeModal2={closeConfirmModalExcluir}
                            closeModal={openModalExcluir}
                            closeModalExcluir={closeModalExcluir}/>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default VisualizaAnimal;