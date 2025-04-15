import { useState, useEffect } from 'react'
import './cadastroAnimal.css';
import { useNavigate } from 'react-router-dom';
import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import { useAnimais } from '../../hooks/useAnimais';
import { useDoadores } from '../../hooks/useDoadores';


const CadastroAnimal = () => {
     const navigate = useNavigate();
    const { criarAnimal, erro, carregando } = useAnimais();
    const { listarDoadoresAtivos } = useDoadores();  
    const [foto, setFoto] = useState(null);
    const [doadores, setDoadores] = useState([]);
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
        nomeDoador: ''
    });

    useEffect(() => {
        const fetchDoadores = async () => {
            try {
                const doadoresData = await listarDoadoresAtivos();
                setDoadores(doadoresData);
            } catch (error) {
                console.error('Erro ao carregar doadores', error);
            }
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
        navigate('/animal');
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

    // Handler para upload de foto
    const handleFotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    };

    const handleFotoCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const capturePhoto = () => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Parar o stream
                stream.getTracks().forEach((track) => track.stop());

                // Atualizar o estado da foto
                setFoto(canvas.toDataURL('image/png'));
            };

            // Exibe um modal ou uma janela para tirar a foto
            const confirmPhoto = window.confirm("Pronto para capturar a foto?");
            if (confirmPhoto) {
                capturePhoto();
            }
        } catch (error) {
            console.error("Erro ao acessar a câmera:", error);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
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

                    <div className="foto-upload">
                        <div className="foto-buttons">
                            {/* Botão de capturar foto */}
                            <button type="button" className="camera" onClick={handleFotoCamera}>
                                <img src="/src/assets/icone_camera.png" alt="Ícone câmera" className="icon" />
                            </button>

                            {/* Botão de upload */}
                            <label className="upload">
                                <img src="/src/assets/icone_upload.png" alt="Ícone upload" className="icon" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input 
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
                        <input 
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
                        <input 
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
                        <input 
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
                        <input 
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
                    </div>
                </div>
                <div id='group3'>
                    
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador</label>
                        <input 
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
                    <BotaoLimpar/>
                </div>
            </form>
        </div>
    );
}

export default CadastroAnimal;