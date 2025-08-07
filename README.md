# 🌊 OceanBeach

O **OceanBeach** é uma aplicação web que apresenta praias e ilhas ao redor do mundo, com informações sobre cultura, culinária e curiosidades praianas. O projeto busca oferecer uma experiência interativa e visualmente envolvente para quem ama o mar.

---

## ✨ Tecnologias Utilizadas

- **Next.js 14 (App Router)** – Renderização SSR e estrutura moderna de rotas.
- **TypeScript** – Tipagem estática e segurança no código.
- **Contentful CMS** – Gerenciamento de conteúdo dinâmico.
- **Embla Carousel** – Carrossel leve e interativo.
- **CSS Modules** – Estilização modular sem uso de frameworks CSS.
- **PostgreSQL** *(em desenvolvimento)* – Banco de dados relacional para login e favoritos.

---

## 📐 Arquitetura do Projeto

- Componentes React **agnósticos ao CMS**: o conteúdo do Contentful é transformado antes de chegar aos componentes, evitando acoplamento direto.
- Organização em **camadas separadas**: apresentação, lógica e dados são tratados de forma independente.
- Uso de **Data Mappers** para converter dados brutos em estruturas amigáveis aos componentes.
- Integração de **carrossel fluido** com dados dinâmicos.

---

---

## 🚧 Status do Projeto

- ✅ Frontend funcional com integração ao CMS  
- ✅ Conteúdo dinâmico sendo carregado via SSR  
- 🟡 Backend (API com login e favoritos) em construção  
- 🟡 Integração com banco de dados PostgreSQL em andamento  

---

## 📌 Próximos Passos

- Criar rotas de API para autenticação e sistema de favoritos  
- Conectar o banco de dados PostgreSQL ao frontend  
- Implementar páginas de perfil e gerenciamento de favoritos  
- Adicionar testes automatizados e melhorias de acessibilidade  

---

## 📁 Variáveis de Ambiente

Crie um arquivo `.env` baseado no exemplo abaixo:

```env
# .env.example
CONTENTFUL_SPACE_ID=seu_space_id
CONTENTFUL_ACCESS_TOKEN=seu_access_token
DATABASE_URL=postgresql://usuario:senha@localhost:5432/oceanbeach


