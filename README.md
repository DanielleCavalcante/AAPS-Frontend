
# Sistema de Gerenciamento de Adoções ONG AAPS 🐾
**Trabalho de Graduação apresentado à Faculdade de Tecnologia de Sorocaba, como parte dos pré-requisitos para obtenção do título de Tecnólogo em Análise e Desenvolvimento de Sistemas**

### Fatec Sorocaba
### Curso: Análise e Desenvolvimento de Sistemas

### Integrantes
- Adriana Akagui  
- Alisson de Lima  
- Danielle da Silva  
- Franciele Rodrigues  
- Nicollas Schlemm  

---

Este repositório contém a **API** desenvolvida para o projeto da ONG **AAPS (Associação Anjos e Protetores de Sorocaba)**.  
O objetivo principal é **centralizar e facilitar a gestão de cadastros, emissão e acompanhamento de termo de adoções e extração de relatório de adoções por período** de:

Além disso, a API possibilita **acompanhar o histórico de procedimentos dos animais (cirurgias, vacinas e etc)**, **gerenciar voluntários** que tenham acesso ao sistema e **enviar termos de adoção por e-mail** de forma prática e organizada.

> 🔗 O repositório do front-end, que se comunica com esta API, está disponível em:  
> [https://github.com/DanielleCavalcante/AAPS-Frontend](https://github.com/DanielleCavalcante/AAPS-Frontend)

---

## 🛠️ Tecnologias e Pacotes Utilizados

**Framework:** ASP.NET Core 8.0  
**Banco de Dados:** SQL Server  
**ORM:** Entity Framework Core  
**Autenticação:** ASP.NET Identity + JWT  
**Geração de PDF:** QuestPDF, iText7  
**Exportação Excel:** ClosedXML  
**Documentação:** Swagger

### 📦 Pacotes (com versões)

- `Microsoft.EntityFrameworkCore` - 8.0.8  
- `Microsoft.EntityFrameworkCore.SqlServer` - 8.0.8  
- `Microsoft.EntityFrameworkCore.Tools` - 8.0.8  
- `Microsoft.AspNetCore.Identity` - 2.3.1  
- `Microsoft.AspNetCore.Identity.EntityFrameworkCore` - 8.0.8  
- `Microsoft.AspNetCore.Authentication.JwtBearer` - 8.0.10  
- `ClosedXML` - 0.104.2  
- `iText7` - 9.1.0  
- `iText7.BouncyCastle.Adapter` - 9.1.0  
- `QuestPDF` - 2025.5.0  
- `Swashbuckle.AspNetCore` (Swagger) - 6.4.0  
- `System.Net.Http.Json` - 9.0.3  

---

## ▶️ Como executar localmente

### Pré-requisitos

- Visual Studio 2022 (ou superior)
- SQL Server (recomendado: SSMS para gerenciar o banco)
- .NET 8 SDK instalado

---

### 1. Clone o repositório

```bash
git clone https://github.com/DanielleCavalcante/AAPS.Api.git
```

Abra o projeto no Visual Studio.

---

### 2. Configure o `appsettings.json`

Localize o arquivo `appsettings.json` e configure a string de conexão com seu SQL Server.

```json
"ConnectionStrings": {
  "DbAapsLocal": "Server=SEU_SERVIDOR_SQL;Database=DbAaps;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
}
```

> 📝 Exemplo de nome do servidor:  
> `DESKTOP-NOME\SQLEXPRESS`  
> Você encontra isso ao abrir o SSMS (SQL Server Management Studio), no campo "Nome do servidor".

---

### 3. Gerar banco de dados via Migration

No Visual Studio:

1. Acesse o **Gerenciador de Pacotes NuGet** (Menu Ferramentas > Gerenciador de Pacotes NuGet > Console do Gerenciador de Pacotes)
2. Execute o comando:

```powershell
Update-Database
```

Obs: é necessário configurar a string de conexão no appsettings antes desse passo.

---

### 4. Execução da API

- Pressione `F5` ou clique em **Iniciar** no Visual Studio.
- A API será aberta no navegador com o **Swagger UI** para facilitar testes e visualização dos endpoints.

---

Ao rodar o projeto, será exibida uma interface interativa gerada com Swagger, onde é possível testar todas as rotas da API diretamente pelo navegador.

---

## 💡 Observações Finais

- Este projeto é uma **API RESTful**.
- O front-end está separado neste repositório:  
  👉 [https://github.com/DanielleCavalcante/AAPS-Frontend](https://github.com/DanielleCavalcante/AAPS-Frontend)
- Ambos os repositórios juntos compõem o **Sistema de Gerenciamento de Adoções da ONG AAPS**.

---

📌 Projeto acadêmico desenvolvido para fins educacionais e sociais.
