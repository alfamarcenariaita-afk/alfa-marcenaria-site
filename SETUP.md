# Setup — Site da Alfa Marcenaria

Passo a passo pra colocar o site no ar. Tudo em nome da própria Alfa/Lucilene, não da Jessica.

## 1. Conta do GitHub

1. Lucilene cria uma conta em https://github.com/signup com o e-mail dela.
2. Cria um repositório novo (privado ou público, tanto faz) chamado `alfa-marcenaria-site`.
3. Ela adiciona a Jessica como colaboradora (Settings → Collaborators) — a Jessica confirma o convite.
4. `git remote add origin <url-do-repo-dela>` e `git push -u origin main` a partir deste projeto
   (o nome `main` precisa bater com o `branch: main` já configurado em `public/admin/config.yml`,
   senão o botão "Salvar" do painel `/admin` falha silenciosamente por apontar pra uma branch que
   não existe).

## 2. Conta da Vercel

1. Lucilene cria uma conta em https://vercel.com/signup fazendo login com a conta GitHub dela (passo 1).
2. Importa o repositório `alfa-marcenaria-site` como novo projeto — a Vercel detecta Next.js automaticamente.
3. **Não precisa** adicionar a Jessica como membro do time da Vercel — a Vercel empurra upgrade
   pro plano Pro (pago) só pra isso, e não é necessário: o deploy já acontece automaticamente a
   cada push no GitHub (onde a Jessica já é colaboradora), sem precisar de acesso à Vercel.

## 3. Domínio

1. Registrar `alfamarcenaria.com.br` (ou variação, se esse já estiver ocupado) no Registro.br,
   em nome do CNPJ da Alfa Marcenaria.
2. Na Vercel, ir em Settings → Domains do projeto e adicionar o domínio.
3. A Vercel mostra os registros DNS necessários (normalmente um `CNAME` ou `A`) — configurar isso
   no painel do Registro.br.
4. Atualizar `siteConfig.url` em `lib/metadata.js` se o domínio final for diferente de
   `alfamarcenaria.com.br`, o `repo` em `public/admin/config.yml` com o nome real
   `usuario-da-alfa/alfa-marcenaria-site`, **e também o `base_url` em `public/admin/config.yml`**
   (tem que ser exatamente o mesmo domínio de `siteConfig.url`, senão o painel `/admin` chama
   `/api/auth` no domínio antigo e o login do CMS para de funcionar sem erro claro).
   O `base_url` é **só o domínio, sem `/api`** (o caminho vai em `auth_endpoint: api/auth`): o Decap
   compara a origem da janela de login com o `base_url` inteiro, e com `/api` no final o popup do
   GitHub fica em branco depois de autorizar.

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

## 6. Conteúdo (status: já é conteúdo real, não placeholder)

Feito em 15/09/26: textos reais de Home/Sobre/Contato, os 16 produtos exatos do sistema de
orçamento (`pricing.js`) na coleção Serviços, ~22 fotos reais de trabalhos entregues (Portfólio +
capas dos Serviços), e 21 posts de blog (5 gerais + 1 por produto), todos com resumo direto, FAQ e
CTA rastreável por WhatsApp. Segue pendente:

- Confirmar/ajustar o horário de atendimento em `content/paginas/contato.md` (o valor atual é uma
  suposição razoável, não foi confirmado pela Lucilene).
- Checar se o Google Business Profile da Alfa existe e está com telefone/endereço iguais aos
  do site (consistência de NAP).
- Novos produtos/fotos/posts continuam podendo ser adicionados a qualquer momento pelo painel
  `/admin` (Lucilene) ou pedindo pra Jessica/Claude.

## 7. Feed do Instagram na Home (opcional)

A Home tem uma seção "Direto do Instagram" (`components/InstagramFeed.js`) que busca os últimos 6
posts de @alfamarcenaria_ita direto na API oficial da Meta — sem banco de dados, sem serviço de
terceiro (nem Behold, nem scraping). Enquanto a variável de ambiente abaixo não existir, a seção
simplesmente não aparece (não quebra a página).

1. Acessar https://developers.facebook.com/apps e criar um app novo, **em nome da própria Alfa**
   (não da conta pessoal da Jessica).
2. No app, adicionar o produto **"Instagram"** → escolher **"API com Login do Instagram"**
   (Instagram API with Instagram Login) — esse fluxo NÃO exige vincular uma Página do Facebook.
3. Conectar a conta @alfamarcenaria_ita (ela já é conta comercial/criador, o que esse fluxo exige).
4. Gerar um **token de acesso de longa duração** (formato `IGAA...`) pra essa conta, dentro do
   próprio painel do produto Instagram do app.
5. Na Vercel, em Settings → Environment Variables, adicionar:
   - `INSTAGRAM_ACCESS_TOKEN` = o token gerado (Production + Preview + Development).
6. Redeploy pra variável entrar em vigor.

**Manutenção recorrente:** esse token expira em ~60 dias. Antes de expirar, repetir o passo 4
(gerar um token novo no painel da Meta) e atualizar a env var na Vercel (passo 5) + redeploy. Sem
isso, a seção do Instagram simplesmente some da Home até o token ser renovado — não derruba o
resto do site.

## 8. Checagem final antes de anunciar

- `npm run build` sem erro.
- `https://alfamarcenaria.com.br/sitemap.xml` lista todas as páginas + posts.
- `https://alfamarcenaria.com.br/robots.txt` bloqueia `/admin` e aponta pro sitemap.
- Rodar o Lighthouse (aba Lighthouse do DevTools do Chrome) numa página e conferir performance/SEO.

## 9. SEO, GEO e AEO (o que já está no código e o que falta fazer fora dele)

**Já está no site:** título, descrição e imagem de compartilhamento únicos por página; dados
estruturados (empresa, site, serviço, artigo, FAQ, trilha de navegação, contato); página própria
para cada serviço (`/servicos/[slug]`); FAQ na Home e nos posts; data de publicação/atualização
nos posts; `sitemap.xml`; `robots.txt` liberando os robôs de IA (GPTBot, ClaudeBot, PerplexityBot,
Google-Extended etc.); `/llms.txt` com o resumo da empresa para assistentes de IA.

**Falta fazer (só a Lucilene consegue, com a conta Google dela):**
1. **Perfil da Empresa no Google (Google Meu Negócio):** criar/reivindicar o perfil com o MESMO nome,
   endereço (Rua Joaquim Augusto França, 358, São José, Itabirito/MG), telefone ((31) 9 8621-9215) e
   horário do site. É o que mais pesa em "marcenaria em Itabirito" e no mapa. Depois, copiar o link
   de avaliação do perfil para o painel: Configurações do site → "Link para avaliar no Google".
2. **Google Search Console:** adicionar `https://alfamarcenaria.com.br`, verificar o domínio (registro
   TXT no Registro.br) e enviar `https://alfamarcenaria.com.br/sitemap.xml`.
3. **Bing Webmaster Tools** (alimenta ChatGPT e Copilot): importar o site do Search Console e enviar o sitemap.
4. **Depoimentos (UGC):** pedir ao cliente o texto e a foto da peça instalada (o botão "Já é cliente?"
   do site já manda a mensagem pronta). No painel: Depoimentos de clientes → novo, e **só marcar
   "autorizou publicar" depois do OK do cliente** (LGPD). Sem essa marca, o depoimento não aparece.
5. **Posts:** ao revisar um post, preencher "Atualizado em" no painel (a data aparece no Google e nas IAs).

**Por que não há estrelas/avaliação no Google (aggregateRating):** o Google ignora avaliações que
a própria empresa publica sobre si; as estrelas só vêm das avaliações reais do Perfil da Empresa.
