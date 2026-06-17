// Decision Lego — 3D Politics edition
// Proxies AI image generation through the common 3dpolitics AI gateway.

const API_BASE = window.DECISION_LEGO_CONFIG?.API_BASE || '/ai/v1';
const USE_CASE = window.DECISION_LEGO_CONFIG?.USE_CASE || 'decision_lego_image';

const LABELS = {
  scope: { one: 'One', few: 'Few', many: 'Many' },
  mechanism: { vote: 'Vote', market: 'Market', examination: 'Examination', kleros: 'Random' },
  criteria: { birth: 'Birth', cooptation: 'Cooptation', merit: 'Merit' }
};

const POLITY_MATRIX = {
  'one_vote': {
    'one_vote': 'elective personal rule for an elected individual',
    'one_market': 'elective personal rule for a proprietor',
    'one_examination_birth': 'elective personal rule for a noble',
    'one_examination_cooptation': 'elective personal rule for an appointee',
    'one_examination_merit': 'elective personal rule for an expert',
    'one_kleros': 'elective personal rule for a sortean individual',
    'few_vote': 'Clientelism',
    'few_market': 'elective personal rule for plutocrats',
    'few_examination_birth': 'elective personal rule for aristocrats',
    'few_examination_cooptation': 'elective personal rule for a nomenklatura',
    'few_examination_merit': 'Hierarchy',
    'few_kleros': 'elective personal rule for a citizen jury',
    'many_vote': 'Benevolent dictator / Populist',
    'many_market': 'elective personal rule for market participants',
    'many_examination_birth': 'elective personal rule for estates',
    'many_examination_cooptation': 'elective personal rule for the many',
    'many_examination_merit': 'elective personal rule for the many',
    'many_kleros': 'elective personal rule for the citizenry by lot'
  },
  'one_market': {
    'one_vote': 'market personal rule for an elected individual',
    'one_market': 'market personal rule for a proprietor',
    'one_examination_birth': 'market personal rule for a noble',
    'one_examination_cooptation': 'market personal rule for an appointee',
    'one_examination_merit': 'market personal rule for an expert',
    'one_kleros': 'market personal rule for a sortean individual',
    'few_vote': 'market personal rule for a party faction',
    'few_market': 'Nepotism',
    'few_examination_birth': 'market personal rule for aristocrats',
    'few_examination_cooptation': 'market personal rule for a nomenklatura',
    'few_examination_merit': 'market personal rule for experts',
    'few_kleros': 'market personal rule for a citizen jury',
    'many_vote': 'market personal rule for the electorate',
    'many_market': 'market personal rule for market participants',
    'many_examination_birth': 'market personal rule for estates',
    'many_examination_cooptation': 'market personal rule for the many',
    'many_examination_merit': 'market personal rule for the many',
    'many_kleros': 'market personal rule for the citizenry by lot'
  },
  'one_examination_birth': {
    'one_vote': 'Despotism',
    'one_market': 'Despotism',
    'one_examination_birth': 'Despotism',
    'one_examination_cooptation': 'Despotism',
    'one_examination_merit': 'Despotism',
    'one_kleros': 'Despotism',
    'few_vote': 'aristocratic personal rule for a party faction',
    'few_market': 'aristocratic personal rule for plutocrats',
    'few_examination_birth': 'Monarchy',
    'few_examination_cooptation': 'Autocracy',
    'few_examination_merit': 'aristocratic personal rule for experts',
    'few_kleros': 'aristocratic personal rule for a citizen jury',
    'many_vote': 'aristocratic personal rule for the electorate',
    'many_market': 'aristocratic personal rule for market participants',
    'many_examination_birth': 'Aristocracy',
    'many_examination_cooptation': 'aristocratic personal rule for the many',
    'many_examination_merit': 'aristocratic personal rule for the many',
    'many_kleros': 'aristocratic personal rule for the citizenry by lot'
  },
  'one_examination_cooptation': {
    'one_vote': 'cooptive personal rule for an elected individual',
    'one_market': 'cooptive personal rule for a proprietor',
    'one_examination_birth': 'cooptive personal rule for a noble',
    'one_examination_cooptation': 'cooptive personal rule for an appointee',
    'one_examination_merit': 'cooptive personal rule for an expert',
    'one_kleros': 'cooptive personal rule for a sortean individual',
    'few_vote': 'cooptive personal rule for a party faction',
    'few_market': 'cooptive personal rule for plutocrats',
    'few_examination_birth': 'cooptive personal rule for aristocrats',
    'few_examination_cooptation': 'Autocracy',
    'few_examination_merit': 'cooptive personal rule for experts',
    'few_kleros': 'cooptive personal rule for a citizen jury',
    'many_vote': 'cooptive personal rule for the electorate',
    'many_market': 'cooptive personal rule for market participants',
    'many_examination_birth': 'cooptive personal rule for estates',
    'many_examination_cooptation': 'cooptive personal rule for the many',
    'many_examination_merit': 'cooptive personal rule for the many',
    'many_kleros': 'cooptive personal rule for the citizenry by lot'
  },
  'one_examination_merit': {
    'one_vote': 'technocratic personal rule for an elected individual',
    'one_market': 'technocratic personal rule for a proprietor',
    'one_examination_birth': 'technocratic personal rule for a noble',
    'one_examination_cooptation': 'technocratic personal rule for an appointee',
    'one_examination_merit': 'technocratic personal rule for an expert',
    'one_kleros': 'technocratic personal rule for a sortean individual',
    'few_vote': 'technocratic personal rule for a party faction',
    'few_market': 'technocratic personal rule for plutocrats',
    'few_examination_birth': 'technocratic personal rule for aristocrats',
    'few_examination_cooptation': 'technocratic personal rule for a nomenklatura',
    'few_examination_merit': 'Hierarchy',
    'few_kleros': 'technocratic personal rule for a citizen jury',
    'many_vote': 'technocratic personal rule for the electorate',
    'many_market': 'technocratic personal rule for market participants',
    'many_examination_birth': 'technocratic personal rule for estates',
    'many_examination_cooptation': 'technocratic personal rule for the many',
    'many_examination_merit': 'technocratic personal rule for the many',
    'many_kleros': 'technocratic personal rule for the citizenry by lot'
  },
  'one_kleros': {
    'one_vote': 'sortition personal rule for an elected individual',
    'one_market': 'sortition personal rule for a proprietor',
    'one_examination_birth': 'sortition personal rule for a noble',
    'one_examination_cooptation': 'sortition personal rule for an appointee',
    'one_examination_merit': 'sortition personal rule for an expert',
    'one_kleros': 'sortition personal rule for a sortean individual',
    'few_vote': 'sortition personal rule for a party faction',
    'few_market': 'sortition personal rule for plutocrats',
    'few_examination_birth': 'sortition personal rule for aristocrats',
    'few_examination_cooptation': 'sortition personal rule for a nomenklatura',
    'few_examination_merit': 'sortition personal rule for experts',
    'few_kleros': 'sortition personal rule for a citizen jury',
    'many_vote': 'sortition personal rule for the electorate',
    'many_market': 'sortition personal rule for market participants',
    'many_examination_birth': 'sortition personal rule for estates',
    'many_examination_cooptation': 'sortition personal rule for the many',
    'many_examination_merit': 'sortition personal rule for the many',
    'many_kleros': 'sortition personal rule for the citizenry by lot'
  },
  'few_vote': {
    'one_vote': 'elective oligarchy for an elected individual',
    'one_market': 'elective oligarchy for a proprietor',
    'one_examination_birth': 'elective oligarchy for a noble',
    'one_examination_cooptation': 'elective oligarchy for an appointee',
    'one_examination_merit': 'elective oligarchy for an expert',
    'one_kleros': 'elective oligarchy for a sortean individual',
    'few_vote': 'Representative government',
    'few_market': 'Shareholder governance',
    'few_examination_birth': 'elective oligarchy for aristocrats',
    'few_examination_cooptation': 'elective oligarchy for a nomenklatura',
    'few_examination_merit': 'elective oligarchy for experts',
    'few_kleros': 'elective oligarchy for a citizen jury',
    'many_vote': 'Representative Democracy',
    'many_market': 'elective oligarchy for market participants',
    'many_examination_birth': 'elective oligarchy for estates',
    'many_examination_cooptation': 'elective oligarchy for the many',
    'many_examination_merit': 'elective oligarchy for the many',
    'many_kleros': 'elective oligarchy for the citizenry by lot'
  },
  'few_market': {
    'one_vote': 'market oligarchy for an elected individual',
    'one_market': 'market oligarchy for a proprietor',
    'one_examination_birth': 'market oligarchy for a noble',
    'one_examination_cooptation': 'market oligarchy for an appointee',
    'one_examination_merit': 'market oligarchy for an expert',
    'one_kleros': 'market oligarchy for a sortean individual',
    'few_vote': 'market oligarchy for a party faction',
    'few_market': 'Plutocracy',
    'few_examination_birth': 'market oligarchy for aristocrats',
    'few_examination_cooptation': 'market oligarchy for a nomenklatura',
    'few_examination_merit': 'market oligarchy for experts',
    'few_kleros': 'market oligarchy for a citizen jury',
    'many_vote': 'market oligarchy for the electorate',
    'many_market': 'market oligarchy for market participants',
    'many_examination_birth': 'market oligarchy for estates',
    'many_examination_cooptation': 'market oligarchy for the many',
    'many_examination_merit': 'market oligarchy for the many',
    'many_kleros': 'market oligarchy for the citizenry by lot'
  },
  'few_examination_birth': {
    'one_vote': 'aristocratic oligarchy for an elected individual',
    'one_market': 'aristocratic oligarchy for a proprietor',
    'one_examination_birth': 'aristocratic oligarchy for a noble',
    'one_examination_cooptation': 'aristocratic oligarchy for an appointee',
    'one_examination_merit': 'aristocratic oligarchy for an expert',
    'one_kleros': 'aristocratic oligarchy for a sortean individual',
    'few_vote': 'aristocratic oligarchy for a party faction',
    'few_market': 'aristocratic oligarchy for plutocrats',
    'few_examination_birth': 'Aristocracy',
    'few_examination_cooptation': 'aristocratic oligarchy for a nomenklatura',
    'few_examination_merit': 'aristocratic oligarchy for experts',
    'few_kleros': 'aristocratic oligarchy for a citizen jury',
    'many_vote': 'aristocratic oligarchy for the electorate',
    'many_market': 'aristocratic oligarchy for market participants',
    'many_examination_birth': 'aristocratic oligarchy for estates',
    'many_examination_cooptation': 'aristocratic oligarchy for the many',
    'many_examination_merit': 'aristocratic oligarchy for the many',
    'many_kleros': 'aristocratic oligarchy for the citizenry by lot'
  },
  'few_examination_cooptation': {
    'one_vote': 'cooptive oligarchy for an elected individual',
    'one_market': 'cooptive oligarchy for a proprietor',
    'one_examination_birth': 'cooptive oligarchy for a noble',
    'one_examination_cooptation': 'cooptive oligarchy for an appointee',
    'one_examination_merit': 'cooptive oligarchy for an expert',
    'one_kleros': 'cooptive oligarchy for a sortean individual',
    'few_vote': 'cooptive oligarchy for a party faction',
    'few_market': 'cooptive oligarchy for plutocrats',
    'few_examination_birth': 'cooptive oligarchy for aristocrats',
    'few_examination_cooptation': 'Technocracy',
    'few_examination_merit': 'cooptive oligarchy for experts',
    'few_kleros': 'cooptive oligarchy for a citizen jury',
    'many_vote': 'cooptive oligarchy for the electorate',
    'many_market': 'cooptive oligarchy for market participants',
    'many_examination_birth': 'cooptive oligarchy for estates',
    'many_examination_cooptation': 'cooptive oligarchy for the many',
    'many_examination_merit': 'cooptive oligarchy for the many',
    'many_kleros': 'cooptive oligarchy for the citizenry by lot'
  },
  'few_examination_merit': {
    'one_vote': 'technocratic oligarchy for an elected individual',
    'one_market': 'technocratic oligarchy for a proprietor',
    'one_examination_birth': 'technocratic oligarchy for a noble',
    'one_examination_cooptation': 'technocratic oligarchy for an appointee',
    'one_examination_merit': 'technocratic oligarchy for an expert',
    'one_kleros': 'technocratic oligarchy for a sortean individual',
    'few_vote': 'technocratic oligarchy for a party faction',
    'few_market': 'technocratic oligarchy for plutocrats',
    'few_examination_birth': 'technocratic oligarchy for aristocrats',
    'few_examination_cooptation': 'technocratic oligarchy for a nomenklatura',
    'few_examination_merit': 'Technocracy',
    'few_kleros': 'technocratic oligarchy for a citizen jury',
    'many_vote': 'technocratic oligarchy for the electorate',
    'many_market': 'technocratic oligarchy for market participants',
    'many_examination_birth': 'technocratic oligarchy for estates',
    'many_examination_cooptation': 'technocratic oligarchy for the many',
    'many_examination_merit': 'technocratic oligarchy for the many',
    'many_kleros': 'technocratic oligarchy for the citizenry by lot'
  },
  'few_kleros': {
    'one_vote': 'sortition oligarchy for an elected individual',
    'one_market': 'sortition oligarchy for a proprietor',
    'one_examination_birth': 'sortition oligarchy for a noble',
    'one_examination_cooptation': 'sortition oligarchy for an appointee',
    'one_examination_merit': 'sortition oligarchy for an expert',
    'one_kleros': 'sortition oligarchy for a sortean individual',
    'few_vote': 'sortition oligarchy for a party faction',
    'few_market': 'sortition oligarchy for plutocrats',
    'few_examination_birth': 'sortition oligarchy for aristocrats',
    'few_examination_cooptation': 'sortition oligarchy for a nomenklatura',
    'few_examination_merit': 'sortition oligarchy for experts',
    'few_kleros': 'sortition oligarchy for a citizen jury',
    'many_vote': 'sortition oligarchy for the electorate',
    'many_market': 'sortition oligarchy for market participants',
    'many_examination_birth': 'sortition oligarchy for estates',
    'many_examination_cooptation': 'sortition oligarchy for the many',
    'many_examination_merit': 'sortition oligarchy for the many',
    'many_kleros': 'sortition oligarchy for the citizenry by lot'
  },
  'many_vote': {
    'one_vote': 'elective democracy for an elected individual',
    'one_market': 'elective democracy for a proprietor',
    'one_examination_birth': 'elective democracy for a noble',
    'one_examination_cooptation': 'elective democracy for an appointee',
    'one_examination_merit': 'elective democracy for an expert',
    'one_kleros': 'elective democracy for a sortean individual',
    'few_vote': 'elective democracy for a party faction',
    'few_market': 'elective democracy for plutocrats',
    'few_examination_birth': 'elective democracy for aristocrats',
    'few_examination_cooptation': 'elective democracy for a nomenklatura',
    'few_examination_merit': 'elective democracy for experts',
    'few_kleros': 'elective democracy for a citizen jury',
    'many_vote': 'Democracy',
    'many_market': 'elective democracy for market participants',
    'many_examination_birth': 'elective democracy for estates',
    'many_examination_cooptation': 'elective democracy for the many',
    'many_examination_merit': 'elective democracy for the many',
    'many_kleros': 'elective democracy for the citizenry by lot'
  },
  'many_market': {
    'one_vote': 'market democracy for an elected individual',
    'one_market': 'market democracy for a proprietor',
    'one_examination_birth': 'market democracy for a noble',
    'one_examination_cooptation': 'market democracy for an appointee',
    'one_examination_merit': 'market democracy for an expert',
    'one_kleros': 'market democracy for a sortean individual',
    'few_vote': 'market democracy for a party faction',
    'few_market': 'Marketocracy',
    'few_examination_birth': 'market democracy for aristocrats',
    'few_examination_cooptation': 'market democracy for a nomenklatura',
    'few_examination_merit': 'market democracy for experts',
    'few_kleros': 'market democracy for a citizen jury',
    'many_vote': 'market democracy for the electorate',
    'many_market': 'market democracy for market participants',
    'many_examination_birth': 'market democracy for estates',
    'many_examination_cooptation': 'market democracy for the many',
    'many_examination_merit': 'market democracy for the many',
    'many_kleros': 'market democracy for the citizenry by lot'
  },
  'many_examination_birth': {
    'one_vote': 'aristocratic democracy for an elected individual',
    'one_market': 'aristocratic democracy for a proprietor',
    'one_examination_birth': 'aristocratic democracy for a noble',
    'one_examination_cooptation': 'aristocratic democracy for an appointee',
    'one_examination_merit': 'aristocratic democracy for an expert',
    'one_kleros': 'aristocratic democracy for a sortean individual',
    'few_vote': 'aristocratic democracy for a party faction',
    'few_market': 'aristocratic democracy for plutocrats',
    'few_examination_birth': 'aristocratic democracy for aristocrats',
    'few_examination_cooptation': 'aristocratic democracy for a nomenklatura',
    'few_examination_merit': 'aristocratic democracy for experts',
    'few_kleros': 'aristocratic democracy for a citizen jury',
    'many_vote': 'aristocratic democracy for the electorate',
    'many_market': 'aristocratic democracy for market participants',
    'many_examination_birth': 'Aristocracy',
    'many_examination_cooptation': 'aristocratic democracy for the many',
    'many_examination_merit': 'aristocratic democracy for the many',
    'many_kleros': 'aristocratic democracy for the citizenry by lot'
  },
  'many_examination_cooptation': {
    'one_vote': 'cooptive democracy for an elected individual',
    'one_market': 'cooptive democracy for a proprietor',
    'one_examination_birth': 'cooptive democracy for a noble',
    'one_examination_cooptation': 'cooptive democracy for an appointee',
    'one_examination_merit': 'cooptive democracy for an expert',
    'one_kleros': 'cooptive democracy for a sortean individual',
    'few_vote': 'cooptive democracy for a party faction',
    'few_market': 'cooptive democracy for plutocrats',
    'few_examination_birth': 'cooptive democracy for aristocrats',
    'few_examination_cooptation': 'cooptive democracy for a nomenklatura',
    'few_examination_merit': 'cooptive democracy for experts',
    'few_kleros': 'cooptive democracy for a citizen jury',
    'many_vote': 'cooptive democracy for the electorate',
    'many_market': 'cooptive democracy for market participants',
    'many_examination_birth': 'cooptive democracy for estates',
    'many_examination_cooptation': 'cooptive democracy for the many',
    'many_examination_merit': 'cooptive democracy for the many',
    'many_kleros': 'cooptive democracy for the citizenry by lot'
  },
  'many_examination_merit': {
    'one_vote': 'technocratic democracy for an elected individual',
    'one_market': 'technocratic democracy for a proprietor',
    'one_examination_birth': 'technocratic democracy for a noble',
    'one_examination_cooptation': 'technocratic democracy for an appointee',
    'one_examination_merit': 'technocratic democracy for an expert',
    'one_kleros': 'technocratic democracy for a sortean individual',
    'few_vote': 'technocratic democracy for a party faction',
    'few_market': 'technocratic democracy for plutocrats',
    'few_examination_birth': 'technocratic democracy for aristocrats',
    'few_examination_cooptation': 'technocratic democracy for a nomenklatura',
    'few_examination_merit': 'Meritocracy',
    'few_kleros': 'technocratic democracy for a citizen jury',
    'many_vote': 'technocratic democracy for the electorate',
    'many_market': 'technocratic democracy for market participants',
    'many_examination_birth': 'technocratic democracy for estates',
    'many_examination_cooptation': 'technocratic democracy for the many',
    'many_examination_merit': 'technocratic democracy for the many',
    'many_kleros': 'technocratic democracy for the citizenry by lot'
  },
  'many_kleros': {
    'one_vote': 'sortition democracy for an elected individual',
    'one_market': 'sortition democracy for a proprietor',
    'one_examination_birth': 'sortition democracy for a noble',
    'one_examination_cooptation': 'sortition democracy for an appointee',
    'one_examination_merit': 'sortition democracy for an expert',
    'one_kleros': 'sortition democracy for a sortean individual',
    'few_vote': 'sortition democracy for a party faction',
    'few_market': 'sortition democracy for plutocrats',
    'few_examination_birth': 'sortition democracy for aristocrats',
    'few_examination_cooptation': 'sortition democracy for a nomenklatura',
    'few_examination_merit': 'sortition democracy for experts',
    'few_kleros': 'sortition democracy for a citizen jury',
    'many_vote': 'sortition democracy for the electorate',
    'many_market': 'sortition democracy for market participants',
    'many_examination_birth': 'sortition democracy for estates',
    'many_examination_cooptation': 'sortition democracy for the many',
    'many_examination_merit': 'sortition democracy for the many',
    'many_kleros': 'Demarchy'
  }
};

const state = {
  from: { scope: null, mechanism: null, criteria: null },
  for: { scope: null, mechanism: null, criteria: null },
  currentStep: 1,
  currentPolity: null
};

let accessToken = null;
let tokenExpiry = 0;

// ── 3D Politics AI gateway client ────────────────────────────────────────────

async function ensureToken() {
  const now = Math.floor(Date.now() / 1000);
  if (accessToken && tokenExpiry > now + 60) return accessToken;

  const res = await fetch(`${API_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ use_cases: [USE_CASE] })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Token request failed (${res.status})`);
  }

  accessToken = data.token;
  tokenExpiry = now + (data.expires_in || 900);
  return accessToken;
}

async function generateBoxArt(input) {
  const token = await ensureToken();
  const res = await fetch(`${API_BASE}/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ use_case: USE_CASE, input })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || `Gateway error (${res.status})`;
    throw new Error(message);
  }

  if (!data.output?.image_base64) {
    throw new Error('No image returned from the gateway.');
  }

  return `data:${data.output.mime_type || 'image/png'};base64,${data.output.image_base64}`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (char) => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      default: return '&#39;';
    }
  });
}

function formatKey(key) {
  if (!key) return '—';
  return key.split('_').map((k) => LABELS.scope[k] || LABELS.mechanism[k] || LABELS.criteria[k] || k).join(' / ');
}

function buildAxisKey(axis) {
  const data = state[axis];
  if (!data.scope) return null;
  if (data.mechanism === 'examination') {
    if (!data.criteria) return null;
    return `${data.scope}_${data.mechanism}_${data.criteria}`;
  }
  return `${data.scope}_${data.mechanism || 'vote'}`;
}

function setFallbackImage(message) {
  const polityName = state.currentPolity?.name || 'Decision Lego';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5F1E8" />
          <stop offset="100%" stop-color="#FFFCF5" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)" rx="2" />
      <rect x="96" y="96" width="832" height="832" rx="2" fill="#FFFCF5" stroke="#1A1A1A" stroke-width="12" />
      <text x="512" y="250" fill="#C0392B" font-family="Helvetica, Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle">Decision Lego</text>
      <text x="512" y="390" fill="#1A1A1A" font-family="Helvetica, Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${escapeXml(polityName)}</text>
      <text x="512" y="500" fill="#6B6B6B" font-family="Helvetica, Arial, sans-serif" font-size="28" text-anchor="middle">${escapeXml(message)}</text>
    </svg>
  `.trim();
  document.getElementById('ai-generated-image').src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// ── UI state ─────────────────────────────────────────────────────────────────

function showStep(stepId) {
  document.querySelectorAll('.step-content').forEach((el) => el.classList.remove('active'));
  document.getElementById(stepId)?.classList.add('active');

  const stepNumber = stepId.startsWith('step-') ? Number(stepId.split('-')[1]) : 1;
  state.currentStep = stepNumber;

  document.querySelectorAll('.step-dot').forEach((dot) => {
    const num = Number(dot.dataset.step);
    dot.classList.toggle('active', num <= stepNumber);
  });

  const progress = Math.min(100, Math.max(0, (stepNumber - 1) / 3 * 100));
  document.getElementById('step-progress').style.width = `${progress}%`;
}

function updateRightPanel(panelState) {
  document.querySelectorAll('.viz-state').forEach((el) => el.classList.remove('active'));
  document.getElementById(`viz-${panelState}`)?.classList.add('active');
}

function updatePreview() {
  const fromKey = buildAxisKey('from');
  const forKey = buildAxisKey('for');

  const fromEl = document.getElementById('preview-from').querySelector('.preview-value');
  const forEl = document.getElementById('preview-for').querySelector('.preview-value');

  fromEl.textContent = formatKey(fromKey);
  forEl.textContent = formatKey(forKey);

  if (fromKey) fromEl.classList.add('set');
  if (forKey) forEl.classList.add('set');
}

// ── Selection handlers ───────────────────────────────────────────────────────

function selectFrom(scope) {
  state.from = { scope, mechanism: null, criteria: null };
  updatePreview();
  showStep('step-1b');
}

function selectFromMechanism(mechanism) {
  state.from.mechanism = mechanism;
  if (mechanism === 'examination') {
    showStep('step-1c');
  } else {
    state.from.criteria = null;
    showStep('step-2');
    updateRightPanel('welcome');
  }
}

function selectFromCriteria(criteria) {
  state.from.criteria = criteria;
  showStep('step-2');
  updatePreview();
  updateRightPanel('welcome');
}

function selectFor(scope) {
  state.for = { scope, mechanism: null, criteria: null };
  updatePreview();
  showStep('step-2b');
}

function selectForMechanism(mechanism) {
  state.for.mechanism = mechanism;
  if (mechanism === 'examination') {
    showStep('step-2c');
  } else {
    state.for.criteria = null;
    updatePreview();
    buildAndShowResult();
  }
}

function selectForCriteria(criteria) {
  state.for.criteria = criteria;
  updatePreview();
  buildAndShowResult();
}

// ── Result / AI generation ───────────────────────────────────────────────────

function buildAndShowResult() {
  const fromKey = buildAxisKey('from');
  const forKey = buildAxisKey('for');
  if (!fromKey || !forKey) return;

  let polityName = POLITY_MATRIX[fromKey]?.[forKey] || '';
  if (!polityName) {
    polityName = `${formatKey(fromKey)} → ${formatKey(forKey)}`;
  }

  state.currentPolity = { name: polityName, fromKey, forKey };

  document.getElementById('result-name').textContent = polityName;
  document.getElementById('result-from').textContent = formatKey(fromKey);
  document.getElementById('result-for').textContent = formatKey(forKey);

  showStep('step-3');
  updateRightPanel('loading');

  // Small delay so the loading animation is visible.
  setTimeout(() => generateImage(), 400);
}

async function generateImage() {
  const p = state.currentPolity;
  if (!p) return;

  try {
    const imageUrl = await generateBoxArt({
      from_key: p.fromKey,
      for_key: p.forKey,
      polity_name: p.name
    });
    document.getElementById('ai-generated-image').src = imageUrl;
    showFinalResult();
  } catch (error) {
    console.error('Image generation failed:', error);
    setFallbackImage(error.message || 'Image generation failed');
    showFinalResult();
  }
}

function showFinalResult() {
  const p = state.currentPolity;
  if (!p) return;

  const title = document.getElementById('result-name');
  title.classList.remove('positive', 'mixed', 'negative');

  const forScope = p.forKey.split('_')[0];
  if (forScope === 'many') {
    title.classList.add('positive');
  } else if (forScope === 'few') {
    title.classList.add('mixed');
  } else {
    title.classList.add('negative');
  }

  showStep('step-4');
  updateRightPanel('result');
}

function downloadImage() {
  const img = document.getElementById('ai-generated-image');
  if (!img.src) {
    alert('No image to download yet!');
    return;
  }
  const safeName = (state.currentPolity?.name || 'polity')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50);
  const link = document.createElement('a');
  link.href = img.src;
  link.download = `decision-lego-${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function resetGame() {
  state.from = { scope: null, mechanism: null, criteria: null };
  state.for = { scope: null, mechanism: null, criteria: null };
  state.currentPolity = null;

  document.querySelectorAll('.preview-value').forEach((el) => {
    el.textContent = '—';
    el.classList.remove('set');
  });

  showStep('step-1');
  updateRightPanel('welcome');
}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  showStep('step-1');
  updateRightPanel('welcome');
});
