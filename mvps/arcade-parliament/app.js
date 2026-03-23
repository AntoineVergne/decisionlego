(function () {
  const S = window.DecisionLegoShared;
  const qs = (id) => document.getElementById(id);
  const fill = (sel, opts) => { sel.innerHTML = ""; opts.forEach(o => { const x=document.createElement("option"); x.value=o.value||o; x.textContent=o.label||o; sel.appendChild(x); }); };
  const state = { round: 1, timerSec: 420, iv: null, running: false };

  function setTimer(sec) {
    state.timerSec = sec;
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    qs("timer").textContent = `${mm}:${ss}`;
  }
  function minutesVal() { const n = parseInt(qs("minutes").value || "7", 10); return Number.isFinite(n) && n > 0 ? n : 7; }
  function stop() { if (state.iv) clearInterval(state.iv); state.iv = null; state.running = false; }
  function start() {
    if (state.running) return;
    state.running = true;
    state.iv = setInterval(() => {
      setTimer(Math.max(0, state.timerSec - 1));
      if (state.timerSec <= 0) { stop(); qs("round-label").textContent = `Round ${state.round} finished. Debrief and score.`; }
    }, 1000);
  }
  function resetTimer() { stop(); setTimer(minutesVal() * 60); qs("round-label").textContent = `Round ${state.round} ready.`; }
  function nextRound() { stop(); state.round += 1; resetTimer(); drawChallenge(); drawDebrief(); }

  function drawChallenge() {
    const c = S.rand(S.CHALLENGE_CARDS);
    qs("challenge-title").textContent = c.title;
    qs("challenge-effect").textContent = c.effect;
    qs("challenge-tags").innerHTML = (c.tags || []).map(t => `<li>${t}</li>`).join("");
  }
  function drawDebrief() { qs("debrief").textContent = S.rand(S.DEBRIEF_CARDS).prompt; }

  function scoreCombo() {
    const p = qs("proc").value, j = qs("just").value, i = qs("interp").value;
    let score = 0;
    if (p === "kleros" && j === "fairness") score += 3;
    if (p === "vote" && j === "representation") score += 3;
    if (p === "market" && j === "efficiency") score += 3;
    if (p === "examination" && (j === "merit" || j === "need")) score += 3;
    if (i === "Probabilistic" && p === "kleros") score += 2;
    if (i === "Deterministic" && p !== "kleros") score += 1;
    const grade = score >= 5 ? "Excellent narrative fit" : score >= 3 ? "Coherent" : "Tense / provocative mix";
    qs("combo-result").textContent = `${(S.PROCEDURES.find(x => x.value === p) || {}).label || p} + ${(S.JUSTIFICATIONS.find(x => x.value === j) || {}).label || j}`;
    qs("combo-notes").textContent = `${grade}. Score ${score}/6. Use this as a debate trigger, not a truth claim.`;
  }

  function fillAxes() {
    const opts = Object.entries(S.AXIS_LABELS).map(([value, label]) => ({ value, label }));
    fill(qs("from-axis"), opts);
    fill(qs("for-axis"), opts);
    qs("from-axis").value = "few_vote";
    qs("for-axis").value = "many";
  }
  function resolvePolity() {
    const from = qs("from-axis").value;
    const to = qs("for-axis").value;
    const name = S.resolvePolity(to, from) || "Blank Cell / New Polity Candidate";
    qs("polity-name").textContent = name;
    qs("polity-meta").textContent = `For=${to}, From=${from}`;
  }

  function teams() { return qs("teams").value.split(",").map(s => s.trim()).filter(Boolean); }
  function buildBoard() {
    const t = teams();
    const cols = ["coherence", "inclusion", "deliberation", "relevance", "fairness"];
    let html = "<table><thead><tr><th>Team</th>" + cols.map(c => `<th>${c}</th>`).join("") + "<th>Total</th></tr></thead><tbody>";
    t.forEach(name => {
      html += `<tr><td>${name}</td>${cols.map(c => `<td><input type="text" value="0" data-c="${c}"></td>`).join("")}<td class="tot">0</td></tr>`;
    });
    html += "</tbody></table>";
    qs("scoreboard").innerHTML = html;
    qs("scoreboard").querySelectorAll("input").forEach(i => i.addEventListener("input", sumBoard));
    sumBoard();
  }
  function sumBoard() {
    qs("scoreboard").querySelectorAll("tbody tr").forEach(tr => {
      let total = 0;
      tr.querySelectorAll("input").forEach(i => { total += parseInt(i.value || "0", 10) || 0; });
      tr.querySelector(".tot").textContent = String(total);
    });
  }
  function sampleBoard() { qs("scoreboard").querySelectorAll("input").forEach(i => i.value = String(Math.floor(Math.random() * 6))); sumBoard(); }

  function init() {
    fill(qs("proc"), S.PROCEDURES);
    fill(qs("just"), S.JUSTIFICATIONS);
    fillAxes();
    qs("start").onclick = start;
    qs("stop").onclick = stop;
    qs("reset").onclick = resetTimer;
    qs("next-round").onclick = nextRound;
    qs("draw-challenge").onclick = drawChallenge;
    qs("draw-debrief").onclick = drawDebrief;
    qs("score-combo").onclick = scoreCombo;
    qs("resolve-polity").onclick = resolvePolity;
    qs("build-board").onclick = buildBoard;
    qs("sample-board").onclick = sampleBoard;
    state.round = 1;
    resetTimer();
    drawChallenge(); drawDebrief(); resolvePolity(); buildBoard(); scoreCombo();
  }
  init();
})();
