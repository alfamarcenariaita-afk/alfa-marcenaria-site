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

igual(
  "obterColecao: pasta inexistente retorna array vazio (nao lanca ENOENT)",
  obterColecao("portfolio", baseDir),
  []
);

// ---------- obterItemColecao ----------
const item = obterItemColecao("blog", "post-antigo", baseDir);
igual("obterItemColecao: acha item existente", item.titulo, "Post antigo");
igual("obterItemColecao: item inexistente retorna null", obterItemColecao("blog", "nao-existe", baseDir), null);

fs.rmSync(baseDir, { recursive: true, force: true });

console.log(falhas === 0 ? "\nTODOS OS TESTES PASSARAM ✔" : `\n${falhas} TESTE(S) FALHARAM`);
process.exit(falhas === 0 ? 0 : 1);
