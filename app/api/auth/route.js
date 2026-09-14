import { randomUUID } from "crypto";

// Passo 1 do OAuth: redireciona o navegador pra tela de autorizacao do GitHub.
// Gera um "state" aleatorio (protecao contra login-CSRF, RFC 6749 SS10.12): vai tanto na URL de
// autorizacao quanto num cookie HttpOnly de curta duracao, pra o callback (/api/callback)
// conferir que a resposta do GitHub corresponde ao pedido que este passo fez.
export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const state = randomUUID();
  const params = new URLSearchParams({ client_id: clientId, scope: "repo,user", state });
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Set-Cookie": `oauth_state=${state}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax`,
    },
  });
}
