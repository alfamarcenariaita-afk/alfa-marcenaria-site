// Passo 1 do OAuth: redireciona o navegador pra tela de autorizacao do GitHub.
export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const params = new URLSearchParams({ client_id: clientId, scope: "repo,user" });
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return Response.redirect(url, 302);
}
