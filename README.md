# IXC-GERENCIA

## Descrição Geral
Um sistema completo de gerenciamento financeiro desenvolvido com tecnologias modernas para proporcionar uma experiência de usuário eficiente e uma arquitetura robusta.

---

## Tecnologias Utilizadas

### **Frontend**
**Framework Principal**: Nuxt 3  

#### Razões de escolha:
- Renderização server-side (SSR)
- Estrutura opinativa e produtividade
- Integração nativa com Vue 3
- Suporte a TypeScript
- Performance otimizada
- Módulos e plugins prontos  

**Tecnologias complementares:**
- Vue 3
- TypeScript
- Tailwind CSS
- Pinia (Gerenciamento de estado)
- Vitest (Testes unitários)

---

### **Backend**
**Framework Principal**: GraphQL  

#### Razões de escolha:
- Flexibilidade na definição de schemas
- Requisições precisas e personalizadas
- Documentação automática
- Tipagem forte
- Redução de over-fetching  

**Tecnologias complementares:**
- Apollo Server
- TypeGraphQL
- TypeScript

---

### **Banco de Dados**
**Banco Utilizado**: MongoDB (Não Relacional)  

#### Razões de escolha:
- Flexibilidade de schema
- Escalabilidade horizontal
- Performance em larga escala
- Modelagem de dados próxima a objetos
- Suporte nativo a documentos JSON

---

## Requisitos
- **Node.js** (v18+)
- **Docker**
- **Docker Compose**

---

## Configuração e Execução

### **Branch**
- Primeiramente, selecione a branch dev e realize o git clone em uma pasta de sua escolha no seu dispositivo:
ex: git clone git@github.com:fhcabral/IXC-GERENCIA.git

### **Frontend**
- 1.Navegue até o diretório frontend:
cd frontend
- 2.Instale as dependências:
npm install
ou
yarn install
- 3.Crie um arquivo .env na raiz do frontend:
NUX_API_BASE=localhost:4000
- 4.Inicie o servidor de desenvolvimento:
npm run dev
ou
yarn dev

---

### **Backend**
- 1.Crie um arquivo .env na raiz do projeto:
URL_MONGO=mongodb://admin:1234@finance-mongo:27017/MyDatabase?authSource=admin
- 2.Inicialize o projeto com Docker Compose:
docker-compose up

---

## Credenciais de Acesso
**Usuário: ixc.software**
**Senha: ixc@123**

---

## Funcionalidades Implementadas
- Autenticação de usuários
- Cadastro de transações financeiras
- Listagem de transações
- Exclusão de transações
- Visualização de resumo financeiro
- Resumo de entrada e saída

---

## Testes
**Frontend**
npm run test
ou
yarn test

---

## Próximos Passos
- Implementação de mais relatórios
- Integração com outras fontes de dados
- Melhorias de segurança
- Testes de integração

---

## Contato
- Email: cabral.fhellipe@gmail.com
- Telefone: (92) 98598-3062

---

Muito obrigado pela oportunidade de participar deste processo seletivo e de realizar o teste para a vaga. Foi uma experiência enriquecedora que me permitiu aplicar meus conhecimentos e explorar soluções criativas.
Fico à disposição para qualquer esclarecimento ou feedback e espero que o resultado esteja à altura das expectativas.
Agradeço novamente pela consideração e pelo tempo dedicado à avaliação.