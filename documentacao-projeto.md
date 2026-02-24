# Documentação do Projeto HairDay

## 📋 Visão Geral

HairDay é uma aplicação web para gerenciamento de agendamentos para corte de cabelo. O projeto utiliza **JavaScript moderno com Webpack como empacotador, Babel para transpilação de código e dayjs para manipulação de datas**.

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
hairday/
├── src/                          # Código-fonte da aplicação
│   ├── main.js                  # Arquivo de entrada (entry point)
│   ├── assets/                  # Imagens e recursos estáticos
│   ├── styles/                  # Arquivos CSS
│   ├── libs/                    # Bibliotecas externas
│   ├── modules/                 # Funcionalidades da aplicação
│   └── services/                # Chamadas de API e configurações
├── index.html                   # HTML principal
├── package.json                 # Dependências e scripts
├── webpack.config.js            # Configuração do Webpack
└── server.json                  # Dados da API (json-server)
```

---

## 📦 Dependências e Configurações

### Package.json

O arquivo `package.json` define as **dependências (libraries que a app precisa)** e **devDependencies (ferramentas para desenvolvimento)**.

#### Dependências de Produção

```json
{
  "dependencies": {
    "dayjs": "^1.11.19",
    "json-server": "^1.0.0-beta.3"
  }
}
```

| Biblioteca | Função |
|-----------|--------|
| **dayjs** | Biblioteca leve para manipulação, formatação e cálculo de datas. Substitui moment.js com menos bytes. |
| **json-server** | Simula uma API REST real usando um arquivo JSON (`server.json`). Perfeito para prototipagem. |

#### DevDependencies (Ferramentas de Desenvolvimento)

```json
{
  "devDependencies": {
    "@babel/core": "^7.28.6",
    "@babel/preset-env": "^7.28.6",
    "babel-loader": "^10.0.0",
    "copy-webpack-plugin": "^13.0.1",
    "css-loader": "^7.1.2",
    "html-webpack-plugin": "^5.6.6",
    "style-loader": "^4.0.0",
    "webpack": "^5.104.1",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.3"
  }
}
```

| Ferramenta | Função |
|-----------|--------|
| **Webpack** | Empacotador (bundler) que agrupa todos os arquivos JS, CSS e assets em um arquivo otimizado. |
| **Webpack-cli** | Interface de linha de comando para usar o Webpack no terminal. |
| **Webpack-dev-server** | Servidor de desenvolvimento que recarrega a página automaticamente ao detectar mudanças. |
| **Babel (@babel/core)** | Transpilador que converte JavaScript moderno (ES6+) em versões mais antigas para compatibilidade. |
| **@babel/preset-env** | Conjunto de regras que diz ao Babel quais features converter baseado em navegadores alvos. |
| **babel-loader** | Integração entre Webpack e Babel para processar arquivos `.js`. |
| **html-webpack-plugin** | Plugin que gera o arquivo `index.html` final automaticamente. |
| **copy-webpack-plugin** | Plugin que copia arquivos estáticos (assets) para a pasta `dist/` final. |
| **css-loader** | Processa `@import` e `url()` em arquivos CSS. |
| **style-loader** | Injeta CSS processado diretamente no HTML como tags `<style>`. |

#### Scripts do Package.json

```json
{
  "scripts": {
    "server": "json-server server.json --watch --port 3333",
    "dev": "webpack serve",
    "build": "webpack"
  }
}
```

| Script | Comando | Função |
|--------|---------|--------|
| `npm run server` | `json-server server.json --watch --port 3333` | Inicia a API fake na porta 3333. `--watch` recarrega dados automaticamente. |
| `npm run dev` | `webpack serve` | Inicia o servidor de desenvolvimento com hot-reload na porta 3000. |
| `npm run build` | `webpack` | Gera a build otimizada de produção na pasta `dist/`. |

---

## ⚙️ Webpack Configuration

O arquivo `webpack.config.js` é o **"coração"** do empacotamento. Define como os arquivos são processados e agrupados.

### Configuração Principal

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",                    // Alvo: navegador
    mode: "development",              // Modo: desenvolvimento (não minifica)
    entry: path.resolve(__dirname, "src", "main.js"),  // Arquivo de entrada
    output: {
        filename: "main.js",          // Nome do arquivo final
        path: path.resolve(__dirname, "dist")  // Pasta de saída
    },
    // ... resto da config
}
```

#### 1️⃣ Entry Point (Ponto de Entrada)

```javascript
entry: path.resolve(__dirname, "src", "main.js"),
```

- **É o arquivo por onde tudo começa**. O Webpack lê `src/main.js` e segue todos os `import` para descobrir quais outros arquivos incluir.
- Funciona como a "raiz da árvore de dependências".

#### 2️⃣ Output (Saída)

```javascript
output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
}
```

- `filename`: Nome do arquivo JavaScript final gerado.
- `path`: Pasta onde os arquivos serão colocados para produção.
- Resultado: `dist/main.js` (arquivo único contendo todo o código)

#### 3️⃣ DevServer (Servidor de Desenvolvimento)

```javascript
devServer: {
    static: {
        directory: path.join(__dirname, "dist")
    },
    port: 3000,
    open: true,           // Abre o navegador automaticamente
    liveReload: true      // Recarrega a página ao salvar
}
```

- **Roda localmente na porta 3000** enquanto você desenvolve.
- **Hot reload**: Quando você salva um arquivo, o navegador automáticamente recarrega.

#### 4️⃣ Plugins

```javascript
plugins: [
    // Gera o HTML final automaticamente
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        favicon: path.resolve(__dirname, "src", "assets", "scissors.svg")
    }),
    
    // Copia a pasta assets/ para dist/
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "src", "assets"),
                to: path.resolve(__dirname, "dist", "src", "assets")
            }
        ]
    }),
],
```

- **HtmlWebpackPlugin**: Pega seu `index.html` como template e injeta automaticamente as tags `<script>` e `<link>` para CSS.
- **CopyWebpackPlugin**: Copia imagens e ícones para a pasta final.

#### 5️⃣ Module Rules (Regras de Processamento)

```javascript
module: {
    rules: [
        // Regra para CSS
        {
            test: /\.css$/i,  // Se o arquivo termina em .css
            use: ["style-loader", "css-loader"],  // Processa com estes loaders
        },
        
        // Regra para JavaScript
        {
            test: /\.(?:js|mjs|cjs)$/,  // Se é arquivo .js
            exclude: /node_modules/,     // Não processa node_modules
            use: {
                loader: "babel-loader",  // Usa Babel para transpilar
                options: {
                    presets: [["@babel/preset-env"]]
                }
            }
        }
    ]
}
```

**Como funciona:**
1. CSS: `index.html` → `main.css` (importado em JS) → **style-loader** injeta no HTML
2. JavaScript: `main.js` → **babel-loader** transpila ES6+ → JavaScript compatível

---

## 🎯 Sistema de Módulos (Imports e Exports)

### Sintaxe ES6 Modules

O projeto usa **módulos ES6** (sintaxe moderna). O Webpack bundler agrupa tudo isso em um único arquivo.

#### imports (Importando)

```javascript
// Importar função nomeada
import { scheduleNew } from "../../services/schedule-new.js"

// Importar default export
import dayjs from "dayjs";

// Importar arquivo (side effects)
import "./styles/global.css"
import "./modules/form/form.js"
```

**Tipos de imports:**

| Tipo | Sintaxe | Uso |
|------|--------|-----|
| **Named import** | `import { nome } from "..."` | Quando o módulo exporta múltiplas funções |
| **Default import** | `import nome from "..."` | Quando há uma exportação principal |
| **Side effects** | `import "./arquivo.js"` | Para carregar arquivos que fazem algo ao serem importados |

#### exports (Exportando)

```javascript
// Exportar função nomeada
export async function scheduleNew({ id, name, when }) {
    // código
}

// Exportar objeto como default
export const apiConfig = {
    baseURL: "http://localhost:3333",
}
```

### Fluxo de Módulos no Projeto

```
src/main.js (ENTRY POINT)
├── import "./libs/dayjs.js"
├── import "./styles/*"
├── import "./modules/form/form.js"
│   ├── import dayjs
│   ├── import { scheduleNew } ← vem de services/
│   └── import { schedulesDay } ← vem de schedules/
├── import "./modules/load-page.js"
│   └── import { schedulesDay }
└── import "./modules/schedules/cancel.js"
```

---

## 📅 Dayjs - Manipulação de Datas

### O que é Dayjs?

**Dayjs** é uma biblioteca leve (2KB) para trabalhar com datas em JavaScript. É como o **moment.js**, mas muito mais leve.

### Como é Usado no Projeto

#### 1️⃣ Importação

```javascript
import dayjs from "dayjs";
```

O arquivo `src/libs/dayjs.js` importa a biblioteca e a torna disponível globalmente.

#### 2️⃣ Exemplos de Uso em `form.js`

```javascript
// Obter a data de hoje formatada
const dateToday = dayjs(new Date()).format("YYYY-MM-DD");

// Usar como valor padrão no input
selectedDate.value = dateToday;
selectedDate.min = dateToday;  // Não permite datas no passado

// Somar horas a uma data
const [hour] = hourSelected.innerText.split(":");
const when = dayjs(selectedDate.value).add(hour, "hour");
```

#### Métodos Comuns do Dayjs

| Método | Exemplo | Resultado |
|--------|---------|-----------|
| `format()` | `dayjs().format("YYYY-MM-DD")` | `"2026-02-23"` |
| `add()` | `dayjs().add(2, "day")` | Adiciona 2 dias |
| `subtract()` | `dayjs().subtract(1, "hour")` | Subtrai 1 hora |
| `isSame()` | `dayjs().isSame(other, "day")` | Compara datas |

---

## 🔄 Fluxo de Dados da Aplicação

### 1️⃣ Ao Abrir a Página

```
DOMContentLoaded event
    ↓
executar load-page.js
    ↓
chamar schedulesDay()
    ↓
fetch agendamentos do dia em schedule-fetch-by-day.js
    ↓
mostrar agendamentos em scheduleShow()
    ↓
carregar horários disponíveis em hoursLoad()
```

### 2️⃣ Ao Fazer um Agendamento

```
form.onsubmit
    ↓
validar dados (nome, hora)
    ↓
chamar scheduleNew() via fetch POST
    ↓
salvar no servidor json-server
    ↓
recarregar schedulesDay() para atualizar lista
    ↓
limpar campo de nome
```

### 3️⃣ Comunicação com Servidor

```javascript
// Config centralizada (api-config.js)
export const apiConfig = {
    baseURL: "http://localhost:3333",
}

// Uso em serviços
fetch(`${apiConfig.baseURL}/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, when })
})
```

---

## 🛠️ Como Tudo Se Conecta

```
┌─────────────────────────────────────────┐
│      NODE.JS & WEBPACK                  │
│  (Ferramentas de desenvolvimento)       │
└──────────────────┬──────────────────────┘
                   │
    ┌──────────────┴────────────────┐
    │                               │
    ▼                               ▼
┌─────────────────────┐    ┌──────────────────┐
│   BABEL             │    │  WEBPACK CONFIG  │
│ - Transpila ES6+    │    │ - Empacotar JS   │
│ - Torna compatível  │    │ - Processar CSS  │
└─────────────────────┘    │ - Copiar assets  │
                           └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │   dist/main.js   │
                           │  (Um único file)  │
                           └────────┬─────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            ┌──────────────────┐        ┌──────────────────┐
            │   NAVEGADOR      │        │  JSON-SERVER     │
            │ Executa app      │◄───────┤ API de dados     │
            │ Interage com UI  │        │ server.json      │
            └──────────────────┘        └──────────────────┘
                    │                               │
                    ▼                               ▼
        ┌──────────────────────────┐   ┌─────────────────┐
        │ Eventos do Usuário       │   │ Requisições     │
        │ - Clica no botão         │   │ - POST criar    │
        │ - Muda data              │   │ - GET listar    │
        └──────────────────────────┘   │ - DELETE remover│
                                        └─────────────────┘
```

---

## 📂 Resumo das Pastas Principais

### `/src/main.js` 
**Arquivo de Entrada (Entry Point)**
- Primeira coisa que o Webpack processa
- Importa todas as dependências e módulos
- Webpack segue os imports daqui para descobrir o que empacotar

### `/src/modules/`
**Lógica da Aplicação**
- `form/form.js`: Captura submissão do formulário e cria agendamentos
- `form/date-change.js`: Escuta mudanças de data
- `form/hours-load.js`: Carrega horários disponíveis
- `schedules/load.js`: Busca agendamentos do servidor
- `schedules/show.js`: Exibe agendamentos na UI
- `schedules/cancel.js`: Remove agendamentos

### `/src/services/`
**Chamadas de API e Configuração**
- `api-config.js`: URL centralizada do servidor
- `schedule-new.js`: POST para criar agendamento
- `schedule-fetch-by-day.js`: GET para buscar agendamentos do dia
- `schedule-cancel.js`: DELETE para cancelar agendamento

### `/src/styles/`
**Estilização**
- Importados em `main.js`
- Webpack injeta com style-loader

### `/src/libs/`
**Bibliotecas Externas**
- `dayjs.js`: Importa a biblioteca de datas

### `/src/assets/`
**Recursos Estáticos**
- Imagens, ícones, etc.
- Copiados para `dist/` pelo Webpack

---

## 🚀 Resumo Executivo

| Componente | Função | Tecnologia |
|-----------|--------|-----------|
| **Empacotador** | Agrupa JS, CSS e assets em um bundle final | Webpack 5 |
| **Transpilador** | Converte ES6+ em JavaScript compatível | Babel |
| **Servidor Dev** | Recarrega automaticamente (hot-reload) | webpack-dev-server |
| **Manipulação de Datas** | Cálculos e formatação de datas | dayjs |
| **API Fake** | Backend de testes com dados JSON | json-server |
| **Módulos** | Organização do código em arquivos separados | ES6 Modules |

---

## 🎓 Próximos Passos para Entender Melhor

1. **Webpack**: Execute `npm run build` e abra `dist/main.js` para ver o código final empacotado
2. **Babel**: Experimente adicionar sintaxe moderna (arrow functions, template literals) e veja como Babel transpila
3. **Dayjs**: Teste novos métodos no console do navegador: `dayjs().format()`, `dayjs().add()`
4. **API**: Abra `server.json` e `npm run server` para ver como json-server funciona
5. **Hot-reload**: Execute `npm run dev` e edite `src/styles/global.css` para ver a página recarregar sozinha
