import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarNome } from '../../../utils/ValidaNome';

import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useError } from '../../../hooks/useError';

import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarVoluntario.css';

const VisualizarVoluntario = () => {
  const { buscarVoluntarioPorId, atualizarVoluntario, resetarSenha, erro, tratarErro, limparErro } = useVoluntarios();

  const { id } = useParams();
  const [voluntario, setVoluntario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formDados, setFormDados] = useState({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [erroCPF, setErroCPF] = useState('');

  //Modais:
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setEditando(false);
    setShowModal(false);
  }

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

    //Chama a validação do CPF
    if (name === 'cpf') {
      // Remove caracteres não numéricos
      const cpfLimpo = value.replace(/[^\d]+/g, '');

      // Se CPF tiver exatamente 11 dígitos, faz a validação
      if (cpfLimpo.length === 11) {
        if (!validarCPF(cpfLimpo)) {
          setErroCPF('Eita! CPF inválido');
        } else {
          setErroCPF('');
        }
      }
      else {
        // Enquanto não tiver 11 dígitos, não mostra erro
        setErroCPF('');
      }
    }

    setFormDados({ ...formDados, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //evita o reload da página e mantém o modal aberto
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

    const cpfLimpo = formDados.cpf.replace(/[^\d]+/g, '');

    if (!validarCPF(cpfLimpo)) {
      setErroCPF('Eita! CPF inválido');
      alert("CPF invalido. Insira novamente");
      return;
    }

    try {
      formDados.cpf = cpfLimpo;
      await atualizarVoluntario(id, formDados);
      openModal();
      // setEditando(false);
      // setTentouEnviar(false);
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

  // const resetarSenha = () => {
  //   document.getElementById('senha').value = '';
  // };

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
            name='nome'
            maxLength={50} //verificar tamanho maximo.
            value={formDados.nome}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (!validarNome(e.key) && e.key.length === 1) {
                e.preventDefault();
              }
            }}
            placeholder="Digite o nome do voluntário"
            disabled={!editando}
          />
          {(tentouEnviar && !formDados.nome) && (
            <span className="erro-required"> O campo 'Nome' é obrigatório </span>
          )}
        </div>

        <div className="cadastroVoluntario-linha">

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
            <label htmlFor="cpf">CPF</label>
            <InputMask
              mask="999.999.999-99"
              value={formDados.cpf}
              onChange={handleInputChange}
              placeholder="___.___.___-__"
              disabled={!editando}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  id="cpf"
                  name="cpf"
                  type="text"
                  disabled={!editando}
                  className={erroCPF ? 'input-error' : ''}
                />
              )}
            </InputMask>
            {erroCPF && <span className="error">{erroCPF}</span>}
            {(tentouEnviar && !formDados.cpf) && (
              <span className="erro-required"> O campo 'CPF' é obrigatório </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <InputMask
              mask="(99) 99999-9999"
              value={formDados.phoneNumber}
              onChange={handleInputChange}
              placeholder="(__) _____-____"
              disabled={!editando}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  disabled={!editando}
                />
              )}
            </InputMask>
            {(tentouEnviar && !formDados.phoneNumber) && (
              <span className="erro-required"> O campo 'Celular' é obrigatório </span>
            )}
          </div>
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

          <div className="form-group">
            <button
              type="button"
              id="voluntarioId"
              className={`botao-resetar-senha ${editando ? 'ativo' : 'desabilitado'}`}
              name="voluntarioId"
              disabled={!editando}
              onClick={() => { handleResetarSenha(voluntario.id) }}
            >
              <i className="fas fa-key" style={{ marginRight: '8px' }}></i>
              Resetar Senha
            </button>
          </div>


        </div>

        <div className="button-group-crud">
          {!editando ? (
            <BotaoAlterar onClick={() => setEditando(true)} /> //disabled={editando}
          ) : (
            <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
          )}
          <BotaoCancelar />
        </div>
      </form>
    </div>
  );
};

export default VisualizarVoluntario;