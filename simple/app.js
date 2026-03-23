// Decision Lego - Full Polity Map Edition

const GEMINI_API_KEY = window.DECISION_LEGO_CONFIG?.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

// State - now with full 4-question flow
const state = {
  from: { scope: null, mechanism: null, criteria: null },
  for: { scope: null, mechanism: null, criteria: null },
  currentStep: 1,
  currentPolity: null
};

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

function setFallbackImage(message) {
  const polityName = state.currentPolity?.name || 'Decision Lego';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#1f2937" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)" rx="48" />
      <rect x="96" y="96" width="832" height="832" rx="36" fill="#0b1220" stroke="#ef4444" stroke-width="12" />
      <text x="512" y="250" fill="#ef4444" font-family="Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle">Decision Lego</text>
      <text x="512" y="390" fill="#f9fafb" font-family="Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${escapeXml(polityName)}</text>
      <text x="512" y="500" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="28" text-anchor="middle">${escapeXml(message)}</text>
      <text x="512" y="612" fill="#94a3b8" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Run with GEMINI_API_KEY to enable AI box art.</text>
    </svg>
  `.trim();
  document.getElementById('ai-generated-image').src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Full 18x18 Polity Matrix
// Keys: scope_mechanism_criteria (criteria only for examination)
const POLITY_MATRIX = {
  // FROM: One / Vote
  "one_vote": {
    "one_vote": "elective personal rule for an elected individual",
    "one_market": "elective personal rule for a proprietor",
    "one_examination_birth": "elective personal rule for a noble",
    "one_examination_cooptation": "elective personal rule for an appointee",
    "one_examination_merit": "elective personal rule for an expert",
    "one_kleros": "elective personal rule for a sortean individual",
    "few_vote": "Clientelism",
    "few_market": "elective personal rule for plutocrats",
    "few_examination_birth": "elective personal rule for aristocrats",
    "few_examination_cooptation": "elective personal rule for a nomenklatura",
    "few_examination_merit": "Hierarchy",
    "few_kleros": "elective personal rule for a citizen jury",
    "many_vote": "Benevolent dictator / Populist",
    "many_market": "elective personal rule for market participants",
    "many_examination_birth": "elective personal rule for estates",
    "many_examination_cooptation": "elective personal rule for the many",
    "many_examination_merit": "elective personal rule for the many",
    "many_kleros": "elective personal rule for the citizenry by lot"
  },
  // FROM: One / Market
  "one_market": {
    "one_vote": "market personal rule for an elected individual",
    "one_market": "market personal rule for a proprietor",
    "one_examination_birth": "market personal rule for a noble",
    "one_examination_cooptation": "market personal rule for an appointee",
    "one_examination_merit": "market personal rule for an expert",
    "one_kleros": "market personal rule for a sortean individual",
    "few_vote": "market personal rule for a party faction",
    "few_market": "Nepotism",
    "few_examination_birth": "market personal rule for aristocrats",
    "few_examination_cooptation": "market personal rule for a nomenklatura",
    "few_examination_merit": "market personal rule for experts",
    "few_kleros": "market personal rule for a citizen jury",
    "many_vote": "market personal rule for the electorate",
    "many_market": "market personal rule for market participants",
    "many_examination_birth": "market personal rule for estates",
    "many_examination_cooptation": "market personal rule for the many",
    "many_examination_merit": "market personal rule for the many",
    "many_kleros": "market personal rule for the citizenry by lot"
  },
  // FROM: One / Examination / Birth
  "one_examination_birth": {
    "one_vote": "Despotism",
    "one_market": "Despotism",
    "one_examination_birth": "Despotism",
    "one_examination_cooptation": "Despotism",
    "one_examination_merit": "Despotism",
    "one_kleros": "Despotism",
    "few_vote": "aristocratic personal rule for a party faction",
    "few_market": "aristocratic personal rule for plutocrats",
    "few_examination_birth": "Monarchy",
    "few_examination_cooptation": "Autocracy",
    "few_examination_merit": "aristocratic personal rule for experts",
    "few_kleros": "aristocratic personal rule for a citizen jury",
    "many_vote": "aristocratic personal rule for the electorate",
    "many_market": "aristocratic personal rule for market participants",
    "many_examination_birth": "Aristocracy",
    "many_examination_cooptation": "aristocratic personal rule for the many",
    "many_examination_merit": "aristocratic personal rule for the many",
    "many_kleros": "aristocratic personal rule for the citizenry by lot"
  },
  // FROM: One / Examination / Cooptation
  "one_examination_cooptation": {
    "one_vote": "cooptive personal rule for an elected individual",
    "one_market": "cooptive personal rule for a proprietor",
    "one_examination_birth": "cooptive personal rule for a noble",
    "one_examination_cooptation": "cooptive personal rule for an appointee",
    "one_examination_merit": "cooptive personal rule for an expert",
    "one_kleros": "cooptive personal rule for a sortean individual",
    "few_vote": "cooptive personal rule for a party faction",
    "few_market": "cooptive personal rule for plutocrats",
    "few_examination_birth": "cooptive personal rule for aristocrats",
    "few_examination_cooptation": "Autocracy",
    "few_examination_merit": "cooptive personal rule for experts",
    "few_kleros": "cooptive personal rule for a citizen jury",
    "many_vote": "cooptive personal rule for the electorate",
    "many_market": "cooptive personal rule for market participants",
    "many_examination_birth": "cooptive personal rule for estates",
    "many_examination_cooptation": "cooptive personal rule for the many",
    "many_examination_merit": "cooptive personal rule for the many",
    "many_kleros": "cooptive personal rule for the citizenry by lot"
  },
  // FROM: One / Examination / Merit
  "one_examination_merit": {
    "one_vote": "technocratic personal rule for an elected individual",
    "one_market": "technocratic personal rule for a proprietor",
    "one_examination_birth": "technocratic personal rule for a noble",
    "one_examination_cooptation": "technocratic personal rule for an appointee",
    "one_examination_merit": "technocratic personal rule for an expert",
    "one_kleros": "technocratic personal rule for a sortean individual",
    "few_vote": "technocratic personal rule for a party faction",
    "few_market": "technocratic personal rule for plutocrats",
    "few_examination_birth": "technocratic personal rule for aristocrats",
    "few_examination_cooptation": "technocratic personal rule for a nomenklatura",
    "few_examination_merit": "Hierarchy",
    "few_kleros": "technocratic personal rule for a citizen jury",
    "many_vote": "technocratic personal rule for the electorate",
    "many_market": "technocratic personal rule for market participants",
    "many_examination_birth": "technocratic personal rule for estates",
    "many_examination_cooptation": "technocratic personal rule for the many",
    "many_examination_merit": "technocratic personal rule for the many",
    "many_kleros": "technocratic personal rule for the citizenry by lot"
  },
  // FROM: One / Random (Kleros)
  "one_kleros": {
    "one_vote": "sortition personal rule for an elected individual",
    "one_market": "sortition personal rule for a proprietor",
    "one_examination_birth": "sortition personal rule for a noble",
    "one_examination_cooptation": "sortition personal rule for an appointee",
    "one_examination_merit": "sortition personal rule for an expert",
    "one_kleros": "sortition personal rule for a sortean individual",
    "few_vote": "sortition personal rule for a party faction",
    "few_market": "sortition personal rule for plutocrats",
    "few_examination_birth": "sortition personal rule for aristocrats",
    "few_examination_cooptation": "sortition personal rule for a nomenklatura",
    "few_examination_merit": "sortition personal rule for experts",
    "few_kleros": "sortition personal rule for a citizen jury",
    "many_vote": "sortition personal rule for the electorate",
    "many_market": "sortition personal rule for market participants",
    "many_examination_birth": "sortition personal rule for estates",
    "many_examination_cooptation": "sortition personal rule for the many",
    "many_examination_merit": "sortition personal rule for the many",
    "many_kleros": "sortition personal rule for the citizenry by lot"
  },
  // FROM: Few / Vote
  "few_vote": {
    "one_vote": "elective oligarchy for an elected individual",
    "one_market": "elective oligarchy for a proprietor",
    "one_examination_birth": "elective oligarchy for a noble",
    "one_examination_cooptation": "elective oligarchy for an appointee",
    "one_examination_merit": "elective oligarchy for an expert",
    "one_kleros": "elective oligarchy for a sortean individual",
    "few_vote": "Representative government",
    "few_market": "Shareholder governance",
    "few_examination_birth": "elective oligarchy for aristocrats",
    "few_examination_cooptation": "elective oligarchy for a nomenklatura",
    "few_examination_merit": "elective oligarchy for experts",
    "few_kleros": "elective oligarchy for a citizen jury",
    "many_vote": "Representative Democracy",
    "many_market": "elective oligarchy for market participants",
    "many_examination_birth": "elective oligarchy for estates",
    "many_examination_cooptation": "elective oligarchy for the many",
    "many_examination_merit": "elective oligarchy for the many",
    "many_kleros": "elective oligarchy for the citizenry by lot"
  },
  // FROM: Few / Market
  "few_market": {
    "one_vote": "market oligarchy for an elected individual",
    "one_market": "market oligarchy for a proprietor",
    "one_examination_birth": "market oligarchy for a noble",
    "one_examination_cooptation": "market oligarchy for an appointee",
    "one_examination_merit": "market oligarchy for an expert",
    "one_kleros": "market oligarchy for a sortean individual",
    "few_vote": "market oligarchy for a party faction",
    "few_market": "Corporation / Plutocracy",
    "few_examination_birth": "market oligarchy for aristocrats",
    "few_examination_cooptation": "market oligarchy for a nomenklatura",
    "few_examination_merit": "market oligarchy for experts",
    "few_kleros": "market oligarchy for a citizen jury",
    "many_vote": "market oligarchy for the electorate",
    "many_market": "Bankless / Web3 / Decentralization",
    "many_examination_birth": "market oligarchy for estates",
    "many_examination_cooptation": "market oligarchy for the many",
    "many_examination_merit": "market oligarchy for the many",
    "many_kleros": "market oligarchy for the citizenry by lot"
  },
  // FROM: Few / Examination / Birth
  "few_examination_birth": {
    "one_vote": "aristocratic oligarchy for an elected individual",
    "one_market": "aristocratic oligarchy for a proprietor",
    "one_examination_birth": "Absolutism",
    "one_examination_cooptation": "aristocratic oligarchy for an appointee",
    "one_examination_merit": "aristocratic oligarchy for an expert",
    "one_kleros": "aristocratic oligarchy for a sortean individual",
    "few_vote": "aristocratic oligarchy for a party faction",
    "few_market": "aristocratic oligarchy for plutocrats",
    "few_examination_birth": "Mafia",
    "few_examination_cooptation": "aristocratic oligarchy for a nomenklatura",
    "few_examination_merit": "aristocratic oligarchy for experts",
    "few_kleros": "aristocratic oligarchy for a citizen jury",
    "many_vote": "aristocratic oligarchy for the electorate",
    "many_market": "aristocratic oligarchy for market participants",
    "many_examination_birth": "Aristocracy",
    "many_examination_cooptation": "aristocratic oligarchy for the many",
    "many_examination_merit": "aristocratic oligarchy for the many",
    "many_kleros": "aristocratic oligarchy for the citizenry by lot"
  },
  // FROM: Few / Examination / Cooptation
  "few_examination_cooptation": {
    "one_vote": "cooptive oligarchy for an elected individual",
    "one_market": "cooptive oligarchy for a proprietor",
    "one_examination_birth": "Autocracy",
    "one_examination_cooptation": "cooptive oligarchy for an appointee",
    "one_examination_merit": "cooptive oligarchy for an expert",
    "one_kleros": "cooptive oligarchy for a sortean individual",
    "few_vote": "cooptive oligarchy for a party faction",
    "few_market": "cooptive oligarchy for plutocrats",
    "few_examination_birth": "cooptive oligarchy for aristocrats",
    "few_examination_cooptation": "Autocracy",
    "few_examination_merit": "cooptive oligarchy for experts",
    "few_kleros": "cooptive oligarchy for a citizen jury",
    "many_vote": "cooptive oligarchy for the electorate",
    "many_market": "cooptive oligarchy for market participants",
    "many_examination_birth": "cooptive oligarchy for estates",
    "many_examination_cooptation": "cooptive oligarchy for the many",
    "many_examination_merit": "cooptive oligarchy for the many",
    "many_kleros": "cooptive oligarchy for the citizenry by lot"
  },
  // FROM: Few / Examination / Merit
  "few_examination_merit": {
    "one_vote": "technocratic oligarchy for an elected individual",
    "one_market": "technocratic oligarchy for a proprietor",
    "one_examination_birth": "technocratic oligarchy for a noble",
    "one_examination_cooptation": "Hierarchy",
    "one_examination_merit": "Hierarchy",
    "one_kleros": "technocratic oligarchy for a sortean individual",
    "few_vote": "technocratic oligarchy for a party faction",
    "few_market": "technocratic oligarchy for plutocrats",
    "few_examination_birth": "technocratic oligarchy for aristocrats",
    "few_examination_cooptation": "technocratic oligarchy for a nomenklatura",
    "few_examination_merit": "Bureaucracy",
    "few_kleros": "technocratic oligarchy for a citizen jury",
    "many_vote": "technocratic oligarchy for the electorate",
    "many_market": "technocratic oligarchy for market participants",
    "many_examination_birth": "technocratic oligarchy for estates",
    "many_examination_cooptation": "technocratic oligarchy for the many",
    "many_examination_merit": "Technocracy",
    "many_kleros": "technocratic oligarchy for the citizenry by lot"
  },
  // FROM: Few / Random (Kleros)
  "few_kleros": {
    "one_vote": "sortition oligarchy for an elected individual",
    "one_market": "sortition oligarchy for a proprietor",
    "one_examination_birth": "sortition oligarchy for a noble",
    "one_examination_cooptation": "sortition oligarchy for an appointee",
    "one_examination_merit": "sortition oligarchy for an expert",
    "one_kleros": "sortition oligarchy for a sortean individual",
    "few_vote": "sortition oligarchy for a party faction",
    "few_market": "sortition oligarchy for plutocrats",
    "few_examination_birth": "sortition oligarchy for aristocrats",
    "few_examination_cooptation": "sortition oligarchy for a nomenklatura",
    "few_examination_merit": "sortition oligarchy for experts",
    "few_kleros": "Conscription Army",
    "many_vote": "sortition oligarchy for the electorate",
    "many_market": "sortition oligarchy for market participants",
    "many_examination_birth": "sortition oligarchy for estates",
    "many_examination_cooptation": "sortition oligarchy for the many",
    "many_examination_merit": "sortition oligarchy for the many",
    "many_kleros": "Stochocracy / Aleatorian democracy"
  },
  // FROM: Many / Vote
  "many_vote": {
    "one_vote": "elective mass rule for an elected individual",
    "one_market": "Surveillance capitalism",
    "one_examination_birth": "elective mass rule for a noble",
    "one_examination_cooptation": "elective mass rule for an appointee",
    "one_examination_merit": "elective mass rule for an expert",
    "one_kleros": "elective mass rule for a sortean individual",
    "few_vote": "Liberal Democracy",
    "few_market": "Surveillance capitalism",
    "few_examination_birth": "elective mass rule for aristocrats",
    "few_examination_cooptation": "elective mass rule for a nomenklatura",
    "few_examination_merit": "elective mass rule for experts",
    "few_kleros": "elective mass rule for a citizen jury",
    "many_vote": "elective mass rule for the electorate",
    "many_market": "elective mass rule for market participants",
    "many_examination_birth": "elective mass rule for estates",
    "many_examination_cooptation": "elective mass rule for the many",
    "many_examination_merit": "elective mass rule for the many",
    "many_kleros": "Democracy"
  },
  // FROM: Many / Market
  "many_market": {
    "one_vote": "market mass rule for an elected individual",
    "one_market": "market mass rule for a proprietor",
    "one_examination_birth": "market mass rule for a noble",
    "one_examination_cooptation": "market mass rule for an appointee",
    "one_examination_merit": "market mass rule for an expert",
    "one_kleros": "market mass rule for a sortean individual",
    "few_vote": "market mass rule for a party faction",
    "few_market": "DAO",
    "few_examination_birth": "market mass rule for aristocrats",
    "few_examination_cooptation": "market mass rule for a nomenklatura",
    "few_examination_merit": "market mass rule for experts",
    "few_kleros": "market mass rule for a citizen jury",
    "many_vote": "market mass rule for the electorate",
    "many_market": "market mass rule for market participants",
    "many_examination_birth": "market mass rule for estates",
    "many_examination_cooptation": "market mass rule for the many",
    "many_examination_merit": "market mass rule for the many",
    "many_kleros": "market mass rule for the citizenry by lot"
  },
  // FROM: Many / Examination / Birth
  "many_examination_birth": {
    "one_vote": "Totalitarianism",
    "one_market": "aristocratic mass rule for a proprietor",
    "one_examination_birth": "aristocratic mass rule for a noble",
    "one_examination_cooptation": "aristocratic mass rule for an appointee",
    "one_examination_merit": "aristocratic mass rule for an expert",
    "one_kleros": "aristocratic mass rule for a sortean individual",
    "few_vote": "aristocratic mass rule for a party faction",
    "few_market": "aristocratic mass rule for plutocrats",
    "few_examination_birth": "aristocratic mass rule for aristocrats",
    "few_examination_cooptation": "aristocratic mass rule for a nomenklatura",
    "few_examination_merit": "aristocratic mass rule for experts",
    "few_kleros": "aristocratic mass rule for a citizen jury",
    "many_vote": "aristocratic mass rule for the electorate",
    "many_market": "aristocratic mass rule for market participants",
    "many_examination_birth": "aristocratic mass rule for estates",
    "many_examination_cooptation": "aristocratic mass rule for the many",
    "many_examination_merit": "aristocratic mass rule for the many",
    "many_kleros": "aristocratic mass rule for the citizenry by lot"
  },
  // FROM: Many / Examination / Cooptation
  "many_examination_cooptation": {
    "one_vote": "cooptive mass rule for an elected individual",
    "one_market": "cooptive mass rule for a proprietor",
    "one_examination_birth": "cooptive mass rule for a noble",
    "one_examination_cooptation": "cooptive mass rule for an appointee",
    "one_examination_merit": "cooptive mass rule for an expert",
    "one_kleros": "cooptive mass rule for a sortean individual",
    "few_vote": "cooptive mass rule for a party faction",
    "few_market": "cooptive mass rule for plutocrats",
    "few_examination_birth": "cooptive mass rule for aristocrats",
    "few_examination_cooptation": "cooptive mass rule for a nomenklatura",
    "few_examination_merit": "cooptive mass rule for experts",
    "few_kleros": "cooptive mass rule for a citizen jury",
    "many_vote": "cooptive mass rule for the electorate",
    "many_market": "cooptive mass rule for market participants",
    "many_examination_birth": "cooptive mass rule for estates",
    "many_examination_cooptation": "cooptive mass rule for the many",
    "many_examination_merit": "cooptive mass rule for the many",
    "many_kleros": "cooptive mass rule for the citizenry by lot"
  },
  // FROM: Many / Examination / Merit
  "many_examination_merit": {
    "one_vote": "technocratic mass rule for an elected individual",
    "one_market": "technocratic mass rule for a proprietor",
    "one_examination_birth": "technocratic mass rule for a noble",
    "one_examination_cooptation": "technocratic mass rule for an appointee",
    "one_examination_merit": "technocratic mass rule for an expert",
    "one_kleros": "technocratic mass rule for a sortean individual",
    "few_vote": "technocratic mass rule for a party faction",
    "few_market": "technocratic mass rule for plutocrats",
    "few_examination_birth": "technocratic mass rule for aristocrats",
    "few_examination_cooptation": "technocratic mass rule for a nomenklatura",
    "few_examination_merit": "technocratic mass rule for experts",
    "few_kleros": "technocratic mass rule for a citizen jury",
    "many_vote": "technocratic mass rule for the electorate",
    "many_market": "technocratic mass rule for market participants",
    "many_examination_birth": "technocratic mass rule for estates",
    "many_examination_cooptation": "technocratic mass rule for the many",
    "many_examination_merit": "technocratic mass rule for the many",
    "many_kleros": "technocratic mass rule for the citizenry by lot"
  },
  // FROM: Many / Random (Kleros)
  "many_kleros": {
    "one_vote": "Totalitarianism",
    "one_market": "sortition mass rule for a proprietor",
    "one_examination_birth": "sortition mass rule for a noble",
    "one_examination_cooptation": "sortition mass rule for an appointee",
    "one_examination_merit": "sortition mass rule for an expert",
    "one_kleros": "sortition mass rule for a sortean individual",
    "few_vote": "sortition mass rule for a party faction",
    "few_market": "sortition mass rule for plutocrats",
    "few_examination_birth": "sortition mass rule for aristocrats",
    "few_examination_cooptation": "sortition mass rule for a nomenklatura",
    "few_examination_merit": "sortition mass rule for experts",
    "few_kleros": "sortition mass rule for a citizen jury",
    "many_vote": "sortition mass rule for the electorate",
    "many_market": "sortition mass rule for market participants",
    "many_examination_birth": "sortition mass rule for estates",
    "many_examination_cooptation": "sortition mass rule for the many",
    "many_examination_merit": "sortition mass rule for the many",
    "many_kleros": "sortition mass rule for the citizenry by lot"
  }
};

// Display labels
const LABELS = {
  scope: { one: "One", few: "Few", many: "Many" },
  mechanism: { vote: "Vote", market: "Market", examination: "Examination", kleros: "Random" },
  criteria: { birth: "Birth", cooptation: "Cooptation", merit: "Merit" }
};

// Navigation
function showStep(stepId) {
  document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  updateProgress();
}

function updateProgress() {
  const stepMap = { 'step-1': 1, 'step-1b': 1, 'step-1c': 1, 'step-2': 2, 'step-2b': 2, 'step-2c': 2, 'step-3': 3, 'step-4': 4 };
  const activeStep = document.querySelector('.step-content.active');
  if (!activeStep) return;
  const currentPhase = stepMap[activeStep.id] || 1;
  
  document.querySelectorAll('.step-dot').forEach((dot, idx) => {
    dot.classList.remove('active', 'completed');
    if (idx + 1 < currentPhase) dot.classList.add('completed');
    else if (idx + 1 === currentPhase) dot.classList.add('active');
  });
  document.getElementById('step-progress').style.width = ((currentPhase - 1) / 3) * 100 + '%';
}

function updatePreview() {
  const fromKey = buildAxisKey('from');
  const forKey = buildAxisKey('for');
  
  const fromEl = document.getElementById('preview-from').querySelector('.preview-value');
  const forEl = document.getElementById('preview-for').querySelector('.preview-value');
  
  if (state.from.scope) {
    fromEl.textContent = formatKey(fromKey);
    fromEl.classList.add('set');
  }
  if (state.for.scope) {
    forEl.textContent = formatKey(forKey);
    forEl.classList.add('set');
  }
}

function buildAxisKey(axis) {
  const data = state[axis];
  if (!data.scope) return null;
  if (data.mechanism === 'examination' && data.criteria) {
    return `${data.scope}_${data.mechanism}_${data.criteria}`;
  }
  return `${data.scope}_${data.mechanism || 'vote'}`;
}

function formatKey(key) {
  if (!key) return '—';
  return key.split('_').map(k => LABELS.scope[k] || LABELS.mechanism[k] || LABELS.criteria[k] || k).join(' / ');
}

// Selection handlers
function selectFrom(scope) {
  state.from.scope = scope;
  state.from.mechanism = null;
  state.from.criteria = null;
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
    updatePreview();
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
  state.for.scope = scope;
  state.for.mechanism = null;
  state.for.criteria = null;
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

// Result
function buildAndShowResult() {
  const fromKey = buildAxisKey('from');
  const forKey = buildAxisKey('for');
  
  if (!fromKey || !forKey) return;
  
  let polityName = POLITY_MATRIX[fromKey]?.[forKey] || "";
  if (!polityName) {
    polityName = `${formatKey(fromKey)} → ${formatKey(forKey)}`;
  }
  
  state.currentPolity = { name: polityName, fromKey, forKey };
  
  showStep('step-3');
  updateRightPanel('loading');
  setTimeout(() => generateAIImage(), 500);
}

function updateRightPanel(state) {
  document.querySelectorAll('.viz-state').forEach(el => el.classList.remove('active'));
  document.getElementById(`viz-${state}`).classList.add('active');
}

function showFinalResult() {
  const p = state.currentPolity;
  const forScope = p.forKey.split('_')[0];
  const fromScope = p.fromKey.split('_')[0];
  
  document.getElementById('result-name').textContent = p.name;
  document.getElementById('result-from').textContent = formatKey(p.fromKey);
  document.getElementById('result-for').textContent = formatKey(p.forKey);
  
  // Set result color based on sentiment
  const resultTitle = document.getElementById('result-name');
  resultTitle.classList.remove('positive', 'mixed', 'negative');
  
  if (forScope === 'many') {
    resultTitle.classList.add('positive'); // Green - good for all
  } else if (forScope === 'few') {
    resultTitle.classList.add('mixed'); // Yellow - exclusive
  } else {
    resultTitle.classList.add('negative'); // Red - authoritarian
  }
  
  showStep('step-4');
  updateRightPanel('result');
}

// AI Generation
async function generateAIImage() {
  const prompt = buildAIPrompt();

  if (!GEMINI_API_KEY) {
    setFallbackImage('AI image unavailable in this installation');
    showFinalResult();
    return;
  }
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, responseModalities: ["Text", "Image"] }
      })
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    let imageData = null;
    
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) { imageData = part.inlineData.data; break; }
      }
      if (!imageData && data.candidates[0].content.parts.inlineData?.data) {
        imageData = data.candidates[0].content.parts.inlineData.data;
      }
    }
    
    if (imageData) {
      document.getElementById('ai-generated-image').src = `data:image/png;base64,${imageData}`;
      showFinalResult();
    } else {
      throw new Error('No image data');
    }
  } catch (error) {
    console.error('Generation failed:', error);
    setFallbackImage('AI image generation failed');
    showFinalResult();
  }
}

function buildAIPrompt() {
  const p = state.currentPolity;
  const fromDesc = formatKey(p.fromKey);
  const forDesc = formatKey(p.forKey);
  
  // Determine sentiment based on who benefits
  const forScope = p.forKey.split('_')[0]; // one, few, or many
  const fromScope = p.fromKey.split('_')[0]; // one, few, or many
  
  let sentimentDescription = '';
  let lightingMood = '';
  let architecturalTone = '';
  let figureExpression = '';
  
  if (forScope === 'many') {
    // Governing for many/all - POSITIVE
    sentimentDescription = 'The scene conveys hope, inclusion, and collective prosperity. Citizens appear empowered and engaged.';
    lightingMood = 'Bright, warm golden hour lighting with sun rays illuminating the scene';
    architecturalTone = 'Open, accessible architecture with public squares, gardens, and transparent buildings';
    figureExpression = 'Diverse minifigures smiling, collaborating, holding hands, celebrating together';
  } else if (forScope === 'few') {
    // Governing for few - MIXED/CAUTIOUS
    sentimentDescription = 'The scene shows selective privilege with an air of exclusivity.';
    lightingMood = 'Dramatic chiaroscuro lighting with deep shadows and selective highlights';
    architecturalTone = 'Gated communities, private chambers, velvet ropes separating groups';
    figureExpression = 'Elite minifigures in fine attire, some observing from balconies above';
  } else {
    // Governing for one - DARK/NEGATIVE
    sentimentDescription = 'The scene conveys isolation, authoritarian control, and oppression.';
    lightingMood = 'Dark, moody lighting with harsh spotlights and deep shadows';
    architecturalTone = 'Fortress-like structures, dark thrones, barred windows, surveillance elements';
    figureExpression = 'A solitary imposing figure lording over subordinate minifigures';
  }
  
  // Special case: Many governing for many = most positive
  if (fromScope === 'many' && forScope === 'many') {
    sentimentDescription = 'A vibrant celebration of true democracy - citizens self-governing in harmony. The scene radiates joy, equality, and shared prosperity.';
    lightingMood = 'Radiant, uplifting lighting with rainbow lens flares and bright sunshine';
    architecturalTone = 'Beautiful civic architecture - rotundas, open forums, flowering trees, fountains';
    figureExpression = 'Joyful diverse minifigures dancing, voting together, sharing resources, embracing';
  }
  
  return `A professional 3D product shot of a "LEGO Decision Series" box set titled: "${p.name}".

Scene: A detailed LEGO diorama representing a polity where ${fromDesc} governs for the benefit of ${forDesc}.

Sentiment & Mood:
${sentimentDescription}

Visual details:
- ${figureExpression}
- ${architecturalTone}
- ${lightingMood}
- The LEGO logo, "10+" age rating, "Governance Primitives" sidebar
- 8k resolution, photorealistic plastic textures, premium product photography`;
}

// Download
function downloadImage() {
  const img = document.getElementById('ai-generated-image');
  if (!img.src || img.src === '') { alert('No image to download yet!'); return; }
  
  const polityName = state.currentPolity?.name || 'polity';
  const safeName = polityName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase().substring(0, 50);
  
  const link = document.createElement('a');
  link.href = img.src;
  link.download = `decision-lego-${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Reset
function resetGame() {
  state.from = { scope: null, mechanism: null, criteria: null };
  state.for = { scope: null, mechanism: null, criteria: null };
  state.currentPolity = null;
  
  ['preview-from', 'preview-for'].forEach(id => {
    const el = document.getElementById(id).querySelector('.preview-value');
    el.textContent = '—';
    el.classList.remove('set');
  });
  
  showStep('step-1');
  updateRightPanel('welcome');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  showStep('step-1');
});
