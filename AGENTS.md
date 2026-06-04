# AGENTS.md

## Progetto

Questo progetto e' la prima versione statica della UI responsive per **Rodeo Drive di Vito Attimonelli**.

Obiettivo futuro: trasformare questa UI in un e-commerce in produzione.

Repository GitHub:

```text
https://github.com/antoniosantovito94/rodeo-drive-ui
```

Deploy Vercel:

```text
Il progetto e' stato importato su Vercel dalla repository GitHub.
Framework preset: Other
Root directory: ./
Build command: vuoto
Output directory: vuoto
Install command: vuoto
Environment variables: nessuna
```

## Stack attuale

Il progetto e' statico:

- `index.html`: struttura della pagina
- `styles.css`: stile responsive e animazioni
- `assets/`: immagini prodotto e loghi
- `design_web_app/`: mock-up e riferimenti visuali originali

Non ci sono ancora:

- package manager
- build step
- backend
- database
- CMS
- carrello reale
- checkout
- autenticazione utenti

## Cosa e' stato fatto

### UI responsive

E' stata costruita una homepage responsive ispirata ai mock-up in `design_web_app`.

Stile principale:

- Bauhaus / neo-brutalist
- palette carta, nero, giallo, blu, rosso
- bordi spessi
- ombre offset nere
- pattern giallo puntinato
- typography con `Space Grotesk` e `Inter`

### Hero mobile

La hero mobile usa:

- background giallo puntinato
- card centrale con bordo nero e shadow offset
- logo ufficiale in `assets/rodeo-drive-official.jpg`
- CTA blu

### Navbar mobile

La navbar mobile contiene:

- hamburger menu a sinistra
- wishlist e carrello a destra con Material Symbols
- drawer menu che entra animato dal basso

Il drawer e' gestito da JavaScript inline in fondo a `index.html`.

### Trust bar

La sezione servizi usa icone Material Symbols:

- `local_shipping`: Spedizione Rapida
- `lock`: Pagamento sicuro
- `currency_exchange`: Reso semplice

Le icone sono blu.

### Sezione storia

La sezione:

```text
6 mercati, una passione, ora anche online.
```

e' stata spostata prima di:

```text
Dove ci trovi ogni settimana
```

Su mobile usa lo stesso background giallo puntinato della hero.

### Prodotti

La sezione prodotti usa asset locali:

- `assets/vestito_lungo.png`
- `assets/vestito_fiore.png`
- `assets/corpetto.png`

Su mobile sono visibili inizialmente i primi prodotti.
Il bottone `Carica altri` mostra gli altri prodotti senza riportare lo scroll all'inizio.

### Footer mobile

Il footer mobile e' stato adattato al mock-up desiderato:

- card Rodeo Drive compatta
- blocco `Informazioni`
- link verticali
- linea gialla sopra il copyright

Link footer attuali:

- Privacy Policy
- Termini e Condizioni
- Spedizioni
- Resi
- Contatti

## Git e deploy

La repository locale e' stata inizializzata con Git.

Branch principale:

```text
main
```

Remote:

```text
origin https://github.com/antoniosantovito94/rodeo-drive-ui.git
```

Primo commit:

```text
Initial Rodeo Drive UI
```

Push eseguito:

```bash
git push -u origin main
```

Vercel e' collegato alla repository GitHub.
Ogni nuovo push su `main` aggiorna automaticamente il deploy.

## Come lavorare in futuro

Prima di modificare:

```bash
git status
```

Dopo ogni modifica importante:

```bash
git add .
git commit -m "Descrizione modifica"
git push
```

Vercel fara' il redeploy automatico.

## Note per trasformarlo in e-commerce production-ready

Questa versione e' solo una UI statica. Per arrivare a un e-commerce reale servono almeno:

- catalogo prodotti gestito da dati reali
- schede prodotto
- varianti taglie/colori
- disponibilita' stock
- carrello persistente
- checkout
- pagamenti, ad esempio Stripe
- gestione ordini
- email transazionali
- pagine legali complete
- privacy/cookie policy
- resi e spedizioni reali
- SEO tecnico
- analytics
- performance image optimization
- pannello admin o CMS

Possibili step tecnici futuri:

- migrare a Next.js
- usare Supabase o altro database per prodotti/ordini
- usare Stripe Checkout
- usare Vercel per deploy production
- aggiungere dominio custom
- aggiungere pipeline di test e preview deploy

## Regole di manutenzione

- Non eliminare `design_web_app/`: contiene i riferimenti visuali.
- Non sostituire asset senza aggiornare i riferimenti in `index.html`.
- Mantenere il layout mobile come priorita', perche' e' il flusso piu' usato.
- Prima di fare push, verificare sempre la pagina in mobile e desktop.
- Evitare refactor grandi finche' il progetto resta statico.
- Quando il progetto diventa e-commerce, separare dati prodotto, componenti UI e logica carrello.
