(function () {
  const PROCEDURES = [
    { value: "vote", label: "Vote (Psephos)" },
    { value: "market", label: "Market (Agora)" },
    { value: "examination", label: "Examination (Dokimasia)" },
    { value: "kleros", label: "Random Selection (Kleros)" },
  ];

  const JUSTIFICATIONS = [
    { value: "representation", label: "Representation / legitimacy" },
    { value: "fairness", label: "Fairness / equality of chance" },
    { value: "anticorruption", label: "Protection against corruption" },
    { value: "efficiency", label: "Efficiency / scalability" },
    { value: "need", label: "Need / rational criteria" },
    { value: "merit", label: "Merit / competence" },
    { value: "tradition", label: "Tradition / continuity" },
    { value: "control", label: "Control / predictability" },
  ];

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
      one: "Despotism", few_vote: "Clientelism", few_market: "Nepotism", few_birth: "Monarchy",
      few_cooptation: "Autocracy", few_merit: "Hierarchy", few_kleros: "(Anarchy)", many: 'Benevolent dictator / "Populist"',
    },
    few_vote: {
      one: "", few_vote: "Representative government", few_market: "Shareholder governance", few_birth: "",
      few_cooptation: "", few_merit: "", few_kleros: "", many: "Representative Democracy",
    },
    few_market: {
      one: "", few_vote: "", few_market: "Corporation / Plutocracy", few_birth: "", few_cooptation: "",
      few_merit: "", few_kleros: "", many: "Bankless / Web3 / Decentralization",
    },
    few_birth: {
      one: "Absolutism", few_vote: "", few_market: "", few_birth: "Mafia", few_cooptation: "",
      few_merit: "", few_kleros: "", many: "Aristocracy",
    },
    few_cooptation: {
      one: "Autocracy", few_vote: "", few_market: "", few_birth: "", few_cooptation: "Autocracy",
      few_merit: "", few_kleros: "", many: "",
    },
    few_merit: {
      one: "Hierarchy", few_vote: "", few_market: "", few_birth: "", few_cooptation: "",
      few_merit: "Bureaucracy", few_kleros: "", many: "Technocracy",
    },
    few_kleros: {
      one: "Conscription Army", few_vote: "", few_market: "", few_birth: "", few_cooptation: "",
      few_merit: "", few_kleros: "", many: "Stochocracy / Aleatorian democracy",
    },
    many: {
      one: "Totalitarianism", few_vote: "Liberal Democracy", few_market: "DAO", few_birth: "",
      few_cooptation: "", few_merit: "", few_kleros: "", many: "Democracy",
    },
  };

  const CHALLENGE_CARDS = [
    { id: "trust-low", title: "Low Trust Context", effect: "Participants suspect capture. Add transparency and independent oversight.", tags: ["fairness", "transparency"] },
    { id: "time-crunch", title: "Time Pressure", effect: "Decision needed in 48 hours. Reduce complexity without losing legitimacy.", tags: ["relevance", "efficiency"] },
    { id: "legal-appeal", title: "Legal Challenge", effect: "Process is challenged on procedural fairness. Add appeal/review block.", tags: ["fairness", "safeguards"] },
    { id: "elite-capture", title: "Elite Capture Attempt", effect: "Small group dominates agenda. Counter with sortition, rotation, or disclosure.", tags: ["inclusion", "anti-capture"] },
    { id: "misinfo", title: "Misinformation Wave", effect: "False claims spread. Add information verification and trusted adjudication.", tags: ["deliberation", "epistemics"] },
    { id: "minority-rights", title: "Minority Rights Risk", effect: "Majority decision may harm a minority. Add rights constraints or veto safeguards.", tags: ["fairness", "rights"] },
    { id: "implementation-gap", title: "Implementation Gap", effect: "Decision may not be enforced. Add execution accountability and follow-up.", tags: ["relevance", "enforcement"] },
    { id: "multi-lingual", title: "Multilingual Deliberation", effect: "Participants speak multiple languages. Add translation/format accommodations.", tags: ["inclusion", "deliberation"] },
    { id: "scale-up", title: "Scale Jump", effect: "The process must scale from 50 to 50,000 participants.", tags: ["scalability", "relevance"] },
    { id: "budget-cut", title: "Budget Cut", effect: "Resources are halved. What blocks are essential and what can be simplified?", tags: ["relevance", "sustainability"] },
  ];

  const DEBRIEF_CARDS = [
    { id: "who-excluded", prompt: "Who is excluded by this design, and is that exclusion justified?" },
    { id: "failure-mode", prompt: "What is the most likely failure mode (capture, deadlock, opacity, apathy, manipulation)?" },
    { id: "legitimation", prompt: "What legitimates this process in the eyes of participants?" },
    { id: "narrative", prompt: "What public narrative explains why this procedure is fair or relevant?" },
    { id: "adaptation", prompt: "How can participants change the process itself (reflexivity)?" },
    { id: "tradeoff", prompt: "Which quality criterion did you sacrifice most: inclusion, deliberation, relevance, or fairness?" },
    { id: "crisis", prompt: "What changes under emergency conditions, and what must not change?" },
    { id: "scale", prompt: "Would the same design work at 10x scale? If not, what modular changes are needed?" },
  ];

  const EXAMPLE_BLOCKS = [
    { name: "Citizens' Assembly Recruitment", steps: ["kleros:fairness", "examination:need"], category: "selection" },
    { name: "Jury Formation and Verdict", steps: ["kleros:fairness", "examination:control", "vote:representation"], category: "judicial" },
    { name: "DAO Proposal Cycle", steps: ["market:efficiency", "vote:representation"], category: "dao" },
    { name: "Meritocratic Hiring", steps: ["examination:merit", "examination:control", "examination:control"], category: "hr" },
    { name: "Participatory Budgeting Lite", steps: ["examination:need", "vote:representation"], category: "public-budget" },
  ];

  const CONTENT_PACKS = {
    core: {
      name: "Core Governance Pack",
      version: "1.0",
      challengeCards: CHALLENGE_CARDS,
      debriefCards: DEBRIEF_CARDS,
      blocks: EXAMPLE_BLOCKS,
    },
    climate: {
      name: "Climate Governance Pack",
      version: "1.0",
      challengeCards: [
        { id: "intergen", title: "Intergenerational Equity", effect: "Add long-term representation or future-generation safeguards.", tags: ["sustainability", "fairness"] },
        { id: "science-dispute", title: "Conflicting Expertise", effect: "Experts disagree. Add epistemic mediation and transparent evidence review.", tags: ["deliberation", "expertise"] },
      ],
      debriefCards: [
        { id: "7gen", prompt: "How does the design impact the 7th generation?" },
        { id: "planetary", prompt: "Where are planetary boundaries represented in the process?" },
      ],
      blocks: [
        { name: "Climate Assembly + Government Response", steps: ["kleros:fairness", "vote:representation"], category: "climate" },
      ],
    },
    dao: {
      name: "DAO Governance Pack",
      version: "1.0",
      challengeCards: [
        { id: "whale", title: "Whale Dominance", effect: "Token concentration distorts outcomes. Add delegation, quorum rules, or veto checks.", tags: ["fairness", "anti-capture"] },
        { id: "governance-attack", title: "Governance Attack", effect: "Flash-loan or bribery attack risk. Add timelocks and security review.", tags: ["security", "fairness"] },
      ],
      debriefCards: [
        { id: "onchain-offchain", prompt: "Which part is onchain and which part depends on offchain legitimacy?" },
        { id: "fork", prompt: "What happens if the minority forks?" },
      ],
      blocks: [
        { name: "Token Vote + Timelock Execution", steps: ["market:efficiency", "vote:representation"], category: "dao" },
      ],
    },
  };

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function axisKeyFromParts(scope, procedure, subtype) {
    if (scope === "one") return "one";
    if (scope === "many") return "many";
    if (procedure === "vote") return "few_vote";
    if (procedure === "market") return "few_market";
    if (procedure === "kleros") return "few_kleros";
    if (procedure === "examination") {
      if (subtype === "birth") return "few_birth";
      if (subtype === "cooptation") return "few_cooptation";
      return "few_merit";
    }
    return "few_vote";
  }

  function resolvePolity(forKey, fromKey) {
    return (POLITY_MATRIX[forKey] && POLITY_MATRIX[forKey][fromKey]) || "";
  }

  function exportMarkdownBox(box) {
    const lines = [
      `# ${box.title || "Governance Lego Box"}`,
      "",
      box.tagline || "",
      "",
      "## Components",
      ...(box.components || []).map((c) => `- ${c}`),
      "",
      "## Features",
      ...(box.features || []).map((f) => `- ${f}`),
      "",
      "## Modes",
      ...(box.play_modes || []).map((m) => `- ${m}`),
      "",
      "## Copy",
      box.front_blurb ? `- Front: ${box.front_blurb}` : "",
      box.back_blurb ? `- Back: ${box.back_blurb}` : "",
      "",
      "## Art Direction Prompt",
      box.art_direction_prompt || "",
    ].filter(Boolean);
    return lines.join("\n");
  }

  window.DecisionLegoShared = {
    PROCEDURES,
    JUSTIFICATIONS,
    AXIS_LABELS,
    POLITY_MATRIX,
    CHALLENGE_CARDS,
    DEBRIEF_CARDS,
    EXAMPLE_BLOCKS,
    CONTENT_PACKS,
    rand,
    axisKeyFromParts,
    resolvePolity,
    exportMarkdownBox,
  };
})();
