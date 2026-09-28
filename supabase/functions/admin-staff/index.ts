import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// Un ban lunghissimo, non un vero "per sempre" (Supabase non lo supporta),
// usato per disattivare un account staff senza cancellarlo né toccare lo
// schema del DB (nessuna colonna "disabled" da aggiungere).
const DISABLE_BAN_DURATION = '87600h'; // 10 anni

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse({ error: 'Missing Authorization header' }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user: caller },
    error: callerError,
  } = await userClient.auth.getUser();

  if (callerError || !caller) {
    return jsonResponse({ error: 'Invalid session' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: callerProfile } = await admin.from('profiles').select('role').eq('id', caller.id).single();
  if (callerProfile?.role !== 'admin') {
    return jsonResponse({ error: 'Forbidden' }, 403);
  }

  const body = await req.json().catch(() => ({}));
  const action = body.action as 'invite' | 'disable' | 'enable' | 'list' | undefined;

  if (action === 'list') {
    const { data: staffProfiles } = await admin
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('role', 'staff')
      .order('created_at', { ascending: false });

    const staff = await Promise.all(
      (staffProfiles ?? []).map(async (profile) => {
        const { data: authUser } = await admin.auth.admin.getUserById(profile.id);
        const bannedUntil = authUser.user?.banned_until ?? null;
        const disabled = !!bannedUntil && bannedUntil !== 'none' && new Date(bannedUntil) > new Date();
        return {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: authUser.user?.email ?? '',
          disabled,
        };
      }),
    );

    return jsonResponse({ staff });
  }

  if (action === 'invite') {
    const email = body.email as string | undefined;
    const firstName = (body.firstName as string | undefined) ?? '';
    const lastName = (body.lastName as string | undefined) ?? '';

    if (!email) {
      return jsonResponse({ error: 'email is required' }, 400);
    }

    const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { first_name: firstName, last_name: lastName },
    });

    if (inviteError || !invited.user) {
      return jsonResponse({ error: inviteError?.message ?? 'invite_failed' }, 500);
    }

    // Il trigger handle_new_user crea il profilo con role='member' di default:
    // lo promuoviamo a staff subito dopo l'invito.
    await admin.from('profiles').update({ role: 'staff' }).eq('id', invited.user.id);

    return jsonResponse({ invited: true, userId: invited.user.id });
  }

  if (action === 'disable' || action === 'enable') {
    const userId = body.userId as string | undefined;
    if (!userId) {
      return jsonResponse({ error: 'userId is required' }, 400);
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      ban_duration: action === 'disable' ? DISABLE_BAN_DURATION : 'none',
    });

    if (updateError) {
      return jsonResponse({ error: updateError.message }, 500);
    }

    return jsonResponse({ success: true });
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
});
