// Modalità demo: nessun Supabase/Stripe reale richiesto. Tutti i dati sono
// tenuti in memoria/localStorage dal MockBackendService (vedi core/mock).
// Usata per mostrare il giro completo dell'app a un cliente senza
// credenziali reali. Mai usata in produzione.
export const environment = {
  production: false,
  mock: true,
  supabaseUrl: 'https://placeholder.supabase.co',
  supabaseAnonKey: 'placeholder-anon-key',
};
