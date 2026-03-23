(function () {
  const S = window.DecisionLegoShared;
  const qs = (id) => document.getElementById(id);
  const slots = ["agenda", "deliberation", "decision", "execution", "oversight"];
  const slotLabels = {
    agenda: "Agenda Setting",
    deliberation: "Deliberation Chamber",
    decision: "Decision / Aggregation",
    execution: "Execution / Administration",
    oversight: "Oversight / Appeals",
  };
  const state = { composition: {} };

  function polityOptions() {
    const out = [];
    Object.keys(S.POLITY_MATRIX).forEach(forKey => {
      Object.keys(S.POLITY_MATRIX[forKey]).forEach(fromKey => {
        const name = S.POLITY_MATRIX[forKey][fromKey];
        if (name) out.push({ name, forKey, fromKey });
      });
    });
    return out.sort((a,b)=>a.name.localeCompare(b.name));
  }
  const allPolities = polityOptions();

  function fillSelect(el, values, mapper) {
    el.innerHTML = "";
    values.forEach(v => {
      const o = document.createElement("option");
      const m = mapper(v);
      o.value = m.value; o.textContent = m.label;
      el.appendChild(o);
    });
  }

  function buildComposer() {
    const root = qs("composer");
    root.innerHTML = "";
    slots.forEach(slot => {
      const row = document.createElement("div");
      row.className = "slot-row";
      row.innerHTML = `
        <div><strong>${slotLabels[slot]}</strong></div>
        <select id="${slot}-polity"></select>
        <select id="${slot}-block"></select>
        <button id="${slot}-risk" class="ghost" type="button">stress test</button>
      `;
      root.appendChild(row);
      fillSelect(qs(`${slot}-polity`), allPolities, p => ({ value: `${p.forKey}|${p.fromKey}|${p.name}`, label: p.name }));
      fillSelect(qs(`${slot}-block`), S.EXAMPLE_BLOCKS, b => ({ value: b.name, label: `${b.name} (${b.category})` }));
      qs(`${slot}-polity`).addEventListener("change", updateSummary);
      qs(`${slot}-block`).addEventListener("change", updateSummary);
      qs(`${slot}-risk`).addEventListener("click", () => {
        const c = S.rand(S.CHALLENGE_CARDS);
        alert(`${slotLabels[slot]}\n\nChallenge: ${c.title}\n${c.effect}`);
      });
    });
    updateSummary();
  }

  function updateSummary() {
    const composition = {};
    slots.forEach(slot => {
      const [forKey, fromKey, ...rest] = qs(`${slot}-polity`).value.split("|");
      const name = rest.join("|");
      composition[slot] = { polity: { name, forKey, fromKey }, block: qs(`${slot}-block`).value };
    });
    state.composition = composition;
    const names = slots.map(s => `${slotLabels[s]}: ${composition[s].polity.name} + ${composition[s].block}`);
    qs("composition-summary").textContent = `${names.length} institutions configured. Mixed polity composition ready for review/export.`;
  }

  function randomize() {
    slots.forEach(slot => {
      const p = S.rand(allPolities);
      qs(`${slot}-polity`).value = `${p.forKey}|${p.fromKey}|${p.name}`;
      qs(`${slot}-block`).value = S.rand(S.EXAMPLE_BLOCKS).name;
    });
    updateSummary();
  }

  function recommendRisks() {
    const checked = Array.from(document.querySelectorAll(".risk:checked")).map(i => i.value);
    const recs = [];
    if (checked.includes("capture")) recs.push("Add independent oversight, transparency logs, and random audit selection.");
    if (checked.includes("deadlock")) recs.push("Add fallback aggregation rule and time-bound escalation path.");
    if (checked.includes("opacity")) recs.push("Add public reasoning record and traceable decision criteria.");
    if (checked.includes("exclusion")) recs.push("Add inclusion quota/stratification or compensated participation.");
    if (checked.includes("implementation")) recs.push("Add execution accountability and monitoring block.");
    if (checked.includes("misinfo")) recs.push("Add evidence review and trusted adjudication phase.");
    qs("risk-output").innerHTML = recs.map(r => `<li>${r}</li>`).join("") || "<li>No risks selected.</li>";
  }

  function suggestBlocks() {
    const mission = qs("inst-mission").value.toLowerCase();
    const decisions = qs("inst-decisions").value.toLowerCase();
    const suggestions = [];
    if (mission.includes("budget") || decisions.includes("budget")) suggestions.push("Participatory Budgeting Lite");
    if (mission.includes("jury") || decisions.includes("dispute")) suggestions.push("Jury Formation and Verdict");
    if (mission.includes("dao") || decisions.includes("token")) suggestions.push("DAO Proposal Cycle");
    if (mission.includes("citizen") || decisions.includes("assembly")) suggestions.push("Citizens' Assembly Recruitment");
    if (!suggestions.length) suggestions.push(...S.EXAMPLE_BLOCKS.slice(0, 3).map(b => b.name));
    qs("block-suggestions").innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
  }

  function exportPayload() {
    return {
      institution: {
        name: qs("inst-name").value,
        mission: qs("inst-mission").value,
        decisions: qs("inst-decisions").value,
        risks: Array.from(document.querySelectorAll(".risk:checked")).map(i => i.value),
      },
      composition: state.composition,
      timestamp: new Date().toISOString(),
    };
  }
  function exportJson() { qs("export").value = JSON.stringify(exportPayload(), null, 2); }
  function exportMd() {
    const p = exportPayload();
    const lines = [`# ${p.institution.name || "Protocol Workbench Export"}`, "", p.institution.mission || "", "", "## Risks", ...p.institution.risks.map(r => `- ${r}`), "", "## Composition"];
    slots.forEach(s => {
      const c = p.composition[s];
      lines.push(`- ${slotLabels[s]}: ${c.polity.name} + ${c.block}`);
    });
    qs("export").value = lines.join("\n");
  }
  async function copyExport() {
    try { await navigator.clipboard.writeText(qs("export").value); } catch {}
  }

  function init() {
    buildComposer();
    qs("randomize").onclick = randomize;
    qs("risk-recommend").onclick = recommendRisks;
    qs("suggest-blocks").onclick = suggestBlocks;
    qs("export-json").onclick = exportJson;
    qs("export-md").onclick = exportMd;
    qs("copy-export").onclick = copyExport;
    randomize(); exportJson();
  }
  init();
})();
