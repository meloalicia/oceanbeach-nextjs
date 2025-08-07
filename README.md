 OceanBeach
O OceanBeach é uma aplicação web onde usuários podem explorar praias e ilhas ao redor do mundo, descobrindo curiosidades, culturas locais e culinária. O projeto busca oferecer uma experiência visual e interativa para os amantes do mar, com foco em performance, organização de código e arquitetura escalável.

✨ Tecnologias Utilizadas
Next.js 14 (App Router) – Renderização SSR e otimização de performance.

TypeScript – Tipagem estática para maior segurança.

Contentful (CMS) – Gestão de conteúdo dinâmica, com uso de DataMapper para transformar os dados.

Embla Carousel – Carrossel interativo para visualização de imagens.

CSS Modules – Estilização modular e organizada.

PostgreSQL (planejado) – Banco de dados relacional, ainda em implementação.

🧱 Arquitetura do Projeto
Componentes agnósticos: os componentes não são acoplados diretamente ao CMS (Contentful), permitindo a troca futura de fornecedor.

Separação de responsabilidades: dados, lógica e apresentação organizados em camadas distintas.

Transformação de dados: uso de um DataMapper para adaptar os dados do CMS aos componentes React.

Carrossel fluido: integração do Embla Carousel para navegação por imagens de forma leve e responsiva.

🧩 Principais Desafios
Integrar o Embla Carousel com os dados dinâmicos do CMS.

Garantir tipagem estrita com TypeScript para evitar erros inesperados.

Criar uma arquitetura desacoplada e escalável desde o início do projeto.

🚧 Status do Projeto
✅ Integração com Contentful finalizada
🟡 Frontend em construção
🟡 Backend (API) em construção
🟡 Integração com banco de dados PostgreSQL em andamento

🛣️ Próximos Passos
Criar rotas de API para autenticação e sistema de favoritos

Implementar persistência de dados com PostgreSQL (sem uso de ORM)

Construir páginas de perfil e favoritos do usuário

Adicionar testes e melhorar acessibilidade

🤝 Contribuindo
Contribuições são bem-vindas! Se você quiser sugerir melhorias, relatar bugs ou enviar PRs, sinta-se à vontade para participar do desenvolvimento.

