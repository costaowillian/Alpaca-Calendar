## Pré-requisitos

Certifique-se de ter o seguinte instalado antes de começar:

- [Node.js](https://nodejs.org/): O ambiente de execução JavaScript.
- [Yarn](https://yarnpkg.com/): Gerenciador de pacotes para instalar e gerenciar dependências.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
- [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL utilizado pelo projeto.
- [Angular](https://angular.io/): Framework para desenvolvimento de aplicações web

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:

```bash
git clone link-do-repositório
```

2. Instale as dependências no back end (pasta /alpaca.api):
`yarn install`

3. Instale as dependências no front end (pasta /calendar):
`npm install`

4. Configure as variáveis de ambiente no back end (se necessário):
Crie um arquivo chamado `.env` na raiz do seu projeto e configure as variáveis de ambiente necessárias. Um exemplo de arquivo `.env` pode ser o seguinte:

```
# Porta para o servidor Express
PORT=8000

# URL de conexão com o MongoDB
MONGODB_URL=seu-link-de-acesso-ao-mongo-db

# Chave secreta para assinatura de JWT
SECRET=sua-chave-secreta
```

4. Inicie o servidor de desenvolvimento do Back-End:
- `yarn start:dev`

5. Inicie o servidor do Front-End:
- `yarn start:dev`

## Scripts Disponíveis

No diretório do projeto Back-End, você pode executar os seguintes scripts:

- `yarn start:dev`: Inicia o servidor em modo de desenvolvimento utilizando o Nodemon.
- `yarn start`: Inicia o servidor em modo de produção.
- `yarn build`: Compila o projeto usando o TypeScript Compiler (`tsc`).

Certifique-se de executar `yarn install` antes de usar esses scripts para garantir que todas as dependências sejam instaladas corretamente.

No diretório do projeto Front-End, você pode executar os seguintes scripts:

- `ng server`: Inicia o servidor da aplicação web utilizando o angular.
- `ng`: Compila o projeto da aplicação web.

Certifique-se de executar `npm install` antes de usar esses scripts para garantir que todas as dependências sejam instaladas corretamente.

Lembre-se de ajustar os scripts conforme necessário para atender às suas necessidades específicas de desenvolvimento e produção.

## Estrutura do Projeto

|-- alpaca.api/
  |-- src
    |-- controllers
    |-- database
    |-- interfaces
    |-- middleware
    |-- models
    |-- routes
|-- calendar/
  |-- app
    |-- src
    |-- components
    |-- guard
    |-- models
    |-- screens
    |-- services


## Tecnologias Utilizadas

No Back-End projeto faz uso das seguintes tecnologias e ferramentas:

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript do lado do servidor.
- [Express.js](https://expressjs.com/): Framework web para Node.js, utilizado para criar APIs RESTful.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática ao código.
- [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL utilizado para armazenar dados de forma eficiente.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para hash de senhas, utilizado para armazenar senhas de forma segura.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implementação de JSON Web Tokens (JWT) para autenticação.
- [Validator](https://www.npmjs.com/package/validator): Biblioteca para validação de dados no lado do servidor.
- [dotenv](https://www.npmjs.com/package/dotenv): Carrega variáveis de ambiente a partir de um arquivo para facilitar a configuração.
- [Nodemon](https://www.npmjs.com/package/nodemon): Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor durante o desenvolvimento.
- [ESLint](https://eslint.org/): Ferramenta de linting para identificar e corrigir problemas no código.
- [Prettier](https://prettier.io/): Formatador de código que mantém a consistência no estilo do código.

No Front-End projeto faz uso das seguintes tecnologias e ferramentas:

- [Angular](https://angular.io/): Framework de desenvolvimento para construção de aplicativos web.
- [Angular CLI](https://cli.angular.io/): Interface de linha de comando para Angular, facilitando o desenvolvimento, teste e build de projetos Angular.
- [FontAwesome](https://fontawesome.com/): Conjunto de ícones vetoriais e ferramentas CSS para inclusão de ícones no projeto.
- [FullCalendar](https://fullcalendar.io/): Biblioteca JavaScript para implementar calendários interativos.
- [Mobiscroll](https://mobiscroll.com/): Biblioteca para interface de usuário móvel, incluindo componentes como datepickers e calendários.
- [Axios](https://axios-http.com/): Cliente HTTP baseado em Promises para fazer requisições HTTP.
- [Bootstrap](https://getbootstrap.com/): Framework CSS para design responsivo.
- [Bootstrap Icons](https://icons.getbootstrap.com/): Conjunto de ícones SVG customizáveis do Bootstrap.
- [Crypto-JS](https://cryptojs.gitbook.io/docs/): Biblioteca para criptografia e descriptografia no navegador.
- [Date-fns](https://date-fns.org/): Biblioteca JavaScript para manipulação de datas.
- [Ngx-bootstrap](https://valor-software.com/ngx-bootstrap/): Biblioteca Angular para componentes Bootstrap.
- [Ngx-bootstrap-icons](https://github.com/valor-software/ngx-bootstrap-icons): Pacote de ícones Bootstrap para utilização no Angular.
- [Ngx-toastr](https://www.npmjs.com/package/ngx-toastr): Biblioteca Angular para notificações toast.

## Autores

- [Willian Costa](https://github.com/costaowillian) - Desenvolvedor principal e criador do projeto.
