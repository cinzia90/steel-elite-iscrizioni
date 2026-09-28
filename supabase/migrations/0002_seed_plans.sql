-- ============================================================
-- Steel Elite — Seed piani reali (da Giusepptariffe-2026-27.pdf)
-- ============================================================

insert into public.plans (name, description, category, price_cents, duration_days, session_count, is_recurring, active, sort_order)
values
  ('Palestra Open — Mensile', 'Allenamento libero in sala pesi negli orari di apertura', 'open', 7000, 30, null, true, true, 1),
  ('Palestra Open — Trimestrale', 'Allenamento libero in sala pesi. Risparmio € 20 rispetto a 3 mensilità', 'open', 19000, 90, null, true, true, 2),
  ('Palestra Open — Semestrale', 'Allenamento libero in sala pesi. Risparmio € 70 rispetto a 6 mensilità', 'open', 35000, 180, null, true, true, 3),

  ('Personal Training Privato — Lezione singola', '1 Trainer · 1 Cliente · 1 ora', 'pt_privato', 3000, 1, 1, false, true, 4),
  ('Personal Training Privato — Pacchetto 10 lezioni', '1 Trainer · 1 Cliente · € 25 per allenamento, risparmio € 50', 'pt_privato', 25000, null, 10, false, true, 5),

  ('Personal Training Small Group — Mensile', 'Da 3 a 5 persone, orari prestabiliti', 'pt_small_group', 17000, 30, null, true, true, 6),
  ('Personal Training Small Group — Trimestrale', 'Da 3 a 5 persone. Risparmio € 40 rispetto a 3 mensilità', 'pt_small_group', 47000, 90, null, true, true, 7),
  ('Personal Training Small Group — Semestrale', 'Da 3 a 5 persone. Risparmio € 150 rispetto a 6 mensilità', 'pt_small_group', 87000, 180, null, true, true, 8);
