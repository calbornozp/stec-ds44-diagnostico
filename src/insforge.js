import { createClient } from "@insforge/sdk";

const baseUrl = import.meta.env.VITE_INSFORGE_URL;
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

export const hasInsForgeConfig = Boolean(baseUrl && anonKey);

export const insforge = hasInsForgeConfig
  ? createClient({
      baseUrl,
      anonKey
    })
  : null;

export async function saveDiagnosticSubmission(payload) {
  if (!insforge) {
    return {
      ok: false,
      skipped: true,
      message: "La conexion con InsForge no esta configurada en este entorno."
    };
  }

  const { error } = await insforge.database.from("ds44_diagnostic_submissions").insert([payload]);

  if (error) {
    return {
      ok: false,
      message: error.message || "No se pudo guardar el diagnostico."
    };
  }

  return {
    ok: true,
    message: "Diagnostico guardado en InsForge."
  };
}

export async function saveAdvisoryRequest(payload) {
  if (!insforge) {
    return {
      ok: false,
      skipped: true,
      message: "La conexion con InsForge no esta configurada en este entorno."
    };
  }

  const { error } = await insforge.database.from("ds44_advisory_requests").insert([payload]);

  if (error) {
    return {
      ok: false,
      message: error.message || "No se pudo enviar la solicitud."
    };
  }

  return {
    ok: true,
    message: "Te vamos a contactar."
  };
}
