# Backend - Congregação App

API Node.js com Express e MongoDB

## Instalação

```bash
cd backend
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estrutura de Diretórios

```
src/
├── config/           # Configurações (BD, JWT, etc)
├── controllers/      # Controllers das rotas
├── models/          # Modelos MongoDB
├── routes/          # Definição das rotas
├── middleware/      # Middlewares (auth, validação)
├── services/        # Lógica de negócio
├── utils/           # Utilitários
├── types/           # Tipos TypeScript
└── index.ts         # Arquivo principal
```

## Endpoints Principais

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/2fa/setup` - Configurar 2FA
- `GET /api/users/profile` - Obter perfil
- `GET /api/grupos` - Listar grupos
- `POST /api/designacoes` - Criar designação
- `POST /api/relatorios` - Enviar relatório de campo
