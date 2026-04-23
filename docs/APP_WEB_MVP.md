# App Web MVP

## Qué se agregó

Se creó una primera versión estática de la aplicación web en la raíz del repo:

- `index.html`
- `styles.css`
- `app.js`
- `data.sample.js`

Esta versión ya muestra:
- resumen ejecutivo
- tabla por campus
- tabla por fecha de inicio
- filtro por temario

---

## Cómo funciona hoy

La app lee datos desde un objeto global:

```js
window.MA_DASHBOARD_DATA
```

Ese objeto vive por ahora en:
- `data.sample.js`

---

## Estructura esperada de datos

```js
window.MA_DASHBOARD_DATA = {
  meta: {
    cycle: "2026-2027",
    scope: "MVP demo",
    updatedAt: "2026-04-22 09:00"
  },
  kpis: [
    { key: "meta_total", label: "Meta total", value: 3537, format: "number", helper: "EXANI I + EXANI II" }
  ],
  campus: [
    { campus: "Centro", temario: "EXANI II", goal: 549, real: 44, gap: -505, compliance: 0.08, semaphore: "rojo" }
  ],
  starts: [
    { startMonth: "2026-09", campus: "Centro", temario: "EXANI II", goal: 120, real: 14, gap: -106, compliance: 0.1167, semaphore: "rojo" }
  ]
};
```

---

## Próximo paso recomendado

Sustituir `data.sample.js` por una salida real derivada de Google Sheets.

Opciones:

### Opción 1. Manual rápida
Actualizar `data.sample.js` pegando los valores reales del corte.

### Opción 2. Semi-automática
Generar un JSON desde Sheets y reemplazar el archivo en el repo.

### Opción 3. Más robusta
Publicar un endpoint con Apps Script y hacer que `app.js` lo consuma.

---

## Qué permite enseñar mañana

Aunque todavía no esté conectado en vivo, esta app ya sirve para:
- mostrar la estructura final del dashboard
- validar la experiencia de lectura
- presentar cómo se verá el sistema
- avanzar después a conexión real de datos

---

## Recomendación práctica

Para la demo inmediata:
1. cerrar números en `12_dashboard_kpis`
2. cerrar tabla `13_dashboard_campus`
3. cerrar tabla `14_dashboard_inicio`
4. pasar esos valores a `data.sample.js`
5. revisar visualmente el MVP web

---

## Paso siguiente de desarrollo

Una vez validado el MVP visual:
- conectar Salesforce
- agregar ManyChat
- construir embudo `15_dashboard_embudo`
- agregar calidad de datos `16_dashboard_data_quality`
