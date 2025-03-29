import { useState } from 'react'
import './cadastroAnimal.css';
import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import { useAnimal } from '../../hooks/useAnimal';

const CadastroAnimal = () => {
    const { criarAnimal, erro, carregando } = useAnimal();
    const [foto, setFoto] = useState(null);

    const [dadosAnimal, setDadosAnimal] = useState({
        nome: '',
        especie: '',
        raca: '',
        dataNascimento: '',
        pelagem: '',
        sexo: 'M',
        status: true,
        doadorId: 1 
    });

    const handleChange = (e) => {
        setDadosAnimal({
            ...dadosAnimal,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Dados sendo enviados:", dadosAnimal); // Adicione este log
        try {
            await criarAnimal({ dadosAnimal });
            alert("Animal cadastrado com sucesso!");

            setDadosAnimal({
                nome: '',
                especie: '',
                raca: '',
                dataNascimento: '',
                pelagem: '',
                sexo: '1',
                doadorId: 1,
                coddoador: 1,
                status: 0
            });
            setFoto(null);
        } catch (error) {
            alert("Erro ao cadastrar animal!");
        }
    };

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        const status = document.getElementById('status').value;
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const raca = document.getElementById('raca').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const pelagem = document.getElementById('pelagem').value;
        const sexo = document.getElementById('sexo').value;
        const doadorId = document.getElementById('doadorId').value;
        const coddoador = document.getElementById('coddoador').value;

        // Verifica se todos os campos estão preenchidos
        if (status && nome && especie && raca && dataNascimento && pelagem && sexo && doadorId) {
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

    /* function handleSubmit(event) {
        event.preventDefault()
        event.currentTarget.elements.statusAdocao.value = 1;
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.especie.value = '';
        event.currentTarget.elements.raca.value = '';
        event.currentTarget.elements.dataNascimento.value = '';
        event.currentTarget.elements.pelagem.value = '';
        event.currentTarget.elements.sexo.value = 1;
        event.currentTarget.elements.doador.value = 1;
        event.currentTarget.elements.coddoadordoador.value = 1;
    } */

    return (
        <div className="cadastro-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={dadosAnimal.status}
                            onChange={handleChange}
                        >
                            <option value={true}>Adotado</option>
                            <option value={false}>Disponível</option>
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
                            required
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
                            value={dadosAnimal.sexo}
                            onChange={handleChange}
                        >
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Doador</label>
                        <select 
                            id="doadorId"
                            value={dadosAnimal.doadorId}
                            onChange={handleChange}
                        >
                            <option value={1}>Doador1</option>
                            <option value={2}>Doador2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="coddoador">Código Doador</label>
                        <select 
                            id="coddoador" 
                            name="coddoador" 
                            value={dadosAnimal.coddoador} 
                            onChange={handleChange}
                        >
                            <option value={1}>doador01</option>
                            <option value={2}>doador02</option>
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