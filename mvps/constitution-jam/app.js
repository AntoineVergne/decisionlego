(function () {
  const S = window.DecisionLegoShared;
  const qs = (id) => document.getElementById(id);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  function axisOptions() {
    return Object.entries(S.AXIS_LABELS).map(([value, label]) => ({ value, label }));
  }
  function fillSelect(id, opts) {
    const el = qs(id); el.innerHTML = "";
    opts.forEach(o => { const x = document.createElement("option"); x.value = o.value; x.textContent = o.label; el.appendChild(x); });
  }
  function buildBlockPicks() {
    qs("block-picks").innerHTML = S.EXAMPLE_BLOCKS.map((b, i) => `
      <label><input type="checkbox" class="pick" value="${b.name}" ${i < 2 ? "checked" : ""}>
      <span><strong>${b.name}</strong><br><small>${b.steps.join(" -> ")}</small></span></label>
    `).join("");
  }
  function drawChallenge() { const c = S.rand(S.CHALLENGE_CARDS); qs("challenge").textContent = `${c.title}: ${c.effect}`; }
  function drawDebrief() { qs("debrief").textContent = S.rand(S.DEBRIEF_CARDS).prompt; }
  function resolve() {
    const from = qs("from").value, to = qs("for").value;
    const p = S.resolvePolity(to, from) || "Blank Cell / New Polity Candidate";
    qs("polity").textContent = p;
    qs("polity-note").textContent = `For=${to}, From=${from}`;
  }
  function sumScore() {
    const vals = qsa(".score").map(i => parseInt(i.value || "0", 10) || 0);
    const total = vals.reduce((a,b)=>a+b,0);
    qs("score-total").textContent = `Total: ${total}/20`;
  }
  function selectedBlocks() { return qsa(".pick:checked").map(i => i.value); }
  function genBox() {
    if (!qs("box-name").value.trim()) {
      qs("box-name").value = `${S.rand(["Civic Jam Kit","Constitution Crafter","Sortition Studio","Polity Patchwork"])} ${S.rand(["Deluxe","Workshop Edition","Beta","No Kings Included"])}`;
    }
    if (!qs("tagline").value.trim()) {
      qs("tagline").value = `Build a governance design for ${qs("mission").value || "a real public problem"} and survive critique.`;
    }
    const components = [
      `Team: ${qs("team").value || "Unnamed Team"}`,
      `Audience: ${qs("audience").value || "general public"}`,
      ...selectedBlocks().map(b => `Block: ${b}`),
      `Polity: ${qs("polity").textContent || "unresolved"}`,
      `Challenge: ${qs("challenge").textContent || "none"}`,
    ];
    qs("box-components").innerHTML = components.map(c => `<li>${c}</li>`).join("");
    exportJson();
  }
  function surprise() {
    qs("mission").value = qs("mission").value || S.rand(["a river basin authority", "a DAO treasury", "a university senate", "a city climate budget"]);
    drawChallenge(); drawDebrief();
    qsa(".pick").forEach(i => { i.checked = Math.random() > 0.45; });
    genBox();
  }
  function payload() {
    return {
      team: qs("team").value,
      mission: qs("mission").value,
      audience: qs("audience").value,
      blocks: selectedBlocks(),
      polity: qs("polity").textContent,
      polityMeta: qs("polity-note").textContent,
      challenge: qs("challenge").textContent,
      debrief: qs("debrief").textContent,
      score: qs("score-total").textContent,
      box: { name: qs("box-name").value, tagline: qs("tagline").value },
    };
  }
  function exportJson() { qs("export").value = JSON.stringify(payload(), null, 2); }
  function exportMd() {
    const p = payload();
    const lines = [`# ${p.box.name || "Constitution Jam Box"}`, "", p.box.tagline || "", "", `Team: ${p.team}`, `Mission: ${p.mission}`, `Audience: ${p.audience}`, "", "## Blocks", ...p.blocks.map(b => `- ${b}`), "", "## Polity", `- ${p.polity}`, `- ${p.polityMeta}`, "", "## Challenge", `- ${p.challenge}`, "", "## Debrief", `- ${p.debrief}`, "", "## Score", `- ${p.score}`];
    qs("export").value = lines.join("\n");
  }
  async function copyOut() { try { await navigator.clipboard.writeText(qs("export").value); } catch {} }
  function randomBlocks(){ qsa(".pick").forEach(i => i.checked = Math.random()>.5); }

  function init() {
    buildBlockPicks();
    fillSelect("from", axisOptions()); fillSelect("for", axisOptions());
    qs("from").value = "few_kleros"; qs("for").value = "many";
    qs("challenge-btn").onclick = drawChallenge;
    qs("debrief-btn").onclick = drawDebrief;
    qs("resolve").onclick = resolve;
    qs("sum-score").onclick = sumScore;
    qs("gen-box").onclick = genBox;
    qs("surprise").onclick = surprise;
    qs("exp-json").onclick = exportJson;
    qs("exp-md").onclick = exportMd;
    qs("copy").onclick = copyOut;
    qs("random-blocks").onclick = randomBlocks;
    qsa(".score").forEach(i => i.addEventListener("input", sumScore));
    drawChallenge(); drawDebrief(); resolve(); sumScore(); genBox();
  }
  init();
})();
