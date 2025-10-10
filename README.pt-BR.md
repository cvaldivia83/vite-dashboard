[🇬🇧 English Version](README.md)
 
 # Desafio Frontend
 
Projeto front end React + Typescript para gerencimanento de usuários apresentando arquitetura modular, integração de uma de API local para desenvolvimento.
 
 ## Índex
 - [Setup](#setup)
 - [Uso](#uso)
 - [Estrutura do Projeto](#estrutura-do-projeto)
 - [Arquitetura](#arquitetura)
 - [Data Flow](#data-flow)
 - [UX (User Experience)](#UX)
 - [Testes](#testes)
 - [Tech Stack](#tech-stack)
 
 ## Setup

  ### Docker

  Se você tiver instalado Docker instalado em seu computador, você pode rodar esta aplicação usando a nossa imagem Docker.

  1. **Baixe a imagem docker:**
  ```sh
  docker pull queeniec/vite_dashboard
  ``` 
  2. **Rode o container:**
  ```sh
  docker run -p 5173:5173 queeniec/vite_dashboard
  ```
  3. **Acesse a aplicação:**
  Abra o browser e navegue pela url http://localhost:5173

  4.1 **Para parar o container:**
  ```sh
  docker stop vite_dashboard
  ```

  ### Github
  
  Caso não possua Docker, você pode baixar o repositório através dos seguintes passos:
 
 1. **Clone o repositório:**
   ```sh
   git@github.com:cvaldivia83/vite-dashboard.git
   cd desafio-cvaldivia
   ```
 2. **Instale as dependências:**
   ```sh
   npm install
   ```
 3. **Inicie o servidor:**
   ```sh
   npm run dev
   ```
 
 ## Uso
 
- Acesse o app na url 'http://localhost:5173' (endereço padrão do Vite).

- Use o dashboard para visualizar, adicionar, editar e deletar usuários.

- O app interage com a simulação local de uma API (`/api/db.json`).

- Todas as modificações se refletem na UI e persistidas na base de ados simulada.

 ## Estrutura do Projeto
 
 ```
 ├── api/                # Mock API e rotas
 ├── public/             # Static assets
 ├── src/
 │   ├── assets/         # SVGs e imagens
 │   ├── components/     # Componentes UI
 │   ├── hooks/          # Custom hooks
 │   ├── pages/          # Views
 │   ├── services/       # Lógica API
 │   ├── styles/         # CSS
 │   ├── tests/          # Testes unitários
 │   └── types/          # TypeScript types
 ├── Dockerfile          # Container setup
 ├── package.json        # Scripts e metadados
 ├── vite.config.ts      # Configuração Vite
 └── README.md           # Documentação
 ```
 
 ## Arquitetura
 
O componente Dashboard funciona como um hub central para gerenciamento de dados, concentrando todas as operações CRUD de usuários e carteiras (criação, edição e exclusão).

Esta abordagem oferece diversos benefícios:

1.  **Single Source of Truth:** O estado users no Dashboard garante que todos os componentes filhos trabalhem com a mesma versão dos dados, eliminando inconsistências.

2.  **Gerenciamento centralizado**: Todas as chamadas à mock API e atualizações de estado ficam em um local controlado, facilitando manutenção e debugging.

3.  **Fluxo de dados unidirecional:** As props são passadas para baixo e os callbacks sobem, seguindo o padrão React recomendado.

4.  **TDD facilitado:** Lógica de negócio concentrada permite testes unitários mais efetivos do componente principal.

O objetivo principal para esta escolha era evitar prop drilling excessivo, manter a simplicidade sem introduzir complexidade desnecessária de gerenciadores de estado externos para um escopo pequeno.

-  **Components:** Elementos UI reutilizáveis localizados em `src/components`. Modals estão agrupados em `src/components/Modal`, e Toasts estão agrupados em `src/components/Toast`.

-  **Pages:** Páginas principais localizadas em `src/pages` (ex: `Dashboard`).

-  **Hooks:** Hooks personalizados localizados em `src/hooks` (e.g., `useForm`).

-  **Services:** Lógica de requisição de dados da API de usuários e da API de câmbio monetário está localizada em `src/services` (e.g., `users.ts`).

-  **Types:** TypeScript type definitions in `src/types`.

-  **Styles:** Estilos globais e estilos de componentes em `src/styles`.

-  **Tests:** Testes unitários em `src/tests`.

-  **API:** Dados Locais e rotas personalizadas em `api/db.json` e `api/routes.json`.
 
 ### Data Flow

O componente Dashboard implementa um padrão de data flow top-down seguindo as melhoes práticas do React:

> UI events -> State Updates -> API Calls -> Component Re-render

-  **State Management:** Estados são gerenciados centralmente no componente `Dashboard`, funcionando como single source of truth para dados de usuários e carteiras.

-  **Event Handling:** Interações do usuário (criar/editar/deletar) disparam callbacks que propagam até o componente pai via props.

-  **API Integration:** Operações assíncronas são executadas através de funções de serviço dedicadas, mantendo separação de responsabilidades.

-  **UI Synchronization:** Após cada operação CRUD bem-sucedida, o estado local é atualizado, provocando re-render automático da interface.

-  **Modal Communication:** Componentes modais recebem dados via props e comunicam ações através de callback functions, mantendo acoplamento baixo.

 ## UX
 O projeto implementa uma série de elementos visuais e interativos para fornecer feedback imediato ao usuário durante todas as operações CRUD, garantindo uma experiência fluida e intuitiva.

 ### Feedback Visual Imediato

 **1. Criação de Usuários**

 - Após adicionar uma nova carteira com sucesso, a tabela é automaticamente atualizada.

 - A nova carteira aparece no topo da lista com background verde claro, destacando a ação recém-realizada.

 - Esta abordagem elimina a necessidade do usuário procurar pelo registro criado na lista.

 **2. Validação de Formulários**

 - Implementação do custom hook `useForm` para validação em tempo real dos dados inseridos.

 - Feedback instantâneo no próprio formulário quando dados inválidos são detectados.

 - Mensagens de erro específicas orientam o usuário sobre como corrigir cada campo.

 - Prevenção de submissão de formulários com dados inconsistentes. 

 **3. Sistema de Notificações Toast** 

 - **Operações bem-sucedidas**: Toast verde com mensagem confirmando que a ação foi realizada.

 - **Operações com erro**: Toast vermelho informando que a ação não pode ser completada.

O objetivo desta abordagem UX é: 

- Fornecer feedback claro sobre o status das operações

- Evitar a submissão de dados incorretos através de uma verificação preventiva. 

- Facilitar a identificação de alterações recentes através de destacamento visual.

 
 ## Testes
 
 - Testes estão localizados em `src/tests` e estão organizados por feature/componente.
 - Rode testes com:
  ```sh
  npm run test
  ```
 
 ## Tech Stack
 - React
 - TypeScript
 - Vite
 - CSS
 - json-server (for mock API)
 - Tailwind CSS
 - Docker
 
 ---


