# Auditoria inicial do projeto

## Stack encontrada

- Projeto estatico com `index.html`, `styles.css` e `script.js`.
- Sem framework, sem build step, sem roteador real e sem backend configurado.
- Sem Supabase, Auth, migrations, testes ou gerenciamento de estado externo.

## Decisao para esta etapa

Como o pedido imediato foi atualizar as paginas para visualizacao, a interface foi transformada em uma SPA estatica navegavel inspirada no painel Vendix enviado na imagem.

Esta entrega nao implementa banco real, RLS, Supabase Auth, Storage ou Edge Functions. Esses itens exigem criacao/configuracao de um projeto Supabase e devem entrar na proxima etapa.

## Paginas criadas

- Dashboard
- IA Vendix
- Vendas
- Produtos
- Estoque
- Alertas
- Analises
- Importacao de dados
- Meus dados
- Configuracoes

## Dados demonstrativos

Os dados exibidos no front-end ainda sao locais, definidos em `script.js`, apenas para validar layout e fluxo visual. Para virar MVP real, eles devem ser substituidos por chamadas Supabase e funcoes SQL conforme a especificacao.

## Proximas conexoes

- Criar projeto Supabase e `.env`.
- Criar migrations com tabelas, RLS, policies e funcoes SQL.
- Implementar Auth e onboarding.
- Trocar dados locais por `supabase.rpc`.
- Implementar importacao real de CSV/XLS/XLSX.
- Criar Edge Function do Assistente Vendix.
