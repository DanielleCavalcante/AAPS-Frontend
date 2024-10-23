import React from 'react';
import './cadastroVoluntario.css';

const CadastroVoluntario = () => {

    const cancelar = (e) => {
        navigate('/home');
    };

    return (
      <div className="cadastro-container">
          <form className="cadastroVoluntario-form">
              <div className="form-group">
                  <label htmlFor="codigo">Código</label>
                  <input type="text" id="codigo" disabled/>
              </div>
              <div className="form-group">
                  <label htmlFor="tipo">Tipo</label>
                  <select id="tipo" name="opcoesUsuario">
                    <option value="1">Voluntário</option>
                    <option value="2">Administrador</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" placeholder="Digite o nome do voluntário" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input type="text" id="cpf" placeholder="Digite o CPF do voluntário" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="celular">Celular</label>
                  <input type="text" id="celular" placeholder="Digite o celular do voluntário" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="senha">Senha</label>
                  <input type="text" id="senha" placeholder="Digite a senha provisória do voluntário" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="situacao">Situação</label>
                  <select id="situacao" name="opcoesSituacao">
                    <option value="1">Ativo</option>
                    <option value="2">Suspenso</option>
                  </select>
              </div>

              <div className="button-group-crud">
                  <button type="submit" className="btn-Salvar" style={{ backgroundColor: '#40c057', color: 'white' }}>Salvar</button>
                  <button type="button" className="btn-Cancelar" style={{ backgroundColor: '#7a27d9f7', color: 'white' }} onClick={cancelar}>Cancelar</button>
                  <button type="button" className="btn-Alterar" style={{ backgroundColor: '#f923ebf7', color: 'white' }}>Alterar</button>
                  <button type="button" className="btn-Limpar" style={{ backgroundColor: '#f96800f7', color: 'white' }}>Limpar</button>
                  <button type="button" className="btn-Excluir" style={{ backgroundColor: '#939393f7', color: 'white' }}>Excluir</button>
              </div>
          </form>
      </div>
    );
  }
  
  export default CadastroVoluntario;