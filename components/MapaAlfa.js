import { urlAbrirMapa, urlEmbedMapa } from "../lib/mapas";

// Mapa do Google (embed sem chave de API) com a logo da Alfa como "plaquinha" no lugar do pin.
// O Google nao deixa trocar o icone do pin no embed, mas o local buscado fica sempre no CENTRO
// do mapa, entao a plaquinha e posicionada com a ponta exatamente no centro (bottom: 50%) e e
// maior que o pin vermelho, cobrindo-o. `pointer-events-none` deixa o mapa arrastavel por baixo.
export default function MapaAlfa({ busca, logo = "/logo.png", nome = "Alfa Marcenaria", className = "" }) {
  if (!busca) return null;
  return (
    <div className={`relative overflow-hidden rounded-xl border border-wood-200 bg-wood-100 ${className}`}>
      <iframe
        title={`Mapa: ${nome}`}
        src={urlEmbedMapa(busca)}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div
        className="absolute left-1/2 bottom-[calc(50%-3px)] -translate-x-1/2 pointer-events-none flex flex-col items-center"
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          width={56}
          height={57}
          className="w-14 h-auto rounded-lg border-[3px] border-white shadow-lg bg-black"
        />
        {/* ponta da plaquinha apontando pro local */}
        <span
          className="block w-0 h-0 -mt-px border-x-[7px] border-x-transparent border-t-[9px] border-t-white drop-shadow"
        />
      </div>
      <a
        href={urlAbrirMapa(busca)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 bg-white/95 text-wood-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow hover:bg-white"
      >
        Abrir no Google Maps
      </a>
    </div>
  );
}
