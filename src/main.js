import "./styles.css";
import {
  answerOptions,
  calculateResult,
  cloneDimensions,
  dimensions,
  emptyAnswers,
  generateRecommendations,
  normalizeAnswers,
  validateDimensions
} from "./diagnostico.js";
import { hasInsForgeConfig, saveDiagnosticSubmission } from "./insforge.js";

const storageKey = "stec-ds44-diagnostico-v1";
const instrumentKey = "stec-ds44-instrumento-v1";
const editorKey = "stec-ds44-editor-open";
const sourceDocuments = [
  { label: "Prensa", href: "https://www.df.cl/economia-y-politica/laboral-personas/ministerio-del-trabajo-fija-nuevas-reglas-para-capacitacion-en-seguridad" },
  { label: "Decreto", href: "https://previsionsocial.gob.cl/ds44/" },
  { label: "Normativa vigente", href: "https://dt.gob.cl/portal/1628/w3-article-127524.html" },
  { label: "Reglamento", href: "https://www.dt.gob.cl/portal/1626/w3-article-127643.html" },
  { label: "Derechos del Trabajador", href: "https://www.dt.gob.cl/portal/1628/w3-article-95297.html" }
];

let activeDimensions = loadInstrument();

const state = {
  company: {
    name: "",
    sector: "",
    workers: "",
    contact: ""
  },
  answers: emptyAnswers(activeDimensions)
};

let saveStatus = {
  tone: "muted",
  message: hasInsForgeConfig ? "InsForge conectado para guardar diagnosticos." : "Modo local: falta configurar InsForge."
};

let editorOpen = localStorage.getItem(editorKey) === "true";
let editorValue = JSON.stringify(activeDimensions, null, 2);
let editorStatus = {
  tone: "muted",
  message: "Edita el JSON, valida y aplica. Los pesos deben sumar 100."
};

const saved = localStorage.getItem(storageKey);
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    state.company = { ...state.company, ...(parsed.company || {}) };
    state.answers = normalizeAnswers({ ...state.answers, ...(parsed.answers || {}) }, activeDimensions);
  } catch {
    localStorage.removeItem(storageKey);
  }
}

const app = document.querySelector("#app");

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function answeredCount() {
  return Object.values(state.answers).filter((answer) => answer !== null && answer !== undefined).length;
}

function totalQuestions() {
  return activeDimensions.reduce((sum, dimension) => sum + dimension.questions.length, 0);
}

function render() {
  const result = calculateResult(state.answers, activeDimensions);
  const recommendations = generateRecommendations(result);
  const progress = Math.round((answeredCount() / totalQuestions()) * 100);

  app.innerHTML = `
    <section class="hero">
      <div class="hero__inner">
        <div>
          <nav class="source-actions" aria-label="Fuentes del instrumento">
            ${sourceDocuments.map((document) => `
              <a href="${document.href}" ${document.download ? `download="${document.download}"` : `target="_blank" rel="noreferrer"`}>${document.label}</a>
            `).join("")}
          </nav>
          <p class="eyebrow">STEC · Diagnostico empresarial DS44</p>
          <h1>Preparacion frente a la nueva capacitacion obligatoria en seguridad laboral</h1>
          <p class="lead">Herramienta de madurez para identificar brechas en cobertura, contenidos, metodologia, evaluacion, trazabilidad y gobernanza.</p>
        </div>
        <aside class="scorecard ${result.level.tone}">
          <strong>${result.total}</strong>
          <span>Puntaje global</span>
          <small>${result.level.name} · rango ${result.level.range}</small>
        </aside>
      </div>
    </section>

    <section class="workspace">
      <aside class="panel">
        <div class="panel__section">
          <h2>Empresa</h2>
          ${inputField("name", "Nombre de empresa")}
          ${inputField("sector", "Rubro o actividad")}
          ${inputField("workers", "Numero de trabajadores")}
          ${inputField("contact", "Contacto interno")}
        </div>

        <div class="panel__section">
          <h2>Resultado</h2>
          <div class="meter" aria-label="Avance del diagnostico">
            <span style="width:${progress}%"></span>
          </div>
          <p class="muted">${answeredCount()} de ${totalQuestions()} respuestas · ${progress}% completado</p>
          <p class="level-summary">${result.level.summary}</p>
          <p class="next-step">${result.level.nextStep}</p>
        </div>

        <div class="actions">
          <button class="primary" data-action="save">Guardar en InsForge</button>
          <button class="secondary" data-action="export">Descargar informe</button>
          <button class="secondary" data-action="download-instrument">Descargar instrumento</button>
          <button class="secondary" data-action="reset">Limpiar</button>
        </div>
        <p class="save-status ${saveStatus.tone}">${saveStatus.message}</p>

        <details class="instrument-editor" ${editorOpen ? "open" : ""}>
          <summary>Editar instrumento</summary>
          <p class="muted">Modifica dimensiones, pesos, preguntas y recomendaciones en JSON.</p>
          <textarea data-editor spellcheck="false">${escapeHtml(editorValue)}</textarea>
          <div class="editor-actions">
            <button class="primary" data-action="apply-instrument">Aplicar cambios</button>
            <button class="secondary" data-action="reset-instrument">Restaurar base</button>
          </div>
          <p class="editor-status ${editorStatus.tone}">${editorStatus.message}</p>
        </details>
      </aside>

      <section class="diagnostic">
        ${activeDimensions.map((dimension) => dimensionTemplate(dimension, result)).join("")}
      </section>

      <aside class="summary">
        <p class="eyebrow summary__eyebrow">Analisis automatico</p>
        <h2>Brechas prioritarias</h2>
        ${result.criticalGaps.length ? result.criticalGaps.map((dimension) => `
          <article class="gap">
            <span>${dimension.shortName}</span>
            <strong>${dimension.percent}%</strong>
            <p>${dimension.description}</p>
          </article>
        `).join("") : `<p class="muted">No hay dimensiones bajo 50%. Mantener revision documental y control de versiones.</p>`}

        <h2>Recomendaciones automaticas</h2>
        <ol class="recommendations">
          ${recommendations.map((item) => `<li><span>${item.dimension}</span>${item.text}</li>`).join("")}
        </ol>

        <h2>Fortalezas</h2>
        <div class="strengths">
          ${result.strongest.map((dimension) => `<span>${dimension.shortName} · ${dimension.percent}%</span>`).join("")}
        </div>
      </aside>
    </section>

    <section class="disclaimer">
      <strong>Alcance:</strong> orienta preparacion operativa y documental frente a la guia tecnica. No reemplaza revision juridica, auditoria de organismo administrador ni fiscalizacion competente.
    </section>
  `;

  bindEvents();
}

function inputField(key, label) {
  return `
    <label class="field">
      <span>${label}</span>
      <input value="${escapeHtml(state.company[key])}" data-company="${key}" />
    </label>
  `;
}

function dimensionTemplate(dimension, result) {
  const dimensionResult = result.dimensionResults.find((item) => item.id === dimension.id);
  return `
    <article class="dimension">
      <header>
        <div>
          <h2>${dimension.name}</h2>
          <p>${dimension.description}</p>
        </div>
        <strong>${dimensionResult.percent}%</strong>
      </header>
      <div class="question-list">
        ${dimension.questions.map((question) => questionTemplate(question)).join("")}
      </div>
    </article>
  `;
}

function questionTemplate(question) {
  const value = state.answers[question.id];
  return `
    <fieldset class="question">
      <legend>${question.text}</legend>
      <div class="options">
        ${answerOptions.map((option) => `
          <label class="${Number(value) === option.value ? "selected" : ""}">
            <input type="radio" name="${question.id}" value="${option.value}" ${Number(value) === option.value ? "checked" : ""} />
            <span>${option.label}</span>
            <small>${option.hint}</small>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function bindEvents() {
  app.querySelector(".instrument-editor").addEventListener("toggle", (event) => {
    editorOpen = event.target.open;
    localStorage.setItem(editorKey, String(editorOpen));
  });

  app.querySelector("[data-editor]").addEventListener("input", (event) => {
    editorValue = event.target.value;
  });

  app.querySelectorAll("[data-company]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.company[event.target.dataset.company] = event.target.value;
      persist();
    });
  });

  app.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.answers[event.target.name] = Number(event.target.value);
      persist();
      render();
    });
  });

  app.querySelector("[data-action='reset']").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    state.company = { name: "", sector: "", workers: "", contact: "" };
    state.answers = emptyAnswers(activeDimensions);
    render();
  });

  app.querySelector("[data-action='export']").addEventListener("click", exportReport);
  app.querySelector("[data-action='save']").addEventListener("click", saveReport);
  app.querySelector("[data-action='download-instrument']").addEventListener("click", downloadInstrument);
  app.querySelector("[data-action='apply-instrument']").addEventListener("click", applyInstrument);
  app.querySelector("[data-action='reset-instrument']").addEventListener("click", resetInstrument);
}

function exportReport() {
  const payload = buildReportPayload();
  downloadJson(payload);
}

async function saveReport() {
  saveStatus = { tone: "muted", message: "Guardando diagnostico..." };
  render();

  const payload = buildReportPayload();
  const submission = {
    company_name: emptyToNull(payload.company.name),
    sector: emptyToNull(payload.company.sector),
    workers_count: parseWorkers(payload.company.workers),
    contact: emptyToNull(payload.company.contact),
    score: payload.score,
    maturity: payload.maturity,
    answered_count: answeredCount(),
    total_questions: totalQuestions(),
    report: payload,
    source: "stec-ds44-mvp"
  };

  const result = await saveDiagnosticSubmission(submission);
  saveStatus = {
    tone: result.ok ? "success" : "error",
    message: result.message
  };
  render();
}

function buildReportPayload() {
  const result = calculateResult(state.answers, activeDimensions);
  const recommendations = generateRecommendations(result);
  return {
    generatedAt: new Date().toISOString(),
    instrumentVersion: localStorage.getItem(instrumentKey) ? "custom-local" : "base-stec-ds44-v1",
    company: state.company,
    score: result.total,
    maturity: result.level.name,
    maturitySummary: result.level.summary,
    dimensions: result.dimensionResults.map((dimension) => ({
      id: dimension.id,
      name: dimension.name,
      score: dimension.score,
      percent: dimension.percent
    })),
    recommendations
  };
}

function loadInstrument() {
  const savedInstrument = localStorage.getItem(instrumentKey);
  if (!savedInstrument) {
    return cloneDimensions();
  }

  try {
    const parsed = JSON.parse(savedInstrument);
    const validationError = validateDimensions(parsed);
    return validationError ? cloneDimensions() : parsed;
  } catch {
    return cloneDimensions();
  }
}

function applyInstrument() {
  try {
    const parsed = JSON.parse(editorValue);
    const validationError = validateDimensions(parsed);
    if (validationError) {
      editorStatus = { tone: "error", message: validationError };
      render();
      return;
    }

    activeDimensions = parsed;
    state.answers = normalizeAnswers(state.answers, activeDimensions);
    localStorage.setItem(instrumentKey, JSON.stringify(activeDimensions));
    persist();
    editorStatus = { tone: "success", message: "Instrumento aplicado en este navegador." };
    render();
  } catch {
    editorStatus = { tone: "error", message: "El JSON no es valido. Revisa comas, llaves y comillas." };
    render();
  }
}

function resetInstrument() {
  activeDimensions = cloneDimensions();
  editorValue = JSON.stringify(activeDimensions, null, 2);
  state.answers = normalizeAnswers(state.answers, activeDimensions);
  localStorage.removeItem(instrumentKey);
  persist();
  editorStatus = { tone: "success", message: "Instrumento base restaurado." };
  render();
}

function downloadInstrument() {
  downloadJson({
    version: "base-stec-ds44-v1",
    dimensions: activeDimensions,
    answerOptions
  }, "instrumento-stec-ds44.json");
}

function downloadJson(payload, filename = `diagnostico-ds44-${slugify(state.company.name || "empresa")}.json`) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function emptyToNull(value) {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed : null;
}

function parseWorkers(value) {
  const number = Number.parseInt(String(value || "").replace(/\D+/g, ""), 10);
  return Number.isFinite(number) ? number : null;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

render();
