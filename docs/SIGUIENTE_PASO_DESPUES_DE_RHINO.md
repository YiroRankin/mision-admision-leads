# Siguiente paso después de `01_metas` y `08_rhino_normalized`

## Estado actual

Ya están listas estas hojas:
- `01_metas`
- `02_rhino_raw`
- `05_catalogos_campus`
- `06_catalogos_temario`
- `08_rhino_normalized`

Con esto ya existe una base suficiente para construir la primera lectura real del MVP.

---

## Qué procede ahora

## Paso 1. Validar `08_rhino_normalized`

Antes de construir dashboards, confirmar que estas columnas estén correctas:

- `rhino_row_id`
- `full_name_normalized`
- `inscription_date`
- `inscription_month`
- `campus_normalized`
- `temario_normalized`
- `course_start_date`
- `course_start_month`
- `valid_record_flag`
- `exclusion_reason`

### Checklist mínimo
- no hay filas válidas sin `inscription_date`
- no hay filas válidas sin `campus_normalized`
- no hay filas válidas sin `temario_normalized`
- no hay filas válidas sin `course_start_month`
- las exclusiones están justificadas

---

## Paso 2. Definir `valid_record_flag`

Para el MVP, usar una regla simple:

### `TRUE`
Cuando el registro sí cuenta como inscripción útil para metas.

### `FALSE`
Cuando el registro deba excluirse, por ejemplo:
- membresías
- libros
- registros de prueba
- sin fecha útil
- sin campus o temario identificable

### Recomendación
Agregar en `exclusion_reason` valores estandarizados como:
- `membresia`
- `libro`
- `sin_fecha`
- `sin_campus`
- `sin_temario`
- `otro`

---

## Paso 3. Construir `12_dashboard_kpis`

Crear una tabla simple de KPIs globales.

### Estructura sugerida
- `kpi_name`
- `kpi_value`
- `period`
- `temario_filter`
- `campus_filter`
- `last_updated_at`

### Primeros KPIs a calcular
- `meta_total`
- `inscritos_reales`
- `cumplimiento_pct`
- `campus_activos`
- `meses_inicio_activos`

### Regla práctica
Para esta primera vuelta no es obligatorio calcular aún `esperado_al_dia` si todavía no está lista la curva histórica. Se puede arrancar con meta total y real.

---

## Paso 4. Construir `13_dashboard_campus`

Esta será la primera tabla realmente útil para mostrar mañana.

### Estructura sugerida
- `campus_normalized`
- `temario_normalized`
- `goal`
- `real_inscritos`
- `gap_vs_meta_total`
- `cumplimiento_pct`
- `semaforo`

### Cómo llenarla
- `goal`: suma desde `01_metas`
- `real_inscritos`: conteo de `08_rhino_normalized` con `valid_record_flag = TRUE`
- `gap_vs_meta_total`: `real_inscritos - goal`
- `cumplimiento_pct`: `real_inscritos / goal`

### Semáforo sugerido
- verde: `>= 0.95`
- amarillo: `0.80 a 0.94`
- rojo: `< 0.80`

---

## Paso 5. Construir `14_dashboard_inicio`

Esta tabla conecta metas con la lógica operativa de arranques.

### Estructura sugerida
- `course_start_month`
- `campus_normalized`
- `temario_normalized`
- `goal`
- `real_inscritos`
- `gap_vs_meta_total`
- `cumplimiento_pct`
- `semaforo`

### Cómo llenarla
- `goal`: suma desde `01_metas` agrupando por `course_start_month + campus + temario`
- `real_inscritos`: conteo desde `08_rhino_normalized` agrupado igual

---

## Paso 6. Validación cruzada mínima

Antes de dar por bueno el MVP inicial, validar:

### Validación 1
La suma de `goal` por campus en `13_dashboard_campus` debe cuadrar con `01_metas`.

### Validación 2
La suma de `real_inscritos` por campus en `13_dashboard_campus` debe cuadrar con el total válido en `08_rhino_normalized`.

### Validación 3
La suma de `goal` por inicio en `14_dashboard_inicio` debe cuadrar con `01_metas`.

### Validación 4
La suma de `real_inscritos` por inicio en `14_dashboard_inicio` debe cuadrar con `08_rhino_normalized`.

---

## Qué puede esperar el equipo al cierre de esta etapa

Si estos pasos quedan listos, mañana ya se puede mostrar:
- meta total del ciclo
- inscritos reales acumulados
- avance por campus
- avance por fecha de inicio
- semáforo básico

Eso ya constituye un MVP útil aunque todavía falte Salesforce y ManyChat.

---

## Siguiente bloque después de esto

Una vez que queden `12`, `13` y `14`, el siguiente bloque será:
- `03_salesforce_raw`
- `07_catalogos_especialistas`
- `09_salesforce_normalized`
- primera tabla de funnel comercial
