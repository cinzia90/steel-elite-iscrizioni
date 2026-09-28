# Steel Elite — Iscrizioni e accessi

PWA per iscrizione online, tessera con QR dinamico e check-in in palestra. Vedi [CLAUDE.md](./CLAUDE.md) per la specifica completa e lo stato di avanzamento per fase.

## Setup di un ambiente reale

1. **Crea un progetto Supabase** su [supabase.com](https://supabase.com).
2. Applica le migrazioni in `supabase/migrations/` (in ordine) tramite Supabase CLI (`supabase db push`) o incollandole nel SQL Editor della dashboard.
3. Imposta i secrets delle Edge Functions (`supabase secrets set NOME=valore`, oppure dalla dashboard):
   - `ACCESS_TOKEN_JWT_SECRET` — stringa lunga e casuale
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`, `EMAIL_FROM`
   - `APP_URL` — URL pubblico dell'app (es. `https://iscrizioni.steelelite.it`)
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` sono già disponibili automaticamente in ogni Edge Function.
4. Deploya le Edge Function: `supabase functions deploy <nome>` per ognuna delle cartelle in `supabase/functions/` (escluso `_shared`).
5. Configura un webhook Stripe verso `https://<project-ref>.supabase.co/functions/v1/stripe-webhook` per gli eventi `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`.

## Sviluppo locale del frontend

```bash
cd app
npm install
npm start
```

Inserisci le chiavi reali (URL e anon key del progetto Supabase) in `app/src/environments/environment.ts` per collegare l'app al backend durante lo sviluppo. Non committare mai chiavi reali: quel file resta con valori segnaposto nel repository.

## Deploy su Netlify

Il repository include `netlify.toml`, già configurato con `base = app`, comando di build `npm run build:netlify` e pubblicazione di `dist/app/browser`.

1. Collega il repository a un nuovo sito Netlify.
2. Imposta le variabili d'ambiente del sito (Site settings → Environment variables):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Ogni build esegue `scripts/set-env.js`, che genera `environment.prod.ts` con questi valori — non serve commitarli.

## Test

```bash
# Test della logica critica nelle Edge Function (Deno)
cd supabase/functions/_shared
deno test

# Build di verifica del frontend
cd app
npm run build
```
