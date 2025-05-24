import { useState, useEffect } from 'react'

import { useAnimais } from '../../../hooks/useAnimais';
import { useDoadores } from '../../../hooks/useDoadores';
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

<<<<<<< HEAD
    const { listarDoadoresAtivos } = useDoadores();
    const [doadores, setDoadores] = useState([]);

=======
    const { listarDoadoresAtivos } = useDoadores();  
    const [doadores, setDoadores] = useState([]);
    
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
    const [foto, setFoto] = useState(null);

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
            setFoto(null);
        } catch (error) {
            alert("Erro ao cadastrar animal!");
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
<<<<<<< HEAD

                        <label htmlFor="disponibilidade">Disponibilidade</label>
                        <select
                            id="disponibilidade"
=======
                        
                        <label htmlFor="disponibilidade">Disponibilidade</label>
                        <select 
                            id="disponibilidade" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            name="disponibilidade"
                            value={dadosAnimal.disponibilidade}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value={0}>Adotado</option>
                            <option value={1}>Disponível</option>
                        </select>
<<<<<<< HEAD
                    </div>
                    <div className="form-group">
=======
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c

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

                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
<<<<<<< HEAD
                    <input
=======
                    <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        type="text"
                        id="nome"
                        name="nome"
                        value={dadosAnimal.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do animal"
                        required
                    />
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
<<<<<<< HEAD
                        <input
=======
                        <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            type="text"
                            id="especie"
                            name="especie"
                            value={dadosAnimal.especie}
                            onChange={handleChange}
                            placeholder="Digite a espécie do animal"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
<<<<<<< HEAD
                        <input
=======
                        <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            type="text"
                            id="raca"
                            value={dadosAnimal.raca}
                            onChange={handleChange}
                            placeholder="Digite a raça do animal"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
<<<<<<< HEAD
                        <input
=======
                        <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            type="date"
                            id="dataNascimento"
                            value={dadosAnimal.dataNascimento}
                            onChange={handleChange}
                            placeholder="Digite a data de nascimento do animal"
                        />
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
<<<<<<< HEAD
                        <input
=======
                        <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            type="text"
                            id="pelagem"
                            value={dadosAnimal.pelagem}
                            onChange={handleChange}
                            placeholder="cor e tipo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
<<<<<<< HEAD
                        <select
=======
                        <select 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            id="sexo"
                            name='sexo'
                            value={dadosAnimal.sexo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                    </div>
                </div>

<<<<<<< HEAD
                <label className="radio-label-animal">
=======
                <label className="radio-label">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
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

<<<<<<< HEAD
                <div className='group-adocao'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador</label>
                        <input
=======
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador</label>
                        <input 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            value={dadosAnimal.doadorId}
                            onChange={handleChange}
                        />
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
<<<<<<< HEAD
                    <BotaoLimpar />
=======
                    <BotaoLimpar/>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>
            </form>
        </div>
    );
}

export default CadastroAnimal;