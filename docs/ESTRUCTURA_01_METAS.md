# Estructura de `01_metas`

## Objetivo

Definir exactamente cómo convertir una tabla tipo `Detalle_EXANI_II` a la hoja `01_metas` del archivo maestro.

---

## Regla de transformación

La hoja `01_metas` debe quedar en formato **largo**.

Eso significa que:
- cada fila representa **una meta puntual**
- para una combinación única de:
  - ciclo
  - temario
  - campus
  - mes de inscripción
  - mes de inicio del curso

---

## Qué significan las columnas de la tabla origen

En `Detalle_EXANI_II`:
- `Campus` = campus operativo
- `Mes inicio` = mes en que arranca el curso
- `Meta inicio` = meta total de ese arranque
- columnas `MAR-26`, `ABR-26`, `MAY-26`, etc. = cuántos inscritos se espera captar en cada mes de inscripción para ese arranque

Por lo tanto, cada celda mensual debe convertirse en una fila dentro de `01_metas`.

---

## Columnas finales recomendadas para `01_metas`

### Núcleo mínimo
- `ciclo`
- `temario`
- `campus`
- `campus_normalized`
- `inscription_month`
- `course_start_month`
- `goal`
- `notes`

### Columnas de soporte recomendadas
- `meta_inicio_total`
- `hist_local_n`
- `hist_ciclos`
- `peso_local`
- `metodo`
- `source_month_label`
- `source_start_month_label`

---

## Mapeo exacto

| Origen | Destino |
|---|---|
| valor fijo `2026-2027` | `ciclo` |
| valor fijo `EXANI II` | `temario` |
| `Campus` | `campus` |
| `Campus` ya homologado | `campus_normalized` |
| columna mensual como `MAR-26` | `inscription_month` = `2026-03` |
| `Mes inicio` como `SEP` | `course_start_month` = `2026-09` |
| valor de la celda mensual | `goal` |
| `Método` | `notes` |
| `Meta inicio` | `meta_inicio_total` |
| `Hist local n` | `hist_local_n` |
| `Hist ciclos` | `hist_ciclos` |
| `Peso local` | `peso_local` |
| `Método` | `metodo` |
| nombre de columna original `MAR-26` | `source_month_label` |
| valor original `SEP` | `source_start_month_label` |

---

## Ejemplo de transformación

### Tabla origen
| Campus | Mes inicio | Meta inicio | MAR-26 | ABR-26 | MAY-26 |
|---|---|---:|---:|---:|---:|
| Centro | SEP | 549 | 21 | 30 | 50 |

### Filas resultantes en `01_metas`
| ciclo | temario | campus | campus_normalized | inscription_month | course_start_month | goal | notes |
|---|---|---|---|---|---|---:|---|
| 2026-2027 | EXANI II | Centro | Centro | 2026-03 | 2026-09 | 21 | Base campus (70) + global (30) |
| 2026-2027 | EXANI II | Centro | Centro | 2026-04 | 2026-09 | 30 | Base campus (70) + global (30) |
| 2026-2027 | EXANI II | Centro | Centro | 2026-05 | 2026-09 | 50 | Base campus (70) + global (30) |

---

## Decisión recomendada

Para el MVP conviene **sí conservar filas con `goal = 0`** porque:
- mantiene completa la matriz de meses
- facilita tablas dinámicas y dashboards
- evita huecos al calcular esperado vs real

Más adelante se puede filtrar visualmente si se desea.

---

## Conversión de meses

### Meses de inscripción
| Etiqueta origen | Valor destino |
|---|---|
| MAR-26 | 2026-03 |
| ABR-26 | 2026-04 |
| MAY-26 | 2026-05 |
| JUN-26 | 2026-06 |
| JUL-26 | 2026-07 |
| AGO-26 | 2026-08 |
| SEP-26 | 2026-09 |
| OCT-26 | 2026-10 |
| NOV-26 | 2026-11 |
| DIC-26 | 2026-12 |
| ENE-27 | 2027-01 |
| FEB-27 | 2027-02 |
| MAR-27 | 2027-03 |
| ABR-27 | 2027-04 |
| MAY-27 | 2027-05 |

### Meses de inicio
| Etiqueta origen | Valor destino |
|---|---|
| SEP | 2026-09 |
| OCT | 2026-10 |
| NOV | 2026-11 |
| DIC | 2026-12 |
| ENE | 2027-01 |
| FEB | 2027-02 |
| MAR | 2027-03 |
| ABR | 2027-04 |
| MAY | 2027-05 |

---

## Resultado esperado

Usando la tabla `Detalle_EXANI_II` completa, la hoja `01_metas` queda con una fila por combinación `campus + mes de inicio + mes de inscripción`.

En el caso de EXANI II, la transformación genera una matriz larga lista para dashboard y validación de metas.
