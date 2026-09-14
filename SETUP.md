# Setup — Site da Alfa Marcenaria

Passo a passo pra colocar o site no ar. Tudo em nome da própria Alfa/Lucilene, não da Jessica.

## 1. Conta do GitHub

1. Lucilene cria uma conta em https://github.com/signup com o e-mail dela.
2. Cria um repositório novo (privado ou público, tanto faz) chamado `alfa-marcenaria-site`.
3. Ela adiciona a Jessica como colaboradora (Settings → Collaborators) — a Jessica confirma o convite.
4. `git remote add origin <url-do-repo-dela>` e `git push -u origin master` a partir deste projeto.

## 2. Conta da Vercel

1. Lucilene cria uma conta em https://vercel.com/signup fazendo login com a conta GitHub dela (passo 1).
2. Importa o repositório `alfa-marcenaria-site` como novo projeto — a Vercel detecta Next.js automaticamente.
3. Ela adiciona a Jessica como membro do time/projeto (Settings → Members) — a Jessica confirma o convite.

## 3. Domínio

1. Registrar `alfamarcenaria.com.br` (ou variação, se esse já estiver ocupado) no Registro.br,
   em nome do CNPJ da Alfa Marcenaria.
2. Na Vercel, ir em Settings → Domains do projeto e adicionar o domínio.
3. A Vercel mostra os registros DNS necessários (normalmente um `CNAME` ou `A`) — configurar isso
   no painel do Registro.br.
4. Atualizar `siteConfig.url` em `lib/metadata.js` se o domínio final for diferente de
   `alfamarcenaria.com.br`, e o `repo` em `public/admin/config.yml` com o nome real
   `usuario-da-alfa/alfa-marcenaria-site`.

## 4. GitHub OAuth App (login do painel `/admin`)

1. Na conta GitHub da Alfa: Settings → Developer settings → OAuth Apps → New OAuth App.
2. Homepage URL: `https://alfamarcenaria.com.br` (ou o domínio real).
3. Authorization callback URL: `https://alfamarcenaria.com.br/api/callback`.
4. Depois de criado, copiar o "Client ID" e gerar um "Client Secret".
5. Na Vercel, em Settings → Environment Variables do projeto, adicionar:
   - `GITHUB_OAUTH_CLIENT_ID` = o Client ID copiado.
   - `GITHUB_OAUTH_CLIENT_SECRET` = o Client Secret copiado.
6. Fazer um novo deploy (qualquer commit novo, ou "Redeploy" no painel da Vercel) pra essas
   variáveis entrarem em vigor.

## 5. Testar o login do painel em produção

1. Abrir `https://alfamarcenaria.com.br/admin`.
2. Clicar em "Login with GitHub".
3. Autorizar o app na tela do GitHub.
4. Confirmar que a interface do Decap CMS carrega com as 4 coleções (Páginas, Serviços,
   Portfólio, Blog).
5. Editar um campo qualquer (ex.: o telefone em Páginas → Contato) e salvar.
6. Confirmar no GitHub que apareceu um commit novo no repositório, e que depois do deploy
   automático da Vercel (1-2 min) o site já mostra o telefone atualizado.

## 6. Conteúdo final (antes de anunciar o site)

O conteúdo hoje em `content/` é **placeholder de exemplo**. Antes de divulgar o site:

- Substituir os textos de exemplo (Home, Sobre, Contato) pelo texto real da Alfa.
- Adicionar os serviços/produtos reais na coleção Serviços (pode ser feito pela própria
  Lucilene, pelo painel).
- Adicionar fotos reais de trabalhos entregues na coleção Portfólio.
- Revisar/expandir os posts de blog de exemplo, ou escrever novos, usando as skills
  `seo-content-writer`, `geo-fundamentals` e `rank-local` (palavra-chave local, formato de
  pergunta-resposta direto).
- Checar se o Google Business Profile da Alfa existe e está com telefone/endereço iguais aos
  do site (consistência de NAP).

## 7. Checagem final antes de anunciar

- `npm run build` sem erro.
- `https://alfamarcenaria.com.br/sitemap.xml` lista todas as páginas + posts.
- `https://alfamarcenaria.com.br/robots.txt` bloqueia `/admin` e aponta pro sitemap.
- Rodar o Lighthouse (aba Lighthouse do DevTools do Chrome) numa página e conferir performance/SEO.
