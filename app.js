const SCOPE_OPTIONS = [
  { value: "one", label: "One" },
  { value: "few", label: "Some / Few" },
  { value: "many", label: "Many / All" },
];

const PROCEDURE_OPTIONS = [
  { value: "vote", label: "Vote (Psephos)" },
  { value: "market", label: "Market (Agora)" },
  { value: "examination", label: "Examination (Dokimasia)" },
  { value: "kleros", label: "Random Selection (Kleros)" },
];

const SUBTYPE_OPTIONS = [
  { value: "vote", label: "Vote" },
  { value: "market", label: "Market" },
  { value: "kleros", label: "Kleros / Random selection" },
  { value: "birth", label: "Birth" },
  { value: "cooptation", label: "Cooptation" },
  { value: "merit", label: "Merit / Competence" },
];

const PROCEDURE_JUSTIFICATIONS = [
  { value: "representation", label: "Representation / legitimacy" },
  { value: "fairness", label: "Fairness / equality of chance" },
  { value: "anticorruption", label: "Protection against corruption" },
  { value: "efficiency", label: "Efficiency / scalability" },
  { value: "need", label: "Need / rational criteria" },
  { value: "merit", label: "Merit / competence" },
  { value: "tradition", label: "Tradition / continuity" },
  { value: "control", label: "Control / predictability" },
];

const INTERPRETATION_OPTIONS = [
  { value: "deterministic", label: "Deterministic" },
  { value: "probabilistic", label: "Probabilistic" },
  { value: "finalist", label: "Finalist (destiny / superior will)" },
];

const BLOCK_STEP_PROC_OPTIONS = [
  { value: "none", label: "None (no step)" },
  ...PROCEDURE_OPTIONS,
];

const BLOCK_STEP_JUST_OPTIONS = [
  { value: "none", label: "None" },
  ...PROCEDURE_JUSTIFICATIONS,
];

const MECHANISM_QUIZ_OPTIONS = {
  q1: [
    { value: "suffrages", label: "Aggregation of suffrages / expressed preferences" },
    { value: "price", label: "Confrontation through price (offer/demand balance)" },
    { value: "criteria", label: "Checking prefixed criteria" },
    { value: "chance", label: "Chance event / lottery" },
  ],
  q2: [
    { value: "algorithm", label: "Counting rule / algorithm (majority, etc.)" },
    { value: "price", label: "Price" },
    { value: "checklist", label: "Checklist / eligibility criteria" },
    { value: "lottery", label: "Aleatory device" },
  ],
  q3: [
    { value: "yes", label: "Yes, chance is central" },
    { value: "no", label: "No, chance is not central" },
  ],
};

const MECHANISM_INFO = {
  vote: {
    label: "Vote (Psephos)",
    explainer: "Reduces options by aggregating preferences as suffrages using a rule or algorithm.",
    examples: [
      "Majority vote in elections",
      "Parliamentary vote on a bill",
      "Token-weighted onchain vote (often a hybrid block with market elements)",
    ],
  },
  market: {
    label: "Market (Agora)",
    explainer: "Reduces options by balancing preferences through price.",
    examples: [
      "Auction-based allocation",
      "Shareholder governance dynamics",
      "Token markets steering governance power indirectly",
    ],
  },
  examination: {
    label: "Examination (Dokimasia)",
    explainer: "Reduces options by checking whether prefixed criteria are met.",
    examples: [
      "Eligibility screening",
      "Merit-based hiring exams",
      "Citizenship, age, or residency qualification checks",
    ],
  },
  kleros: {
    label: "Random Selection (Kleros)",
    explainer: "Reduces options through an aleatory moment (intentional use of a non-intentional mechanism).",
    examples: [
      "Lottery / sortition for a citizens' assembly",
      "Draft lottery",
      "Randomized tie-breaking",
    ],
  },
};

const AXIS_LABELS = {
  one: "One / One / One",
  few_vote: "Some/Few / Vote / Vote",
  few_market: "Some/Few / Market / Market",
  few_birth: "Some/Few / Examination / Birth",
  few_cooptation: "Some/Few / Examination / Cooptation",
  few_merit: "Some/Few / Examination / Merit",
  few_kleros: "Some/Few / Kleros / Kleros",
  many: "Many/All / Many/All / Many/All",
};

const POLITY_MATRIX = {
  one: {
    one: "Despotism",
    few_vote: "Clientelism",
    few_market: "Nepotism",
    few_birth: "Monarchy",
    few_cooptation: "Autocracy",
    few_merit: "Hierarchy",
    few_kleros: "(Anarchy)",
    many: 'Benevolent dictator / "Populist"',
  },
  few_vote: {
    one: "",
    few_vote: "Representative government",
    few_market: "Shareholder governance",
    few_birth: "",
    few_cooptation: "",
    few_merit: "",
    few_kleros: "",
    many: "Representative Democracy",
  },
  few_market: {
    one: "",
    few_vote: "",
    few_market: "Corporation / Plutocracy",
    few_birth: "",
    few_cooptation: "",
    few_merit: "",
    few_kleros: "",
    many: "Bankless / Web3 / Decentralization",
  },
  few_birth: {
    one: "Absolutism",
    few_vote: "",
    few_market: "",
    few_birth: "Mafia",
    few_cooptation: "",
    few_merit: "",
    few_kleros: "",
    many: "Aristocracy",
  },
  few_cooptation: {
    one: "Autocracy",
    few_vote: "",
    few_market: "",
    few_birth: "",
    few_cooptation: "Autocracy",
    few_merit: "",
    few_kleros: "",
    many: "",
  },
  few_merit: {
    one: "Hierarchy",
    few_vote: "",
    few_market: "",
    few_birth: "",
    few_cooptation: "",
    few_merit: "Bureaucracy",
    few_kleros: "",
    many: "Technocracy",
  },
  few_kleros: {
    one: "Conscription Army",
    few_vote: "",
    few_market: "",
    few_birth: "",
    few_cooptation: "",
    few_merit: "",
    few_kleros: "",
    many: "Stochocracy / Aleatorian democracy",
  },
  many: {
    one: "Totalitarianism",
    few_vote: "Liberal Democracy",
    few_market: "DAO",
    few_birth: "",
    few_cooptation: "",
    few_merit: "",
    few_kleros: "",
    many: "Democracy",
  },
};

const EXTRA_EXAMPLES = {
  "few_kleros|many": [
    "Citizens' assemblies (sortition-based advisory or legislative prototypes)",
    "Jury systems (random selection + examination + deliberation as a block cousin)",
    "Permanent sortition chambers (proposed second chambers)",
  ],
  "few_merit|many": [
    "Civil-service exam states / meritocratic administrative systems",
    "Independent expert agencies steering policy domains",
    "Epistocratic proposals (contested but relevant)",
  ],
  "few_vote|many": [
    "Parliamentary representative systems",
    "Presidential representative systems",
    "Liquid-democracy variants (vote-family extension)",
  ],
  "few_market|many": [
    "Token-governed DAOs with delegation",
    "Quadratic funding ecosystems (hybrid blocks)",
    "Prediction-market-informed governance proposals",
  ],
  "few_market|few_market": [
    "Publicly traded firms dominated by shareholders",
    "Oligarchic corporate governance structures",
  ],
  "many|many": [
    "Participatory democracy designs",
    "Swiss Landsgemeinde-like direct democracy cases (small-scale analogues)",
    "Member-governed cooperatives",
  ],
  "many|few_market": [
    "Token-holder governance in DAOs",
  ],
  "few_cooptation|few_cooptation": [
    "Self-recruiting boards and councils",
    "Closed clerical or elite collegia using cooptation",
    "Open-source maintainer groups by invitation (organizational analogue)",
  ],
};

const AXIS_EXTRA_EXAMPLES = {
  few_cooptation: ["Partnership-track firms selecting new partners", "Elite councils reproducing membership by invitation"],
  few_birth: ["Dynastic monarchies and noble orders", "Hereditary leadership systems"],
  few_kleros: ["Sortition mini-publics", "Lottery-based civic service allocation"],
  few_merit: ["Expert commissions", "Technocratic caretaker governments"],
  few_market: ["Capital-weighted governance arrangements", "Auction-mediated allocation systems"],
};

const BLOCK_LIBRARY = [
  {
    name: "Simple Election Procedure",
    signature: ["vote:representation"],
    notes: "Single-step representative election block.",
  },
  {
    name: "Runoff Election Block",
    signature: ["vote:representation", "vote:control"],
    notes: "Two-step vote block (first round + runoff / confirmation).",
  },
  {
    name: "Athenian Boule-like Admission Block",
    signature: ["examination:need", "kleros:fairness", "examination:control"],
    notes: "Eligibility screening, lot, then civic examination / confirmation.",
  },
  {
    name: "Citizens' Assembly Recruitment Block",
    signature: ["kleros:fairness", "examination:need"],
    notes: "Lottery followed by stratification / eligibility balancing.",
  },
  {
    name: "Jury Formation + Verdict Block",
    signature: ["kleros:fairness", "examination:control", "vote:representation"],
    notes: "Random selection, screening, then deliberative verdict vote.",
  },
  {
    name: "Meritocratic Hiring Block",
    signature: ["examination:merit", "examination:control", "examination:control"],
    notes: "Merit test + interview/screening + appointing committee decision.",
  },
  {
    name: "DAO Governance Cycle (Simplified)",
    signature: ["market:efficiency", "vote:representation"],
    notes: "Token distribution/stake dynamics followed by token-holder vote.",
  },
  {
    name: "Conscription Lottery Block",
    signature: ["examination:need", "kleros:fairness"],
    notes: "Eligibility criteria then draft lottery.",
  },
];

const BOX_NAME_PREFIXES = [
  "Civic Chaos Kit",
  "Planetary Procedure Pack",
  "Legitimation Lab",
  "Sortition & Friends",
  "The Governance Gumbo",
  "Council-in-a-Box",
  "Meta-Polity Starter Set",
  "Protocol Parliament Party Pack",
];

const BOX_NAME_SUFFIXES = [
  "9000",
  "Deluxe",
  "for Troublemakers",
  "for Planetary Adults",
  "Beta",
  "Lab Edition",
  "with Extra Legitimacy",
  "No Kings Included",
];

const TABLE_NOTES = {
  filled: "Named in the paper's page-11 polity matrix.",
  empty: "This cell is blank in the table (no explicit named ideal type in that version).",
};

const Shared = window.DecisionLegoShared || {};

const state = {
  completion: { 1: false, 2: false, 3: false, 4: false, 5: false },
  currentLevel: 1,
  mechanism: null,
  procedure: null,
  block: null,
  polity: null,
  boxItems: [],
  llmBoxDraft: null,
  challengeCards: (Shared.CHALLENGE_CARDS || []).slice(),
  debriefCards: (Shared.DEBRIEF_CARDS || []).slice(),
  blockLibrary: [],
  contentPackMeta: { name: "Local default", version: "1.0" },
  mixedPolity: {
    agenda: null,
    deliberation: null,
    decision: null,
    execution: null,
    oversight: null,
  },
  facilitator: {
    round: 1,
    intervalId: null,
    remainingSec: 600,
    running: false,
    phases: ["Mechanism warmup", "Procedure framing", "Block design", "Challenge + debrief", "Pitch"],
  },
};

function qs(id) {
  return document.getElementById(id);
}

function qsa(sel) {
  return Array.from(document.querySelectorAll(sel));
}

function fillSelect(select, options) {
  select.innerHTML = "";
  for (const opt of options) {
    const el = document.createElement("option");
    el.value = opt.value;
    el.textContent = opt.label;
    select.appendChild(el);
  }
}

function renderList(node, items, emptyText) {
  node.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = emptyText;
    node.appendChild(li);
    return;
  }
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    node.appendChild(li);
  }
}

function dedupe(items) {
  return [...new Set(items)];
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function markComplete(level) {
  state.completion[level] = true;
  renderProgressBadges();
}

function renderProgressBadges() {
  const container = qs("progress-badges");
  const labels = {
    1: "Mechanism",
    2: "Procedure",
    3: "Block",
    4: "Polity",
    5: "Box",
  };
  container.innerHTML = "";
  Object.keys(labels).forEach((k) => {
    const badge = document.createElement("span");
    badge.className = `badge ${state.completion[k] ? "done" : ""}`;
    badge.textContent = `${k}. ${labels[k]}`;
    container.appendChild(badge);
  });
}

function activateLevel(level) {
  state.currentLevel = Number(level);
  qsa(".level-tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.level === String(level));
  });
  qsa(".level-section").forEach((sec) => {
    sec.classList.toggle("is-active", sec.id === `level-${level}`);
  });
}

function initLevelTabs() {
  qsa(".level-tab").forEach((btn) => {
    btn.addEventListener("click", () => activateLevel(btn.dataset.level));
  });
}

function initMechanismLevel() {
  fillSelect(qs("mech-q1"), MECHANISM_QUIZ_OPTIONS.q1);
  fillSelect(qs("mech-q2"), MECHANISM_QUIZ_OPTIONS.q2);
  fillSelect(qs("mech-q3"), MECHANISM_QUIZ_OPTIONS.q3);

  qs("mech-q1").value = "suffrages";
  qs("mech-q2").value = "algorithm";
  qs("mech-q3").value = "no";

  ["mech-q1", "mech-q2", "mech-q3"].forEach((id) => {
    qs(id).addEventListener("change", updateMechanismLevel);
  });
  qs("mechanism-random-btn").addEventListener("click", randomizeMechanismQuiz);
  updateMechanismLevel();
}

function inferMechanismFromQuiz() {
  const q1 = qs("mech-q1").value;
  const q2 = qs("mech-q2").value;
  const q3 = qs("mech-q3").value;
  const score = { vote: 0, market: 0, examination: 0, kleros: 0 };

  if (q1 === "suffrages") score.vote += 2;
  if (q1 === "price") score.market += 2;
  if (q1 === "criteria") score.examination += 2;
  if (q1 === "chance") score.kleros += 2;

  if (q2 === "algorithm") score.vote += 2;
  if (q2 === "price") score.market += 2;
  if (q2 === "checklist") score.examination += 2;
  if (q2 === "lottery") score.kleros += 2;

  if (q3 === "yes") score.kleros += 2;
  else {
    score.vote += 0.5;
    score.market += 0.5;
    score.examination += 0.5;
  }

  const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const [bestKey, bestScore] = ranked[0];
  const tie = ranked[1][1] === bestScore;

  return { bestKey, score, tie };
}

function updateMechanismLevel() {
  const out = inferMechanismFromQuiz();
  const info = MECHANISM_INFO[out.bestKey];
  const result = qs("mechanism-result");
  const status = qs("mechanism-status");

  result.textContent = info.label;
  status.textContent = out.tie
    ? `Hybrid/ambiguous clues: strongest signal points to ${info.label}.`
    : info.explainer;

  const notes = [
    `Q1 + Q2 + Q3 scoring -> ${Object.entries(out.score).map(([k, v]) => `${k}:${v}`).join(" | ")}`,
    "Tip: use this as a guessing round before revealing the 4 canonical mechanisms.",
  ];
  renderList(qs("mechanism-examples"), [...info.examples, ...notes], "No examples.");

  state.mechanism = out.bestKey;
  markComplete(1);
}

function randomizeMechanismQuiz() {
  qs("mech-q1").value = randomChoice(MECHANISM_QUIZ_OPTIONS.q1).value;
  qs("mech-q2").value = randomChoice(MECHANISM_QUIZ_OPTIONS.q2).value;
  qs("mech-q3").value = randomChoice(MECHANISM_QUIZ_OPTIONS.q3).value;
  updateMechanismLevel();
}

function initProcedureLevel() {
  fillSelect(qs("proc-mechanism"), PROCEDURE_OPTIONS);
  fillSelect(qs("proc-justification"), PROCEDURE_JUSTIFICATIONS);
  fillSelect(qs("proc-interpretation"), INTERPRETATION_OPTIONS);

  qs("proc-mechanism").value = "vote";
  qs("proc-justification").value = "representation";
  qs("proc-interpretation").value = "deterministic";

  ["proc-mechanism", "proc-justification", "proc-interpretation", "proc-purpose"].forEach((id) => {
    qs(id).addEventListener("input", updateProcedureLevel);
    qs(id).addEventListener("change", updateProcedureLevel);
  });

  qs("procedure-seed-btn").addEventListener("click", () => {
    if (state.mechanism) {
      qs("proc-mechanism").value = state.mechanism;
      updateProcedureLevel();
      activateLevel(2);
    }
  });

  updateProcedureLevel();
}

function getLabel(options, value) {
  return options.find((o) => o.value === value)?.label || value;
}

function procedureExampleHints(mechanism, justification) {
  const key = `${mechanism}:${justification}`;
  const map = {
    "vote:representation": ["General election", "Parliamentary vote", "Board election"],
    "market:efficiency": ["Auction allocation", "Token staking markets", "Price discovery block"],
    "examination:merit": ["Civil service exam", "Competitive recruitment", "Qualification screening"],
    "examination:need": ["Means-tested support allocation", "Eligibility-based access"],
    "kleros:fairness": ["Sortition for citizens' assembly", "Lottery tie-break", "Draft lottery"],
    "kleros:anticorruption": ["Lottery allocation to reduce patronage", "Randomized audit selection"],
  };
  return map[key] || MECHANISM_INFO[mechanism].examples.slice(0, 2);
}

function updateProcedureLevel() {
  const mechanism = qs("proc-mechanism").value;
  const justification = qs("proc-justification").value;
  const interpretation = qs("proc-interpretation").value;
  const purpose = qs("proc-purpose").value.trim();

  const mechLabel = getLabel(PROCEDURE_OPTIONS, mechanism);
  const justLabel = getLabel(PROCEDURE_JUSTIFICATIONS, justification);
  const interpLabel = getLabel(INTERPRETATION_OPTIONS, interpretation);

  const name = `${mechLabel} + ${justLabel}`;
  const summary = `Procedure narrative: use ${mechLabel} justified by ${justLabel.toLowerCase()} and interpreted in a ${interpLabel.toLowerCase()} regime.`;

  qs("procedure-name").textContent = name;
  qs("procedure-summary").textContent = summary;

  const notes = [
    `Why: ${justLabel}`,
    `Interpretation: ${interpLabel}`,
    purpose ? `Purpose: ${purpose}` : "Purpose: add a concrete context to make the narrative stronger.",
    ...procedureExampleHints(mechanism, justification),
  ];
  renderList(qs("procedure-notes"), notes, "No notes.");

  state.procedure = { mechanism, justification, interpretation, purpose, name };
  markComplete(2);
}

function initBlockLevel() {
  [1, 2, 3].forEach((n) => {
    fillSelect(qs(`step${n}-proc`), BLOCK_STEP_PROC_OPTIONS);
    fillSelect(qs(`step${n}-just`), BLOCK_STEP_JUST_OPTIONS);
  });

  qs("step1-proc").value = "kleros";
  qs("step1-just").value = "fairness";
  qs("step2-proc").value = "examination";
  qs("step2-just").value = "need";
  qs("step3-proc").value = "none";
  qs("step3-just").value = "none";

  [1, 2, 3].forEach((n) => {
    qs(`step${n}-proc`).addEventListener("change", () => {
      syncBlockStep(n);
      updateBlockLevel();
    });
    qs(`step${n}-just`).addEventListener("change", updateBlockLevel);
  });

  qs("block-randomize-btn").addEventListener("click", randomizeBlock);

  [1, 2, 3].forEach(syncBlockStep);
  updateBlockLevel();
}

function syncBlockStep(n) {
  const proc = qs(`step${n}-proc`).value;
  const just = qs(`step${n}-just`);
  if (proc === "none") {
    just.value = "none";
    just.disabled = true;
    return;
  }
  just.disabled = false;
  if (just.value === "none") {
    if (proc === "vote") just.value = "representation";
    else if (proc === "market") just.value = "efficiency";
    else if (proc === "examination") just.value = "merit";
    else if (proc === "kleros") just.value = "fairness";
  }
}

function getBlockSteps() {
  const steps = [];
  [1, 2, 3].forEach((n) => {
    const proc = qs(`step${n}-proc`).value;
    const just = qs(`step${n}-just`).value;
    if (proc !== "none" && just !== "none") {
      steps.push({ proc, just, token: `${proc}:${just}` });
    }
  });
  return steps;
}

function isSignatureMatch(tokens, libItem) {
  const sig = libItem.signature || [];
  if (tokens.length !== sig.length) return false;
  if (tokens.every((t, i) => t === sig[i])) return true;
  if (libItem.aliasSignature && tokens.every((t, i) => t === libItem.aliasSignature[i])) return true;
  return false;
}

function suggestBlockNames(tokens) {
  if (!tokens.length) return ["Start by choosing at least one step."];
  const procWords = tokens.map((t) => t.split(":")[0]);
  const unique = dedupe(procWords);
  const base = unique.map((p) => MECHANISM_INFO[p]?.label.split(" (")[0] || p).join(" + ");
  const suggestions = [
    `${base} Ladder`,
    `${base} Funnel`,
    `${base} Governance Block`,
  ];
  if (tokens[0].startsWith("kleros:") && tokens.some((t) => t.startsWith("examination:"))) {
    suggestions.push("Sortition Screening Block");
  }
  if (tokens.some((t) => t.startsWith("market:")) && tokens.some((t) => t.startsWith("vote:"))) {
    suggestions.push("Stake-and-Vote Cycle");
  }
  if (tokens.every((t) => t.startsWith("examination:"))) {
    suggestions.push("Criteria Gate Stack");
  }
  return dedupe(suggestions);
}

function updateBlockLevel() {
  const steps = getBlockSteps();
  const tokens = steps.map((s) => s.token);
  const signatureText = tokens.length ? tokens.join(" -> ") : "No steps selected";
  qs("block-signature").textContent = `Block signature: ${signatureText}`;

  const library = state.blockLibrary.length ? state.blockLibrary : BLOCK_LIBRARY;
  const known = library.filter((item) => isSignatureMatch(tokens, item));
  const knownItems = known.map((k) => `${k.name}: ${k.notes}`);
  renderList(qs("block-known-list"), knownItems, "No exact known block match yet.");

  const candidates = suggestBlockNames(tokens);
  renderList(qs("block-candidate-list"), candidates, "No candidates.");

  const bestName = known[0]?.name || candidates[0] || "Unnamed Block";
  qs("block-suggested-name").textContent = bestName;
  qs("block-match-status").textContent = known.length
    ? `Matched ${known.length} known block(s).`
    : "No exact match in the current library. This is a good candidate to populate.";

  state.block = { steps, tokens, name: bestName, knownMatches: known.map((k) => k.name) };
  markComplete(3);
}

function randomizeBlock() {
  const count = randomChoice([1, 2, 2, 3]);
  for (let i = 1; i <= 3; i += 1) {
    if (i > count) {
      qs(`step${i}-proc`).value = "none";
      qs(`step${i}-just`).value = "none";
      syncBlockStep(i);
      continue;
    }
    const proc = randomChoice(PROCEDURE_OPTIONS).value;
    qs(`step${i}-proc`).value = proc;
    syncBlockStep(i);
    const allowed = PROCEDURE_JUSTIFICATIONS.map((j) => j.value);
    qs(`step${i}-just`).value = randomChoice(allowed);
  }
  [1, 2, 3].forEach(syncBlockStep);
  updateBlockLevel();
}

function initPolityLevel() {
  const axisControls = {
    from: {
      scope: qs("from-scope"),
      procedure: qs("from-procedure"),
      subtype: qs("from-subtype"),
      summary: qs("from-summary"),
    },
    for: {
      scope: qs("for-scope"),
      procedure: qs("for-procedure"),
      subtype: qs("for-subtype"),
      summary: qs("for-summary"),
    },
  };

  state.axisControls = axisControls;

  for (const side of Object.values(axisControls)) {
    fillSelect(side.scope, SCOPE_OPTIONS);
    fillSelect(side.procedure, PROCEDURE_OPTIONS);
    fillSelect(side.subtype, SUBTYPE_OPTIONS);
  }

  setAxisState("from", { scope: "few", procedure: "vote", subtype: "vote" });
  setAxisState("for", { scope: "many", procedure: "vote", subtype: "vote" });

  ["from", "for"].forEach((sideName) => {
    const side = axisControls[sideName];
    side.scope.addEventListener("change", () => {
      syncAxisUI(sideName);
      updatePolityLevel();
    });
    side.procedure.addEventListener("change", () => {
      syncAxisUI(sideName);
      updatePolityLevel();
    });
    side.subtype.addEventListener("change", () => {
      syncAxisUI(sideName);
      updatePolityLevel();
    });
  });

  qs("randomize-btn").addEventListener("click", () => {
    setAxisState("from", randomAxisState());
    setAxisState("for", randomAxisState());
    updatePolityLevel();
  });

  updatePolityLevel();
}

function setAxisState(sideName, stateValue) {
  const side = state.axisControls[sideName];
  side.scope.value = stateValue.scope;
  side.procedure.value = stateValue.procedure;
  side.subtype.value = stateValue.subtype;
  syncAxisUI(sideName);
}

function syncAxisUI(sideName) {
  const side = state.axisControls[sideName];
  const scope = side.scope.value;
  const procedure = side.procedure.value;

  if (scope === "one" || scope === "many") {
    side.procedure.value = "vote";
    side.subtype.value = "vote";
    side.procedure.disabled = true;
    side.subtype.disabled = true;
  } else {
    side.procedure.disabled = false;
    if (procedure === "examination") {
      side.subtype.disabled = false;
      if (!["birth", "cooptation", "merit"].includes(side.subtype.value)) side.subtype.value = "birth";
    } else {
      side.subtype.value = procedure;
      side.subtype.disabled = true;
    }
  }

  side.summary.textContent = summarizeAxis(sideName);
}

function getAxisSelection(sideName) {
  const side = state.axisControls[sideName];
  return {
    scope: side.scope.value,
    procedure: side.procedure.value,
    subtype: side.subtype.value,
  };
}

function axisKeyFromSelection(selection) {
  if (selection.scope === "one") return "one";
  if (selection.scope === "many") return "many";
  if (selection.procedure === "vote") return "few_vote";
  if (selection.procedure === "market") return "few_market";
  if (selection.procedure === "kleros") return "few_kleros";
  if (selection.procedure === "examination") {
    if (selection.subtype === "birth") return "few_birth";
    if (selection.subtype === "cooptation") return "few_cooptation";
    return "few_merit";
  }
  return "few_vote";
}

function summarizeAxis(sideName) {
  const s = getAxisSelection(sideName);
  if (s.scope === "one") return "Canonical axis key: One / One / One";
  if (s.scope === "many") return "Canonical axis key: Many / All / Many / All / Many / All (collapsed endpoint).";
  if (s.procedure === "examination") {
    return `Canonical axis key: Some/Few / Examination / ${getLabel(SUBTYPE_OPTIONS, s.subtype)}`;
  }
  const proc = getLabel(PROCEDURE_OPTIONS, s.procedure);
  return `Canonical axis key: Some/Few / ${proc} / ${proc.split(" (")[0]}`;
}

function randomAxisState() {
  const scope = randomChoice(["one", "few", "many"]);
  if (scope !== "few") return { scope, procedure: "vote", subtype: "vote" };
  const procedure = randomChoice(["vote", "market", "examination", "kleros"]);
  if (procedure === "examination") {
    return { scope, procedure, subtype: randomChoice(["birth", "cooptation", "merit"]) };
  }
  return { scope, procedure, subtype: procedure };
}

function updatePolityLevel() {
  const fromKey = axisKeyFromSelection(getAxisSelection("from"));
  const forKey = axisKeyFromSelection(getAxisSelection("for"));
  const polity = POLITY_MATRIX[forKey]?.[fromKey] ?? "";

  qs("result-name").textContent = polity || "Unnamed / Blank Cell";
  qs("result-status").textContent = polity ? TABLE_NOTES.filled : TABLE_NOTES.empty;
  qs("from-pill").textContent = `From: ${AXIS_LABELS[fromKey]}`;
  qs("for-pill").textContent = `For: ${AXIS_LABELS[forKey]}`;

  const exactNotes = polity
    ? [polity, TABLE_NOTES.filled]
    : [TABLE_NOTES.empty, "Use this blank cell as a design prompt for a new ideal type."];
  renderList(qs("table-notes"), exactNotes, "No notes.");

  const comboKey = `${forKey}|${fromKey}`;
  const extras = [];
  if (EXTRA_EXAMPLES[comboKey]) extras.push(...EXTRA_EXAMPLES[comboKey]);
  if (AXIS_EXTRA_EXAMPLES[fromKey]) extras.push(...AXIS_EXTRA_EXAMPLES[fromKey]);
  if (AXIS_EXTRA_EXAMPLES[forKey]) extras.push(...AXIS_EXTRA_EXAMPLES[forKey]);
  renderList(qs("extra-examples"), dedupe(extras), "No extra examples attached to this combination yet.");

  state.polity = { fromKey, forKey, name: polity || "Unnamed / Blank Cell" };
  markComplete(4);
}

function initBoxLevel() {
  qs("add-procedure-btn").addEventListener("click", () => {
    if (!state.procedure) return;
    pushBoxItem(`Procedure: ${state.procedure.name}`);
    markComplete(5);
  });
  qs("add-block-btn").addEventListener("click", () => {
    if (!state.block) return;
    pushBoxItem(`Block: ${state.block.name} [${state.block.tokens.join(" -> ") || "empty"}]`);
    markComplete(5);
  });
  qs("add-polity-btn").addEventListener("click", () => {
    if (!state.polity) return;
    pushBoxItem(`Polity: ${state.polity.name} (${state.polity.forKey} x ${state.polity.fromKey})`);
    markComplete(5);
  });
  qs("box-name-btn").addEventListener("click", generateBoxName);
  qs("box-surprise-btn").addEventListener("click", surpriseBoxName);
  qs("box-clear-btn").addEventListener("click", () => {
    state.boxItems = [];
    qs("box-name").textContent = "";
    qs("box-tagline").textContent = "Box cleared.";
    renderBoxItems();
  });
  qs("box-theme").addEventListener("input", () => {
    if (qs("box-name").textContent) generateBoxName();
  });

  initLlmBoxGenerator();
  renderBoxItems();
}

function pushBoxItem(label) {
  if (!state.boxItems.includes(label)) state.boxItems.push(label);
  renderBoxItems();
  if (qs("print-card-title")) refreshPrintCard();
}

function renderBoxItems() {
  renderList(qs("box-items"), state.boxItems, "No pieces in the box yet. Add items from Levels 2-4.");
}

function generateBoxName() {
  const theme = qs("box-theme").value.trim();
  const seedWords = [];
  if (state.polity?.name) seedWords.push(state.polity.name.split("/")[0].trim());
  if (state.block?.name) seedWords.push(state.block.name.replace(" Block", ""));
  if (state.procedure?.mechanism) seedWords.push(MECHANISM_INFO[state.procedure.mechanism].label.split(" (")[0]);

  const prefix = randomChoice(BOX_NAME_PREFIXES);
  const suffix = randomChoice(BOX_NAME_SUFFIXES);
  const middle = dedupe(seedWords).slice(0, 2).join(" + ");

  let name = prefix;
  if (middle) name += `: ${middle}`;
  if (theme) name += ` (${theme})`;
  name += ` - ${suffix}`;

  const pieceCount = state.boxItems.length;
  const tagline = pieceCount
    ? `${pieceCount} piece(s). Pitch it using inclusion, deliberation, relevance, and fairness.`
    : "Add procedure/block/polity pieces to make this box concrete.";

  qs("box-name").textContent = name;
  qs("box-tagline").textContent = tagline;
  if (qs("print-card-title")) refreshPrintCard();
  markComplete(5);
}

function surpriseBoxName() {
  pushBoxItem(`Surprise card: ${randomChoice(["No Kings Clause", "Transparency Booster", "Deliberation Snack Pack", "Anti-Capture Shield"])}`);
  qs("box-theme").value = qs("box-theme").value || randomChoice([
    "Neighborhood Budgeting",
    "Climate Adaptation",
    "DAO Treasury",
    "School Governance",
  ]);
  generateBoxName();
}

function initLlmBoxGenerator() {
  loadLlmSettings();
  qs("llm-build-prompt-btn").addEventListener("click", () => {
    const prompt = buildLlmBoxPrompt();
    qs("llm-prompt-preview").value = prompt;
    qs("llm-status").textContent = "Prompt built from current procedure, block, polity, and box contents.";
  });
  qs("llm-fallback-btn").addEventListener("click", () => {
    const draft = generateLocalBoxDraft();
    renderLlmBoxDraft(draft, { source: "Local draft generator" });
    qs("llm-status").textContent = "Local draft generated (no API call).";
  });
  qs("llm-generate-btn").addEventListener("click", generateWithLLM);
  qs("llm-save-settings-btn").addEventListener("click", saveLlmSettings);
  qs("llm-clear-settings-btn").addEventListener("click", clearLlmSettings);
  qs("llm-apply-to-box-btn").addEventListener("click", applyLlmDraftToBox);
  qs("llm-copy-json-btn").addEventListener("click", copyLlmDraftJson);
  ["box-theme", "llm-style-notes"].forEach((id) => {
    qs(id).addEventListener("input", () => {
      qs("llm-prompt-preview").value = buildLlmBoxPrompt();
    });
  });
  qs("llm-prompt-preview").value = buildLlmBoxPrompt();
  qs("llm-status").textContent = "Configure API settings to use an LLM, or use Local Draft.";
}

function getLlmSettings() {
  return {
    endpoint: qs("llm-endpoint").value.trim(),
    model: qs("llm-model").value.trim(),
    apiKey: qs("llm-api-key").value.trim(),
    apiMode: qs("llm-api-mode").value,
    temperature: Number.parseFloat(qs("llm-temperature").value || "0.9"),
  };
}

function saveLlmSettings() {
  const cfg = getLlmSettings();
  try {
    localStorage.setItem("decisionLego.llmSettings", JSON.stringify({
      endpoint: cfg.endpoint,
      model: cfg.model,
      apiKey: cfg.apiKey,
      apiMode: cfg.apiMode,
      temperature: Number.isFinite(cfg.temperature) ? cfg.temperature : 0.9,
    }));
    qs("llm-status").textContent = "LLM settings saved in localStorage for this browser.";
  } catch (err) {
    qs("llm-status").textContent = `Could not save settings: ${err.message}`;
  }
}

function loadLlmSettings() {
  try {
    const raw = localStorage.getItem("decisionLego.llmSettings");
    if (!raw) return;
    const cfg = JSON.parse(raw);
    if (cfg.endpoint) qs("llm-endpoint").value = cfg.endpoint;
    if (cfg.model) qs("llm-model").value = cfg.model;
    if (cfg.apiKey) qs("llm-api-key").value = cfg.apiKey;
    if (cfg.apiMode) qs("llm-api-mode").value = cfg.apiMode;
    if (cfg.temperature != null) qs("llm-temperature").value = String(cfg.temperature);
  } catch {
    // Ignore localStorage issues.
  }
}

function clearLlmSettings() {
  ["llm-endpoint", "llm-model", "llm-api-key"].forEach((id) => { qs(id).value = ""; });
  qs("llm-api-mode").value = "chat_completions";
  qs("llm-temperature").value = "0.9";
  try {
    localStorage.removeItem("decisionLego.llmSettings");
  } catch {
    // Ignore localStorage issues.
  }
  qs("llm-status").textContent = "LLM settings cleared.";
}

function buildCurrentBoxContext() {
  const theme = qs("box-theme").value.trim();
  const styleNotes = qs("llm-style-notes").value.trim();
  return {
    theme,
    styleNotes,
    mechanism: state.mechanism ? MECHANISM_INFO[state.mechanism].label : "",
    procedure: state.procedure || null,
    block: state.block || null,
    polity: state.polity || null,
    boxItems: [...state.boxItems],
    currentBoxName: qs("box-name").textContent.trim(),
    currentBoxTagline: qs("box-tagline").textContent.trim(),
  };
}

function buildLlmBoxPrompt() {
  const ctx = buildCurrentBoxContext();
  const instruction = [
    "You are a creative packaging copywriter and game designer.",
    "Generate a construction-brick toy box concept for a serious governance-design game (LEGO-box vibe, but original wording and branding).",
    "Output ONLY valid JSON with these keys:",
    "{title, tagline, front_blurb, back_blurb, features, play_modes, components, art_direction_prompt, mascot, warnings, age_band}.",
    "Constraints:",
    "- Tone: playful, intelligent, civic, slightly funny.",
    "- Make the box feel like a premium toy strategy set.",
    "- Include 4-8 feature bullets and 3-6 components.",
    "- Mention governance/design concepts without being jargon-heavy.",
    "- If context is sparse, invent plausible details but stay coherent.",
  ].join("\n");
  return `${instruction}\n\nCONTEXT:\n${JSON.stringify(ctx, null, 2)}`;
}

function generateLocalBoxDraft() {
  const ctx = buildCurrentBoxContext();
  const title = qs("box-name").textContent.trim() || generateProceduralBoxTitle();
  const polityName = ctx.polity?.name || "Hybrid Polity";
  const blockName = ctx.block?.name || "Custom Governance Block";
  const procedureName = ctx.procedure?.name || "Procedure Mix";
  const theme = ctx.theme || "General civic governance challenge";
  const features = dedupe([
    "Progressive learning levels from mechanism to polity",
    "Procedural block composition and naming",
    "Polity matrix mapping from the page-11 typology",
    "Workshop-ready challenge and debate prompts",
    ctx.procedure ? `Includes procedure framing around ${ctx.procedure.justification}` : "",
    ctx.block ? `Built around block pattern: ${blockName}` : "",
  ].filter(Boolean));
  const components = dedupe([
    "Mechanism clue cards",
    "Procedure narrative cards",
    "Procedural block tiles",
    "Polity matrix board",
    "Debrief prompts",
    ...ctx.boxItems.slice(0, 4),
  ]);
  return {
    title,
    tagline: `Build, stress-test, and pitch governance systems for ${theme}.`,
    front_blurb: `A serious-play construction set for designing decision procedures, procedural blocks, and whole polities. Combine mechanisms, justifications, and civic narratives to build systems that can survive critique.`,
    back_blurb: `Start with the four core mechanisms. Add justification and interpretation. Stack procedural blocks. Map the result to a polity. Then give your governance architecture a memorable box identity and pitch it to a skeptical assembly.`,
    features,
    play_modes: [
      "Solo design studio",
      "Team workshop sprint",
      "Facilitated civic consultation prototype",
    ],
    components,
    art_direction_prompt: `Construction-toy strategy game box illustration, civic governance theme, ${polityName}, ${blockName}, ${procedureName}, vibrant modular bricks, map-like overlays, premium packaging composition, bold typography, playful but serious, front-of-box hero render, no trademarked logos`,
    mascot: randomChoice(["The Procedural Otter", "Minister Brickson", "Captain Sortition", "Audit Fox", "The Deliberation Owl"]),
    warnings: [
      "May trigger constitutional redesign impulses",
      "Contains small abstractions",
      "Debriefing recommended",
    ],
    age_band: "14+ (or any age with facilitation)",
  };
}

function generateProceduralBoxTitle() {
  const prefix = randomChoice(BOX_NAME_PREFIXES);
  const suffix = randomChoice(BOX_NAME_SUFFIXES);
  const theme = qs("box-theme").value.trim();
  return theme ? `${prefix} (${theme}) - ${suffix}` : `${prefix} - ${suffix}`;
}

async function generateWithLLM() {
  const cfg = getLlmSettings();
  const prompt = buildLlmBoxPrompt();
  qs("llm-prompt-preview").value = prompt;
  qs("llm-status").textContent = "Generating with LLM...";

  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) {
    const draft = generateLocalBoxDraft();
    renderLlmBoxDraft(draft, { source: "Local draft generator (LLM settings missing)" });
    qs("llm-status").textContent = "Missing endpoint/model/api key. Generated local draft instead.";
    return;
  }

  try {
    const text = await callOpenAiCompatible(cfg, prompt);
    const parsed = parseLlmDraft(text);
    renderLlmBoxDraft(parsed, { source: `LLM (${cfg.model})` });
    qs("llm-status").textContent = `LLM generation complete via ${cfg.apiMode}.`;
  } catch (err) {
    const fallback = generateLocalBoxDraft();
    renderLlmBoxDraft(fallback, { source: `Fallback after error: ${err.message}` });
    qs("llm-status").textContent = `LLM call failed (${err.message}). Local draft generated instead.`;
  }
}

async function callOpenAiCompatible(cfg, prompt) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${cfg.apiKey}`,
  };

  let payload;
  if (cfg.apiMode === "responses") {
    payload = {
      model: cfg.model,
      temperature: Number.isFinite(cfg.temperature) ? cfg.temperature : 0.9,
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        },
      ],
    };
  } else {
    payload = {
      model: cfg.model,
      temperature: Number.isFinite(cfg.temperature) ? cfg.temperature : 0.9,
      messages: [
        { role: "system", content: "Return only valid JSON. No markdown." },
        { role: "user", content: prompt },
      ],
    };
  }

  const resp = await fetch(cfg.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${body.slice(0, 200)}`);
  }
  const data = await resp.json();
  return extractTextFromLlmResponse(data, cfg.apiMode);
}

function extractTextFromLlmResponse(data, mode) {
  if (mode === "responses") {
    if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text;
    if (Array.isArray(data.output)) {
      const parts = [];
      for (const item of data.output) {
        if (!Array.isArray(item.content)) continue;
        for (const c of item.content) {
          if (c.type === "output_text" && c.text) parts.push(c.text);
          if (c.type === "text" && c.text) parts.push(c.text);
        }
      }
      if (parts.length) return parts.join("\n");
    }
  } else {
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text === "string") return text;
    if (Array.isArray(text)) {
      return text.map((p) => p.text || p.content || "").join("\n");
    }
  }
  throw new Error("Could not extract text from LLM response.");
}

function parseLlmDraft(text) {
  const trimmed = String(text || "").trim();
  const raw = extractJsonObjectString(trimmed) || trimmed;
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (err) {
    throw new Error(`JSON parse error: ${err.message}`);
  }
  return normalizeLlmDraft(obj);
}

function extractJsonObjectString(s) {
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first >= 0 && last > first) return s.slice(first, last + 1);
  return "";
}

function normalizeStringArray(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  return value.map((x) => String(x).trim()).filter(Boolean);
}

function normalizeLlmDraft(obj) {
  return {
    title: String(obj.title || "Untitled Governance Box").trim(),
    tagline: String(obj.tagline || "").trim(),
    front_blurb: String(obj.front_blurb || obj.frontBlurb || "").trim(),
    back_blurb: String(obj.back_blurb || obj.backBlurb || "").trim(),
    features: normalizeStringArray(obj.features, []),
    play_modes: normalizeStringArray(obj.play_modes || obj.playModes, []),
    components: normalizeStringArray(obj.components, []),
    art_direction_prompt: String(obj.art_direction_prompt || obj.artDirectionPrompt || "").trim(),
    mascot: String(obj.mascot || "").trim(),
    warnings: normalizeStringArray(obj.warnings, []),
    age_band: String(obj.age_band || obj.ageBand || "").trim(),
  };
}

function renderLlmBoxDraft(draft, meta = {}) {
  state.llmBoxDraft = draft;
  qs("llm-box-title").textContent = draft.title || "";
  qs("llm-box-tagline").textContent = [draft.tagline, meta.source ? `Source: ${meta.source}` : ""].filter(Boolean).join(" | ");

  const copyItems = [
    draft.front_blurb ? `Front: ${draft.front_blurb}` : "",
    draft.back_blurb ? `Back: ${draft.back_blurb}` : "",
    draft.mascot ? `Mascot: ${draft.mascot}` : "",
    draft.age_band ? `Age: ${draft.age_band}` : "",
    ...draft.warnings.map((w) => `Warning: ${w}`),
  ].filter(Boolean);
  renderList(qs("llm-copy-list"), copyItems, "No generated copy yet.");

  const featureItems = [
    ...draft.features.map((f) => `Feature: ${f}`),
    ...draft.play_modes.map((m) => `Mode: ${m}`),
    ...draft.components.map((c) => `Component: ${c}`),
  ];
  renderList(qs("llm-features-list"), featureItems, "No generated features yet.");

  qs("llm-art-prompt").value = draft.art_direction_prompt || "";
  qs("llm-json-preview").textContent = JSON.stringify(draft, null, 2);
  if (qs("print-card-title")) refreshPrintCard();
}

function applyLlmDraftToBox() {
  const draft = state.llmBoxDraft;
  if (!draft) {
    qs("llm-status").textContent = "No generated draft to apply yet.";
    return;
  }
  qs("box-name").textContent = draft.title || qs("box-name").textContent;
  qs("box-tagline").textContent = draft.tagline || qs("box-tagline").textContent;

  draft.components.slice(0, 8).forEach((c) => pushBoxItem(`LLM Component: ${c}`));
  if (draft.features[0]) pushBoxItem(`LLM Feature: ${draft.features[0]}`);
  if (draft.play_modes[0]) pushBoxItem(`LLM Mode: ${draft.play_modes[0]}`);

  if (!qs("box-theme").value && draft.title) {
    qs("box-theme").value = draft.title;
  }
  qs("llm-status").textContent = "Generated box title/tagline/components applied to current box.";
  markComplete(5);
}

async function copyLlmDraftJson() {
  if (!state.llmBoxDraft) {
    qs("llm-status").textContent = "No generated JSON to copy yet.";
    return;
  }
  const text = JSON.stringify(state.llmBoxDraft, null, 2);
  try {
    await navigator.clipboard.writeText(text);
    qs("llm-status").textContent = "Generated JSON copied to clipboard.";
  } catch {
    qs("llm-status").textContent = "Clipboard copy failed (browser restriction). You can copy from the JSON preview.";
  }
}

function ensureSharedDefaults() {
  if (!state.challengeCards.length && Shared.CHALLENGE_CARDS) state.challengeCards = Shared.CHALLENGE_CARDS.slice();
  if (!state.debriefCards.length && Shared.DEBRIEF_CARDS) state.debriefCards = Shared.DEBRIEF_CARDS.slice();
  state.blockLibrary = dedupeBlockLibrary([
    ...BLOCK_LIBRARY,
    ...((Shared.EXAMPLE_BLOCKS || []).map((b) => ({
      name: b.name,
      signature: b.steps,
      notes: `Shared content pack example (${b.category || "general"})`,
    }))),
  ]);
}

function dedupeBlockLibrary(items) {
  const seen = new Set();
  return items.filter((it) => {
    const sig = (it.signature || []).join("|");
    const key = `${it.name}::${sig}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function initStressTestCards() {
  qs("draw-challenge-btn").addEventListener("click", drawChallengeCard);
  qs("draw-debrief-btn").addEventListener("click", drawDebriefCard);
  drawChallengeCard();
  drawDebriefCard();
}

function drawChallengeCard() {
  const cards = state.challengeCards.length ? state.challengeCards : (Shared.CHALLENGE_CARDS || []);
  const card = randomChoice(cards);
  if (!card) return;
  qs("challenge-title").textContent = card.title || "Challenge";
  qs("challenge-effect").textContent = card.effect || "";
  renderList(qs("challenge-tags"), (card.tags || []).map((t) => `Tag: ${t}`), "No tags.");
}

function drawDebriefCard() {
  const cards = state.debriefCards.length ? state.debriefCards : (Shared.DEBRIEF_CARDS || []);
  const card = randomChoice(cards);
  if (!card) return;
  qs("debrief-prompt").textContent = card.prompt || "Reflect on your design.";
}

function initMixedPolityMode() {
  qs("apply-current-polity-btn").addEventListener("click", () => {
    const slot = qs("mixed-target-institution").value;
    if (!state.polity) return;
    state.mixedPolity[slot] = {
      name: state.polity.name,
      fromKey: state.polity.fromKey,
      forKey: state.polity.forKey,
    };
    renderMixedPolity();
  });
  qs("mixed-randomize-btn").addEventListener("click", randomizeMixedPolity);
  qs("mixed-reset-btn").addEventListener("click", () => {
    state.mixedPolity = { agenda: null, deliberation: null, decision: null, execution: null, oversight: null };
    renderMixedPolity();
  });
  renderMixedPolity();
}

function allPolityOptionsFlat() {
  const options = [];
  for (const forKey of Object.keys(POLITY_MATRIX)) {
    for (const fromKey of Object.keys(POLITY_MATRIX[forKey])) {
      const name = POLITY_MATRIX[forKey][fromKey];
      if (name) options.push({ name, forKey, fromKey });
    }
  }
  return options;
}

function randomizeMixedPolity() {
  const options = allPolityOptionsFlat();
  ["agenda", "deliberation", "decision", "execution", "oversight"].forEach((slot) => {
    state.mixedPolity[slot] = randomChoice(options);
  });
  renderMixedPolity();
}

function renderMixedPolity() {
  const labels = {
    agenda: "Agenda Setting",
    deliberation: "Deliberation Chamber",
    decision: "Decision / Aggregation",
    execution: "Execution / Administration",
    oversight: "Oversight / Appeals",
  };
  const items = [];
  let filled = 0;
  for (const key of Object.keys(labels)) {
    const val = state.mixedPolity[key];
    if (val) {
      filled += 1;
      items.push(`${labels[key]}: ${val.name} (${val.forKey} x ${val.fromKey})`);
    } else {
      items.push(`${labels[key]}: [empty]`);
    }
  }
  renderList(qs("mixed-polity-list"), items, "No institutions assigned yet.");
  qs("mixed-polity-summary").textContent = filled
    ? `${filled}/5 institutions assigned. Use this to model mixed constitutions or hybrid governance ecosystems.`
    : "Assign the current polity result (or randomize) to compose a mixed governance architecture.";
}

function currentPackSnapshot() {
  return {
    name: state.contentPackMeta.name || "Custom Pack",
    version: state.contentPackMeta.version || "1.0",
    challengeCards: state.challengeCards,
    debriefCards: state.debriefCards,
    blocks: state.blockLibrary.map((b) => ({
      name: b.name,
      steps: b.signature || [],
      notes: b.notes || "",
    })),
  };
}

function packToEditableJson(pack) {
  return JSON.stringify(pack, null, 2);
}

function initContentPacksAndExports() {
  const packs = Shared.CONTENT_PACKS || {};
  qs("pack-load-core-btn").addEventListener("click", () => loadNamedPack("core", packs.core));
  qs("pack-load-climate-btn").addEventListener("click", () => loadNamedPack("climate", packs.climate));
  qs("pack-load-dao-btn").addEventListener("click", () => loadNamedPack("dao", packs.dao));
  qs("pack-save-local-btn").addEventListener("click", savePackToLocal);
  qs("pack-load-local-btn").addEventListener("click", loadPackFromLocal);
  qs("pack-reset-btn").addEventListener("click", resetPacksToDefault);
  qs("pack-apply-json-btn").addEventListener("click", applyPackJsonText);
  qs("pack-copy-json-btn").addEventListener("click", copyPackJsonText);

  qs("export-box-json-btn").addEventListener("click", exportBoxAsJson);
  qs("export-box-md-btn").addEventListener("click", exportBoxAsMarkdown);
  qs("print-box-card-btn").addEventListener("click", printBoxCard);

  qs("pack-json-text").value = packToEditableJson(currentPackSnapshot());
  refreshPrintCard();
}

function loadNamedPack(key, pack) {
  if (!pack) {
    qs("pack-status").textContent = `Pack '${key}' not available.`;
    return;
  }
  applyPackObject(pack, { source: `shared:${key}` });
  qs("pack-status").textContent = `Loaded ${pack.name} (${pack.version || "1.0"}).`;
}

function applyPackObject(pack, meta = {}) {
  state.contentPackMeta = { name: pack.name || "Custom Pack", version: pack.version || "1.0", source: meta.source || "manual" };
  if (Array.isArray(pack.challengeCards)) state.challengeCards = pack.challengeCards.slice();
  if (Array.isArray(pack.debriefCards)) state.debriefCards = pack.debriefCards.slice();
  if (Array.isArray(pack.blocks)) {
    const packBlocks = pack.blocks.map((b) => ({
      name: b.name,
      signature: b.steps || b.signature || [],
      notes: b.notes || `Imported from ${state.contentPackMeta.name}`,
    }));
    state.blockLibrary = dedupeBlockLibrary([...BLOCK_LIBRARY, ...packBlocks]);
  }
  qs("pack-json-text").value = packToEditableJson(currentPackSnapshot());
  drawChallengeCard();
  drawDebriefCard();
  updateBlockLevel();
}

function savePackToLocal() {
  try {
    localStorage.setItem("decisionLego.contentPack", qs("pack-json-text").value);
    qs("pack-status").textContent = "Pack JSON saved in localStorage.";
  } catch (err) {
    qs("pack-status").textContent = `Could not save pack: ${err.message}`;
  }
}

function loadPackFromLocal() {
  try {
    const raw = localStorage.getItem("decisionLego.contentPack");
    if (!raw) {
      qs("pack-status").textContent = "No saved local pack found.";
      return;
    }
    qs("pack-json-text").value = raw;
    applyPackJsonText();
  } catch (err) {
    qs("pack-status").textContent = `Could not load local pack: ${err.message}`;
  }
}

function resetPacksToDefault() {
  ensureSharedDefaults();
  state.contentPackMeta = { name: "Core+Local Defaults", version: "1.0" };
  qs("pack-json-text").value = packToEditableJson(currentPackSnapshot());
  qs("pack-status").textContent = "Reset to default shared/local cards and block library.";
  drawChallengeCard();
  drawDebriefCard();
  updateBlockLevel();
}

function applyPackJsonText() {
  try {
    const pack = JSON.parse(qs("pack-json-text").value);
    applyPackObject(pack, { source: "json" });
    qs("pack-status").textContent = "Pack JSON applied.";
  } catch (err) {
    qs("pack-status").textContent = `Invalid pack JSON: ${err.message}`;
  }
}

async function copyPackJsonText() {
  try {
    await navigator.clipboard.writeText(qs("pack-json-text").value);
    qs("pack-status").textContent = "Pack JSON copied.";
  } catch {
    qs("pack-status").textContent = "Clipboard unavailable. Copy manually from the textarea.";
  }
}

function buildCurrentBoxExport() {
  const llm = state.llmBoxDraft;
  return {
    title: (llm && llm.title) || qs("box-name").textContent || "Governance Lego Box",
    tagline: (llm && llm.tagline) || qs("box-tagline").textContent || "",
    components: llm?.components?.length ? llm.components : state.boxItems,
    features: llm?.features || [
      "Mechanism identification",
      "Procedure framing",
      "Procedural block composition",
      "Polity mapping",
      "Workshop debrief and stress testing",
    ],
    play_modes: llm?.play_modes || ["Studio", "Workshop", "Facilitated session"],
    front_blurb: llm?.front_blurb || "",
    back_blurb: llm?.back_blurb || "",
    art_direction_prompt: llm?.art_direction_prompt || "",
    metadata: {
      procedure: state.procedure,
      block: state.block,
      polity: state.polity,
      mixedPolity: state.mixedPolity,
      contentPack: state.contentPackMeta,
    },
  };
}

function exportBoxAsJson() {
  const payload = buildCurrentBoxExport();
  const text = JSON.stringify(payload, null, 2);
  qs("export-preview").value = text;
  qs("export-status").textContent = "JSON export generated.";
  refreshPrintCard();
}

function exportBoxAsMarkdown() {
  const payload = buildCurrentBoxExport();
  const md = Shared.exportMarkdownBox
    ? Shared.exportMarkdownBox(payload)
    : `# ${payload.title}\n\n${payload.tagline}\n`;
  qs("export-preview").value = md;
  qs("export-status").textContent = "Markdown export generated.";
  refreshPrintCard();
}

function refreshPrintCard() {
  const payload = buildCurrentBoxExport();
  qs("print-card-title").textContent = payload.title;
  qs("print-card-tagline").textContent = payload.tagline;
  const items = [
    ...payload.components.slice(0, 6).map((c) => `Component: ${c}`),
    ...payload.features.slice(0, 4).map((f) => `Feature: ${f}`),
  ];
  renderList(qs("print-card-items"), items, "No box content yet.");
}

function printBoxCard() {
  refreshPrintCard();
  qs("export-status").textContent = "Opening print dialog for the card preview.";
  window.print();
}

function initFacilitatorMode() {
  qs("facilitator-start-btn").addEventListener("click", startFacilitatorTimer);
  qs("facilitator-stop-btn").addEventListener("click", stopFacilitatorTimer);
  qs("facilitator-reset-btn").addEventListener("click", resetFacilitatorTimer);
  qs("facilitator-next-round-btn").addEventListener("click", nextFacilitatorRound);
  qs("facilitator-build-scoreboard-btn").addEventListener("click", buildScoreboard);
  qs("facilitator-score-random-btn").addEventListener("click", sampleScores);
  ["facilitator-minutes", "facilitator-teams"].forEach((id) => {
    qs(id).addEventListener("input", () => {
      if (!state.facilitator.running) resetFacilitatorTimer(false);
    });
  });
  renderFacilitatorPhaseList();
  resetFacilitatorTimer(false);
  buildScoreboard();
}

function facilitatorMinutes() {
  const n = Number.parseInt(qs("facilitator-minutes").value || "10", 10);
  return Number.isFinite(n) && n > 0 ? n : 10;
}

function setFacilitatorTimerDisplay() {
  const sec = Math.max(0, state.facilitator.remainingSec);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  qs("facilitator-timer").textContent = `${mm}:${ss}`;
}

function startFacilitatorTimer() {
  if (state.facilitator.running) return;
  state.facilitator.running = true;
  qs("facilitator-round-status").textContent = `Round ${state.facilitator.round} running.`;
  state.facilitator.intervalId = window.setInterval(() => {
    state.facilitator.remainingSec -= 1;
    setFacilitatorTimerDisplay();
    if (state.facilitator.remainingSec <= 0) {
      stopFacilitatorTimer();
      qs("facilitator-round-status").textContent = `Round ${state.facilitator.round} complete. Draw a challenge or debrief and move to next round.`;
    }
  }, 1000);
}

function stopFacilitatorTimer() {
  if (state.facilitator.intervalId) {
    clearInterval(state.facilitator.intervalId);
    state.facilitator.intervalId = null;
  }
  state.facilitator.running = false;
}

function resetFacilitatorTimer(updateStatus = true) {
  stopFacilitatorTimer();
  state.facilitator.remainingSec = facilitatorMinutes() * 60;
  setFacilitatorTimerDisplay();
  if (updateStatus) {
    qs("facilitator-round-status").textContent = `Round ${state.facilitator.round} reset.`;
  } else {
    qs("facilitator-round-status").textContent = `Ready for round ${state.facilitator.round}.`;
  }
}

function nextFacilitatorRound() {
  stopFacilitatorTimer();
  state.facilitator.round += 1;
  resetFacilitatorTimer();
  drawChallengeCard();
  drawDebriefCard();
}

function renderFacilitatorPhaseList() {
  const phases = state.facilitator.phases.map((p, i) => `${i + 1}. ${p}`);
  renderList(qs("facilitator-phase-list"), phases, "No phases configured.");
}

function parseTeams() {
  return qs("facilitator-teams").value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildScoreboard() {
  const teams = parseTeams();
  const wrap = qs("scoreboard-table-wrap");
  if (!teams.length) {
    wrap.innerHTML = "<p class='empty'>Add at least one team name.</p>";
    return;
  }
  const criteria = ["coherence", "inclusion", "deliberation", "relevance", "fairness"];
  const header = ["Team", ...criteria, "Total"];
  let html = "<table><thead><tr>";
  html += header.map((h) => `<th>${h}</th>`).join("");
  html += "</tr></thead><tbody>";
  for (const t of teams) {
    html += `<tr data-team="${t}"><td>${t}</td>`;
    for (const c of criteria) {
      html += `<td><input type="text" data-crit="${c}" value="0"></td>`;
    }
    html += `<td class="score-total">0</td></tr>`;
  }
  html += "</tbody></table>";
  wrap.innerHTML = html;
  wrap.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", recomputeScoreboardTotals);
  });
  recomputeScoreboardTotals();
}

function recomputeScoreboardTotals() {
  qs("scoreboard-table-wrap").querySelectorAll("tbody tr").forEach((row) => {
    let total = 0;
    row.querySelectorAll("input").forEach((i) => {
      const n = Number.parseInt(i.value || "0", 10);
      total += Number.isFinite(n) ? n : 0;
    });
    const cell = row.querySelector(".score-total");
    if (cell) cell.textContent = String(total);
  });
}

function sampleScores() {
  qs("scoreboard-table-wrap").querySelectorAll("input").forEach((i) => {
    i.value = String(Math.floor(Math.random() * 6));
  });
  recomputeScoreboardTotals();
}

function initBlockAndProcedureBridge() {
  // Optional quality-of-life: clicking Level 3 random or edits can seed procedure if empty.
  if (!state.procedure) return;
}

function initAll() {
  ensureSharedDefaults();
  initLevelTabs();
  renderProgressBadges();
  initMechanismLevel();
  initProcedureLevel();
  initBlockLevel();
  initStressTestCards();
  initPolityLevel();
  initMixedPolityMode();
  initBoxLevel();
  initContentPacksAndExports();
  initFacilitatorMode();
  initBlockAndProcedureBridge();
  activateLevel(1);
}

initAll();
