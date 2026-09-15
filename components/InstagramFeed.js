// components/InstagramFeed.js — busca os ultimos posts do Instagram direto na API oficial
// da Meta (graph.instagram.com), sem banco de dados: o fetch do Next.js ja cacheia por 1h
// (next.revalidate), igual ao padrao ja usado no site do Atacado Optico (skill a-instagram-feed),
// so que aqui sem tabela/edge function porque esse site nao tem banco.
// Se INSTAGRAM_ACCESS_TOKEN nao existir ou a API falhar, a secao simplesmente nao aparece
// (nunca quebra a pagina por causa do Instagram estar fora do ar).

// pega alguns a mais que o necessario porque Reels/video as vezes vem sem thumbnail_url
// (a API devolve o post, so nao devolve imagem pra mostrar) — filtra esses fora em vez de
// deixar um quadrado preto/quebrado no meio da grade.
async function buscarPosts() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];
  try {
    const resposta = await fetch(
      `https://graph.instagram.com/v23.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!resposta.ok) return [];
    const dados = await resposta.json();
    const posts = dados.data || [];
    return posts
      .map((post) => ({
        ...post,
        imagemExibida: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
      }))
      .filter((post) => Boolean(post.imagemExibida))
      .slice(0, 6);
  } catch (e) {
    return [];
  }
}

export default async function InstagramFeed() {
  const posts = await buscarPosts();
  if (posts.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="font-serif text-2xl font-bold mb-6 text-center text-wood-900">
        Direto do Instagram
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden border border-wood-100 hover:opacity-90 transition-opacity"
          >
            <img
              src={post.imagemExibida}
              alt={post.caption ? post.caption.slice(0, 80) : "Post do Instagram da Alfa Marcenaria"}
              className="w-full aspect-square object-cover"
            />
          </a>
        ))}
      </div>
      <div className="text-center mt-6">
        <a
          href="https://instagram.com/alfamarcenaria_ita"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-700 font-semibold hover:underline"
        >
          Ver mais no Instagram →
        </a>
      </div>
    </section>
  );
}
