# CLAUDE.md — Sistema iscrizione e accessi palestra
## Steel Elite

Questo file descrive il progetto per Claude Code. Leggilo tutto prima di scrivere codice.

## Obiettivo

Web app (PWA) per una palestra che permette di:

1. **Iscriversi e pagare online** in autonomia (da un QR stampato su una locandina).
2. **Firmare il contratto online** e caricare il certificato medico.
3. Avere nell'app una **tessera con QR dinamico** (cambia ogni 30 secondi, gli screenshot non funzionano).
4. Far fare allo **staff il check-in inquadrando il QR con il proprio telefono** (nessun hardware dedicato).
5. Gestire tutto da un **pannello admin**.

Niente tornello, niente porta automatica: il controllo avviene in reception da parte dello staff. L'architettura deve però permettere in futuro di aggiungere un varco automatico (stessa API di verifica).

## Stack

- **Frontend**: Angular (ultima versione stabile), standalone components, signals, routing lazy, `@angular/pwa`.
- **UI**: SCSS con design token (variabili CSS), mobile-first. Niente librerie UI pesanti se non necessarie.
- **Backend**: Supabase (Auth, Postgres con RLS, Storage, Edge Functions in Deno/TypeScript).
- **Pagamenti**: Stripe Checkout + webhook.
- **Email (OTP contratto, notifiche)**: Resend (o SMTP configurabile).
- **QR**: generazione con `qrcode`, scansione da fotocamera con `@zxing/browser`.
- **PDF contratto**: `pdf-lib` dentro una Edge Function.
- **Hosting**: Netlify.

## Regole di lavoro per Claude Code

- Lavora **una fase alla volta** (vedi "Fasi"). A fine fase riassumi cosa hai fatto e cosa va testato a mano.
- **Chiedi conferma prima di modificare lo schema del database** già creato.
- Ogni modifica al DB va in una migrazione in `supabase/migrations/`, mai modifiche manuali.
- Codice, nomi di variabili e commenti in **inglese**. Testi dell'interfaccia in **italiano**, centralizzati in un file di traduzioni.
- **Mai committare segreti.** Usa `.env` / variabili Netlify / secrets Supabase. Fornisci sempre un `.env.example`.
- La service role key di Supabase e le chiavi Stripe segrete **solo nelle Edge Functions**, mai nel frontend.
- Ogni tabella ha **RLS attiva** con policy esplicite.
- Scrivi test per la logica critica: generazione/verifica token, webhook Stripe, regole di check-in.

## Ruoli

- `member`: cliente. Vede solo i propri dati, la propria tessera e i propri ingressi.
- `staff`: può fare check-in e vedere i dati essenziali dei clienti (nome, foto, stato abbonamento, stato certificato). Non vede il file del certificato medico né i dati di pagamento.
- `admin`: accesso completo, gestione piani, staff, approvazione certificati.

Il ruolo sta in `profiles.role` e va letto nelle policy RLS con una funzione security definer (es. `public.current_role()`), evitando ricorsioni sulle policy.

## Modello dati (proposta iniziale)

- **profiles**: `id` (= auth.users.id), `role`, `first_name`, `last_name`, `fiscal_code`, `birth_date`, `phone`, `address`, `photo_path`, `created_at`.
- **plans**: `id`, `name`, `description`, `category` (`open`|`pt_privato`|`pt_small_group`), `price_cents`, `duration_days` (nullable, per piani a consumo), `session_count` (nullable, per pacchetti a lezioni es. "10 lezioni"), `is_recurring`, `stripe_price_id`, `active`, `sort_order`.
- **subscriptions**: `id`, `member_id`, `plan_id`, `status` (`pending`|`active`|`expired`|`cancelled`), `start_date`, `end_date`, `stripe_checkout_session_id`, `stripe_subscription_id`, `created_at`.
- **contracts**: `id`, `member_id`, `subscription_id`, `template_version`, `pdf_path`, `pdf_sha256`, `otp_verified_at`, `accepted_at`, `ip`, `user_agent`.
- **contract_otps**: `id`, `member_id`, `code_hash`, `expires_at`, `attempts`, `used_at`.
- **medical_certificates**: `id`, `member_id`, `file_path`, `expiry_date`, `status` (`pending`|`approved`|`rejected`), `reviewed_by`, `reviewed_at`, `notes`.
- **access_logs**: `id`, `member_id`, `staff_id`, `scanned_at`, `result` (`granted`|`denied`), `reason`, `token_jti` (unique).
- **settings** (riga singola): `gym_name`, `anti_passback_minutes` (default 120), `require_approved_certificate` (bool), `certificate_grace_days` (default 10, aggiunto in un secondo momento), `registration_fee_cents`, `whatsapp_support`.

## Storage

- Bucket **privato** `photos` (foto profilo clienti).
- Bucket **privato** `certificates` (certificati medici: dati sanitari, GDPR art. 9). Accesso solo admin, sempre tramite signed URL a breve scadenza.
- Bucket **privato** `contracts` (PDF firmati).

## Flusso di iscrizione (cliente)

Route pubblica `/iscriviti`, raggiungibile dal QR della locandina.

1. **Scelta abbonamento** tra i `plans` attivi.
2. **Account**: email + password (o magic link).
3. **Dati anagrafici + foto** (input file senza l'attributo `capture`, così su mobile il sistema operativo propone la scelta tra fotocamera e galleria, non forza la fotocamera). La foto è obbligatoria: serve allo staff al check-in. Se l'admin la rimuove per errore (vedi "Pannello admin" → Clienti), il member la vede sparire dalla tessera con un promemoria e può ricaricarla tornando su questo stesso step (da autenticato torna alla tessera invece che al certificato, dato che l'iscrizione è già completa).
4. **Certificato medico**: upload PDF/immagine + data di scadenza. **Facoltativo a questo punto** (pulsante "salta per ora"): il member ha `settings.certificate_grace_days` giorni (default 10) dalla registrazione (`profiles.created_at`) per caricarlo — vedi "Tessera con QR dinamico" per cosa succede alla scadenza. Chi lo salta può caricarlo più tardi dalla tessera o tornando su questo stesso step.
5. **Contratto**: anteprima del testo (template versionato, testo fornito dal proprietario, placeholder per ora), checkbox di accettazione di contratto, regolamento e informativa privacy, poi **codice OTP a 6 cifre via email**. Alla conferma una Edge Function genera il PDF, ne calcola lo SHA-256 e salva il record in `contracts` con IP e user agent.
6. **Pagamento**: Stripe Checkout. Al ritorno l'utente vede "pagamento in verifica" finché il webhook non attiva l'abbonamento.
7. **Tessera**: redirect a `/tessera` con il QR.

Il flusso deve essere riprendibile: se l'utente esce a metà, al login riparte dallo step mancante.

## Tessera con QR dinamico (cliente)

Route `/tessera`, pensata per essere aperta dalla schermata home (PWA installabile).

- Mostra foto, nome, piano, scadenza e un QR che si rigenera ogni 30 secondi, con una barra di avanzamento visibile.
- Il QR contiene un **token firmato emesso dal server**: la Edge Function `issue-access-token` (utente autenticato) restituisce un JWT HS256 con `sub` (member_id), `jti` (uuid casuale), `iat`, `exp` = +45 secondi. Il segreto di firma sta solo nei secrets delle Edge Functions.
- Il token viene emesso solo se l'abbonamento è attivo; altrimenti la tessera mostra lo stato (scaduto, in attesa di pagamento, certificato mancante) e un pulsante per rinnovare.
- **Certificato medico mancante**: non blocca subito. Entro `settings.certificate_grace_days` giorni dalla registrazione la tessera mostra comunque il QR, con un promemoria non bloccante e la data limite. Superata la scadenza senza certificato caricato, la tessera si blocca con l'invito a caricarlo (stesso comportamento applicato server-side in `verify-checkin`, non solo lato client). Un certificato caricato ma non ancora approvato (se `require_approved_certificate` è attivo) blocca sempre, indipendentemente dalla tolleranza.
- Suggerisci all'utente di alzare la luminosità dello schermo (messaggio discreto).
- Se non c'è connessione: messaggio chiaro, niente QR finto.

## Check-in da telefono (staff)

Route `/staff/check-in`, protetta (ruolo `staff` o `admin`).

- Apre la fotocamera posteriore con `@zxing/browser`. Attenzione a iOS Safari: serve HTTPS, avvio dopo un gesto dell'utente e `playsinline` sul video. Aggiungi un pulsante torcia se supportato.
- Alla lettura chiama la Edge Function `verify-checkin` passando il token.
- `verify-checkin` controlla, in quest'ordine:
  1. firma e scadenza del JWT;
  2. `jti` mai usato prima (vincolo unique su `access_logs.token_jti`);
  3. abbonamento attivo e non scaduto;
  4. certificato medico valido: presente e non scaduto (o, se ancora mancante, entro la finestra di tolleranza `certificate_grace_days` dalla registrazione) e, se `require_approved_certificate`, approvato;
  5. anti-passback: nessun ingresso `granted` negli ultimi `anti_passback_minutes`.
- Registra **sempre** un record in `access_logs`, anche quando nega l'accesso, con il motivo.
- Risponde con: esito, nome, signed URL della foto (breve scadenza), piano, data di scadenza, stato del certificato, motivo del rifiuto.
- UI: schermata a tutto schermo verde (accesso consentito) o rossa (negato) con foto grande, così lo staff confronta il volto; tap sulla foto per ingrandirla ulteriormente a schermo intero (mette in pausa il ritorno automatico di 3 secondi finché non si richiude). Suono diverso per verde e rosso, vibrazione dove supportata. Dopo 3 secondi torna automaticamente alla scansione. Pulsante "Scansiona di nuovo" subito disponibile.
- **Check-in manuale** di riserva: ricerca cliente per nome e conferma ingresso (loggato con `reason = 'manual'`).

`verify-checkin` è l'unico punto di verifica: in futuro un varco automatico chiamerà la stessa funzione.

## Pagamenti (Stripe)

- Edge Function `create-checkout-session`: crea la sessione per il piano scelto, con `client_reference_id = member_id` e metadata con `subscription_id`.
- Edge Function `stripe-webhook`: verifica la firma, gestisce in modo **idempotente**:
  - `checkout.session.completed` → abbonamento `active`, calcola `start_date`/`end_date`;
  - `invoice.paid` (piani ricorrenti) → estende `end_date`;
  - `customer.subscription.deleted` → `cancelled`.
- Un job pianificato (cron Supabase) imposta `expired` sugli abbonamenti scaduti ogni notte.
- L'account Stripe è intestato al proprietario della palestra: nel codice solo variabili d'ambiente.

## Pannello admin

Route `/admin`, ruolo `admin`.

- **Dashboard**: ingressi di oggi, clienti attivi, abbonamenti in scadenza nei prossimi 7 giorni, certificati in scadenza e da approvare.
- **Clienti**: lista con ricerca e filtri, scheda con dati, foto (tap per ingrandire a schermo intero, utile per verificare l'identità), abbonamenti, contratti (download PDF), certificato (visualizzazione tramite signed URL), storico ingressi. L'admin può rimuovere la foto (es. caricata per errore in fase di iscrizione): il member se ne accorge dalla tessera e la ricarica da `/iscriviti/profilo`.
- **Certificati**: coda di approvazione (approva / rifiuta con nota).
- **Piani**: CRUD, collegamento a `stripe_price_id`, attiva/disattiva.
- **Ingressi**: log filtrabile per data ed esito, esportazione CSV.
- **Staff**: invito di nuovi account staff, disattivazione (es. telefono perso).
- **QR Locandina** (`/admin/qr-locandina`): QR statico verso `/iscriviti` (usa `window.location.origin`, punta sempre al dominio giusto), in stile locandina col brand, da scaricare in PNG o stampare per appendere in palestra.
- **Impostazioni**: tabella `settings`.

## Privacy e sicurezza

- Certificati medici e foto: solo bucket privati, signed URL, nessun URL pubblico.
- Lo staff non accede ai file dei certificati, vede solo lo stato.
- Informativa privacy e consensi salvati con versione e data.
- Rate limit su OTP (max 5 tentativi, scadenza 10 minuti) e su `issue-access-token`.
- Nessun dato sensibile nei log delle Edge Functions.

## Struttura cartelle (indicativa)

```
/src/app
  /core          (auth, guard per ruolo, servizi Supabase, i18n)
  /features
    /signup      (flusso iscrizione a step)
    /card        (tessera con QR)
    /staff       (check-in)
    /admin       (pannello)
  /shared        (componenti UI, pipe, modelli)
/supabase
  /migrations
  /functions
    issue-access-token
    verify-checkin
    create-checkout-session
    stripe-webhook
    contract-otp
    generate-contract
```

## Fasi

Ogni fase si chiude solo quando i criteri di accettazione sono soddisfatti. **Tutte e 7 completate** (un commit git per fase).

1. ✅ **Setup e DB**: progetto Angular + PWA, Supabase collegato, migrazioni di tutte le tabelle con RLS, ruoli, seed con 2–3 piani di esempio.
   *Accettazione*: login funzionante; un `member` non può leggere i dati di un altro.
2. ✅ **Iscrizione e pagamento**: step 1–3 e 6 del flusso, Stripe in modalità test, webhook.
   *Accettazione*: pagamento test → abbonamento `active` con date corrette; webhook ripetuto non crea duplicati.
3. ✅ **Contratto e certificato**: upload certificato, OTP email, generazione PDF con hash.
   *Accettazione*: PDF scaricabile dall'admin, hash salvato, OTP errato 5 volte blocca.
4. ✅ **Tessera QR**: `issue-access-token` e `/tessera` con rigenerazione ogni 30 secondi.
   *Accettazione*: token scaduto dopo 45 secondi; niente QR se l'abbonamento non è attivo.
5. ✅ **Check-in staff**: scanner, `verify-checkin`, schermate verde/rossa, check-in manuale.
   *Accettazione*: screenshot di un QR vecchio → rosso; stesso QR scansionato due volte → rosso; abbonamento scaduto → rosso con motivo; funziona su iPhone (Safari) e Android (Chrome). *(scanner verificato via build/codice; il test fisico su iPhone/Android richiede un deploy HTTPS reale, non ancora fatto)*.
6. ✅ **Pannello admin**: tutte le sezioni sopra.
7. ✅ **Rifinitura**: design con i colori del brand, icone PWA, pagina `/iscriviti` ottimizzata per chi arriva dalla locandina, deploy su Netlify. *(configurazione di deploy pronta in `netlify.toml`; il deploy reale richiede un account Netlify e un progetto Supabase, non ancora collegati)*.

## Aggiornamenti dopo la Fase 7 (su richiesta del proprietario)

Il sistema è in produzione concettualmente completo, ma non ancora collegato a un Supabase/Stripe reali (vedi "Da ricevere dal proprietario"). Nel frattempo sono state aggiunte queste cose:

- **Modalità demo** (`environment.demo.ts`, `mock: true`, `npm run start:demo`): per testare il giro completo in locale e mostrarlo al cliente senza credenziali reali. `AuthService`, `PlansService` e ogni componente che normalmente chiama Supabase/Edge Function deleghino invece a `core/mock/mock-backend.service.ts`, un backend finto in memoria + `localStorage`. Riusa la stessa logica di business pura già testata nelle Edge Function (copiata in `core/mock/logic/`, va tenuta allineata a mano se le regole cambiano). Tre account pre-creati: admin, staff e un **cliente demo con abbonamento già attivo e certificato approvato** (per vedere subito tessera/QR senza rifare l'iscrizione). Vedi il README per le credenziali. `environment.mock` è sempre `false` fuori da questa configurazione. In modalità demo, sotto il QR della tessera compare anche il **token JWT in chiaro** (formato standard a 3 segmenti, incollabile su jwt.io per controllare i dati) — solo per debug, mai presente fuori da `environment.mock`.
- **QR statico per la locandina** (`/admin/qr-locandina`, vedi "Pannello admin"): il proprietario vuole poter stampare un QR fisso da appendere in palestra, oltre al QR dinamico della tessera.
- **Certificato medico reso facoltativo** con tolleranza di `certificate_grace_days` giorni (vedi "Flusso di iscrizione" e "Tessera con QR dinamico"): decisione del proprietario per non bloccare l'iscrizione di chi non ha ancora il certificato pronto.
- **Foto profilo**: scelta camera/galleria su mobile invece di forzare la fotocamera, tap per ingrandire nel check-in staff e nella scheda cliente admin (identificazione), possibilità per l'admin di rimuoverla e per il member di ricaricarla (vedi "Flusso di iscrizione" e "Pannello admin").

## Da ricevere dal proprietario (placeholder finché mancano)

- ~~Nome palestra, logo, colori~~ → **noti**: Steel Elite, Racale (LE), Via Udine 10. Logo in `assets/logo.jpg` (da copiare da `palestra-steel-elite/img/logo.jpg`). Palette: oro `#C9A227`/`#F4D374`, argento `#F2F2F2`/`#A8A8A8`, nero `#050505`, font Bricolage Grotesque + Inter (vedi progetto `palestra-steel-elite` per il sistema visivo completo).
- Listino abbonamenti → **noto e confermato**, da `Giusepptariffe-2026-27.pdf`. Tutti i piani sono self-service (acquistabili online come `plans`, stesso schema, nessuna prenotazione manuale richiesta):
  - Palestra Open: Mensile €70, Trimestrale €190, Semestrale €350
  - Personal Training Privato: Lezione singola €30, Pacchetto 10 lezioni €250
  - Personal Training Small Group (3–5 persone): Mensile €170, Trimestrale €470, Semestrale €870
  - Iscrizione + assicurazione annuale: €30 (una tantum) → **risolto in Fase 2**: `settings.registration_fee_cents`, addebitata automaticamente solo al primo acquisto di ogni member, come line item separato nella sessione Stripe.
  - Nota: "Pacchetto 10 lezioni" non è una durata a giorni ma un pacchetto a consumo — risolto con `session_count` (nullable) su `plans`, oltre a `duration_days`.
- Testo di contratto, regolamento e informativa privacy (revisionati da un consulente) — ancora mancante, placeholder in uso (`template_version: 'v1-placeholder'`).
- Regole sul certificato medico → **parzialmente risolto**: facoltativo con tolleranza di `certificate_grace_days` giorni (vedi "Aggiornamenti dopo la Fase 7"). Restano da avere eventuali requisiti specifici sul tipo di certificato richiesto (agonistico/non agonistico), non ancora forniti.
- Chiavi Stripe (account intestato alla palestra) — ancora mancante, necessaria per collegare i pagamenti reali.
- Numero WhatsApp assistenza — ancora mancante.
- Eventuale Excel degli iscritti attuali da importare — ancora mancante.
