// Genera src/environments/environment.prod.ts dalle variabili d'ambiente
// impostate su Netlify (SUPABASE_URL, SUPABASE_ANON_KEY), così le chiavi
// reali non vengono mai committate nel repository.
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

const content = `// File generato in build da scripts/set-env.js — non modificare a mano.
export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}',
};
`;

const outPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
fs.writeFileSync(outPath, content);
console.log(`environment.prod.ts scritto con SUPABASE_URL=${supabaseUrl}`);
