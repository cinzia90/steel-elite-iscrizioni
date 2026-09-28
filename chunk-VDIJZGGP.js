// src/app/core/i18n/it.ts
var it = {
  login: {
    motto: "Dove la forza non ha bisogno di dimostrarsi",
    email: "Email",
    password: "Password",
    submit: "Accedi",
    submitting: "Accesso in corso\u2026",
    error: "Email o password non corretti."
  },
  home: {
    greeting: "Ciao",
    logout: "Esci"
  },
  signup: {
    planSelect: {
      eyebrow: "Iscrizione online",
      title: "Scegli il tuo abbonamento",
      subtitle: "Bastano pochi minuti: scegli il piano, crea il tuo account e sei pronto per allenarti.",
      categories: {
        open: "Palestra Open",
        pt_privato: "Personal Training Privato",
        pt_small_group: "Personal Training Small Group"
      },
      choose: "Scegli",
      loading: "Caricamento piani\u2026",
      error: "Impossibile caricare i piani. Riprova pi\xF9 tardi.",
      footer: "Racale \xB7 Via Udine, 10"
    },
    account: {
      title: "Crea il tuo account",
      email: "Email",
      password: "Password",
      firstName: "Nome",
      lastName: "Cognome",
      submit: "Continua",
      submitting: "Creazione account\u2026",
      errorGeneric: "Non \xE8 stato possibile creare l'account. Riprova.",
      alreadyHaveAccount: "Hai gi\xE0 un account?",
      login: "Accedi",
      confirmEmail: "Ti abbiamo inviato un'email di conferma. Apri il link per continuare l'iscrizione."
    },
    profile: {
      title: "I tuoi dati",
      firstName: "Nome",
      lastName: "Cognome",
      fiscalCode: "Codice fiscale",
      birthDate: "Data di nascita",
      phone: "Telefono",
      address: "Indirizzo",
      photo: "Foto (obbligatoria, serve allo staff per il check-in)",
      choosePhoto: "Scegli una foto",
      submit: "Continua",
      submitReturning: "Salva",
      submitting: "Salvataggio\u2026",
      photoRequired: "La foto \xE8 obbligatoria.",
      errorGeneric: "Non \xE8 stato possibile salvare i dati. Riprova."
    },
    certificate: {
      title: "Certificato medico",
      description: "Carica il certificato medico sportivo in corso di validit\xE0 (PDF o immagine). Puoi anche farlo pi\xF9 tardi: hai qualche giorno di tempo dall'iscrizione prima che la tessera si blocchi.",
      file: "Certificato",
      expiryDate: "Data di scadenza",
      submit: "Continua al contratto",
      submitReturning: "Salva",
      submitting: "Caricamento\u2026",
      skip: "Salta per ora, lo carico pi\xF9 tardi",
      fileRequired: "Il certificato \xE8 obbligatorio per questo passaggio.",
      errorGeneric: "Non \xE8 stato possibile caricare il certificato. Riprova."
    },
    contract: {
      title: "Contratto e regolamento",
      acceptContract: "Ho letto e accetto il contratto di iscrizione.",
      acceptRules: "Ho letto e accetto il regolamento della palestra.",
      acceptPrivacy: "Ho letto l'informativa sul trattamento dei dati personali (GDPR).",
      sendOtp: "Invia codice di conferma via email",
      sendingOtp: "Invio in corso\u2026",
      otpSentLabel: "Codice inviato",
      otpCode: "Codice a 6 cifre ricevuto via email",
      verifyOtp: "Conferma",
      verifyingOtp: "Verifica\u2026",
      otpInvalid: "Codice errato.",
      otpInvalidWithAttempts: "Codice errato. Tentativi rimasti: {n}",
      otpExpired: "Codice scaduto, richiedine uno nuovo.",
      otpBlocked: "Troppi tentativi errati. Richiedi un nuovo codice.",
      errorGeneric: "Si \xE8 verificato un errore. Riprova.",
      acceptanceRequired: "Devi accettare contratto, regolamento e informativa privacy."
    },
    payment: {
      title: "Pagamento",
      redirecting: "Ti stiamo reindirizzando al pagamento sicuro\u2026",
      errorGeneric: "Non \xE8 stato possibile avviare il pagamento. Riprova."
    },
    paymentPending: {
      title: "Pagamento in verifica",
      pending: "Stiamo confermando il tuo pagamento, un attimo\u2026",
      cancelled: "Pagamento annullato. Puoi riprovare quando vuoi.",
      success: "Pagamento confermato! Il tuo abbonamento \xE8 attivo.",
      retry: "Riprova il pagamento"
    }
  },
  card: {
    title: "La tua tessera",
    brightnessHint: "Alza la luminosit\xE0 dello schermo per una lettura pi\xF9 rapida.",
    loading: "Caricamento\u2026",
    offline: "Nessuna connessione. Riprova quando sei online: senza connessione non possiamo generare un QR valido.",
    noSubscription: "Nessun abbonamento attivo.",
    pendingPayment: "Pagamento in verifica. La tessera sar\xE0 disponibile appena confermato.",
    expired: "Il tuo abbonamento \xE8 scaduto.",
    certificateMissing: "Certificato medico mancante. Caricalo per continuare ad accedere.",
    certificatePending: "Certificato medico in attesa di approvazione.",
    certificateReminder: "Carica il certificato medico entro il",
    photoMissing: "Foto mancante. Caricala di nuovo.",
    renew: "Rinnova abbonamento",
    uploadCertificate: "Carica certificato"
  },
  checkin: {
    title: "Check-in",
    start: "Avvia scanner",
    stop: "Ferma scanner",
    scanAgain: "Scansiona di nuovo",
    torch: "Torcia",
    manualToggle: "Check-in manuale",
    manualSearchPlaceholder: "Cerca cliente per nome\u2026",
    manualConfirm: "Conferma ingresso",
    manualEmpty: "Nessun cliente trovato.",
    granted: "ACCESSO CONSENTITO",
    denied: "ACCESSO NEGATO",
    reasons: {
      invalid_token: "QR non valido o scaduto",
      token_reused: "QR gi\xE0 utilizzato",
      subscription_inactive: "Abbonamento non attivo o scaduto",
      certificate_invalid: "Certificato medico mancante, scaduto o non approvato",
      anti_passback: "Ingresso gi\xE0 registrato di recente"
    },
    cameraError: "Impossibile accedere alla fotocamera.",
    errorGeneric: "Si \xE8 verificato un errore durante la verifica."
  },
  admin: {
    nav: {
      dashboard: "Dashboard",
      clients: "Clienti",
      certificates: "Certificati",
      plans: "Piani",
      accessLogs: "Ingressi",
      staff: "Staff",
      contracts: "Contratti",
      qrPoster: "QR Locandina",
      settings: "Impostazioni"
    },
    qrPoster: {
      title: "QR per la locandina",
      description: "Stampa questa pagina o scarica il QR e inseriscilo nella locandina in palestra: chi lo inquadra arriva direttamente alla pagina di iscrizione, senza bisogno di aiuto.",
      scanHint: "Inquadra per iscriverti",
      download: "Scarica QR (PNG)",
      print: "Stampa locandina",
      urlLabel: "Link diretto"
    },
    dashboard: {
      title: "Dashboard",
      todayAccess: "Ingressi di oggi",
      activeClients: "Clienti attivi",
      expiringSoon: "Abbonamenti in scadenza (7 giorni)",
      certificatesExpiring: "Certificati in scadenza",
      certificatesPending: "Certificati da approvare"
    },
    clients: {
      title: "Clienti",
      searchPlaceholder: "Cerca per nome\u2026",
      empty: "Nessun cliente trovato.",
      status: "Stato",
      plan: "Piano",
      back: "Torna alla lista",
      subscriptions: "Abbonamenti",
      contracts: "Contratti",
      certificate: "Certificato medico",
      accessHistory: "Storico ingressi",
      noPhoto: "Nessuna foto",
      removePhoto: "Rimuovi foto",
      viewCertificate: "Visualizza certificato",
      downloadContract: "Scarica PDF",
      noData: "Nessun dato."
    },
    certificates: {
      title: "Certificati da approvare",
      empty: "Nessun certificato in attesa.",
      view: "Visualizza",
      approve: "Approva",
      reject: "Rifiuta",
      notePlaceholder: "Nota (opzionale per approvazione, consigliata per il rifiuto)",
      errorGeneric: "Operazione non riuscita. Riprova."
    },
    plans: {
      title: "Piani",
      newPlan: "Nuovo piano",
      name: "Nome",
      description: "Descrizione",
      category: "Categoria",
      priceEuro: "Prezzo (\u20AC)",
      durationDays: "Durata (giorni)",
      sessionCount: "N. lezioni (pacchetti a consumo)",
      recurring: "Ricorrente",
      active: "Attivo",
      save: "Salva",
      cancel: "Annulla",
      edit: "Modifica",
      deactivate: "Disattiva",
      activate: "Attiva",
      errorGeneric: "Operazione non riuscita. Riprova."
    },
    accessLogs: {
      title: "Ingressi",
      dateFrom: "Dal",
      dateTo: "Al",
      result: "Esito",
      allResults: "Tutti",
      granted: "Consentito",
      denied: "Negato",
      exportCsv: "Esporta CSV",
      empty: "Nessun ingresso trovato."
    },
    staff: {
      title: "Staff",
      inviteTitle: "Invita nuovo staff",
      email: "Email",
      firstName: "Nome",
      lastName: "Cognome",
      invite: "Invita",
      inviting: "Invio invito\u2026",
      disable: "Disattiva",
      enable: "Riattiva",
      active: "Attivo",
      disabled: "Disattivato",
      errorGeneric: "Operazione non riuscita. Riprova.",
      inviteSent: "Invito inviato."
    },
    settings: {
      title: "Impostazioni",
      gymName: "Nome palestra",
      antiPassbackMinutes: "Anti-passback (minuti)",
      requireApprovedCertificate: "Richiedi certificato approvato per il check-in",
      certificateGraceDays: "Giorni di tolleranza per caricare il certificato medico",
      registrationFeeEuro: "Quota di iscrizione (\u20AC)",
      whatsappSupport: "WhatsApp assistenza",
      save: "Salva",
      saved: "Impostazioni salvate.",
      errorGeneric: "Non \xE8 stato possibile salvare. Riprova."
    },
    contracts: {
      title: "Contratti firmati",
      loading: "Caricamento\u2026",
      empty: "Nessun contratto ancora firmato.",
      download: "Scarica PDF",
      hash: "Hash SHA-256",
      errorGeneric: "Non \xE8 stato possibile scaricare il PDF."
    }
  }
};

export {
  it
};
//# sourceMappingURL=chunk-VDIJZGGP.js.map
