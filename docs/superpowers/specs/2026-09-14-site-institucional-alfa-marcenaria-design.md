# Site institucional da Alfa Marcenaria — design

**Data:** 2026-09-14
**Cliente:** Alfa Marcenaria (Lucilene), marcenaria de Itabirito/MG, cliente de consultoria SEBRAE/Sala Mineira da Jessica.
**Relacionado:** [[project_alfa_orcamentos_webapp]] (app de orçamentos, projeto separado, mesma cliente).

## Contexto e objetivo

A Alfa não tem site público hoje (só o app interno de orçamentos, que é uma ferramenta de
trabalho, não uma vitrine). O objetivo deste projeto é um site institucional que:

1. **Rankeie no Google (SEO) e nos motores de busca de IA (GEO/AEO)** — objetivo explícito da
   Jessica: "o objetivo é rankear no Google e nas IAs com GEO, AEO, SEO".
2. Tenha o **menor custo de hospedagem possível**.
3. Permita que a **Lucilene edite coisas básicas sozinha** (textos, imagens, e adicionar um novo
   produto/serviço), sem depender da Jessica pra cada troca pequena.

## Decisões já fechadas com a Jessica (não reabrir sem motivo novo)

- Site institucional + captação de leads via SEO/GEO/AEO (não é loja com preço, não é catálogo
  transacional).
- Manutenção de **estrutura/código** continua com Jessica + Claude (mesmo fluxo dos outros
  projetos: Lucilene manda pedido por WhatsApp/Telegram, Jessica pede pro Claude, Claude edita e
  faz deploy). Manutenção de **conteúdo básico** (texto, imagem, novo produto/serviço, novo post)
  passa a ser self-service da Lucilene via painel `/admin`.
- Domínio próprio é **obrigatório** pro objetivo de SEO/GEO (não dá pra rankear bem só com
  subdomínio `.vercel.app`).
- **Todas as contas (domínio, GitHub, Vercel, GitHub OAuth App) são criadas em nome da própria
  Alfa/Lucilene** (e-mail dela, CNPJ da empresa no registro do domínio) — não nas contas pessoais
  da Jessica, pra não empilhar mais um projeto nas quotas/organização dela. Jessica recebe acesso
  de colaboradora nessas contas pra poder trabalhar.
- Reaproveitar a logo oficial já existente (mesmo arquivo usado no app de orçamentos) — **nunca
  recriar ou modificar a logo**, regra já estabelecida com essa cliente.

## Arquitetura

### Stack

- **Next.js (App Router), build estático (SSG)** — sem banco de dados, sem servidor rodando.
- **Hospedagem:** Vercel, plano Hobby (grátis), conta própria da Alfa.
- **Repositório:** GitHub, conta própria da Alfa.
- **Domínio:** `.com.br` registrado no Registro.br, CNPJ da Alfa (nome exato a definir com a
  Lucilene — ex. `alfamarcenaria.com.br`, sujeito a disponibilidade).
- **Conteúdo editável:** [Decap CMS](https://decapcms.org/) (open-source, grátis) — ver seção
  própria abaixo.
- **Estilização:** Tailwind CSS (mesmo padrão dos outros projetos da Jessica).

### Por que Next.js SSG em vez do HTML puro do app de orçamentos

O app de orçamentos é HTML/JS vanilla porque é uma ferramenta interna sem necessidade de SEO. O
site institucional precisa de coisas que o Next.js resolve de fábrica e que dariam trabalho
manual em HTML puro: `sitemap.xml`/`robots.txt` gerados automaticamente, metadata (title,
description, Open Graph image) por página, dados estruturados (schema.org) via JSON-LD, e MDX
para escrever conteúdo de blog/produto num formato limpo. Isso ajuda tanto o SEO clássico quanto
o GEO/AEO (conteúdo estruturado, com FAQ direto, é o formato que motores de IA preferem citar).

### Decap CMS — como a edição self-service funciona

- Rota `/admin` no próprio site Next.js carrega a interface do Decap CMS (config em
  `public/admin/config.yml`).
- **Autenticação:** backend `github` do Decap CMS — a Lucilene loga com a conta GitHub da própria
  Alfa (a mesma criada para hospedar o repositório). Como o fluxo OAuth do GitHub não pode rodar
  só no navegador (precisa troca de `code` por `token` com o client secret, que não pode ficar no
  frontend), é necessária uma function serverless de OAuth (`/api/admin/auth`,
  `/api/admin/callback`) — **mesmo padrão já implementado pra integração do Bling no app de
  orçamentos** (`api/bling-auth.js` / `api/bling-callback.js`: troca de `code` por token,
  guardado). Aqui não precisa guardar token persistente (o Decap CMS gerencia a sessão no
  navegador dela); a function só faz a ponte OAuth.
- **Fluxo de edição:** Lucilene abre `/admin` → edita um campo de texto ou sobe uma imagem → clica
  Salvar → Decap CMS faz um commit direto no repositório GitHub (via API do GitHub, usando o
  token de sessão dela) → a Vercel detecta o novo commit e faz o deploy automaticamente (~1-2
  min). Ela nunca vê a palavra "commit", "git" ou "deploy" — só um botão "Salvar" e o site
  atualizado.
- **Coleções (o que ela pode ADICIONAR, não só editar):**
  - `Serviços` — um item por serviço/produto (ex.: Marco de Porta, Alizar, Corrimão): nome,
    descrição, foto, categoria. Botão "+ Novo serviço" cria um novo, sem tocar em código. Sem
    campo de preço (site institucional).
  - `Portfólio` — um item por trabalho entregue: foto(s), legenda curta, categoria opcional.
  - `Blog` — um item por post (título, corpo em Markdown, imagem de capa, data). Pensado pra
    SEO/GEO contínuo.
  - Campos das páginas fixas (`Home`, `Sobre`, `Contato`) ficam como **entradas singulares**
    (não-coleção) no mesmo painel: títulos, parágrafos, telefone/endereço/horário, links de
    WhatsApp/Instagram.
- **O que fica FORA do painel (continua com Jessica/Claude):** criar página nova do zero, mudar
  layout/design, mudar estrutura de SEO/schema, qualquer alteração de código.

### Páginas

- **Home** — apresentação, chamada pra WhatsApp, destaques de serviço/portfólio.
- **Sobre** — história da Alfa, Lucilene, diferenciais.
- **Serviços** — lista dos itens da coleção `Serviços` (marco, porta almofada, alizar, corrimão
  etc., mesma nomenclatura usada no app de orçamentos, sem preço).
- **Portfólio** — galeria da coleção `Portfólio`.
- **Blog** — lista + página individual de cada post da coleção `Blog`.
- **Contato** — WhatsApp, telefone, Instagram (@alfamarcenaria_ita), endereço/atendimento em
  Itabirito/MG, mapa (opcional).

### SEO / GEO / AEO

- **Técnico:** metadata (`generateMetadata`) por página e por post; `sitemap.xml` e `robots.txt`
  gerados pelo Next.js; JSON-LD `LocalBusiness` (nome, endereço, telefone, horário, área de
  atendimento) nas páginas institucionais e `Article` nos posts do blog; site 100% estático =
  Core Web Vitals bons por padrão (sem espera de banco de dados).
- **Conteúdo:** usar as skills `seo-content-writer`, `geo-fundamentals` e `rank-local` na hora de
  escrever cada página e post — palavra-chave local ("marcenaria em Itabirito", "porta de madeira
  sob medida MG"), estrutura de pergunta-resposta direta (formato que motores de IA citam), e
  consistência de NAP (nome/endereço/telefone) entre o site, o Google Business Profile e o
  Instagram da Alfa (checar se o Google Business já existe e está correto; criar/corrigir se não).
- **Conteúdo inicial do blog:** pelo menos 3-5 posts no lançamento (ex.: "quanto custa um marco de
  porta em madeira", "como escolher entre madeira Cumaru e Angelim", "manutenção de porta de
  madeira") pra não lançar com blog vazio — SEO de blog vazio não ranqueia nada.

### Contas e custos

| Item | Titular | Custo |
|---|---|---|
| Domínio `.com.br` (Registro.br) | CNPJ da Alfa | ~R$40/ano |
| GitHub (repositório) | conta da Lucilene | grátis |
| Vercel (Hobby) | conta da Lucilene | grátis |
| GitHub OAuth App (login do painel) | conta da Lucilene | grátis |
| Decap CMS | — (open source, sem conta própria) | grátis |

**Total: ~R$40/ano, R$0/mês.** Jessica recebe acesso de colaboradora no GitHub e na Vercel pra
poder trabalhar nas contas da Alfa.

## Fora de escopo (YAGNI, por ora)

- Loja/e-commerce com preço e checkout (o app de orçamentos já resolve o cálculo de preço; o site
  institucional não precisa disso).
- Login de cliente final / área restrita.
- CMS de terceiro pago (Sanity, Contentful) — Decap CMS cobre a necessidade sem custo nem conta
  extra.
- Multi-idioma.
- Aprovação/moderação de conteúdo antes de publicar (Lucilene salva e já vai ao ar; se isso virar
  problema na prática, revisitar).

## Testes e verificação

- Build estático local (`next build`) sem erros antes de qualquer deploy.
- Testar o painel `/admin` localmente end-to-end: login OAuth, editar um texto, subir uma imagem,
  criar um novo item de `Serviços`, confirmar que aparece na página pública depois do build.
- Checar sitemap.xml, robots.txt e o JSON-LD (`LocalBusiness`) renderizado nas páginas antes do
  primeiro deploy de produção.
- Rodar Lighthouse (Core Web Vitals) numa página antes de considerar o lançamento pronto.
- Smoke test em produção depois do primeiro deploy real (igual ao que já se faz no app de
  orçamentos): páginas carregam, painel loga, domínio resolve.

## Riscos / pontos de atenção

- **Disponibilidade do domínio:** `alfamarcenaria.com.br` (ou variação) precisa ser checado no
  Registro.br antes de prometer o nome final à Lucilene.
- **OAuth do GitHub para o Decap CMS:** exige criar um GitHub OAuth App nas configurações da
  conta da Alfa e uma function serverless de callback — mesmo padrão do Bling, mas é um passo de
  configuração novo que precisa ser feito com calma (client ID/secret errados travam o login do
  painel).
- **Google Business Profile:** se a Alfa já tiver um perfil desatualizado ou nenhum, isso precisa
  ser resolvido em paralelo ao site — sem isso o efeito do SEO local fica menor.
- **Conteúdo inicial:** o texto e as fotos de portfólio/serviços precisam vir da Lucilene antes do
  lançamento; sem esse material o site fica com placeholder e atrasa o "ranquear" de verdade.
