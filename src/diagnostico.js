export const dimensions = [
  {
    id: "cobertura",
    name: "Cobertura y poblacion objetivo",
    shortName: "Cobertura",
    weight: 20,
    description: "Identifica si la empresa sabe a quienes capacitar y si cubre dotacion, turnos, contratos y cambios operacionales.",
    questions: [
      {
        id: "cobertura_universo",
        text: "La empresa tiene identificada la dotacion completa que debe recibir capacitacion, sin excluir cargos, jornadas, modalidad contractual ni antiguedad.",
        recommendation: "Levantar una nomina unica de personas trabajadoras y segmentarla por cargo, area, centro de trabajo, turno y modalidad contractual."
      },
      {
        id: "cobertura_cambios",
        text: "Existe un mecanismo para detectar ingresos, cambios de puesto, cambios tecnologicos o nuevos procesos que obliguen a actualizar la informacion y capacitacion.",
        recommendation: "Conectar RR.HH., operaciones y prevencion para activar capacitacion cuando una persona ingresa o cambia su exposicion a riesgos."
      },
      {
        id: "cobertura_priorizacion",
        text: "La empresa puede priorizar grupos criticos segun exposicion a riesgos, faenas, procesos o historial preventivo.",
        recommendation: "Usar la matriz de riesgos, accidentabilidad e informacion de supervisores para calendarizar primero los grupos de mayor exposicion."
      }
    ]
  },
  {
    id: "contenidos",
    name: "Contenidos tecnicos y pertinencia",
    shortName: "Contenidos",
    weight: 20,
    description: "Evalua si los contenidos bajan desde la gestion preventiva general hasta los riesgos reales del lugar de trabajo.",
    questions: [
      {
        id: "contenidos_minimos",
        text: "El programa considera contenidos minimos comunes de seguridad y salud en el trabajo, derechos, obligaciones, riesgos y medidas preventivas.",
        recommendation: "Diseñar una malla base de 8 horas con contenidos comunes y modulos ajustables por rubro, tarea y centro de trabajo."
      },
      {
        id: "contenidos_riesgos",
        text: "Los contenidos se vinculan con riesgos concretos identificados en la empresa, sus medidas preventivas y metodos de trabajo correcto.",
        recommendation: "Traducir la matriz de riesgos y los procedimientos internos en casos, actividades y ejemplos de aula aplicables al trabajo diario."
      },
      {
        id: "contenidos_emergencias",
        text: "La capacitacion incorpora riesgos de emergencias, catastrofes o desastres cuando son pertinentes al lugar de trabajo.",
        recommendation: "Integrar escenarios de emergencia y roles operativos con el plan de gestion de riesgos de emergencias de la empresa."
      }
    ]
  },
  {
    id: "metodologia",
    name: "Metodologia y experiencia de aprendizaje",
    shortName: "Metodologia",
    weight: 15,
    description: "Mide si la capacitacion tiene diseno pedagogico suficiente para verificar comprension, no solo asistencia.",
    questions: [
      {
        id: "metodologia_8h",
        text: "El curso considera una duracion minima total de 8 horas y una planificacion compatible con la jornada laboral.",
        recommendation: "Definir una arquitectura de curso de 8 horas, presencial, remota o mixta, con agenda, pausas, actividades y control horario."
      },
      {
        id: "metodologia_activa",
        text: "La metodologia usa actividades practicas, analisis de casos o ejercicios aplicados al puesto de trabajo.",
        recommendation: "Incluir ejercicios de reconocimiento de peligros, decisiones preventivas y aplicacion de medidas en situaciones reales."
      },
      {
        id: "metodologia_accesibilidad",
        text: "El diseno considera lenguaje comprensible, turnos, niveles educativos, modalidad remota/presencial y necesidades de acceso.",
        recommendation: "Ajustar materiales, ejemplos, horarios y soporte para que la capacitacion sea verificablemente comprensible por toda la poblacion objetivo."
      }
    ]
  },
  {
    id: "evaluacion",
    name: "Evaluacion verificable del aprendizaje",
    shortName: "Evaluacion",
    weight: 20,
    description: "Revisa si la empresa puede demostrar comprension de contenidos y no solo participacion.",
    questions: [
      {
        id: "evaluacion_instrumentos",
        text: "Existen instrumentos de evaluacion alineados a los contenidos y riesgos abordados en la capacitacion.",
        recommendation: "Crear evaluaciones por modulo con preguntas, rubricas o actividades practicas vinculadas a los objetivos de aprendizaje."
      },
      {
        id: "evaluacion_aprobacion",
        text: "La empresa define criterios de aprobacion, manejo de reprobacion y refuerzo para quienes no logren los aprendizajes esperados.",
        recommendation: "Establecer puntaje minimo, retroalimentacion y rutas de reforzamiento antes de cerrar el cumplimiento formativo."
      },
      {
        id: "evaluacion_evidencia",
        text: "Los resultados de evaluacion quedan asociados a cada persona capacitada y pueden ser auditados posteriormente.",
        recommendation: "Guardar resultados por participante, fecha, version del curso, relator, modalidad e instrumento aplicado."
      }
    ]
  },
  {
    id: "trazabilidad",
    name: "Registros, evidencia y trazabilidad",
    shortName: "Trazabilidad",
    weight: 15,
    description: "Evalua la capacidad de conservar antecedentes y responder ante fiscalizaciones o auditorias internas.",
    questions: [
      {
        id: "trazabilidad_asistencia",
        text: "La asistencia, horas realizadas, fechas, modalidad y participantes quedan respaldados con registros consistentes.",
        recommendation: "Estandarizar actas, listas de asistencia, bitacoras de aula virtual y respaldos de ejecucion por grupo."
      },
      {
        id: "trazabilidad_documentos",
        text: "La empresa conserva programa, contenidos, materiales, evaluaciones, resultados y antecedentes del ejecutor.",
        recommendation: "Crear una carpeta documental por cohorte con version del programa, material usado, evaluaciones y evidencias de cierre."
      },
      {
        id: "trazabilidad_reportes",
        text: "La empresa puede generar reportes por area, cargo, trabajador, centro de trabajo y estado de capacitacion.",
        recommendation: "Implementar un tablero simple con brechas: pendiente, en curso, aprobado, requiere refuerzo y evidencia incompleta."
      }
    ]
  },
  {
    id: "gobernanza",
    name: "Gobernanza y ejecucion",
    shortName: "Gobernanza",
    weight: 10,
    description: "Determina si la empresa tiene responsables, calendario, proveedor o capacidad interna para sostener el proceso.",
    questions: [
      {
        id: "gobernanza_responsables",
        text: "Hay responsables definidos entre gerencia, RR.HH., prevencion, operaciones y supervisores.",
        recommendation: "Asignar roles: dueno del proceso, responsable tecnico, coordinacion operativa, control documental y aprobacion de cierre."
      },
      {
        id: "gobernanza_ejecutor",
        text: "La empresa ya definio si ejecutara directamente, con OTEC acreditada o con asistencia del organismo administrador Ley 16.744.",
        recommendation: "Comparar capacidad interna, acreditacion disponible, trazabilidad requerida, cobertura territorial y soporte del organismo administrador."
      },
      {
        id: "gobernanza_plan",
        text: "Existe un plan de implementacion con fechas, grupos, recursos, comunicaciones y seguimiento.",
        recommendation: "Construir una carta Gantt de implementacion hasta la vigencia, con hitos de diseno, piloto, ejecucion masiva y cierre documental."
      }
    ]
  }
];

export function cloneDimensions(source = dimensions) {
  return JSON.parse(JSON.stringify(source));
}

export function validateDimensions(candidate) {
  if (!Array.isArray(candidate) || candidate.length === 0) {
    return "El instrumento debe ser una lista de dimensiones.";
  }

  const ids = new Set();
  const totalWeight = candidate.reduce((sum, dimension) => sum + Number(dimension.weight || 0), 0);

  for (const dimension of candidate) {
    if (!dimension.id || ids.has(dimension.id)) {
      return "Cada dimension necesita un id unico.";
    }
    ids.add(dimension.id);

    if (!dimension.name || !dimension.shortName || !dimension.description) {
      return `La dimension ${dimension.id} debe tener name, shortName y description.`;
    }

    if (!Number.isFinite(Number(dimension.weight)) || Number(dimension.weight) <= 0) {
      return `La dimension ${dimension.id} debe tener un weight mayor que 0.`;
    }

    if (!Array.isArray(dimension.questions) || dimension.questions.length === 0) {
      return `La dimension ${dimension.id} debe tener preguntas.`;
    }

    const questionIds = new Set();
    for (const question of dimension.questions) {
      if (!question.id || questionIds.has(question.id)) {
        return `Cada pregunta en ${dimension.id} necesita un id unico.`;
      }
      questionIds.add(question.id);

      if (!question.text || !question.recommendation) {
        return `La pregunta ${question.id} debe tener text y recommendation.`;
      }
    }
  }

  if (Math.round(totalWeight) !== 100) {
    return `La suma de pesos debe ser 100. Suma actual: ${totalWeight}.`;
  }

  return null;
}

export const answerOptions = [
  { value: 0, label: "No", hint: "No hay evidencia o solo hay una intencion informal." },
  { value: 1, label: "Lo básico", hint: "Existe algo parcial, no estandarizado o dependiente de personas puntuales." },
  { value: 2, label: "Avanzado", hint: "Hay definiciones o documentos, pero falta cobertura, prueba o trazabilidad." },
  { value: 3, label: "Sí", hint: "Opera de forma consistente y genera evidencia revisable." },
  { value: 4, label: "Nivel Pro", hint: "Se mide, mejora y se integra con gestion preventiva y reportes." }
];

export function emptyAnswers(activeDimensions = dimensions) {
  return Object.fromEntries(activeDimensions.flatMap((dimension) => dimension.questions.map((question) => [question.id, null])));
}

export function normalizeAnswers(answers, activeDimensions = dimensions) {
  const normalized = emptyAnswers(activeDimensions);
  for (const key of Object.keys(normalized)) {
    normalized[key] = answers[key] ?? null;
  }
  return normalized;
}

export function calculateResult(answers, activeDimensions = dimensions) {
  const dimensionResults = activeDimensions.map((dimension) => {
    const max = dimension.questions.length * 4;
    const raw = dimension.questions.reduce((sum, question) => sum + Number(answers[question.id] ?? 0), 0);
    const completion = raw / max;
    const weightedScore = completion * dimension.weight;
    const lowQuestions = dimension.questions.filter((question) => Number(answers[question.id] ?? 0) <= 1);

    return {
      ...dimension,
      raw,
      max,
      completion,
      score: Math.round(weightedScore * 10) / 10,
      percent: Math.round(completion * 100),
      lowQuestions
    };
  });

  const total = Math.round(dimensionResults.reduce((sum, dimension) => sum + dimension.score, 0));
  const level = getMaturityLevel(total);
  const criticalGaps = dimensionResults
    .filter((dimension) => dimension.percent < 50)
    .sort((a, b) => a.percent - b.percent);
  const strongest = [...dimensionResults].sort((a, b) => b.percent - a.percent).slice(0, 2);

  return { total, level, dimensionResults, criticalGaps, strongest };
}

export function getMaturityLevel(score) {
  if (score < 25) {
    return {
      name: "Reactivo",
      range: "0-24",
      tone: "risk",
      summary: "La empresa aun no cuenta con condiciones minimas para demostrar una capacitacion sistematica y verificable.",
      nextStep: "Partir por universo de trabajadores, programa base de 8 horas y plan documental."
    };
  }
  if (score < 50) {
    return {
      name: "Basico",
      range: "25-49",
      tone: "warn",
      summary: "Hay avances parciales, pero existen brechas relevantes de cobertura, evaluacion o trazabilidad.",
      nextStep: "Ordenar responsables, cerrar brechas criticas y pilotear una cohorte con evidencia completa."
    };
  }
  if (score < 75) {
    return {
      name: "Gestionado",
      range: "50-74",
      tone: "steady",
      summary: "La empresa puede implementar el proceso, aunque necesita robustecer control, evidencia y mejora continua.",
      nextStep: "Estandarizar reportes, reforzamientos y control por cargo o centro de trabajo."
    };
  }
  if (score < 90) {
    return {
      name: "Avanzado",
      range: "75-89",
      tone: "good",
      summary: "Existe una base solida para ejecutar, demostrar y mejorar la capacitacion.",
      nextStep: "Integrar resultados con indicadores preventivos y auditorias internas periodicas."
    };
  }
  return {
    name: "Integrado",
    range: "90-100",
    tone: "great",
    summary: "La capacitacion esta integrada a la gestion preventiva, con trazabilidad y mejora sistematica.",
    nextStep: "Mantener control de versiones, aprendizaje por incidentes y actualizacion normativa."
  };
}

export function generateRecommendations(result) {
  const lowQuestionRecommendations = result.dimensionResults
    .flatMap((dimension) =>
      dimension.lowQuestions.map((question) => ({
        dimension: dimension.shortName,
        text: question.recommendation
      }))
    )
    .slice(0, 6);

  const defaultRecommendations = [
    { dimension: "Cobertura", text: "Construir nomina objetivo y matriz de seguimiento por trabajador." },
    { dimension: "Curso", text: "Definir programa base de 8 horas con objetivos, contenidos, metodologia y evaluacion." },
    { dimension: "Evidencia", text: "Centralizar asistencia, resultados y respaldo documental por cohorte." }
  ];

  return lowQuestionRecommendations.length ? lowQuestionRecommendations : defaultRecommendations;
}
