// Passo 2 do OAuth: troca o "code" que o GitHub devolveu por um access_token,
// e manda esse token pra janela que abriu o popup do Decap CMS (window.opener),
// no formato de mensagem que o Decap CMS espera receber.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const stateCookie = request.cookies.get("oauth_state")?.value;

  // Protecao contra login-CSRF (RFC 6749 SS10.12): o "state" que voltou do GitHub tem que bater
  // com o que foi gerado e guardado em cookie no passo 1 (/api/auth). Sem isso, um atacante
  // poderia induzir a vitima a completar um login OAuth iniciado por ele.
  if (!state || !stateCookie || state !== stateCookie) {
    const mensagemErro = JSON.stringify({ error: "falha na validacao do state OAuth" });
    return new Response(paginaDeRetorno("error", mensagemErro), { headers: { "Content-Type": "text/html" } });
  }

  let dados;
  try {
    const resposta = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    });
    dados = await resposta.json();
  } catch (erro) {
    const mensagemErro = JSON.stringify({ error: "falha ao conectar com o GitHub" });
    return new Response(paginaDeRetorno("error", mensagemErro), { headers: { "Content-Type": "text/html" } });
  }

  if (!dados.access_token) {
    const mensagemErro = JSON.stringify({ error: dados.error_description || "falha ao obter token" });
    return new Response(paginaDeRetorno("error", mensagemErro), { headers: { "Content-Type": "text/html" } });
  }

  const payload = JSON.stringify({ token: dados.access_token, provider: "github" });
  return new Response(paginaDeRetorno("success", payload), { headers: { "Content-Type": "text/html" } });
}

function paginaDeRetorno(status, payloadJson) {
  // Escapa aspas simples (delimitador da string no script inline) e "<" (JSON.stringify nao
  // escapa "<", entao um valor com "</script>" poderia fechar a tag prematuramente).
  const payloadEscapado = payloadJson.replace(/'/g, "\\'").replace(/</g, "\\u003c");
  return `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:' + '${payloadEscapado}',
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
