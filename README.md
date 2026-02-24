# HairDay

Aplicação web para gerenciamento e marcação de agendamentos para corte de cabelo. O projeto utiliza JavaScript moderno com Webpack, Babel e dayjs para criar uma experiência completa de agendamento.

## Sobre o Projeto

HairDay é uma solução prática para barbearias e salões de cabelo gerenciarem seus agendamentos de forma digital. A aplicação permite que usuários visualizem horários disponíveis, agendem seus cortes e cancelem agendamentos quando necessário.

O projeto foi desenvolvido com foco em modularização e boas práticas de desenvolvimento frontend, utilizando um servidor JSON local para simular uma API REST.

## Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node)

## Como Baixar e Instalar

### 1. Clonar o Repositório

```bash
git clone https://github.com/pedroairees/hairday.git
cd hairday
```

### 2. Instalar Dependências

```bash
npm install
```

Este comando irá baixar todas as dependências listadas no arquivo `package.json`.

## Como Testar Localmente

O projeto possui dois servidores que precisam ser executados simultaneamente:

### Terminal 1: Inicie o Servidor da API

```bash
npm run server
```

Isso iniciará a API fake na porta 3333, utilizando o arquivo `server.json` como banco de dados simulado.

### Terminal 2: Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento com hot-reload na porta 3000. A aplicação abrirá automaticamente no seu navegador.

### Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

## Scripts Disponíveis

- `npm run server` - Inicia a API JSON Server na porta 3333
- `npm run dev` - Inicia o servidor de desenvolvimento com Webpack na porta 3000
- `npm run build` - Gera a build otimizada para produção na pasta `dist/`

## Estrutura do Projeto

```
src/
├── main.js                 # Arquivo de entrada da aplicação
├── assets/                 # Imagens e recursos estáticos
├── styles/                 # Arquivos CSS
├── libs/                   # Bibliotecas externas
├── modules/                # Módulos funcionais da aplicação
│   ├── form/              # Módulos de formulário
│   ├── schedules/         # Módulos de agendamentos
│   └── load-page.js       # Carregamento inicial da página
└── services/               # Chamadas de API e configurações
```

## Tecnologias Utilizadas

- **JavaScript ES6+** - Linguagem de programação
- **Webpack** - Empacotador de módulos
- **Babel** - Transpilador JavaScript
- **dayjs** - Biblioteca para manipulação de datas
- **json-server** - Servidor JSON simulado para desenvolvimento
- **CSS** - Estilização

## Licença

[LICENSE](https://github.com/pedroairees/hairday/blob/main/LICENSE)

## Autor

Pedro Aires
