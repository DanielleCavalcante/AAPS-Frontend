import { useState, useEffect } from 'react'

import { useAnimais } from '../../../hooks/useAnimais';
import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
// import { bloquearTeclas } from '../../../utils/BloqueiaTeclas';
import { useNavigate } from 'react-router-dom';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarAnimal.css';

const CadastroAnimal = () => {
    const navigate = useNavigate();
    //    const { criarAnimal, erro, carregando } = useAnimais();
    const { criarAnimal } = useAnimais();
    const [dadosAnimal, setDadosAnimal] = useState({
        nome: '',
        especie: '',
        raca: '',
        dataNascimento: '',
        pelagem: '',
        sexo: '',
        status: '',
        disponibilidade: '',
        doadorId: '',
        nomeDoador: '',
        resgatado: false,
    });

    const { listarDoadoresAtivos } = useDoadores();
    const [doadores, setDoadores] = useState([]);

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    useEffect(() => {
        const fetchDoadores = async () => {
            const doadoresData = await listarDoadoresAtivos();
            setDoadores(doadoresData);
        };
        fetchDoadores();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;

        setDadosAnimal({
            ...dadosAnimal,
            [id]: ['status', 'disponibilidade', 'doadorId'].includes(id) ? Number(value) : value
        });

        if (id === "doadorId") {
            const doadorSelecionado = doadores.find(d => d.id === Number(value));
            setDadosAnimal(prevState => ({
                ...prevState,
                nomeDoador: doadorSelecionado ? doadorSelecionado.nome : ''
            }));
        }
    };

    const handleDoadorChange = (e) => {
        const doadorId = e.target.value;
        const doadorSelecionado = doadores.find(d => d.id === Number(doadorId));
        setDadosAnimal({
            ...dadosAnimal,
            doadorId,
            nomeDoador: doadorSelecionado ? doadorSelecionado.nome : ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();
        try {
            await criarAnimal(dadosAnimal);
            setDadosAnimal({
                nome: '',
                especie: '',
                raca: '',
                dataNascimento: '',
                pelagem: '',
                sexo: '',
                status: '',
                disponibilidade: '',
                resgatado: false,
                doadorId: '',
                nomeDoador: ''
            });
        } catch (error) {
            tratarErro(error);
        }
    };

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-animais');
    }
    const openModal = () => {
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const raca = document.getElementById('raca').value;
        const pelagem = document.getElementById('pelagem').value;
        const sexo = document.getElementById('sexo').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const status = document.getElementById('status').value;
        const doadorId = document.getElementById('doadorId').value;
        const disponibilidade = document.getElementById('disponibilidade').value;

        // Verifica se todos os campos estão preenchidos
        if (status && nome && especie && raca && dataNascimento && pelagem && sexo && doadorId && disponibilidade) {
            setShowModal(true);
        } else {
            return null;
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">

                        <label htmlFor="disponibilidade">Disponibilidade</label>
                        <select
                            id="disponibilidade"
                            name="disponibilidade"
                            value={dadosAnimal.disponibilidade}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value={0}>Adotado</option>
                            <option value={1}>Disponível</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.disponibilidade) && (
                            <span className="erro-required"> O campo 'Disponibilidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">

                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={dadosAnimal.status}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        value={dadosAnimal.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do animal"
                    />
                    {(tentouEnviar && !dadosAnimal.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            value={dadosAnimal.especie}
                            onChange={handleChange}
                            placeholder="Digite a espécie do animal"
                        />
                        {(tentouEnviar && !dadosAnimal.especie) && (
                            <span className="erro-required"> O campo 'Espécie' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input
                            type="text"
                            id="raca"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            value={dadosAnimal.raca}
                            onChange={handleChange}
                            placeholder="Digite a raça do animal"
                        />
                        {(tentouEnviar && !dadosAnimal.raca) && (
                            <span className="erro-required"> O campo 'Raça' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            value={dadosAnimal.dataNascimento}
                            onChange={handleChange}
                            placeholder="Digite a data de nascimento do animal"
                        />
                        {(tentouEnviar && !dadosAnimal.dataNascimento) && (
                            <span className="erro-required"> O campo 'Data de Nascimento' é obrigatório </span>
                        )}
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input
                            type="text"
                            id="pelagem"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            value={dadosAnimal.pelagem}
                            onChange={handleChange}
                            placeholder="cor e tipo"
                        />
                        {(tentouEnviar && !dadosAnimal.pelagem) && (
                            <span className="erro-required"> O campo 'Pelagem' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name='sexo'
                            value={dadosAnimal.sexo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.sexo) && (
                            <span className="erro-required"> O campo 'Sexo' é obrigatório </span>
                        )}
                    </div>
                </div>

                <label className="radio-label-animal">
                    <input
                        type="checkbox"
                        name="resgatado"
                        id="resgatado"
                        value={dadosAnimal.resgatado}
                        checked={dadosAnimal.resgatado === true}
                        onChange={e =>
                            setDadosAnimal({ ...dadosAnimal, resgatado: e.target.checked })
                        }
                    />
                    Resgatado
                </label>

                <div className='group-adocao'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador</label>
                        <input
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            min="1" //valores a partir de 1.
                            value={dadosAnimal.doadorId}
                            onChange={handleChange}
                            // onKeyDown={(e) => bloquearTeclas(e, dadosAnimal.doadorId)}
                        />
                        {(tentouEnviar && !dadosAnimal.doadorId) && (
                            <span className="erro-required"> O campo 'Código Doador' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nomeDoador">Nome do Doador</label>
                        <select
                            id="nomeDoador"
                            value={dadosAnimal.doadorId}
                            onChange={handleDoadorChange}
                        >
                            <option value="">Selecione um doador</option>
                            {doadores.map(doador => (
                                <option key={doador.id} value={doador.id}>
                                    {doador.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroAnimal;