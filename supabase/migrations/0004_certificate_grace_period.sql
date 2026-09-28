-- ============================================================
-- Steel Elite — Certificato medico facoltativo con tolleranza
-- Il certificato non è più obbligatorio in fase di iscrizione:
-- il member ha certificate_grace_days giorni dalla registrazione
-- (profiles.created_at) per caricarlo prima che l'accesso venga negato.
-- ============================================================

alter table public.settings
  add column certificate_grace_days integer not null default 10;
