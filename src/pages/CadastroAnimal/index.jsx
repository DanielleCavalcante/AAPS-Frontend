import './cadastroAnimal.css';
import api from "../../services/api"
import { ObterAnimais } from "../Animal"
import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import { useState, useRef } from 'react'

const CadastroAnimal = () => {
    // parte de acesso na api
    const  inputNome = useRef();
    const  inputEspecie = useRef();
    const  inputRaca = useRef();
    const  inputPelagem = useRef();
    const  inputSexo = useRef();
    const  inputDtNasc = useRef();
    const  inputStatus = useRef();
    const  inputDoador = useRef();

    async function CriarAnimal(){
        try {
        await api.post('api/Animal/CriarAnimal/Criar',{
            nome: inputNome.current.value,
            especie: inputEspecie.current.value,
            raca: inputRaca.current.value,
            pelagem: inputPelagem.current.value,
            sexo: inputSexo.current.value,
            dataNascimento: new Date(inputDtNasc.current.value),
            status: inputStatus.current.value === 'true',
            doadorId: parseInt(inputDoador.current.value)
        });
        }catch (error) {
            console.error("Erro ao criar animal:", error);
        }
    }

    // parte do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
    const statusAdocao = document.getElementById('statusAdocao').value;
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const raca = document.getElementById('raca').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const pelagem = document.getElementById('pelagem').value;
    const sexo = document.getElementById('sexo').value;
    const doador = document.getElementById('doador').value;

    // Verifica se todos os campos estão preenchidos
    if (statusAdocao && nome && especie && raca && dataNascimento && pelagem && sexo && doador) {
        setShowModal(true);
    } else {
        return null;
    }
    };

    function handleSubmit(event) {
        CriarAnimal();
        ObterAnimais() //recarregar animais sem precisar recarregar a tela

        event.preventDefault()
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
        <div className="cadastro-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group1">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusAdocao">Status</label>
                        <select id="statusAdocao" name="statusAdocao" ref={inputStatus}>
                            <option value="false">Adotado</option>
                            <option value="true">Disponível</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do animal" ref={inputNome} required />
                </div>
                <div id="group1">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input type="text" id="especie" placeholder="Digite a espécie do animal" ref={inputEspecie} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input type="text" id="raca" placeholder="Digite a raça do animal" ref={inputRaca} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="date" id="dataNascimento" placeholder="Digite a data de nascimento do animal" ref={inputDtNasc} required />
                    </div>
                </div>
                <div id='group1'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input type="text" id="pelagem" placeholder="Digite a pelagem do animal" ref={inputPelagem} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" name="sexo" ref={inputSexo}>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doador">Doador</label>
                        <select id="doador" name="doador" ref={inputDoador}>
                            <option type="number" value="1">Doador1</option>
                            <option type="number" value="2">Doador2</option>
                        </select>
                    </div>
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar onClick={CriarAnimal} showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroAnimal;