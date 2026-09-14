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
