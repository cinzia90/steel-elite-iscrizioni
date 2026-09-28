// Sviluppo: valori reali in .env locale, iniettati qui a mano finché non
// automatizziamo la sostituzione in build (vedi CLAUDE.md, Fase 1).
export const environment = {
  production: false,
  mock: false,
  // Placeholder finché non esiste un progetto Supabase reale — il client
  // richiede un URL sintatticamente valido anche solo per istanziarsi.
  supabaseUrl: 'https://placeholder.supabase.co',
  supabaseAnonKey: 'placeholder-anon-key',
};
