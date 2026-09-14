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
  // Git nao versiona pasta vazia: se o ultimo item de uma colecao for apagado pelo painel
  // /admin, a pasta some do repo e o proximo build quebraria com ENOENT sem isso.
  if (!fs.existsSync(pastaColecao)) return [];
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
