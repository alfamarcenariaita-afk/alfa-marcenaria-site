# Site Institucional da Alfa Marcenaria — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site institucional da Alfa Marcenaria (Next.js estático, hospedagem grátis, painel Decap CMS pra Lucilene editar/adicionar conteúdo sozinha) pensado pra ranquear no Google e em motores de IA (SEO/GEO/AEO).

**Architecture:** Next.js (App Router) com páginas geradas a partir de arquivos Markdown em `content/` (biblioteca própria `lib/content.js`, sem banco de dados). Duas rotas de API (serverless, grátis na Vercel) fazem a ponte OAuth entre o painel Decap CMS e o GitHub, permitindo que a Lucilene salve edições que viram commits automáticos no repositório e disparam deploy automático na Vercel.

**Tech Stack:** Next.js 16 (App Router, JS puro, sem TypeScript), React 19, Tailwind CSS 3, `gray-matter` (parse de frontmatter), `marked` (Markdown → HTML), Decap CMS (via CDN, sem dependência de build), `decap-server` (dev only, pra testar o painel localmente sem OAuth real). Hospedagem Vercel (Hobby) + GitHub, ambos em conta própria da Alfa.

**Spec:** `docs/superpowers/specs/2026-09-14-site-institucional-alfa-marcenaria-design.md`

## Global Constraints

- Custo de hospedagem deve ficar em R$0/mês; único custo recorrente aceito é o domínio `.com.br` (~R$40/ano).
- Todas as contas (domínio, GitHub, Vercel, GitHub OAuth App) são criadas em nome da Alfa/Lucilene, nunca nas contas pessoais da Jessica.
- Nunca recriar, redesenhar ou modificar a logo oficial da Alfa — sempre reaproveitar o arquivo já existente (`logo-oficial.png`, usado hoje no app de orçamentos).
- Site institucional com foco em SEO/GEO/AEO; **nenhum preço é exibido** no site (cálculo de preço é papel exclusivo do app de orçamentos, projeto separado).
- A Lucilene precisa poder editar texto/imagem das páginas fixas e **adicionar** novo item nas coleções (Serviços, Portfólio, Blog) sozinha, pelo painel `/admin`, sem tocar em código.
- Fora de escopo (não implementar): e-commerce/checkout, login de cliente final, CMS pago de terceiro, multi-idioma, fluxo de aprovação/moderação antes de publicar.

---

## Task 1: Scaffold do projeto Next.js + Tailwind + layout mínimo

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `app/globals.css`
- Create: `app/layout.js`
- Create: `app/page.js`
- Create: `public/logo.png` (cópia do arquivo oficial)
- Create: `.gitignore`

**Interfaces:**
- Produces: layout raiz que envolve toda página (`RootLayout`); nenhuma outra task depende do conteúdo interno ainda, só do fato de `npm run build` funcionar.

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "alfa-marcenaria-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "node lib/content.test.mjs",
    "cms:local": "decap-server"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "decap-server": "^3.0.0"
  }
}
```

- [ ] **Step 2: Criar `.gitignore`**

```
node_modules/
.next/
.env*.local
```

- [ ] **Step 3: Instalar dependências**

Run: `npm install`
Expected: instala sem erro, cria `node_modules/` e `package-lock.json`.

- [ ] **Step 4: Criar `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```

- [ ] **Step 5: Criar `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography")],
};
```

- [ ] **Step 6: Criar `postcss.config.js`**

```js
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 7: Criar `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Criar `app/layout.js` (placeholder, sem header/footer ainda)**

```jsx
import "./globals.css";

export const metadata = {
  title: "Alfa Marcenaria",
  description: "Marcenaria sob medida em Itabirito/MG.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Criar `app/page.js` (placeholder)**

```jsx
export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Alfa Marcenaria</h1>
      <p className="text-neutral-600 mt-2">Site em construção.</p>
    </main>
  );
}
```

- [ ] **Step 10: Copiar a logo oficial**

Run: `cp "../alfa-marcenaria-orcamentos/logo-oficial.png" "public/logo.png"`

(Caminho relativo assumindo que `alfa-marcenaria-site` e `alfa-marcenaria-orcamentos` são pastas irmãs dentro de `Alfa Marcenaria/`. Se o arquivo não existir nesse caminho, localizar `logo-oficial.png` dentro de `alfa-marcenaria-orcamentos` antes de copiar — **nunca recriar a logo**.)

Expected: `public/logo.png` existe e é idêntico ao arquivo oficial (mesmo tamanho em bytes).

- [ ] **Step 11: Rodar o build pra confirmar que o scaffold funciona**

Run: `npm run build`
Expected: build termina com sucesso, sem erros de compilação.

- [ ] **Step 12: Rodar o dev server e verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000`
Expected: página mostra "Alfa Marcenaria" e "Site em construção." com fundo claro (Tailwind aplicado — se as classes não tiverem efeito visual, o Tailwind não está configurado certo).

- [ ] **Step 13: Commit**

```bash
git add package.json package-lock.json next.config.js tailwind.config.js postcss.config.js app/globals.css app/layout.js app/page.js public/logo.png .gitignore
git commit -m "feat: scaffold do projeto Next.js + Tailwind"
```

---

## Task 2: Biblioteca de leitura de conteúdo (`lib/content.js`)

**Files:**
- Create: `lib/content.js`
- Create: `lib/content.test.mjs`

**Interfaces:**
- Produces:
  - `obterPagina(nome, baseDir?)` → `{ ...frontmatter, corpoHtml }` ou lança erro se o arquivo não existir.
  - `obterColecao(nome, baseDir?)` → array de `{ slug, ...frontmatter, corpoHtml }`, ordenado por `data` decrescente quando o campo `data` existir, senão por nome de arquivo.
  - `obterItemColecao(nome, slug, baseDir?)` → `{ slug, ...frontmatter, corpoHtml }` ou `null` se não existir.
  - `baseDir` (opcional, default `path.join(process.cwd(), "content")`) — existe só pra permitir teste isolado com fixtures em diretório temporário.
- Consumes: nada (é a base de tudo).

- [ ] **Step 1: Escrever o teste (vai falhar, o módulo ainda não existe)**

Criar `lib/content.test.mjs`:

```js
// Teste de lib/content.js. Roda com: node lib/content.test.mjs
import { createRequire } from "module";
import fs from "fs";
import os from "os";
import path from "path";
const require = createRequire(import.meta.url);
const { obterPagina, obterColecao, obterItemColecao } = require("./content.js");

let falhas = 0;
function igual(nome, obtido, esperado) {
  const ok = JSON.stringify(obtido) === JSON.stringify(esperado);
  if (!ok) falhas++;
  console.log(`${ok ? "OK  " : "FALHA"}  ${nome}`);
  if (!ok) { console.log("  obtido:  ", JSON.stringify(obtido)); console.log("  esperado:", JSON.stringify(esperado)); }
}
function contem(nome, obtido, substring) {
  const ok = typeof obtido === "string" && obtido.indexOf(substring) >= 0;
  if (!ok) falhas++;
  console.log(`${ok ? "OK  " : "FALHA"}  ${nome}`);
  if (!ok) console.log("  obtido:", obtido);
}

// diretorio temporario com fixtures, pra nao depender do content/ real (que muda com o tempo)
const baseDir = fs.mkdtempSync(path.join(os.tmpdir(), "alfa-content-test-"));
fs.mkdirSync(path.join(baseDir, "paginas"));
fs.mkdirSync(path.join(baseDir, "servicos"));
fs.mkdirSync(path.join(baseDir, "blog"));

fs.writeFileSync(
  path.join(baseDir, "paginas", "home.md"),
  "---\ntitulo: Alfa Marcenaria\nsubtitulo: Marcenaria sob medida\n---\nTexto de introducao.\n"
);
fs.writeFileSync(
  path.join(baseDir, "servicos", "marco-de-porta.md"),
  "---\nnome: Marco de Porta\ncategoria: Marcos\nimagem: /images/uploads/marco.jpg\n---\nDescricao do marco de porta.\n"
);
fs.writeFileSync(
  path.join(baseDir, "servicos", "alizar.md"),
  "---\nnome: Alizar\ncategoria: Alizares\n---\nDescricao do alizar.\n"
);
fs.writeFileSync(
  path.join(baseDir, "blog", "post-antigo.md"),
  "---\ntitulo: Post antigo\ndata: 2026-01-01\n---\nConteudo antigo.\n"
);
fs.writeFileSync(
  path.join(baseDir, "blog", "post-novo.md"),
  "---\ntitulo: Post novo\ndata: 2026-06-01\n---\nConteudo **novo**.\n"
);

// ---------- obterPagina ----------
const home = obterPagina("home", baseDir);
igual("obterPagina: le o titulo", home.titulo, "Alfa Marcenaria");
igual("obterPagina: le o subtitulo", home.subtitulo, "Marcenaria sob medida");
contem("obterPagina: converte o corpo em html", home.corpoHtml, "<p>Texto de introducao.</p>");

let lancouErro = false;
try { obterPagina("nao-existe", baseDir); } catch (e) { lancouErro = true; }
igual("obterPagina: pagina inexistente lanca erro", lancouErro, true);

// ---------- obterColecao ----------
const servicos = obterColecao("servicos", baseDir);
igual("obterColecao: quantidade de itens", servicos.length, 2);
igual("obterColecao: slug vem do nome do arquivo", servicos.find((s) => s.nome === "Marco de Porta").slug, "marco-de-porta");
igual("obterColecao: mantem imagem quando presente", servicos.find((s) => s.nome === "Marco de Porta").imagem, "/images/uploads/marco.jpg");
igual("obterColecao: item sem imagem nao quebra", servicos.find((s) => s.nome === "Alizar").imagem, undefined);

const posts = obterColecao("blog", baseDir);
igual("obterColecao: ordena blog por data decrescente", posts.map((p) => p.slug), ["post-novo", "post-antigo"]);
contem("obterColecao: converte markdown do post (bold)", posts[0].corpoHtml, "<strong>novo</strong>");

// ---------- obterItemColecao ----------
const item = obterItemColecao("blog", "post-antigo", baseDir);
igual("obterItemColecao: acha item existente", item.titulo, "Post antigo");
igual("obterItemColecao: item inexistente retorna null", obterItemColecao("blog", "nao-existe", baseDir), null);

fs.rmSync(baseDir, { recursive: true, force: true });

console.log(falhas === 0 ? "\nTODOS OS TESTES PASSARAM ✔" : `\n${falhas} TESTE(S) FALHARAM`);
process.exit(falhas === 0 ? 0 : 1);
```

- [ ] **Step 2: Rodar o teste e confirmar que falha (módulo não existe ainda)**

Run: `node lib/content.test.mjs`
Expected: erro `Cannot find module './content.js'` (ou equivalente).

- [ ] **Step 3: Implementar `lib/content.js`**

```js
// lib/content.js — le paginas e colecoes de conteudo em Markdown (frontmatter + corpo)
// de content/, e converte pra objetos simples que as paginas do Next.js consomem.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

function baseDirPadrao() {
  return path.join(process.cwd(), "content");
}

function lerArquivoMd(caminhoCompleto) {
  const bruto = fs.readFileSync(caminhoCompleto, "utf8");
  const { data, content } = matter(bruto);
  return { ...data, corpoHtml: marked.parse(content.trim()) };
}

function obterPagina(nome, baseDir) {
  const dir = baseDir || baseDirPadrao();
  const caminho = path.join(dir, "paginas", `${nome}.md`);
  return lerArquivoMd(caminho);
}

function obterColecao(nome, baseDir) {
  const dir = baseDir || baseDirPadrao();
  const pastaColecao = path.join(dir, nome);
  const arquivos = fs.readdirSync(pastaColecao).filter((f) => f.endsWith(".md"));
  const itens = arquivos.map((arquivo) => {
    const slug = arquivo.replace(/\.md$/, "");
    return { slug, ...lerArquivoMd(path.join(pastaColecao, arquivo)) };
  });
  const temData = itens.every((i) => i.data);
  if (temData) itens.sort((a, b) => new Date(b.data) - new Date(a.data));
  else itens.sort((a, b) => a.slug.localeCompare(b.slug));
  return itens;
}

function obterItemColecao(nome, slug, baseDir) {
  const dir = baseDir || baseDirPadrao();
  const caminho = path.join(dir, nome, `${slug}.md`);
  if (!fs.existsSync(caminho)) return null;
  return { slug, ...lerArquivoMd(caminho) };
}

module.exports = { obterPagina, obterColecao, obterItemColecao };
```

- [ ] **Step 4: Rodar o teste de novo e confirmar que passa**

Run: `node lib/content.test.mjs`
Expected: `TODOS OS TESTES PASSARAM ✔`, código de saída 0.

- [ ] **Step 5: Commit**

```bash
git add lib/content.js lib/content.test.mjs
git commit -m "feat: biblioteca de leitura de conteudo (paginas e colecoes em Markdown)"
```

---

## Task 3: Conteúdo de exemplo (`content/`)

**Files:**
- Create: `content/paginas/home.md`
- Create: `content/paginas/sobre.md`
- Create: `content/paginas/contato.md`
- Create: `content/servicos/marco-de-porta.md`
- Create: `content/servicos/porta-almofada.md`
- Create: `content/portfolio/trabalho-marco-cumaru.md`
- Create: `content/blog/quanto-custa-marco-de-porta.md`
- Create: `content/blog/como-escolher-madeira-cumaru-ou-angelim.md`

**Interfaces:**
- Consumes: `obterPagina`/`obterColecao` (Task 2) — este task só cria dados; a validação é rodar essas funções contra os arquivos criados aqui.
- Produces: dados reais que as Tasks 4-10 vão renderizar.

> **Nota:** este conteúdo é **placeholder de exemplo**, escrito pra provar que o site funciona de ponta a ponta. Antes do lançamento de verdade, ele precisa ser substituído por texto e fotos reais da Lucilene (ver `SETUP.md`, Task 13) — usando as skills `seo-content-writer`, `geo-fundamentals` e `rank-local` pra escrever a versão final.

- [ ] **Step 1: Criar `content/paginas/home.md`**

```markdown
---
titulo: Alfa Marcenaria
subtitulo: Portas, marcos, alizares e corrimões sob medida em Itabirito/MG
chamada: Falar no WhatsApp
whatsapp: 5531999999999
---

A Alfa Marcenaria faz peças de madeira sob medida — marcos, portas, alizares e corrimões — para casas e obras em Itabirito e região. Trabalho feito à mão, com madeira de qualidade e acabamento pensado para durar.
```

- [ ] **Step 2: Criar `content/paginas/sobre.md`**

```markdown
---
titulo: Sobre a Alfa Marcenaria
---

A Alfa Marcenaria é uma marcenaria de Itabirito/MG, comandada por Lucilene, dedicada a peças de madeira sob medida para portas, marcos, alizares e corrimões. Cada peça é feita a partir da medida exata do cliente, com atenção ao acabamento e à escolha da madeira.
```

- [ ] **Step 3: Criar `content/paginas/contato.md`**

```markdown
---
titulo: Fale com a Alfa Marcenaria
telefone: (31) 99999-9999
whatsapp: 5531999999999
endereco: Itabirito, MG
instagram: "@alfamarcenaria_ita"
horario: Segunda a sexta, 8h às 18h
---

Peça seu orçamento por WhatsApp ou telefone.
```

- [ ] **Step 4: Criar `content/servicos/marco-de-porta.md`**

```markdown
---
nome: Marco de Porta
categoria: Marcos
imagem: /images/uploads/exemplo-marco.jpg
---

Marco de porta feito sob medida, em madeira Cumaru ou Angelim, pronto para receber a porta e o acabamento da obra.
```

- [ ] **Step 5: Criar `content/servicos/porta-almofada.md`**

```markdown
---
nome: Porta Almofada
categoria: Portas
imagem: /images/uploads/exemplo-porta.jpg
---

Porta almofada em madeira maciça, com opção de vitrô, feita na medida exata do vão.
```

- [ ] **Step 6: Criar `content/portfolio/trabalho-marco-cumaru.md`**

```markdown
---
titulo: Marco e porta em Cumaru
imagem: /images/uploads/exemplo-portfolio-1.jpg
categoria: Marcos
---

Marco e porta em madeira Cumaru, instalados em residência em Itabirito.
```

- [ ] **Step 7: Criar `content/blog/quanto-custa-marco-de-porta.md`**

```markdown
---
titulo: Quanto custa um marco de porta em madeira?
data: 2026-09-01
imagemCapa: /images/uploads/exemplo-blog-1.jpg
resumo: Entenda o que influencia o preço de um marco de porta em madeira sob medida.
---

O preço de um marco de porta em madeira depende principalmente de três fatores: o tipo de madeira (Cumaru e Angelim são as mais usadas), a medida do vão e o acabamento escolhido. Peça um orçamento sem compromisso pelo WhatsApp da Alfa Marcenaria.
```

- [ ] **Step 8: Criar `content/blog/como-escolher-madeira-cumaru-ou-angelim.md`**

```markdown
---
titulo: Cumaru ou Angelim: qual madeira escolher?
data: 2026-09-05
imagemCapa: /images/uploads/exemplo-blog-2.jpg
resumo: Diferenças entre Cumaru e Angelim para marcos, portas e alizares.
---

Cumaru e Angelim são as madeiras mais usadas em marcos, portas e alizares sob medida. O Cumaru é mais escuro e resistente; o Angelim tem um custo geralmente menor. A escolha depende do orçamento e do acabamento desejado para a obra.
```

- [ ] **Step 9: Validar que `lib/content.js` lê esse conteúdo real sem erro**

Run:
```bash
node -e "const {obterPagina,obterColecao}=require('./lib/content.js'); console.log(obterPagina('home').titulo); console.log(obterColecao('servicos').map(s=>s.slug)); console.log(obterColecao('blog').map(p=>p.slug));"
```
Expected: imprime `Alfa Marcenaria`, depois `[ 'marco-de-porta', 'porta-almofada' ]`, depois `[ 'como-escolher-madeira-cumaru-ou-angelim', 'quanto-custa-marco-de-porta' ]` (blog ordenado por data decrescente).

- [ ] **Step 10: Commit**

```bash
git add content/
git commit -m "feat: conteudo de exemplo (paginas, servicos, portfolio, blog)"
```

---

## Task 4: Helper de metadata + componentes JSON-LD

**Files:**
- Create: `lib/metadata.js`
- Create: `components/LocalBusinessJsonLd.js`
- Create: `components/ArticleJsonLd.js`

**Interfaces:**
- Consumes: nada de outras tasks (usa só o objeto `contato`/`post` que cada página já tem via `lib/content.js`).
- Produces:
  - `siteConfig` (`{ nome, descricao, url }`) — usado por qualquer página/rota que monte metadata ou URLs absolutas.
  - `construirMetadata({ titulo, descricao, caminho })` → objeto pronto pra `export const metadata` do Next.js.
  - `<LocalBusinessJsonLd contato={contato} />` — `contato` é o objeto retornado por `obterPagina("contato")`.
  - `<ArticleJsonLd post={post} url={url} />` — `post` é um item de `obterColecao("blog")`/`obterItemColecao("blog", slug)`.

- [ ] **Step 1: Criar `lib/metadata.js`**

```js
// lib/metadata.js — configuracao central do site e helper de metadata pro Next.js.
// Trocar `url` aqui quando o dominio definitivo (Registro.br) for confirmado.
const siteConfig = {
  nome: "Alfa Marcenaria",
  descricao: "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira.",
  url: "https://alfamarcenaria.com.br",
};

function construirMetadata({ titulo, descricao, caminho = "/" }) {
  const url = siteConfig.url + caminho;
  const tituloFinal = titulo ? `${titulo} | ${siteConfig.nome}` : siteConfig.nome;
  const descricaoFinal = descricao || siteConfig.descricao;
  return {
    title: tituloFinal,
    description: descricaoFinal,
    alternates: { canonical: url },
    openGraph: {
      title: titulo || siteConfig.nome,
      description: descricaoFinal,
      url,
      siteName: siteConfig.nome,
      images: [siteConfig.url + "/logo.png"],
      locale: "pt_BR",
      type: "website",
    },
  };
}

module.exports = { siteConfig, construirMetadata };
```

- [ ] **Step 2: Criar `components/LocalBusinessJsonLd.js`**

```jsx
// Dados estruturados (schema.org) pras paginas institucionais (Home, Contato).
// Usa o subtipo HomeAndConstructionBusiness (mais especifico que LocalBusiness generico).
export default function LocalBusinessJsonLd({ contato }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Alfa Marcenaria",
    telephone: contato.telefone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itabirito",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    openingHours: contato.horario,
    ...(contato.instagram
      ? { sameAs: [`https://instagram.com/${contato.instagram.replace("@", "")}`] }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
```

- [ ] **Step 3: Criar `components/ArticleJsonLd.js`**

```jsx
import { siteConfig } from "../lib/metadata";

export default function ArticleJsonLd({ post, url }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    datePublished: post.data,
    ...(post.imagemCapa ? { image: [siteConfig.url + post.imagemCapa] } : {}),
    author: { "@type": "Organization", name: siteConfig.nome },
    mainEntityOfPage: url,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
```

- [ ] **Step 4: Verificar que os módulos carregam sem erro de sintaxe**

Run: `npm run build`
Expected: build continua passando (esses arquivos ainda não são usados por nenhuma página, então só precisam compilar sem erro).

- [ ] **Step 5: Commit**

```bash
git add lib/metadata.js components/LocalBusinessJsonLd.js components/ArticleJsonLd.js
git commit -m "feat: helper de metadata e componentes de dados estruturados (JSON-LD)"
```

---

## Task 5: Header e Footer no layout raiz

**Files:**
- Create: `components/Header.js`
- Create: `components/Footer.js`
- Modify: `app/layout.js` (substituir o placeholder da Task 1)

**Interfaces:**
- Consumes: `obterPagina` (Task 2), `siteConfig`/`construirMetadata` (Task 4).
- Produces: `<Header />` e `<Footer />` — usados só pelo `RootLayout`, nenhuma outra task importa esses componentes diretamente.

- [ ] **Step 1: Criar `components/Header.js`**

```jsx
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Alfa Marcenaria" className="h-10 w-auto" />
          <span className="font-semibold text-lg">Alfa Marcenaria</span>
        </Link>
        <nav className="hidden sm:flex gap-5 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-neutral-700 hover:text-amber-700">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Criar `components/Footer.js`**

```jsx
import { obterPagina } from "../lib/content";

export default function Footer() {
  const contato = obterPagina("contato");
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="font-semibold text-neutral-800">Alfa Marcenaria</p>
          <p>{contato.endereco}</p>
          <p>{contato.telefone}</p>
        </div>
        <div className="sm:text-right">
          {contato.instagram && <p>Instagram: {contato.instagram}</p>}
          <p className="mt-2">© {ano} Alfa Marcenaria</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Atualizar `app/layout.js` pra usar Header/Footer e o helper de metadata**

```jsx
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { construirMetadata } from "../lib/metadata";

export const metadata = construirMetadata({});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Rodar o dev server e verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000`
Expected: aparece o cabeçalho com a logo + nav (Início/Sobre/Serviços/Portfólio/Blog/Contato) e o rodapé com endereço "Itabirito, MG", telefone "(31) 99999-9999" e "Instagram: @alfamarcenaria_ita" (dados do `content/paginas/contato.md` criado na Task 3).

- [ ] **Step 5: Rodar o build completo**

Run: `npm run build`
Expected: sucesso, sem erros.

- [ ] **Step 6: Commit**

```bash
git add components/Header.js components/Footer.js app/layout.js
git commit -m "feat: header e footer no layout raiz"
```

---

## Task 6: Página Home

**Files:**
- Modify: `app/page.js` (substituir o placeholder da Task 1 pela versão final)

**Interfaces:**
- Consumes: `obterPagina` (Task 2), `construirMetadata` (Task 4), `<LocalBusinessJsonLd />` (Task 4).

- [ ] **Step 1: Reescrever `app/page.js`**

```jsx
import { obterPagina } from "../lib/content";
import { construirMetadata } from "../lib/metadata";
import LocalBusinessJsonLd from "../components/LocalBusinessJsonLd";

export const metadata = construirMetadata({
  descricao:
    "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira de qualidade.",
  caminho: "/",
});

export default function HomePage() {
  const home = obterPagina("home");
  const contato = obterPagina("contato");
  return (
    <>
      <LocalBusinessJsonLd contato={contato} />
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">{home.titulo}</h1>
        <p className="text-xl text-neutral-600 mt-4">{home.subtitulo}</p>
        <div
          className="mt-6 prose prose-neutral mx-auto"
          dangerouslySetInnerHTML={{ __html: home.corpoHtml }}
        />
        <a
          href={`https://wa.me/${home.whatsapp}`}
          className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {home.chamada}
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verificar no navegador**

Run: `npm run dev`, abrir `http://localhost:3000`
Expected: título "Alfa Marcenaria", subtítulo "Portas, marcos, alizares e corrimões sob medida em Itabirito/MG", parágrafo de introdução, botão verde "Falar no WhatsApp" linkando pra `https://wa.me/5531999999999`.

- [ ] **Step 3: Verificar o JSON-LD no HTML gerado**

Run: `curl -s http://localhost:3000 | grep -o 'application/ld+json.\{0,120\}'`
Expected: aparece um trecho com `"@type":"HomeAndConstructionBusiness"`.

- [ ] **Step 4: Commit**

```bash
git add app/page.js
git commit -m "feat: pagina Home com conteudo dinamico e dados estruturados"
```

---

## Task 7: Páginas Sobre e Contato

**Files:**
- Create: `app/sobre/page.js`
- Create: `app/contato/page.js`

**Interfaces:**
- Consumes: `obterPagina` (Task 2), `construirMetadata` (Task 4), `<LocalBusinessJsonLd />` (Task 4).

- [ ] **Step 1: Criar `app/sobre/page.js`**

```jsx
import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";

export const metadata = construirMetadata({
  titulo: "Sobre",
  descricao: "Conheça a história da Alfa Marcenaria, em Itabirito/MG.",
  caminho: "/sobre",
});

export default function SobrePage() {
  const sobre = obterPagina("sobre");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{sobre.titulo}</h1>
      <div className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: sobre.corpoHtml }} />
    </section>
  );
}
```

- [ ] **Step 2: Criar `app/contato/page.js`**

```jsx
import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import LocalBusinessJsonLd from "../../components/LocalBusinessJsonLd";

export const metadata = construirMetadata({
  titulo: "Contato",
  descricao: "Fale com a Alfa Marcenaria por WhatsApp ou telefone. Atendimento em Itabirito/MG.",
  caminho: "/contato",
});

export default function ContatoPage() {
  const contato = obterPagina("contato");
  return (
    <>
      <LocalBusinessJsonLd contato={contato} />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">{contato.titulo}</h1>
        <dl className="space-y-2 text-neutral-700">
          <div><dt className="font-semibold inline">Telefone: </dt><dd className="inline">{contato.telefone}</dd></div>
          <div><dt className="font-semibold inline">Endereço: </dt><dd className="inline">{contato.endereco}</dd></div>
          <div><dt className="font-semibold inline">Horário: </dt><dd className="inline">{contato.horario}</dd></div>
          {contato.instagram && (
            <div><dt className="font-semibold inline">Instagram: </dt><dd className="inline">{contato.instagram}</dd></div>
          )}
        </dl>
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: contato.corpoHtml }} />
        <a
          href={`https://wa.me/${contato.whatsapp}`}
          className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Falar no WhatsApp
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verificar no navegador**

Run: `npm run dev`, abrir `http://localhost:3000/sobre` e `http://localhost:3000/contato`
Expected: `/sobre` mostra o texto de `content/paginas/sobre.md`; `/contato` mostra telefone, endereço, horário, Instagram e o botão de WhatsApp.

- [ ] **Step 4: Commit**

```bash
git add app/sobre/page.js app/contato/page.js
git commit -m "feat: paginas Sobre e Contato"
```

---

## Task 8: Páginas Serviços e Portfólio (+ componente Card)

**Files:**
- Create: `components/Card.js`
- Create: `app/servicos/page.js`
- Create: `app/portfolio/page.js`

**Interfaces:**
- Consumes: `obterColecao` (Task 2), `construirMetadata` (Task 4).
- Produces: `<Card imagem titulo categoria descricaoHtml />` — reusado pelas duas páginas.

- [ ] **Step 1: Criar `components/Card.js`**

```jsx
export default function Card({ imagem, titulo, categoria, descricaoHtml }) {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
      {imagem && <img src={imagem} alt={titulo} className="w-full h-48 object-cover" />}
      <div className="p-4">
        {categoria && (
          <span className="text-xs uppercase tracking-wide text-amber-700">{categoria}</span>
        )}
        <h3 className="text-lg font-semibold mt-1">{titulo}</h3>
        {descricaoHtml && (
          <div className="text-sm text-neutral-600 mt-2 prose prose-sm" dangerouslySetInnerHTML={{ __html: descricaoHtml }} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Criar `app/servicos/page.js`**

```jsx
import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import Card from "../../components/Card";

export const metadata = construirMetadata({
  titulo: "Serviços",
  descricao:
    "Portas, marcos, alizares, corrimões e peças sob medida em madeira, feitos pela Alfa Marcenaria em Itabirito/MG.",
  caminho: "/servicos",
});

export default function ServicosPage() {
  const servicos = obterColecao("servicos");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Nossos serviços</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {servicos.map((s) => (
          <Card key={s.slug} imagem={s.imagem} titulo={s.nome} categoria={s.categoria} descricaoHtml={s.corpoHtml} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Criar `app/portfolio/page.js`**

```jsx
import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import Card from "../../components/Card";

export const metadata = construirMetadata({
  titulo: "Portfólio",
  descricao: "Trabalhos entregues pela Alfa Marcenaria em Itabirito/MG.",
  caminho: "/portfolio",
});

export default function PortfolioPage() {
  const trabalhos = obterColecao("portfolio");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Portfólio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trabalhos.map((t) => (
          <Card key={t.slug} imagem={t.imagem} titulo={t.titulo} categoria={t.categoria} descricaoHtml={t.corpoHtml} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar no navegador**

Run: `npm run dev`, abrir `http://localhost:3000/servicos` e `http://localhost:3000/portfolio`
Expected: `/servicos` mostra 2 cards ("Marco de Porta", "Porta Almofada"); `/portfolio` mostra 1 card ("Marco e porta em Cumaru"). Como as imagens de exemplo (`/images/uploads/exemplo-*.jpg`) não existem de verdade ainda, é esperado ver um ícone de imagem quebrada no lugar da foto — isso é só falta de asset, não bug de código.

- [ ] **Step 5: Commit**

```bash
git add components/Card.js app/servicos/page.js app/portfolio/page.js
git commit -m "feat: paginas Servicos e Portfolio"
```

---

## Task 9: Blog (lista + post individual)

**Files:**
- Create: `app/blog/page.js`
- Create: `app/blog/[slug]/page.js`

**Interfaces:**
- Consumes: `obterColecao`, `obterItemColecao` (Task 2); `construirMetadata`, `siteConfig` (Task 4); `<ArticleJsonLd />` (Task 4).

- [ ] **Step 1: Criar `app/blog/page.js`**

```jsx
import Link from "next/link";
import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";

export const metadata = construirMetadata({
  titulo: "Blog",
  descricao: "Dicas e informações sobre marcenaria sob medida, madeira e acabamento — Alfa Marcenaria.",
  caminho: "/blog",
});

export default function BlogPage() {
  const posts = obterColecao("blog");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-neutral-200 pb-6">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:text-amber-700">
              {post.titulo}
            </Link>
            <p className="text-sm text-neutral-500 mt-1">
              {new Date(post.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-neutral-700 mt-2">{post.resumo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Criar `app/blog/[slug]/page.js`**

```jsx
import { notFound } from "next/navigation";
import { obterColecao, obterItemColecao } from "../../../lib/content";
import { construirMetadata, siteConfig } from "../../../lib/metadata";
import ArticleJsonLd from "../../../components/ArticleJsonLd";

export function generateStaticParams() {
  return obterColecao("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) return construirMetadata({ titulo: "Post não encontrado" });
  return construirMetadata({ titulo: post.titulo, descricao: post.resumo, caminho: `/blog/${slug}` });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) notFound();
  const url = `${siteConfig.url}/blog/${slug}`;
  return (
    <>
      <ArticleJsonLd post={post} url={url} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{post.titulo}</h1>
        <p className="text-sm text-neutral-500 mt-2">
          {new Date(post.data).toLocaleDateString("pt-BR")}
        </p>
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: post.corpoHtml }} />
      </article>
    </>
  );
}
```

- [ ] **Step 3: Verificar no navegador**

Run: `npm run dev`, abrir `http://localhost:3000/blog`
Expected: lista com 2 posts ("Cumaru ou Angelim: qual madeira escolher?" primeiro, por ser mais recente; "Quanto custa um marco de porta em madeira?" depois).

- [ ] **Step 4: Verificar a página de post individual**

Run: abrir `http://localhost:3000/blog/quanto-custa-marco-de-porta`
Expected: mostra o título, data e o corpo do post em HTML (parágrafo completo).

- [ ] **Step 5: Verificar o post inexistente retorna 404**

Run: abrir `http://localhost:3000/blog/nao-existe`
Expected: página de "não encontrado" (404) do Next.js.

- [ ] **Step 6: Rodar o build completo**

Run: `npm run build`
Expected: sucesso; a saída do build lista `/blog/quanto-custa-marco-de-porta` e `/blog/como-escolher-madeira-cumaru-ou-angelim` como páginas geradas estaticamente (por causa do `generateStaticParams`).

- [ ] **Step 7: Commit**

```bash
git add app/blog/page.js "app/blog/[slug]/page.js"
git commit -m "feat: blog (lista e post individual) com dados estruturados Article"
```

---

## Task 10: SEO técnico — sitemap.xml e robots.txt

**Files:**
- Create: `app/sitemap.js`
- Create: `app/robots.js`

**Interfaces:**
- Consumes: `obterColecao` (Task 2), `siteConfig` (Task 4).

- [ ] **Step 1: Criar `app/sitemap.js`**

```js
import { obterColecao } from "../lib/content";
import { siteConfig } from "../lib/metadata";

export default function sitemap() {
  const paginasFixas = ["", "/sobre", "/servicos", "/portfolio", "/blog", "/contato"].map((caminho) => ({
    url: siteConfig.url + caminho,
    lastModified: new Date(),
  }));
  const posts = obterColecao("blog").map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.data ? new Date(post.data) : new Date(),
  }));
  return [...paginasFixas, ...posts];
}
```

- [ ] **Step 2: Criar `app/robots.js`**

```js
import { siteConfig } from "../lib/metadata";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verificar as rotas geradas**

Run: `npm run dev`, depois `curl -s http://localhost:3000/sitemap.xml` e `curl -s http://localhost:3000/robots.txt`
Expected: `sitemap.xml` lista as 6 páginas fixas + os 2 posts do blog, todas com `https://alfamarcenaria.com.br/...`; `robots.txt` contém `Disallow: /admin` e a linha `Sitemap: https://alfamarcenaria.com.br/sitemap.xml`.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.js app/robots.js
git commit -m "feat: sitemap.xml e robots.txt gerados automaticamente"
```

---

## Task 11: Painel Decap CMS (config + teste local sem OAuth)

**Files:**
- Create: `public/admin/index.html`
- Create: `public/admin/config.yml`

**Interfaces:**
- Consumes: o schema de conteúdo definido na Task 2/3 — os nomes de campo aqui **têm que bater exatamente** com os nomes de frontmatter que `lib/content.js` e as páginas já leem (`nome`, `categoria`, `imagem`, `titulo`, `data`, `imagemCapa`, `resumo`, `body` = corpo Markdown).
- Produces: interface `/admin` funcional em modo local (via `decap-server`); a autenticação real em produção é implementada na Task 12.

- [ ] **Step 1: Criar `public/admin/index.html`**

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Painel — Alfa Marcenaria</title>
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Criar `public/admin/config.yml`**

```yaml
# local_backend: true so tem efeito quando roda `npx decap-server` em paralelo (uso local/teste).
# Em producao esse valor e ignorado e o backend "github" abaixo (com OAuth, Task 12) e usado.
local_backend: true

backend:
  name: github
  repo: SUBSTITUIR_POR_conta-da-alfa/alfa-marcenaria-site
  branch: main
  base_url: https://alfamarcenaria.com.br/api
  auth_endpoint: auth

media_folder: public/images/uploads
public_folder: /images/uploads

collections:
  - name: paginas
    label: Páginas
    files:
      - name: home
        label: Home
        file: content/paginas/home.md
        fields:
          - { label: Título, name: titulo, widget: string }
          - { label: Subtítulo, name: subtitulo, widget: string }
          - { label: "Texto do botão", name: chamada, widget: string }
          - { label: "WhatsApp (só números, com DDI+DDD)", name: whatsapp, widget: string }
          - { label: "Texto de introdução", name: body, widget: markdown }
      - name: sobre
        label: Sobre
        file: content/paginas/sobre.md
        fields:
          - { label: Título, name: titulo, widget: string }
          - { label: Texto, name: body, widget: markdown }
      - name: contato
        label: Contato
        file: content/paginas/contato.md
        fields:
          - { label: Título, name: titulo, widget: string }
          - { label: Telefone, name: telefone, widget: string }
          - { label: "WhatsApp (só números)", name: whatsapp, widget: string }
          - { label: Endereço, name: endereco, widget: string }
          - { label: "Instagram (@usuario)", name: instagram, widget: string }
          - { label: "Horário de atendimento", name: horario, widget: string }
          - { label: "Texto extra", name: body, widget: markdown, required: false }

  - name: servicos
    label: Serviços
    folder: content/servicos
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Nome, name: nome, widget: string }
      - label: Categoria
        name: categoria
        widget: select
        options: [Portas, Marcos, Alizares, Corrimãos, Outros]
      - { label: Foto, name: imagem, widget: image, required: false }
      - { label: Descrição, name: body, widget: markdown }

  - name: portfolio
    label: Portfólio
    folder: content/portfolio
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Título, name: titulo, widget: string }
      - { label: Foto, name: imagem, widget: image, required: false }
      - { label: Categoria, name: categoria, widget: string, required: false }
      - { label: Legenda, name: body, widget: markdown, required: false }

  - name: blog
    label: Blog
    folder: content/blog
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Título, name: titulo, widget: string }
      - { label: Data, name: data, widget: datetime }
      - { label: "Imagem de capa", name: imagemCapa, widget: image, required: false }
      - { label: "Resumo (aparece no Google)", name: resumo, widget: text }
      - { label: Conteúdo, name: body, widget: markdown }
```

- [ ] **Step 3: Testar o painel localmente (sem depender de OAuth real ainda)**

Run, em dois terminais:
```bash
npx decap-server
```
```bash
npm run dev
```
Abrir `http://localhost:3000/admin`.
Expected: a interface do Decap CMS carrega (sem tela de login, porque `local_backend: true` conecta direto ao `decap-server` local) e mostra as coleções "Páginas", "Serviços", "Portfólio" e "Blog".

- [ ] **Step 4: Testar uma edição de ponta a ponta**

No painel aberto: abrir a coleção "Serviços" → "+ Novo Serviços" → preencher Nome "Corrimão" e Descrição "Corrimão em madeira sob medida." → Salvar.
Expected: um novo arquivo `content/servicos/corrimao.md` aparece no disco (checar com `cat content/servicos/corrimao.md`), e recarregando `http://localhost:3000/servicos` o card "Corrimão" aparece na lista.

- [ ] **Step 5: Reverter a edição de teste**

Run: `rm content/servicos/corrimao.md` (era só teste, não faz parte do conteúdo real).

- [ ] **Step 6: Commit**

```bash
git add public/admin/index.html public/admin/config.yml
git commit -m "feat: painel Decap CMS (config das colecoes, testado localmente)"
```

---

## Task 12: OAuth do GitHub pro painel em produção

**Files:**
- Create: `app/api/auth/route.js`
- Create: `app/api/callback/route.js`

**Interfaces:**
- Consumes: variáveis de ambiente `GITHUB_OAUTH_CLIENT_ID` e `GITHUB_OAUTH_CLIENT_SECRET` (configuradas na Vercel, ver `SETUP.md` da Task 13).
- Produces: as duas rotas que o `backend.base_url`/`auth_endpoint` do `public/admin/config.yml` (Task 11) chama em produção.

> **Por que isso é necessário:** o backend `github` do Decap CMS precisa trocar um `code` OAuth por um `token` de acesso, e essa troca exige o `client_secret`, que nunca pode ficar exposto no navegador. Essas duas rotas fazem essa troca no servidor — é o mesmo padrão já usado em `api/bling-auth.js`/`api/bling-callback.js` no app de orçamentos da mesma cliente, só que aqui o protocolo de resposta é o do Decap CMS (`postMessage` pra janela que abriu o popup), não uma sessão própria.

- [ ] **Step 1: Criar `app/api/auth/route.js`**

```js
// Passo 1 do OAuth: redireciona o navegador pra tela de autorizacao do GitHub.
export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const params = new URLSearchParams({ client_id: clientId, scope: "repo,user" });
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return Response.redirect(url, 302);
}
```

- [ ] **Step 2: Criar `app/api/callback/route.js`**

```js
// Passo 2 do OAuth: troca o "code" que o GitHub devolveu por um access_token,
// e manda esse token pra janela que abriu o popup do Decap CMS (window.opener),
// no formato de mensagem que o Decap CMS espera receber.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const resposta = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const dados = await resposta.json();

  if (!dados.access_token) {
    const mensagemErro = JSON.stringify({ error: dados.error_description || "falha ao obter token" });
    return new Response(paginaDeRetorno("error", mensagemErro), { headers: { "Content-Type": "text/html" } });
  }

  const payload = JSON.stringify({ token: dados.access_token, provider: "github" });
  return new Response(paginaDeRetorno("success", payload), { headers: { "Content-Type": "text/html" } });
}

function paginaDeRetorno(status, payloadJson) {
  return `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:' + '${payloadJson.replace(/'/g, "\\'")}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;
}
```

- [ ] **Step 3: Rodar o build pra confirmar que as rotas compilam**

Run: `npm run build`
Expected: sucesso; a saída do build lista `/api/auth` e `/api/callback` como rotas de função (não como página estática, já que são Route Handlers).

- [ ] **Step 4: Registrar que o teste completo de ponta a ponta é manual e depende de contas reais**

Este teste **não pode ser automatizado** aqui porque depende de um GitHub OAuth App real (client ID/secret) e do domínio publicado. O procedimento exato de configurar isso está documentado na Task 13 (`SETUP.md`), passo "Testar o login do painel em produção".

- [ ] **Step 5: Commit**

```bash
git add app/api/auth/route.js app/api/callback/route.js
git commit -m "feat: rotas de OAuth do GitHub para autenticacao do painel Decap CMS"
```

---

## Task 13: `SETUP.md` (contas, domínio, deploy) + checagem final

**Files:**
- Create: `SETUP.md`

**Interfaces:**
- Consumes: nada (documento operacional, não código).

- [ ] **Step 1: Criar `SETUP.md`**

```markdown
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
```

- [ ] **Step 2: Rodar a checagem final de build no projeto local**

Run: `npm run build`
Expected: sucesso, sem erros nem warnings de rota.

- [ ] **Step 3: Rodar todos os testes automatizados do projeto**

Run: `npm test`
Expected: `TODOS OS TESTES PASSARAM ✔` (testes de `lib/content.js`).

- [ ] **Step 4: Commit**

```bash
git add SETUP.md
git commit -m "docs: guia de setup de contas, dominio e deploy"
```

---

## Depois do plano

Este plano entrega o site funcionando localmente (`npm run dev`) com conteúdo de exemplo, painel `/admin` testável localmente via `decap-server`, e as rotas de OAuth prontas para produção. **A ativação em produção depende de passos manuais fora do código** (criar as contas da Alfa, registrar o domínio, criar o GitHub OAuth App) — todos documentados em `SETUP.md` (Task 13). Depois desses passos, o primeiro `git push` pro repositório da Alfa + a configuração do projeto na Vercel colocam o site no ar.
