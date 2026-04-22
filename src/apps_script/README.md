# AppScript – Estructura Inicial

## Objetivo

Definir la estructura mínima del proyecto AppScript para construir una primera AppWeb conectada a Google Sheets.

---

## Módulos sugeridos

```text
/src/apps_script
  appsscript.json
  main.gs
  config.gs
  loaders.gs
  normalize.gs
  matching.gs
  metrics.gs
  views.gs
  utils.gs
```

---

## Responsabilidad por archivo

### `main.gs`
Punto de entrada de la app.

Funciones sugeridas:
- `doGet()`
- `buildDashboardPayload()`

### `config.gs`
Constantes y nombres de hojas.

Variables sugeridas:
- nombres de sheets
- umbrales de semáforo
- parámetros por defecto

### `loaders.gs`
Lectura de hojas y carga de datos.

Funciones sugeridas:
- `getMetas()`
- `getRhinoNormalized()`
- `getSalesforceNormalized()`
- `getManychatNormalized()`

### `normalize.gs`
Reglas de limpieza y homologación.

Funciones sugeridas:
- `normalizeName()`
- `normalizeCampus()`
- `normalizeTemario()`
- `normalizeSpecialist()`
- `extractCourseStartMonth()`

### `matching.gs`
Lógica de uniones entre fuentes.

Funciones sugeridas:
- `matchManychatToSalesforce()`
- `matchSalesforceToRhino()`
- `scoreMatch()`

### `metrics.gs`
Cálculo de KPIs y tablas analíticas.

Funciones sugeridas:
- `buildGlobalKpis()`
- `buildCampusTable()`
- `buildStartMonthTable()`
- `buildFunnelTable()`
- `buildDataQualityTable()`

### `views.gs`
Preparación de estructuras para UI.

Funciones sugeridas:
- `getExecutiveView()`
- `getCampusView()`
- `getStartView()`
- `getFunnelView()`
- `getDataQualityView()`

### `utils.gs`
Helpers varios.

Funciones sugeridas:
- parseo de fechas
- agrupaciones
- sumatorias
- porcentaje seguro

---

## Orden recomendado de desarrollo

### Sprint 1
- `config.gs`
- `loaders.gs`
- `normalize.gs`
- `metrics.gs`

### Sprint 2
- `main.gs`
- `views.gs`

### Sprint 3
- `matching.gs`
- mejoras de embudo

---

## Enfoque MVP

Primero construir la lógica para:
- metas vs inscritos
- campus
- fecha de inicio
- semáforos

Después incorporar:
- Salesforce
- calidad de dato
- ManyChat
- matching nominal
