(function () {
  const S = window.DecisionLegoShared;
  const qs = (id) => document.getElementById(id);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  const funnyPrefixes = ["Civic", "Assembly", "Sortition", "Polity", "Consensus", "Commons"];
  const funnyNouns = ["Starter Kit", "Speed Box", "Jam Pack", "Mini Lab", "Fast Build", "Workshop Box"];

  function fill(sel, options) {
    sel.innerHTML = "";
    options.forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.value || o;
      opt.textContent = o.label || o;
      sel.appendChild(opt);
    });
  }

  function axisOptions() {
    return Object.entries(S.AXIS_LABELS).map(([value, label]) => ({ value, label }));
  }

  function randomSelect(id) {
    const sel = qs(id);
    if (!sel || !sel.options.length) return;
    sel.selectedIndex = Math.floor(Math.random() * sel.options.length);
  }

  function drawChallenge() {
    const c = S.rand(S.CHALLENGE_CARDS);
    qs("challenge-title").textContent = c.title;
    qs("challenge-effect").textContent = c.effect;
  }

  function drawDebrief() {
    const d = S.rand(S.DEBRIEF_CARDS);
    qs("debrief").textContent = `Debrief: ${d.prompt}`;
  }

  function renderRecipeSummary() {
    const p = S.PROCEDURES.find((x) => x.value === qs("proc").value);
    const j = S.JUSTIFICATIONS.find((x) => x.value === qs("just").value);
    const mission = qs("mission").value.trim();
    const base = `${p ? p.label : qs("proc").value} + ${j ? j.label : qs("just").value}`;
    qs("recipe-summary").textContent = mission
      ? `Recipe for "${mission}": ${base}.`
      : `Recipe: ${base}.`;
  }

  function resolvePolity() {
    const from = qs("from-axis").value;
    const to = qs("for-axis").value;
    const name = S.resolvePolity(to, from) || "Blank Cell / New Polity Candidate";
    qs("polity-name").textContent = name;
    qs("polity-meta").textContent = `Who governs: ${S.AXIS_LABELS[from]} | Who benefits: ${S.AXIS_LABELS[to]}`;
    return name;
  }

  function autoName() {
    const p = S.PROCEDURES.find((x) => x.value === qs("proc").value);
    const word = (p && p.label.split(" ")[0]) || "Civic";
    const suffix = S.rand(funnyNouns);
    const prefix = S.rand(funnyPrefixes);
    return `${prefix} ${word} ${suffix}`.replace(/\s+/g, " ").trim();
  }

  function buildComponents() {
    const procedure = S.PROCEDURES.find((x) => x.value === qs("proc").value);
    const just = S.JUSTIFICATIONS.find((x) => x.value === qs("just").value);
    const polity = qs("polity-name").textContent || resolvePolity();
    return [
      `Decision recipe: ${(procedure && procedure.label) || qs("proc").value}`,
      `Main rationale: ${(just && just.label) || qs("just").value}`,
      `Challenge card: ${qs("challenge-title").textContent || "None"}`,
      `Polity target/result: ${polity}`,
      `Debrief prompt: ${(qs("debrief").textContent || "").replace(/^Debrief:\s*/, "") || "None"}`,
    ];
  }

  function generatePitch() {
    resolvePolity();
    if (!qs("box-name").value.trim()) qs("box-name").value = autoName();
    if (!qs("tagline").value.trim()) {
      const mission = qs("mission").value.trim() || "a public decision";
      qs("tagline").value = `A fast workshop game for designing how a group should decide ${mission}.`;
    }
    const components = buildComponents();
    qs("components").innerHTML = components.map((c) => `<li>${c}</li>`).join("");

    const markdown = [
      `# ${qs("box-name").value}`,
      "",
      qs("tagline").value,
      "",
      `Team: ${qs("team").value || "Team"}`,
      qs("mission").value.trim() ? `Mission: ${qs("mission").value.trim()}` : "",
      "",
      "## Round",
      `- Challenge: ${qs("challenge-title").textContent || ""}`,
      `- Effect: ${qs("challenge-effect").textContent || ""}`,
      `- Recipe: ${qs("recipe-summary").textContent || ""}`,
      `- Polity: ${qs("polity-name").textContent || ""}`,
      `- Debrief: ${(qs("debrief").textContent || "").replace(/^Debrief:\s*/, "")}`,
      "",
      "## Pitch Components",
      ...components.map((c) => `- ${c}`),
    ].filter(Boolean).join("\n");

    qs("export").value = markdown;
    qs("status").textContent = "Pitch generated. Read it aloud in 30 seconds.";
  }

  function funnyName() {
    qs("box-name").value = `${S.rand(funnyPrefixes)} ${S.rand(["Chaos", "Civic", "Consensus", "Council"])} ${S.rand(funnyNouns)}`;
    qs("status").textContent = "Funny box name generated.";
  }

  async function copyExport() {
    try {
      await navigator.clipboard.writeText(qs("export").value);
      qs("status").textContent = "Copied to clipboard.";
    } catch {
      qs("status").textContent = "Copy failed (browser restriction).";
    }
  }

  function randomizeRecipe() {
    randomSelect("proc");
    randomSelect("just");
    renderRecipeSummary();
  }

  function randomizePolity() {
    randomSelect("from-axis");
    randomSelect("for-axis");
    resolvePolity();
  }

  function newRound() {
    drawChallenge();
    drawDebrief();
    randomizeRecipe();
    randomizePolity();
    qs("box-name").value = "";
    qs("tagline").value = "";
    qs("components").innerHTML = "";
    qs("export").value = "";
    qs("status").textContent = "New round ready.";
  }

  function surpriseAll() {
    if (!qs("mission").value.trim()) {
      qs("mission").value = S.rand([
        "a school lunch budget",
        "a community safety plan",
        "a neighborhood climate budget",
        "a DAO grant round",
        "a city AI procurement policy",
      ]);
    }
    newRound();
    funnyName();
    generatePitch();
  }

  function bind() {
    qs("new-round").onclick = newRound;
    qs("surprise-all").onclick = surpriseAll;
    qs("draw-challenge").onclick = drawChallenge;
    qs("draw-debrief").onclick = drawDebrief;
    qs("swap-procedure").onclick = randomizeRecipe;
    qs("swap-polity").onclick = randomizePolity;
    qs("resolve").onclick = resolvePolity;
    qs("generate-pitch").onclick = generatePitch;
    qs("funny-name").onclick = funnyName;
    qs("copy").onclick = copyExport;
    ["proc", "just"].forEach((id) => qs(id).addEventListener("change", renderRecipeSummary));
    qsa("#mission, #team").forEach((el) => el.addEventListener("input", renderRecipeSummary));
  }

  function init() {
    fill(qs("proc"), S.PROCEDURES);
    fill(qs("just"), S.JUSTIFICATIONS);
    fill(qs("from-axis"), axisOptions());
    fill(qs("for-axis"), axisOptions());
    qs("from-axis").value = "few_vote";
    qs("for-axis").value = "many";
    bind();
    newRound();
    generatePitch();
  }

  init();
})();
