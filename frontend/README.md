# BIP Challenge - Frontend Angular

Este é o frontend Angular para o BIP Challenge, que consome a API REST do backend Spring Boot.

## Funcionalidades

- ✅ Listar todos os benefícios
- ✅ Criar novo benefício
- ✅ Editar benefício existente
- ✅ Deletar benefício
- ✅ Transferir valores entre benefícios

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── lista-beneficios/          # Lista todos os benefícios
│   │   │   ├── form-beneficio/            # Formulário criar/editar
│   │   │   └── transferencia/             # Transferência de valores
│   │   ├── models/
│   │   │   └── beneficio.model.ts        # Interface TypeScript
│   │   ├── services/
│   │   │   └── beneficio.service.ts      # Serviço HTTP
│   │   ├── app.component.ts               # Componente raiz
│   │   ├── app.component.html             # Template com navbar
│   │   ├── app.config.ts                  # Configuração com HttpClient
│   │   └── app.routes.ts                  # Rotas da aplicação
│   ├── index.html                         # HTML principal com Bootstrap
│   └── styles.scss                        # Estilos globais
```

## Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend Spring Boot rodando em `http://localhost:8080`

### Instalação

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

### Build de Produção

```bash
npm run build
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/v1/beneficios` | Lista todos os benefícios |
| GET | `/api/v1/beneficios/{id}` | Obtém benefício por ID |
| POST | `/api/v1/beneficios` | Cria novo benefício |
| PUT | `/api/v1/beneficios/{id}` | Atualiza benefício |
| DELETE | `/api/v1/beneficios/{id}` | Deleta benefício |
| POST | `/api/v1/beneficios/transfer` | Transfere valores |

## Rotas da Aplicação

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/beneficios` | ListaBeneficiosComponent | Lista todos os benefícios |
| `/beneficios/novo` | FormBeneficioComponent | Formulário para criar |
| `/beneficios/editar/:id` | FormBeneficioComponent | Formulário para editar |
| `/beneficios/transferir/:id` | TransferenciaComponent | Transferência de valores |

## Tecnologias Utilizadas

- **Angular 17+** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **Bootstrap 5** - Framework CSS
- **HttpClient** - Cliente HTTP do Angular

## Funcionalidades Implementadas

### 1. Lista de Benefícios
- Tabela responsiva com todos os benefícios
- Botões para editar, deletar e transferir
- Indicadores visuais de status (ativo/inativo)
- Formatação de valores monetários

### 2. Formulário de Benefício
- Validação de campos obrigatórios
- Modo criar/editar
- Feedback visual de loading e erros
- Navegação automática após salvar

### 3. Transferência de Valores
- Seleção de benefício de destino
- Validação de saldo suficiente
- Preview da transferência
- Feedback de sucesso/erro

### 4. Tratamento de Erros
- Captura de erros HTTP
- Mensagens amigáveis ao usuário
- Logging de erros no console
- Estados de loading

## Desenvolvimento

### Adicionando Novos Componentes

```bash
ng generate component components/nome-componente --standalone
```

### Adicionando Novos Serviços

```bash
ng generate service services/nome-servico
```

### Adicionando Novas Rotas

Edite `app.routes.ts`:

```typescript
{ path: 'nova-rota', component: NovoComponenteComponent }
```

## Testes

```bash
# Executar testes unitários
npm test

# Executar testes e2e
npm run e2e
```

## Deploy

Para deploy em produção:

1. Execute `npm run build`
2. Copie o conteúdo de `dist/` para seu servidor web
3. Configure o proxy reverso para a API backend

## Troubleshooting

### Erro: "Backend não responde"
- Verifique se o backend está rodando em `http://localhost:8080`
- Verifique CORS no backend
- Verifique logs do navegador (F12 → Console)

### Erro: "Componente não encontrado"
- Verifique se o componente foi importado corretamente
- Verifique se está usando `standalone: true`
- Verifique as rotas em `app.routes.ts`

### Erro: "HttpClient não funciona"
- Verifique se `provideHttpClient()` está em `app.config.ts`
- Verifique se o serviço está injetado corretamente

## Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto é parte do BIP Challenge.
