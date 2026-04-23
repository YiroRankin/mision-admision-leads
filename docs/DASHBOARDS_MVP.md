# Dashboards MVP

## Objetivo

Definir cómo deben verse y qué deben mostrar los primeros dashboards del MVP, ahora que ya están listas las bases de metas y Rhino normalizado.

---

## Estado actual

Ya están listas:
- `01_metas`
- `02_rhino_raw`
- `05_catalogos_campus`
- `06_catalogos_temario`
- `08_rhino_normalized`

Con esto ya se pueden construir los tres dashboards base:
- `12_dashboard_kpis`
- `13_dashboard_campus`
- `14_dashboard_inicio`

---

## Secuencia recomendada

1. construir `12_dashboard_kpis`
2. construir `13_dashboard_campus`
3. construir `14_dashboard_inicio`
4. validar totales contra `01_metas` y `08_rhino_normalized`
5. montar una hoja visual final si se desea (`18_dashboard_visual`)

---

## 12_dashboard_kpis

## Propósito
Resumen ejecutivo del corte actual.

## Qué debe mostrar
- meta total
- inscritos reales
- gap
- cumplimiento_pct
- campus activos
- meses de inicio activos

## Estructura sugerida

### Opción simple en vertical
| kpi_name | kpi_value |
|---|---:|
| meta_total | 3537 |
| inscritos_reales | 214 |
| gap_vs_meta_total | -3323 |
| cumplimiento_pct | 0.0605 |
| campus_activos | 8 |
| meses_inicio_activos | 9 |

### Opción visual en tarjetas
- B2: Meta total
- D2: Inscritos reales
- F2: Gap
- H2: % cumplimiento
- J2: Campus activos
- L2: Meses inicio activos

Con los valores debajo, por ejemplo en fila 3.

## Wireframe sugerido

```text
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
| Meta total   | Reales       | Gap          | % Cumplim.   | Campus act.  | Inicios act. |
| 3,537        | 214          | -3,323       | 6.1%         | 8            | 9            |
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## 13_dashboard_campus

## Propósito
Comparar meta vs real por campus y temario.

## Qué debe mostrar
- campus_normalized
- temario_normalized
- goal
- real_inscritos
- gap_vs_meta_total
- cumplimiento_pct
- semaforo

## Wireframe sugerido

```text
┌──────────────────────────────┬───────────┬───────┬────────┬────────┬──────────────┬───────────┐
| Campus                       | Temario   | Goal  | Reales | Gap    | Cumplimiento | Semáforo  |
├──────────────────────────────┼───────────┼───────┼────────┼────────┼──────────────┼───────────┤
| Centro                       | EXANI II  | 549   | 44     | -505   | 8.0%         | rojo      |
| Norte / Patria               | EXANI II  | 315   | 19     | -296   | 6.0%         | rojo      |
| Caucel / CEDU Noel / ...     | EXANI II  | 300   | 28     | -272   | 9.3%         | rojo      |
| Virtual                      | EXANI II  | 440   | 35     | -405   | 8.0%         | rojo      |
| Centro                       | EXANI I   | 210   | 13     | -197   | 6.2%         | rojo      |
└──────────────────────────────┴───────────┴───────┴────────┴────────┴──────────────┴───────────┘
```

## Recomendaciones visuales
- congelar fila 1
- aplicar formato de porcentaje a `cumplimiento_pct`
- colorear `semaforo` con formato condicional
- ordenar por `temario` y luego por `goal` desc o `cumplimiento_pct` asc

## Uso gerencial
Esta tabla responde:
- qué campus van más atrasados
- qué campus tienen más meta
- qué temario necesita atención por sede

---

## 14_dashboard_inicio

## Propósito
Comparar meta vs real por mes de inicio del curso, cruzado con campus y temario.

## Qué debe mostrar
- course_start_month
- campus_normalized
- temario_normalized
- goal
- real_inscritos
- gap_vs_meta_total
- cumplimiento_pct
- semaforo

## Wireframe sugerido

```text
┌────────────┬──────────────────────────────┬───────────┬───────┬────────┬────────┬──────────────┬───────────┐
| Inicio     | Campus                       | Temario   | Goal  | Reales | Gap    | Cumplimiento | Semáforo  |
├────────────┼──────────────────────────────┼───────────┼───────┼────────┼────────┼──────────────┼───────────┤
| 2026-09    | Centro                       | EXANI II  | 120   | 14     | -106   | 11.7%        | rojo      |
| 2026-10    | Centro                       | EXANI II  | 85    | 7      | -78    | 8.2%         | rojo      |
| 2026-09    | Virtual                      | EXANI II  | 90    | 11     | -79    | 12.2%        | rojo      |
| 2027-01    | Centro                       | EXANI I   | 30    | 2      | -28    | 6.7%         | rojo      |
└────────────┴──────────────────────────────┴───────────┴───────┴────────┴────────┴──────────────┴───────────┘
```

## Recomendaciones visuales
- ordenar por `course_start_month`
- aplicar formato `yyyy-mm`
- mantener misma lógica de semáforo que campus

## Uso gerencial
Esta tabla responde:
- qué arranques vienen débiles
- en qué campus hay riesgo de no llenar grupos
- en qué mes de inicio conviene enfocar captación

---

## 18_dashboard_visual (opcional)

## Propósito
Montar una hoja bonita para presentar mañana sin tocar las tablas fuente.

## Estructura sugerida

### Bloque 1. KPIs
Tomar referencias desde `12_dashboard_kpis`

### Bloque 2. Tabla campus
Insertar consulta o referencia de `13_dashboard_campus`

### Bloque 3. Tabla inicios
Insertar consulta o referencia de `14_dashboard_inicio`

## Wireframe

```text
TÍTULO: Misión Admisión – Avance Comercial 2026-2027
SUBTÍTULO: Corte actual

[ Meta total ] [ Reales ] [ Gap ] [ % cumplimiento ] [ Campus activos ] [ Inicios activos ]

Sección 1. Avance por campus
(tabla o pivote desde 13_dashboard_campus)

Sección 2. Avance por fecha de inicio
(tabla o pivote desde 14_dashboard_inicio)
```

## Recomendaciones visuales
- usar una sola paleta sobria
- no mezclar colores políticos o excesivos
- usar rojo / amarillo / verde solo para semáforo
- congelar encabezados
- mantener filtros arriba

---

## Validaciones obligatorias

### Validación 1
La suma de `goal` en `13_dashboard_campus` debe ser igual a la suma de `goal` en `01_metas`.

### Validación 2
La suma de `real_inscritos` en `13_dashboard_campus` debe ser igual al conteo válido de `08_rhino_normalized`.

### Validación 3
La suma de `goal` en `14_dashboard_inicio` debe ser igual a la suma de `goal` en `01_metas`.

### Validación 4
La suma de `real_inscritos` en `14_dashboard_inicio` debe ser igual al conteo válido de `08_rhino_normalized` agrupado por mes de inicio.

---

## Qué sigue después de estos dashboards

Cuando queden validados:
1. agregar `03_salesforce_raw`
2. agregar `07_catalogos_especialistas`
3. construir `09_salesforce_normalized`
4. preparar `15_dashboard_embudo`
5. preparar `16_dashboard_data_quality`

---

## Criterio de éxito

El dashboard inicial ya es útil si mañana permite ver con claridad:
- cuánto es la meta
- cuántos inscritos reales hay
- qué campus van más rezagados
- qué fechas de inicio están en riesgo
- dónde conviene enfocar la gestión comercial
