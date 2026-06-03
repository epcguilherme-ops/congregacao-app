# 🙏 Congregação App - Gerenciador Completo de Congregações das Testemunhas de Jeová

Um aplicativo moderno, seguro e responsivo para gerenciar todos os aspectos organizacionais e mecânicos de uma congregação das Testemunhas de Jeová.

## 🎯 Características Principais

### 👤 Perfis de Usuário
- Perfil individual com dados pessoais
- Funções espirituais (Ancião, Servo Ministerial, Pioneiro, Publicador)
- Histórico de designações
- Lembretes e notificações personalizadas
- Preferências de comunicação
- Gerenciamento de grupos congregacionais

### 👥 Módulo de Grupos Congregacionais
- Criação e gerenciamento de grupos de campo
- Designação de responsáveis
- Visualização de estatísticas por grupo
- Notificações específicas do grupo

### 📋 Designações da Congregação
- Gerenciamento de reuniões de meio de semana
- Gerenciamento de reuniões de fim de semana
- Sistema de indisponibilidades
- Notificações automáticas aos designados
- Relatórios mensais

### 📊 Dashboard para Anciãos
- Totalizador de assistência às reuniões
- Totalizador de relatórios de campo
- Lista de relatórios não enviados
- Estatísticas de designações
- Gráficos e relatórios exportáveis

### 📱 Módulo de Reuniões
- Programa semanal
- Leituras bíblicas e vídeos
- Registro de assistência
- Histórico de frequência

### 📈 Relatório de Serviço de Campo
- Envio mensal de relatórios (horas, revisitas, estudos)
- Histórico de relatórios
- Notificações automáticas
- Painel de controle para anciãos

### ⭐ Solicitação de Pioneiro Auxiliar
- Solicitação de pioneirato auxiliar
- Seleção de metas de horas
- Aprovação/recusa pelos anciãos
- Histórico de solicitações

### 🛠️ Funcionalidades Adicionais
- Calendário congregacional
- Agenda de limpeza do Salão
- Escala de manutenção
- Escala de grupos de campo
- Avisos internos
- Biblioteca de documentos
- Modo offline
- Backup automático
- Autenticação em duas etapas

## 🏗️ Estrutura do Projeto

```
congregacao-app/
├── backend/                 # API Node.js + Express
├── frontend/               # App Web React + TypeScript
├── mobile/                 # App Mobile React Native
├── docs/                   # Documentação
└── docker-compose.yml      # Containers
```

## 🔐 Segurança

- Autenticação JWT com refresh tokens
- Autenticação em duas etapas (2FA)
- Controle de acesso baseado em funções (RBAC)
- Criptografia de dados sensíveis
- Validação de entrada em todas as APIs
- Rate limiting
- CORS configurado

## 🚀 Tecnologias

### Backend
- Node.js + Express
- MongoDB
- JWT
- Nodemailer
- Socket.io (tempo real)

### Frontend Web
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Zustand (estado)

### Mobile
- React Native
- Expo
- Redux
- AsyncStorage

## 📦 Instalação e Uso

Veja os arquivos de setup específicos em cada diretório:
- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [Mobile Setup](./mobile/README.md)

## 📝 Licença

Proprietary - Uso interno apenas

## 👨‍💼 Autor

Desenvolvido para gerenciamento de congregações

---

**Versão:** 1.0.0  
**Data:** 2026-06-03
