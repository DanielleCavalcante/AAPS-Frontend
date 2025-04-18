import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useError } from '../../../hooks/useError';

import BotaoCancelar from '/src/components/BotaoCancelar/BotaoCancelar.jsx';
import BotaoAlterar from '/src/components/BotaoAlterar/BotaoAlterar.jsx';
import BotaoExcluir from '/src/components/BotaoExcluir/BotaoExcluir.jsx';
import './VisualizarVoluntario.css';

const VisualizarVoluntario = () => {
  const { buscarVoluntarioPorId, atualizarVoluntario, resetarSenha, erro, tratarErro, limparErro } = useVoluntarios();

  const { id } = useParams();
  const [voluntario, setVoluntario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formDados, setFormDados] = useState({});

  const [tentouEnviar, setTentouEnviar] = useState(false);

  useEffect(() => {
    buscarVoluntarioPorId(id)
      .then((dados) => {
      const dadosFormatados = {
          ...dados,
          status: Number(dados.status)
      };
      setVoluntario(dadosFormatados);
      setFormDados(dadosFormatados);
      })
      .catch(console.error);
  }, [id]);

  if (erro) return <div className="erro">{erro}</div>;
  if (!voluntario) return <div>Voluntario não encontrado</div>; // apagar depois

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = 'status';
    const parsedValue = numericFields.includes(name) ? Number(value) : value;
    setFormDados({ ...formDados, [name]: parsedValue });
  };

  const handleSubmit = async () => {
    setTentouEnviar(true); 
    limparErro();

    if (!formDados.nome?.trim()) {
        return; 
    }
    if (!formDados.cpf?.trim()) {
      return; 
    }
    if (!formDados.userName?.trim()) {
      return; 
    }
    if (!formDados.email?.trim()) {
      return; 
    }
    if (!formDados.phoneNumber?.trim()) {
      return; 
    }
    if (!formDados.acesso?.trim()) {
      return; 
    }

    try {
        await atualizarVoluntario(id, formDados);
        setEditando(false);
        setTentouEnviar(false);
    } catch (error) {
        tratarErro(error);
    }
  };

  const handleResetarSenha = async (id) => {
    try {
      await resetarSenha({ voluntarioId: Number(id) });
      limparErro();
    } catch (error) {
      tratarErro(error);
    }
  };
  
  // configurações de modal
  /* const [showModalAlterar, setShowModalAlterar] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição

  const closeModalAlterar = () => setShowModalAlterar(false);
  const openModalAlterar = () => {
    const tipo = document.getElementById('tipo').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const celular = document.getElementById('celular').value;
    const senha = document.getElementById('senha').value;
    const situacao = document.getElementById('situacao').value;

    if (tipo && nome && cpf && celular && senha && situacao) {
      setShowModalAlterar(true);
    }
  };

  const closeModalExcluir = () => setShowModalExcluir(false);
  const closeConfirmModal = () => setShowConfirmModal(false);

  const openModalExcluir = () => {
    setShowConfirmModal(false);
    setShowModalExcluir(true);
  };

  const openConfirmModal = () => {
    const tipo = document.getElementById('tipo').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const celular = document.getElementById('celular').value;
    const senha = document.getElementById('senha').value;
    const situacao = document.getElementById('situacao').value;

    if (tipo && nome && cpf && celular && senha && situacao) {
      setShowConfirmModal(true);
    }
  };

  const resetarSenha = () => {
    document.getElementById('senha').value = '';
  }; */

  return (
    <div className="cadastro-container">
      <form className="cadastroVoluntario-form" onSubmit={handleSubmit}>
        <div className="cadastroVoluntario-linha">
          <div className="form-group">
            <label htmlFor="codigo">Código</label>
            <input type="text" id="id" value={voluntario?.id || ''} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Acesso</label>
            <select 
              id="acesso" 
              name="acesso"
              value={formDados?.acesso}
              onChange={handleInputChange}
              disabled={!editando}
            >
              <option value="Padrao">Voluntário</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input 
            type="text" 
            id="nome" 
            name= "nome"
            value={formDados?.nome || ''}
            onChange={handleInputChange}
            placeholder="Digite o nome do voluntário" 
            disabled={!editando} 
          />
          {(tentouEnviar && !formDados.nome) && (
            <span className="erro-required"> O campo 'Nome' é obrigatório </span>
          )}
        </div>

        <div className="cadastroVoluntario-linha">
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input 
              type="text" 
              id="cpf" 
              name="cpf"
              value={formDados?.cpf || ''}
              onChange={handleInputChange}
              placeholder="Digite o CPF do voluntário" 
              disabled={!editando} 
            />
            {(tentouEnviar && !formDados.cpf) && (
              <span className="erro-required"> O campo 'CPF' é obrigatório </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input 
              type="text" 
              id="celular" 
              name="phoneNumber"
              value={formDados?.phoneNumber || ''}
              onChange={handleInputChange}
              placeholder="Digite o celular do voluntário" 
              disabled={!editando}
            />
            {(tentouEnviar && !formDados.phoneNumber) && (
              <span className="erro-required"> O campo 'Celular' é obrigatório </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="userName">Nome de Usuário</label>
          <input 
            type="text" 
            id="userName" 
            name="userName"
            value={formDados?.userName || ''}
            onChange={handleInputChange}
            placeholder="Digite o nome de usuário do voluntário" 
            disabled={!editando}
          />
          {(tentouEnviar && !formDados.userName) && (
            <span className="erro-required"> O campo 'Nome de Usuário' é obrigatório </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            value={formDados?.email || ''}
            onChange={handleInputChange}
            placeholder="Digite o email do voluntário" 
            disabled={!editando}
          />
          {(tentouEnviar && !formDados.email) && (
            <span className="erro-required"> O campo 'Email' é obrigatório </span>
          )}
        </div>

        <div id="group-animal1">
          {/* <div className="form-group">
            <label htmlFor="senha">Senha</label>
              <input
                type="text"
                id="senha"
                placeholder="Digite a senha provisória do voluntário"
                required
              />
          </div> */}
          <div className="form-group">
            <button
              type="button"
              id="voluntarioId"
              className="botao-resetar-senha"
              name="voluntarioId"
              disabled={!editando}
              onClick={() => { handleResetarSenha(voluntario.id) }}
            >
              Resetar Senha
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              name="status"
              value={formDados?.status}
              onChange={handleInputChange}
              disabled={!editando}
            >
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
          </div>
        </div>

        <div className="button-group-crud">
          {!editando ? (
            <BotaoAlterar 
              onClick={() => setEditando(true)} 
              //disabled={editando}
            /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  *//>
          ) : (
            <button 
                type="button" 
                className="botao-alterar" 
                onClick={() => handleSubmit()}
            >
                Salvar
            </button>
            //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
          )}
          <BotaoCancelar /*  disabled={!isEditable} */ />
          <BotaoExcluir
            /* showModal={showModalExcluir}
            showConfirmModal={showConfirmModal}
            openModal={openModalExcluir}
            closeModal={closeModalExcluir} */
          />
        </div>
      </form>
    </div>
  );
};

export default VisualizarVoluntario;