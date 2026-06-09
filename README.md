# Rodeo Drive UI

Homepage responsive costruita dai mock-up in `design_web_app`.

## Avvio

Installa le dipendenze e avvia il server locale:

```bash
npm install
npm run dev
```

La pagina usa ora:

- `app/` per pagine e routing Next.js
- `styles.css` per layout responsive e stile Bauhaus
- `assets/` per le immagini prodotto locali

## Build

```bash
npm run build
```

## Supabase

Il catalogo usa un fallback locale finche' non sono configurate le variabili:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Lo schema iniziale si trova in `supabase/schema.sql`.
I dati demo iniziali si trovano in `supabase/seed.sql`.
