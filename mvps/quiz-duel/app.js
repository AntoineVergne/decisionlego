(function () {
  const qs = (id) => document.getElementById(id);

  const DECK = [
    {
      category: "Fairer",
      prompt: "What is fairer for choosing 30 citizens to draft recommendations?",
      context: "Equal chance matters, but so does visible accountability.",
      a: { title: "Open election campaign", body: "Candidates self-nominate, campaign, and residents vote." },
      b: { title: "Stratified lottery", body: "Random selection with demographic balancing among eligible residents." },
      answer: "depends",
      verdict: "Borderline Chaos (correct)",
      why: "A can be fairer for electoral accountability. B can be fairer for equal chance and inclusion of the less campaign-ready.",
      lawyer: "Define fairness first: accountability fairness or access fairness?"
    },
    {
      category: "Fairer",
      prompt: "What is fairer for a school grant competition?",
      context: "Applicants differ in writing support, time, and institutional coaching.",
      a: { title: "Scored proposal ranking", body: "Committee ranks proposals by quality criteria." },
      b: { title: "Eligibility screen + lottery", body: "Minimum threshold, then draw among qualified applications." },
      answer: "depends",
      verdict: "Lawyer Mode Activated",
      why: "A can be fairer if quality differences are real and assessment is well supported. B can be fairer when application polish mostly tracks privilege.",
      lawyer: "Fairness flips when coaching support is unequal."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for jury service selection?",
      context: "Need broad burden-sharing but must handle hardships and exclusions.",
      a: { title: "Random draw with exemptions", body: "Standard random summons and formal hardship exemptions." },
      b: { title: "Volunteer pool + balancing", body: "Opt-in citizens selected to match demographic targets." },
      answer: "depends",
      verdict: "Fairness Goblin refuses to commit",
      why: "A spreads civic duty more evenly. B may be fairer if existing summons systems systematically exclude or over-burden certain groups.",
      lawyer: "Compare fairness of burden distribution versus fairness of actual participation feasibility."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for moderation appeals on a social platform?",
      context: "Users want both consistency and context-sensitive judgment.",
      a: { title: "Rulebook appeal panel", body: "Published criteria, written reasons, and precedent-style consistency." },
      b: { title: "Contextual case review", body: "Flexible review with discretion for local norms and edge cases." },
      answer: "depends",
      verdict: "Borderline Chaos (correct)",
      why: "A improves predictability and equal treatment. B may be fairer when rigid rules mis-handle context or language nuance.",
      lawyer: "Procedural fairness and substantive fairness can pull in opposite directions."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for distributing scarce vaccine appointments?",
      context: "Demand exceeds supply and outreach capacity is limited.",
      a: { title: "First-come first-served", body: "Appointments open online at a fixed time." },
      b: { title: "Priority tiers + lottery", body: "Risk tiers first, then lottery within each tier." },
      answer: "depends",
      verdict: "Lawyer Mode Activated",
      why: "A is procedurally simple and equal at the moment of opening. B can be fairer for need and access inequality.",
      lawyer: "If digital access is unequal, first-come fairness is mostly fictional."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for university admissions in a capped program?",
      context: "Goal includes both merit and social mobility.",
      a: { title: "Exam score ranking", body: "Admission by standardized scores only." },
      b: { title: "Holistic review + contextual weighting", body: "Scores plus school context, obstacles, and interviews." },
      answer: "depends",
      verdict: "Fairness Goblin starts a seminar",
      why: "A can be fairer for equal formal criteria. B can be fairer for correcting unequal starting conditions.",
      lawyer: "Ask whether fairness means equal rule, equal opportunity, or equalized disadvantage."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for allocating emergency relief in 24 hours?",
      context: "Speed matters, but errors trigger delays and distrust.",
      a: { title: "Expert agency triage", body: "Civil servants apply pre-set criteria immediately." },
      b: { title: "Community delegate verification", body: "Local representatives verify urgent needs before release." },
      answer: "depends",
      verdict: "Efficiency Demon shrugs: Depends",
      why: "A is faster on paper. B may be more efficient end-to-end if local verification prevents misallocation and later rework.",
      lawyer: "Measure efficiency at payout time or at final correction cost?"
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for recurring permit approvals?",
      context: "High volume, but rules change often and exceptions are common.",
      a: { title: "Rule-based checklist", body: "Deterministic processing against a fixed checklist." },
      b: { title: "Caseworker discretion", body: "Trained reviewers adapt decisions to edge cases." },
      answer: "depends",
      verdict: "Borderline Chaos (correct)",
      why: "A is efficient when the checklist fits reality. B can be more efficient when rigid rules cause appeals, retries, and workarounds.",
      lawyer: "Exception rate determines the winner."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for a DAO micro-grants round (200 proposals)?",
      context: "Need throughput, legitimacy, and minimum quality control.",
      a: { title: "Community filter + committee final", body: "Crowd signal first, then committee review." },
      b: { title: "Full token vote on all proposals", body: "Entire DAO votes on every proposal." },
      answer: "depends",
      verdict: "Efficiency Demon starts counting hidden costs",
      why: "A reduces voter load. B can be more efficient if the committee layer becomes a bottleneck or legitimacy fights force reruns.",
      lawyer: "Coordination cost versus contestation cost."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for setting a long-term city climate strategy?",
      context: "Need durable execution, not just a quick PDF.",
      a: { title: "Mayor's office drafts plan", body: "Small team writes and publishes rapidly." },
      b: { title: "Multi-stage public process", body: "Expert input plus public deliberation plus council adoption." },
      answer: "depends",
      verdict: "Efficiency Demon shrugs: Depends",
      why: "A is faster to produce. B can be more efficient over years if it survives politics and avoids reversal.",
      lawyer: "Time horizon changes the meaning of efficient."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for handling 10,000 customer disputes?",
      context: "Most are simple, but a few are high-impact edge cases.",
      a: { title: "Automated triage + escalation", body: "Bot resolves standard cases and escalates exceptions." },
      b: { title: "Human-first triage", body: "Agents classify cases manually before routing." },
      answer: "depends",
      verdict: "Lawyer Mode Activated",
      why: "A scales better when data quality is strong. B can be more efficient if the bot misroutes enough cases to create expensive escalation loops.",
      lawyer: "False positive and false negative costs matter more than raw throughput."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for selecting conference speakers?",
      context: "Need quality talks and low organizer overhead.",
      a: { title: "Organizer curation", body: "Small team selects quickly using judgment." },
      b: { title: "Community voting + review", body: "Public nominations with later organizer balancing." },
      answer: "depends",
      verdict: "Efficiency Demon files a spreadsheet",
      why: "A minimizes process time. B may be more efficient if community input reduces backlash and last-minute withdrawals.",
      lawyer: "Production efficiency and legitimacy efficiency are different games."
    },
    {
      category: "Representative",
      prompt: "What is more representative of stakeholders in a protocol upgrade?",
      context: "Stakeholders include small users, builders, and large token holders.",
      a: { title: "Token-weighted vote", body: "Votes proportional to token holdings." },
      b: { title: "Stratified stakeholder mini-public", body: "Seats allocated across user groups with deliberation." },
      answer: "depends",
      verdict: "Representative-ish: Depends",
      why: "A represents capital exposure. B represents stakeholder diversity and lived roles.",
      lawyer: "State the principal: assets, people, or ecosystem functions."
    },
    {
      category: "Representative",
      prompt: "What is more representative for a workers' council?",
      context: "Factory floor, support staff, and management have different interests.",
      a: { title: "One-person-one-vote election", body: "All employees elect a shared slate." },
      b: { title: "Seat allocation by role groups", body: "Guaranteed seats per worker category." },
      answer: "depends",
      verdict: "Borderline Chaos (correct)",
      why: "A represents individuals equally. B represents occupational groups and minority roles.",
      lawyer: "Person representation and category representation are both legitimate models."
    },
    {
      category: "Representative",
      prompt: "What is more representative for choosing a neighborhood park design?",
      context: "Residents, parents, elders, and local businesses are all affected.",
      a: { title: "Open town hall vote", body: "Whoever attends votes." },
      b: { title: "Targeted outreach + sampled panel", body: "Recruit underheard groups and balance the panel." },
      answer: "depends",
      verdict: "Representative Sprite says 'depends who shows up'",
      why: "A can represent active participants and visible consent. B can better represent the affected population distribution.",
      lawyer: "Turnout bias is the hidden variable."
    },
    {
      category: "Representative",
      prompt: "What is more representative for selecting conference speakers?",
      context: "Audience wants both expertise and field diversity.",
      a: { title: "Popularity vote", body: "Community upvotes nominees." },
      b: { title: "Curated slate with quotas", body: "Organizers balance domain, geography, and experience." },
      answer: "depends",
      verdict: "Representative-ish: Depends",
      why: "A represents current audience preference. B can represent the broader field and underrepresented expertise.",
      lawyer: "Who is represented: current crowd, future audience, or the discipline?"
    },
    {
      category: "Representative",
      prompt: "What is more representative for a citizens' budget committee?",
      context: "The city wants legitimacy and actual resident diversity.",
      a: { title: "Volunteer sign-up committee", body: "Anyone interested can join until seats fill." },
      b: { title: "Random sample with replacements", body: "Residents are randomly invited and replaced if unavailable." },
      answer: "depends",
      verdict: "Lawyer Mode Activated",
      why: "A represents motivated civic participants. B better represents the resident population, assuming recruitment barriers are handled.",
      lawyer: "Representativeness can mean engagement or demographic mirror."
    },
    {
      category: "Representative",
      prompt: "What is more representative for a federation council?",
      context: "Large and small member units both seek voice.",
      a: { title: "Seats by population", body: "Representation scales with population size." },
      b: { title: "Equal seats per member unit", body: "Each member unit gets the same number of seats." },
      answer: "depends",
      verdict: "Borderline Chaos (federal edition)",
      why: "A represents people. B represents member units as political entities.",
      lawyer: "Classic bicameral conflict: demos versus units."
    },
    {
      category: "Representative",
      prompt: "What is more representative in product governance?",
      context: "A platform serves both paying enterprise clients and free users.",
      a: { title: "Revenue-weighted advisory vote", body: "Client spend influences voting weight." },
      b: { title: "User-segment council", body: "Seats assigned by user type and use case." },
      answer: "depends",
      verdict: "Representative-ish: Depends",
      why: "A represents economic dependence. B represents usage diversity and product impact.",
      lawyer: "Representing who pays and who is affected are different claims."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for selecting public housing repairs this month?",
      context: "Budget covers only some requests and tenants report different urgencies.",
      a: { title: "Strict queue order", body: "First reported, first repaired." },
      b: { title: "Needs-based prioritization", body: "Severity and vulnerability determine order." },
      answer: "depends",
      verdict: "Fairness Goblin enters triage mode",
      why: "A is fairer for equal procedural treatment. B is fairer if fairness tracks need and harm reduction.",
      lawyer: "Equal treatment and equitable treatment are not the same rule."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for speaking time in a public hearing?",
      context: "Some groups are directly affected, others are broad interest advocates.",
      a: { title: "Equal time per speaker", body: "Everyone gets the same speaking slot." },
      b: { title: "Weighted time by impact", body: "Directly affected groups get longer slots." },
      answer: "depends",
      verdict: "Borderline Chaos (microphone edition)",
      why: "A protects formal equality. B may be fairer when unequal impact justifies unequal airtime.",
      lawyer: "Fairness depends on whether hearings are symbolic equality or evidence-gathering."
    },
    {
      category: "Fairer",
      prompt: "What is fairer for evaluating employee performance bonuses?",
      context: "Teams work on different problems with uneven measurability.",
      a: { title: "Uniform KPI formula", body: "Same quantitative metrics for everyone." },
      b: { title: "Manager review with calibration", body: "Contextual assessments plus cross-team calibration." },
      answer: "depends",
      verdict: "Lawyer Mode Activated",
      why: "A avoids arbitrary discretion. B can be fairer if KPI comparability is fake and calibration reduces measurement bias.",
      lawyer: "Choose your poison: discretion bias or metric bias."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for bug triage in a fast-moving product team?",
      context: "Incoming reports are noisy and duplicate-heavy.",
      a: { title: "Weekly triage meeting", body: "Cross-functional group reviews and prioritizes together." },
      b: { title: "Continuous async triage", body: "Owners label and route issues as they come in." },
      answer: "depends",
      verdict: "Efficiency Demon books two calendars",
      why: "A reduces misalignment and duplicate work. B cuts scheduling overhead and keeps throughput high.",
      lawyer: "Efficiency depends on team size and conflict rate."
    },
    {
      category: "Efficient",
      prompt: "What is more efficient for incident response command?",
      context: "The team is distributed across time zones and specialties.",
      a: { title: "Single incident commander", body: "One person directs decisions and communications." },
      b: { title: "Role-based command cell", body: "Ops, comms, and product leads coordinate decisions." },
      answer: "depends",
      verdict: "Borderline Chaos (pager edition)",
      why: "A reduces coordination overhead. B can be more efficient when complexity exceeds one person's bandwidth.",
      lawyer: "The incident type determines whether centralization helps or bottlenecks."
    },
    {
      category: "Representative",
      prompt: "What is more representative for an open-source project steering group?",
      context: "Contributors differ by code volume, maintenance work, and community support roles.",
      a: { title: "Commit-count weighted voting", body: "Voting power tracks code contributions." },
      b: { title: "Role-balanced council", body: "Maintainers, docs, support, and users each have seats." },
      answer: "depends",
      verdict: "Representative-ish: Depends",
      why: "A represents code throughput. B represents the broader labor mix that sustains the project.",
      lawyer: "Invisible maintenance work breaks simple contribution metrics."
    }
  ];

  const FUN_VERDICTS = {
    a: ["A wins", "Verdict: A", "Duel goes to A"],
    b: ["B wins", "Verdict: B", "Duel goes to B"],
    depends: ["Depends", "Borderline Chaos", "Lawyer Mode Activated"]
  };

  const state = {
    filter: "all",
    deck: [],
    index: 0,
    score: 0,
    streak: 0,
    answered: false
  };

  function shuffle(arr) {
    const clone = arr.slice();
    for (let i = clone.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }

  function filteredDeck() {
    if (state.filter === "borderline") {
      return DECK.filter((q) => q.answer === "depends");
    }
    return DECK.slice();
  }

  function currentCard() {
    if (!state.deck.length) return null;
    return state.deck[state.index % state.deck.length];
  }

  function setText(id, text) {
    qs(id).textContent = text || "";
  }

  function clearSelectionClasses() {
    const root = document.body;
    [
      "choice-a", "choice-b", "choice-depends",
      "correct-a", "correct-b", "correct-depends",
      "wrong"
    ].forEach((c) => root.classList.remove(c));
    qs("pick-a").classList.remove("selected");
    qs("pick-b").classList.remove("selected");
    qs("pick-depends").classList.remove("selected");
  }

  function renderStats() {
    setText("score", String(state.score));
    setText("streak", String(state.streak));
    const total = Math.max(1, state.deck.length);
    setText("card-count", `${Math.min(state.index + 1, total)}/${total}`);
    setText("mode-pill", state.filter === "borderline" ? "Borderline" : "All");
    qs("filter-all").classList.toggle("active", state.filter === "all");
    qs("filter-borderline").classList.toggle("active", state.filter === "borderline");
  }

  function renderCard() {
    const card = currentCard();
    clearSelectionClasses();
    state.answered = false;
    qs("reveal-panel").classList.add("hidden");

    if (!card) {
      setText("question-category", "No cards");
      setText("question-prompt", "No cards match this filter.");
      setText("question-context", "Switch to All mode.");
      setText("option-a-title", "");
      setText("option-a-body", "");
      setText("option-b-title", "");
      setText("option-b-body", "");
      renderStats();
      return;
    }

    setText("question-category", card.category);
    setText("question-prompt", card.prompt);
    setText("question-context", card.context);
    setText("option-a-title", card.a.title);
    setText("option-a-body", card.a.body);
    setText("option-b-title", card.b.title);
    setText("option-b-body", card.b.body);
    setText("verdict-label", "");
    setText("reveal-result", "");
    setText("reveal-why", "");
    setText("reveal-lawyer", "");
    renderStats();
  }

  function revealAnswer(choice) {
    const card = currentCard();
    if (!card || state.answered) return;
    state.answered = true;

    clearSelectionClasses();
    document.body.classList.add(`choice-${choice}`);
    if (choice === "a") qs("pick-a").classList.add("selected");
    if (choice === "b") qs("pick-b").classList.add("selected");
    if (choice === "depends") qs("pick-depends").classList.add("selected");

    const correct = card.answer;
    const isCorrect = choice === correct;
    const baseScore = isCorrect ? (correct === "depends" ? 2 : 1) : 0;
    state.score += baseScore;
    state.streak = isCorrect ? state.streak + 1 : 0;

    document.body.classList.add(`correct-${correct}`);
    if (!isCorrect) document.body.classList.add("wrong");

    const title = isCorrect
      ? `Correct. ${card.verdict || FUN_VERDICTS[correct][0]}`
      : `Nice try. ${card.verdict || FUN_VERDICTS[correct][0]}`;

    setText("verdict-label", isCorrect ? "Judge's Reveal" : "Reveal");
    setText("reveal-result", title);
    setText("reveal-why", card.why);
    setText("reveal-lawyer", card.lawyer ? `Lawyer note: ${card.lawyer.replace(/^Lawyer note:\s*/i, "")}` : "");
    qs("reveal-panel").classList.remove("hidden");
    renderStats();
  }

  function nextCard() {
    if (!state.deck.length) return;
    state.index = (state.index + 1) % state.deck.length;
    renderCard();
  }

  function shuffleDeck() {
    const base = filteredDeck();
    state.deck = shuffle(base);
    state.index = 0;
    renderCard();
  }

  function setFilter(filter) {
    state.filter = filter;
    state.deck = shuffle(filteredDeck());
    state.index = 0;
    renderCard();
  }

  function bind() {
    qs("pick-a").addEventListener("click", () => revealAnswer("a"));
    qs("pick-b").addEventListener("click", () => revealAnswer("b"));
    qs("pick-depends").addEventListener("click", () => revealAnswer("depends"));
    qs("next-btn").addEventListener("click", nextCard);
    qs("shuffle-btn").addEventListener("click", shuffleDeck);
    qs("filter-all").addEventListener("click", () => setFilter("all"));
    qs("filter-borderline").addEventListener("click", () => setFilter("borderline"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "a" || e.key === "A") revealAnswer("a");
      if (e.key === "b" || e.key === "B") revealAnswer("b");
      if (e.key === "d" || e.key === "D") revealAnswer("depends");
      if (e.key === "n" || e.key === "N") nextCard();
    });
  }

  function init() {
    state.deck = shuffle(DECK);
    bind();
    renderCard();
  }

  init();
})();
