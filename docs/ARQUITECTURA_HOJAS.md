# Arquitectura de Hojas

## Objetivo

Definir la estructura mínima de hojas o tablas para montar el MVP del sistema de inteligencia comercial en Google Sheets y posteriormente conectarlo a AppScript.

La lógica busca separar:
- datos crudos
- datos homologados
- matching
- tablas analíticas
- configuración

---

## Principio de diseño

Cada capa debe tener una responsabilidad clara:

1. **Raw**: recibe exportaciones tal como vienen.
2. **Normalized**: limpia y homologa campos críticos.
3. **Matching**: une entidades entre fuentes.
4. **Analytics**: produce tablas de consumo para dashboard.
5. **Config**: controla catálogos, umbrales y parámetros.

---

## Estructura recomendada

```text
00_README
01_metas
02_rhino_raw
03_salesforce_raw
04_manychat_raw
05_catalogos_campus
06_catalogos_temario
07_catalogos_especialistas
08_rhino_normalized
09_salesforce_normalized
10_manychat_normalized
11_matching_results
12_dashboard_kpis
13_dashboard_campus
14_dashboard_inicio
15_dashboard_embudo
16_dashboard_data_quality
17_parametros
```

---

## Hoja: 00_README

### Propósito
Hoja de orientación rápida para cualquier usuario del archivo maestro.

### Debe incluir
- propósito del archivo
- responsable del mantenimiento
- fecha de última actualización
- fuentes de datos
- reglas básicas de uso

---

## Hoja: 01_metas

### Propósito
Fuente de verdad de las metas comerciales.

### Columnas mínimas
- ciclo
- temario
- campus
- campus_normalized
- inscription_month
- course_start_month
- goal
- notes

### Observaciones
Esta hoja debe poder alimentar metas por:
- campus y mes de inscripción
- campus y mes de inicio
- temario
- total ciclo

---

## Hoja: 02_rhino_raw

### Propósito
Carga cruda de Rhino sin modificar estructura original.

### Uso
- importar corte histórico o periódico
- preservar el dato fuente
- no editar manualmente salvo para recarga controlada

### Columnas esperadas
Las que traiga Rhino, pero idealmente deben existir:
- full_name
- inscription_datetime
- campus
- temario
- group_name

---

## Hoja: 03_salesforce_raw

### Propósito
Carga cruda de exportaciones de Salesforce.

### Columnas mínimas esperadas
- salesforce_record_id
- full_name
- manychat_id
- created_at
- stage
- status
- specialist
- campus
- temario
- source

---

## Hoja: 04_manychat_raw

### Propósito
Carga cruda del log o export de ManyChat.

### Columnas mínimas esperadas
- manychat_id
- conversation_datetime
- contact_name
- channel
- campaign_or_flow
- assigned_specialist
- conversation_status

---

## Hoja: 05_catalogos_campus

### Propósito
Homologar todas las variantes de campus.

### Columnas
- raw_value
- normalized_value
- active_flag
- comments

### Ejemplos
- PATRIA → Norte / Patria
- CEDU → Caucel / CEDU Noel / Humanitas
- CEDUNOEL → Caucel / CEDU Noel / Humanitas
- HUMANITAS → Caucel / CEDU Noel / Humanitas
- SANTA → Intensivo / Semana Santa
- SEMANA → Intensivo / Semana Santa
- INTENSIVO → Intensivo / Semana Santa

---

## Hoja: 06_catalogos_temario

### Propósito
Homologar valores de temario.

### Columnas
- raw_value
- normalized_value
- active_flag
- comments

### Valores homologados recomendados
- EXANI I
- EXANI II

---

## Hoja: 07_catalogos_especialistas

### Propósito
Estandarizar nombres de especialistas.

### Columnas
- raw_value
- normalized_value
- active_flag
- comments

---

## Hoja: 08_rhino_normalized

### Propósito
Versión limpia de Rhino para análisis y match.

### Columnas mínimas
- rhino_row_id
- full_name
- full_name_normalized
- inscription_datetime
- inscription_date
- inscription_month
- campus
- campus_normalized
- temario
- temario_normalized
- group_name
- course_start_date
- course_start_month
- valid_record_flag
- exclusion_reason

### Lógica clave
- normalizar nombre
- homologar campus
- homologar temario
- inferir mes de inicio desde `group_name`
- marcar exclusiones

---

## Hoja: 09_salesforce_normalized

### Propósito
Versión limpia de Salesforce para análisis y match.

### Columnas mínimas
- salesforce_record_id
- record_type
- full_name
- full_name_normalized
- manychat_id
- created_at
- created_date
- created_month
- stage
- status
- specialist
- specialist_normalized
- campus
- campus_normalized
- temario
- temario_normalized
- source
- valid_record_flag
- exclusion_reason

### Lógica clave
- normalizar nombre
- validar `manychat_id`
- homologar campus
- homologar temario
- homologar especialista

---

## Hoja: 10_manychat_normalized

### Propósito
Versión limpia de ManyChat para análisis y unión con Salesforce.

### Columnas mínimas
- manychat_id
- conversation_datetime
- conversation_date
- conversation_month
- contact_name
- contact_name_normalized
- channel
- campaign_or_flow
- assigned_specialist
- specialist_normalized
- conversation_status
- valid_record_flag
- exclusion_reason

### Lógica clave
- validar `manychat_id`
- homologar especialista
- normalizar nombre cuando exista

---

## Hoja: 11_matching_results

### Propósito
Concentrar resultados de matching entre fuentes.

### Columnas mínimas
- match_id
- manychat_id
- salesforce_record_id
- rhino_row_id
- full_name_normalized
- campus_normalized
- temario_normalized
- match_type
- match_reason
- confidence_score
- matched_at

### Uso
- medir trazabilidad
- construir embudo
- revisar casos dudosos

---

## Hoja: 12_dashboard_kpis

### Propósito
Tabla base para tarjetas globales.

### Métricas sugeridas
- meta_total
- inscritos_reales
- esperado_al_dia
- gap
- cumplimiento_pct
- proyeccion_simple
- ritmo_requerido
- leads_total
- oportunidades_total
- conversaciones_total

---

## Hoja: 13_dashboard_campus

### Propósito
Tabla analítica por campus.

### Columnas sugeridas
- campus_normalized
- temario_normalized
- goal
- real_inscritos
- esperado_al_dia
- gap
- cumplimiento_pct
- semaforo
- leads
- oportunidades
- conversaciones

---

## Hoja: 14_dashboard_inicio

### Propósito
Tabla analítica por fecha o mes de inicio del curso.

### Columnas sugeridas
- course_start_month
- campus_normalized
- temario_normalized
- goal
- real_inscritos
- esperado_al_dia
- gap
- ritmo_requerido
- semaforo

---

## Hoja: 15_dashboard_embudo

### Propósito
Tabla de embudo comercial.

### Columnas sugeridas
- period
- campus_normalized
- temario_normalized
- specialist_normalized
- conversaciones
- leads
- oportunidades
- inscritos
- conv_to_lead_pct
- lead_to_opp_pct
- opp_to_inscrito_pct
- conv_to_inscrito_pct

---

## Hoja: 16_dashboard_data_quality

### Propósito
Monitorear salud de los datos.

### Columnas sugeridas
- period
- leads_total
- leads_with_manychat_id
- leads_without_manychat_id
- pct_leads_with_manychat_id
- inscritos_total
- inscritos_matched
- inscritos_unmatched
- pct_exact_match
- pct_probable_match
- pct_no_match

---

## Hoja: 17_parametros

### Propósito
Centralizar configuraciones del sistema.

### Parámetros sugeridos
- target_cycle
- current_date_cutoff
- red_threshold
- yellow_threshold
- match_confidence_exact
- match_confidence_probable
- date_window_days

---

## Reglas operativas para el archivo maestro

1. No editar manualmente hojas `raw` salvo para recarga.
2. Los catálogos deben actualizarse antes de corregir datos a mano.
3. Las hojas `normalized` deben depender de reglas, no de edición manual libre.
4. Las hojas `dashboard_*` deben consumir solo datos homologados o tablas controladas.
5. Toda métrica mostrada al usuario final debe poder rastrearse a una fuente.

---

## Orden recomendado de implementación

### Etapa 1
- `01_metas`
- `02_rhino_raw`
- `05_catalogos_campus`
- `06_catalogos_temario`
- `08_rhino_normalized`
- `12_dashboard_kpis`
- `13_dashboard_campus`
- `14_dashboard_inicio`

### Etapa 2
- `03_salesforce_raw`
- `07_catalogos_especialistas`
- `09_salesforce_normalized`
- `15_dashboard_embudo`
- `16_dashboard_data_quality`

### Etapa 3
- `04_manychat_raw`
- `10_manychat_normalized`
- `11_matching_results`
- mejora de embudo nominal
