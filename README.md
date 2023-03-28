
# Dindin - Banco Digital

- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 
- Obter extrato de transações 



## **Banco de dados**

 Banco de Dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:  


- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao
- transacoes
  - id
  - descricao
  - valor
  - data
  - categoria_id
  - usuario_id
  - tipo

Conteúdo da tabela categorias

- Categorias 
  - Alimentação
  - Assinaturas e Serviços
  - Casa
  - Mercado
  - Cuidados Pessoais
  - Educação
  - Família
  - Lazer
  - Pets
  - Presentes
  - Roupas
  - Saúde
  - Transporte
  - Salário
  - Vendas
  - Outras receitas
  - Outras despesas


## **Nota**

- Qualquer valor monetário esta representado em centavos (Ex.: R$ 10,00 reais = 1000)

---


### **Cadastro de usuário**
#### `POST` `/usuario`

Esta rota é utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O body deverá possuir um objeto com as seguintes propriedades:

  - nome
  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, deveremos enviar no body da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - Campos obrigatórios:
    - nome
    - email
    - senha
  - E-mail já existente
  - Criptografar a senha antes de persistir no banco de dados
  - Cadastrado do novo usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```
---

### **Login do usuário**

#### `POST` `/login`

Esta a rota permite que o usuario cadastrado realize o login no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O body deverá possuir um objeto com as seguintes propriedades:

  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, o body da resposta deverá possuir um objeto com a propriedade **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**

  - Campos obrigatórios:
    - email
    - senha
  - E-mail existente
  - Validar e-mail e senha
  - Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

### **Validações do token**

- **Validações**
  - Validar se o token foi enviado para Bearer Token
  - Verificar se o token é válido
  - Consultar usuário no banco de dados pelo id contido no token informado

---

### **Detalhar usuário**

#### `GET` `/usuario`

Esta rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil. Sendo válidado com base do token de requisição.  


- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o body da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```
---

### **Atualizar usuário**

#### `PUT` `/usuario`

Esta rota será chamada quando o usuário quiser realizar alterações no seu próprio usuário. O usuário é identificado através do ID presente no token de autenticação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O body deverá possuir um objeto com as seguintes propriedades:

  - nome
  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no body da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - Campos obrigatórios:
    - nome
    - email
    - senha
  - Verificar se o novo e-mail já existe no banco de dados para outro usuário
    - Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não é permitida
  - Criptografar a senha antes de salvar no banco de dados
  - Atualização as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
---

### **Listar categorias**

#### `GET` `/categoria`

Esta rota que é chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no body da requisição.

- **Resposta**  
    Em caso de **sucesso**, o body da resposta deverá possuir um array dos objetos (categorias) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Nota**
  - O endpoint devolve um array de todas as categorias cadastradas.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```
---

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Esta rota que é chamada quando o usuario logado quiser listar todas as suas transações cadastradas. Retorna **apenas** transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no body da requisição.

- **Resposta**  
    Em caso de **sucesso**, o body da resposta deverá possuir um array dos objetos (transações) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - O usuário é ser identificado através do ID presente no token de validação
  - O endpoint devolve um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário retorna com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```
---
### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essta rota que é chamada quando o usuario logado quiser obter uma das suas transações cadastradas. Retornando **apenas** transação associada ao usuário logado, que será identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O body da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, o body da resposta deverá possuir um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - Se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```
---

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Esta rota que é utilizada para cadastrar uma transação associada ao usuário logado. É possível cadastrar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O body da requisição deverá possuir um objeto com as seguintes propriedades:

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
    Em caso de **sucesso**, deveremos enviar, no body da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - Campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Verifica se existe categoria para o id enviado no body da requisição.
  - Verifica se o tipo enviado no body da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Cadastrar a transação associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
---

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Esta rota que é chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas. É possível atualizar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O body da requisição deverá possuir um objeto com as seguintes propriedades:

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no body da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no body da requisição.
  - Validar se o tipo enviado no body da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no body da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
---

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível excluir **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O body da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no body da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**:
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no body da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```
---
### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Esta rota que é chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas. É possível consultar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O body da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, deveremos enviar no body da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu body deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **Validações**:
  - Em caso de não existir transações do tipo `entrada` cadastradas para o usuário logado, o valor retornado no body da resposta deverá ser 0.
  - Em caso de não existir transações do tipo `saida` cadastradas para o usuário logado, o valor retornado no body da resposta deverá ser 0.

#### **Exemplo de requisição**

```javascript
// GET /transacao/extrato
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
 "entrada": 300000,
 "saida": 15800
}
```