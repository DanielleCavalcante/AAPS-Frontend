import { useState } from 'react';
import './visualizaVoluntario.css';

import BotaoCancelar from '/src/components/BotaoCancelar';
import BotaoAlterar from '/src/components/BotaoAlterar';
import BotaoExcluir from '/src/components/BotaoExcluir';

const VisualizarVoluntario = () => {
  const [showModalAlterar, setShowModalAlterar] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.elements.tipo.value = 1;
    event.currentTarget.elements.nome.value = '';
    event.currentTarget.elements.cpf.value = '';
    event.currentTarget.elements.celular.value = '';
    event.currentTarget.elements.senha.value = '';
    event.currentTarget.elements.situacao.value = 1;
  };

  const resetarSenha = () => {
    document.getElementById('senha').value = '';
  };

  return (
    <div className="cadastro-container">
      <form className="cadastroVoluntario-form" onSubmit={handleSubmit}>
        <div className="cadastroVoluntario-linha">
          <div className="form-group">
            <label htmlFor="codigo">Código</label>
            <input type="text" id="codigo" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" name="opcoesUsuario">
              <option value="1">Voluntário</option>
              <option value="2">Administrador</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" placeholder="Digite o nome do voluntário" required />
        </div>

        <div className="cadastroVoluntario-linha">
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" placeholder="Digite o CPF do voluntário" required />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input type="text" id="celular" placeholder="Digite o celular do voluntário" required />
          </div>
        </div>

        <div id="group-animal1">
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
              <input
                type="text"
                id="senha"
                placeholder="Digite a senha provisória do voluntário"
                required
              />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="botao-resetar-senha"
              onClick={resetarSenha}
            >
              Redefinir Senha
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="situacao">Situação</label>
            <select id="situacao" name="opcoesSituacao">
              <option value="1">Ativo</option>
              <option value="2">Suspenso</option>
            </select>
          </div>

        </div>

        <div className="button-group-crud">
          <BotaoCancelar disabled={!isEditable} />  {/* Desabilita o botão "Cancelar" se os campos estiverem desabilitados */}
          <BotaoAlterar
            showModal={showModalAlterar}
            openModal={openModalAlterar}
            closeModal={closeModalAlterar}
          />
          <BotaoExcluir
            showModal={showModalExcluir}
            showConfirmModal={showConfirmModal}
            openModal={openModalExcluir}
            closeModal={closeModalExcluir}
          />
        </div>
      </form>
    </div>
  );
};

export default VisualizarVoluntario;
