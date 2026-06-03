# 📊 ARCHITECTURE - Arquitetura do Projeto

## 🏗️ Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        Usuário Final                          │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Web Browser │  │  Mobile App  │  │ Admin Panel  │      │
│  │  (React)     │  │ (React Nat.) │  │  (React)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    HTTP/HTTPS/WebSocket
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              API Gateway / Load Balancer                      │
│                  (Nginx / CloudFlare)                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │         API Routes & Controllers                   │    │
│  │  /auth  /users  /grupos  /designacoes  /relatorios│    │
│  └────────────────────────────────────────────────────┘    │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Business Logic & Services                        │    │
│  │  - Autenticação  - Validação                      │    │
│  │  - Autorização   - Notificações                   │    │
│  └────────────────────────────────────────────────────┘    │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Middleware                                        │    │
│  │  - JWT Auth  - CORS  - Rate Limit  - Validation   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  MongoDB / Database                                 │   │
│  │  Collections:                                       │   │
│  │  - users        - grupos      - designacoes        │   │
│  │  - relatorios   - solicitacoes                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Cache (Redis - opcional)                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              External Services                               │
│  - SMTP (Email)  - SMS  - Push Notifications  - Storage     │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Diretórios

### Backend
```
backend/
├── src/
│   ├── config/              # Configurações
│   │   └── database.ts
│   ├── controllers/         # Lógica de requisição
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── ...
│   ├── middleware/          # Middlewares
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   ├── models/              # Schemas MongoDB
│   │   ├── User.ts
│   │   ├── Grupo.ts
│   │   ├── Designacao.ts
│   │   ├── RelatorioServico.ts
│   │   └── SolicitacaoPioneiro.ts
│   ├── routes/              # Rotas
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── grupos.ts
│   │   ├── designacoes.ts
│   │   ├── relatorios.ts
│   │   ├── dashboard.ts
│   │   └── pioneiros.ts
│   ├── services/            # Lógica de negócio
│   │   ├── authService.ts
│   │   ├── emailService.ts
│   │   └── ...
│   ├── utils/               # Utilitários
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   └── index.ts             # Entrada da app
├── package.json
├── tsconfig.json
└── Dockerfile
```

### Frontend
```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ...
│   ├── pages/               # Páginas
│   │   ├── LoginPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── DashboardAnciao.tsx
│   │   ├── RelatorioServicoPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── GruposPage.tsx
│   │   ├── DesignacoesPage.tsx
│   │   ├── CriarDesignacaoPage.tsx
│   │   ├── SolicitarPioneiroPage.tsx
│   │   └── HistoricoRelatoriosPage.tsx
│   ├── services/            # API Client
│   │   └── api.ts
│   ├── store/               # State Management
│   │   └── authStore.ts
│   ├── App.tsx              # Rotas principais
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── Dockerfile
```

## 🔄 Fluxo de Autenticação

```
Usuário
  ↓
[Login Form] → POST /api/auth/login
  ↓
Backend valida email/senha
  ↓
Gera JWT Token
  ↓
Frontend armazena no localStorage
  ↓
Intercepta requisições com token
  ↓
Authorization: Bearer <token>
  ↓
Middleware verifica token
  ↓
Acesso liberado/negado
```

## 🔐 Fluxo 2FA

```
Usuário faz login
  ↓
Retorna token temporário + require2FA: true
  ↓
Frontend mostra tela de 2FA
  ↓
Usuário escaneia QR Code com autenticador
  ↓
Envia código via POST /api/auth/2fa/verify
  ↓
Backend valida com Speakeasy
  ↓
Retorna token final se válido
  ↓
Acesso concedido
```

## 📊 Fluxo de Dados

### Criar Relatório
```
Frontend (RelatorioServicoPage)
  ↓
[Preencher formulário]
  ↓
POST /api/relatorios
  ↓
Backend (relatorioController)
  ↓
Validar dados com Joi
  ↓
Verificar usuário autenticado
  ↓
Salvar em MongoDB
  ↓
Notificar anciãos
  ↓
Retornar sucesso
```

### Aprovar Pioneiro
```
Frontend (Dashboard Anciãos)
  ↓
[Clica em Aprovar]
  ↓
POST /api/pioneiros/:id/aprovar
  ↓
Backend verifica se é ancião
  ↓
Atualiza status para "aprovada"
  ↓
Atualiza funções do usuário
  ↓
Envia email de notificação
  ↓
Retorna confirmação
```

## 🔒 Segurança em Camadas

```
┌─────────────────────────────────────┐
│  1. Validação de Entrada            │
│     - Joi/Joi validações             │
│     - Sanitização de dados           │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  2. Autenticação                    │
│     - JWT Token                      │
│     - 2FA com Speakeasy              │
│     - Hash de senha (bcrypt)         │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  3. Autorização (RBAC)              │
│     - Verificar funções              │
│     - Verificar permissões           │
│     - Middleware de acesso           │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  4. Proteção de Transporte          │
│     - HTTPS/SSL                      │
│     - CORS configurado               │
│     - Headers de segurança (Helmet)  │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  5. Rate Limiting                   │
│     - 100 requisições por 15 min     │
│     - Proteção contra brute force    │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  6. Logging & Monitoramento         │
│     - Registrar tentativas falhas    │
│     - Alertas de segurança           │
│     - Auditoria de ações             │
└─────────────────────────────────────┘
```

## 🎯 Padrões de Design

### MVC (Model-View-Controller)
- **Model**: Schemas MongoDB
- **View**: Componentes React
- **Controller**: Rotas e lógica de requisição

### Service Layer
- Separação de responsabilidades
- Reutilização de código
- Testes mais fáceis

### Repository Pattern
- Abstração de dados
- Facilita mudanças no BD

### Middleware Pattern
- Cadeia de processamento
- Auth, validação, logging

## 🚀 Performance

### Frontend
- Code splitting com React Router
- Lazy loading de componentes
- Memoização com React.memo
- React Query para cache

### Backend
- Indexação em MongoDB
- Paginação de resultados
- Compressão com gzip
- Cache com Redis (opcional)

### Banco de Dados
- Índices em campos frequentes
- Sharding em produção
- Replicação para backup

## 📈 Escalabilidade

### Horizontal
- Load balancer (Nginx)
- Múltiplas instâncias backend
- Banco de dados distribuído

### Vertical
- Aumentar recursos de servidor
- Otimizar queries
- Cache agressivo

## 🔄 Deployment

```
Code → Git → GitHub Actions
  ↓
Build & Test
  ↓
Docker Build
  ↓
Push para Registry
  ↓
Deploy em Produção
  ↓
Health Check
  ↓
Monitoramento
```

## 📞 Integração com Externos

```
┌─────────────────────────────────┐
│  Backend                        │
├─────────────────────────────────┤
│  ↓                              │
│  SMTP (Nodemailer)              │
│  ↓ Email para notificações      │
│                                 │
│  ↓                              │
│  Firebase (opcional)            │
│  ↓ Push notifications           │
│                                 │
│  ↓                              │
│  MongoDB Atlas                  │
│  ↓ Banco de dados cloud         │
└─────────────────────────────────┘
```

---

**Arquitetura robusta e escalável para sua congregação! 🏗️**
