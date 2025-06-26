
<h1 align="center">🐾 Sistema de Gerenciamento de Adoções - ONG AAPS (Front-end) 🐾</h1>

<p align="center">
  <strong>Trabalho de Graduação</strong><br/>
  Apresentado à Faculdade de Tecnologia de Sorocaba - Fatec Sorocaba,<br/>
  como parte dos pré-requisitos para obtenção do título de Tecnólogo em Análise e Desenvolvimento de Sistemas.
</p>

---

### 🎓 Informações Acadêmicas

- **Instituição:** Fatec Sorocaba  
- **Curso:** Análise e Desenvolvimento de Sistemas  
- **Semestre:** 7º

### 👨‍💻 Integrantes do Projeto

- Adriana Akagui  
- Alisson de Lima  
- Danielle da Silva  
- Franciele Rodrigues  
- Nicollas Schlemm  

---

## 📋 Sobre o Projeto

Este repositório contém o **front-end** do sistema da ONG **AAPS (Associação Anjos e Protetores de Sorocaba)**.

O sistema permite que os voluntários cadastrados consigam interagir com a API para:
- Cadastrar e visualizar animais, adotantes, doadores e adoções
- Emitir e visualizar termos de adoção
- Acompanhar histórico de saúde dos animais
- Gerar relatórios e realizar buscas por período

> ⚠️ Para o funcionamento completo do sistema, é necessário rodar também a API disponível em:  
> [https://github.com/DanielleCavalcante/AAPS.Api](https://github.com/DanielleCavalcante/AAPS.Api)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **React 18** | Biblioteca para construção da interface |
| **Vite** | Ferramenta de build e dev server |
| **Axios** | Requisições HTTP |
| **React Router DOM** | Navegação SPA |
| **Cleave.js** | Máscara de input |
| **Bootstrap / FontAwesome** | Estilização e ícones |

### 📦 Dependências

- `react` - ^18.3.1  
- `react-dom` - ^18.3.1  
- `react-router-dom` - ^6.28.0  
- `axios` - ^1.8.4  
- `cleave.js` - ^1.6.0  
- `bootstrap` - ^2.0.0  
- `@fortawesome/fontawesome-free` - ^6.6.0  

---

## ▶️ Como Executar Localmente

### ✅ Pré-requisitos

- Node.js (recomendado: versão 18 ou superior)
- Gerenciador de pacotes npm ou yarn
- Ter a [API rodando localmente](https://github.com/DanielleCavalcante/AAPS.Api)

---

### 📁 1. Clone o Repositório

```bash
git clone https://github.com/DanielleCavalcante/AAPS-Frontend.git
cd AAPS-Frontend
```

---

### 📦 2. Instale as dependências

```bash
npm install
```

---

### ⚙️ 3. Configure o ambiente

Localize o arquivo `.env` na raiz do projeto e altere a URL base da API:

```
VITE_API_URL=https://localhost:5001/swagger/index.html
```

> 💡 Use a porta correta configurada na sua API (por exemplo: 5001).

---

### 🚀 4. Execute o projeto

```bash
npm run dev
```

A aplicação será aberta em `http://localhost:5173` (ou outra porta indicada no terminal).

---

## 💡 Considerações Finais

- Este projeto é o **front-end** do sistema da ONG AAPS.
- A API RESTful deve estar em execução para que todas as funcionalidades funcionem corretamente.  
  👉 [Repositório da API](https://github.com/DanielleCavalcante/AAPS.Api)
- Projeto desenvolvido com foco em usabilidade, organização e responsabilidade social.

---

<p align="center"><strong>📌 Projeto acadêmico desenvolvido para fins educacionais e sociais.</strong></p>
