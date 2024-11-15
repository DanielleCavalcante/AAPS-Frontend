import React, { useState } from 'react';
import './cadastrodoador.css';

const CadastroDoador = () => {
    const [telefones, setTelefones] = useState(['']);

    const adicionarTelefone = () => {
        setTelefones([...telefones, '']);
    };

    const handleTelefoneChange = (index, value) => {
        const novosTelefones = [...telefones];
        novosTelefones[index] = value;
        setTelefones(novosTelefones);
    };

    return (
        <div className="doador-container">

            <div className="form-group">
                <label>Código</label>
                <input type="text" id="codigo" />
            </div>

            <div className="form-group">
                <label>Nome</label>
                <input type="text" id="nome" />
            </div>

            <div className="form-group">
                <label>RG</label>
                <input type="text" id="rg" />
            </div>

            <div className="form-group">
                <label>CPF</label>
                <input type="text" id="cpf" />
            </div>

            <div className="form-group">
                <label>Telefone</label>
                {telefones.map((telefone, index) => (
                    <div key={index} className="form-group-phone">
                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => handleTelefoneChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button onClick={adicionarTelefone} className="btn-add-phone">
                    + Telefone
                </button>
            </div>

            <div className="form-group">
                <label>Endereço</label>
                <input type="text" id="endereco" />
            </div>

            <div className="form-group">
                <label>CEP</label>
                <input type="text" id="cep" />
            </div>

            <div className="form-group">
                <label>Cidade</label>
                <input type="text" id="cidade" />
            </div>

            <div className="form-group">
                <label>Estado</label>
                <input type="text" id="estado" />
            </div>

            <div className="btn-group">

                <button className="btn btn-save">
                    <i class="fa fa-floppy" aria-hidden="true"></i>
                    <span>Salvar</span>
                </button>

                <button className="btn btn-cancel">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    <span>Cancelar</span>
                </button>

                <button className="btn btn-edit">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                    <span>Alterar</span>
                </button>

                <button className="btn btn-clear">
                    <i class="fa fa-eraser" aria-hidden="true"></i>
                    <span>Limpar</span>
                </button>

                <button className="btn btn-delete">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
};

export default CadastroDoador;
