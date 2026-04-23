window.MA_DASHBOARD_DATA = {
  meta: {
    cycle: "2026-2027",
    scope: "MVP demo",
    updatedAt: "Pendiente de conectar a Sheets / Apps Script"
  },
  kpis: [
    { key: "meta_total", label: "Meta total", value: 3537, format: "number", helper: "EXANI I + EXANI II" },
    { key: "inscritos_reales", label: "Inscritos reales", value: 214, format: "number", helper: "Dato demo" },
    { key: "gap_vs_meta_total", label: "Gap", value: -3323, format: "number", helper: "Real - meta" },
    { key: "cumplimiento_pct", label: "% cumplimiento", value: 0.0605, format: "percent", helper: "Dato demo" },
    { key: "campus_activos", label: "Campus activos", value: 8, format: "number", helper: "Con movimiento" },
    { key: "meses_inicio_activos", label: "Inicios activos", value: 9, format: "number", helper: "Con movimiento" }
  ],
  campus: [
    { campus: "Centro", temario: "EXANI II", goal: 549, real: 44, gap: -505, compliance: 0.08, semaphore: "rojo" },
    { campus: "Norte / Patria", temario: "EXANI II", goal: 315, real: 19, gap: -296, compliance: 0.0603, semaphore: "rojo" },
    { campus: "Caucel / CEDU Noel / Humanitas", temario: "EXANI II", goal: 300, real: 28, gap: -272, compliance: 0.0933, semaphore: "rojo" },
    { campus: "Virtual", temario: "EXANI II", goal: 440, real: 35, gap: -405, compliance: 0.0795, semaphore: "rojo" },
    { campus: "Centro", temario: "EXANI I", goal: 210, real: 13, gap: -197, compliance: 0.0619, semaphore: "rojo" },
    { campus: "Campeche", temario: "EXANI I", goal: 74, real: 6, gap: -68, compliance: 0.0811, semaphore: "rojo" }
  ],
  starts: [
    { startMonth: "2026-09", campus: "Centro", temario: "EXANI II", goal: 120, real: 14, gap: -106, compliance: 0.1167, semaphore: "rojo" },
    { startMonth: "2026-10", campus: "Centro", temario: "EXANI II", goal: 85, real: 7, gap: -78, compliance: 0.0824, semaphore: "rojo" },
    { startMonth: "2026-09", campus: "Virtual", temario: "EXANI II", goal: 90, real: 11, gap: -79, compliance: 0.1222, semaphore: "rojo" },
    { startMonth: "2027-01", campus: "Centro", temario: "EXANI I", goal: 30, real: 2, gap: -28, compliance: 0.0667, semaphore: "rojo" },
    { startMonth: "2027-02", campus: "Campeche", temario: "EXANI I", goal: 18, real: 2, gap: -16, compliance: 0.1111, semaphore: "rojo" }
  ]
};
