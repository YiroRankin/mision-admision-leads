# Primera Carga de Tablas

## Objetivo

Explicar, de forma práctica, qué debe colocarse en cada tabla del MVP para que el sistema pueda empezar a funcionar sin ambigüedad.

Este documento está pensado para armar el archivo maestro en Google Sheets.

---

## Orden recomendado de armado

1. `01_metas`
2. `02_rhino_raw`
3. `05_catalogos_campus`
4. `06_catalogos_temario`
5. `08_rhino_normalized`
6. `12_dashboard_kpis`
7. `13_dashboard_campus`
8. `14_dashboard_inicio`
9. `03_salesforce_raw`
10. `07_catalogos_especialistas`
11. `09_salesforce_normalized`
12. `04_manychat_raw`
13. `10_manychat_normalized`
14. `11_matching_results`

---

## 01_metas

### Qué va aquí
La meta oficial de inscritos. Esta hoja no debe traer resultados reales; solo objetivos.

### Qué debes capturar
Una fila por combinación de:
- ciclo
- temario
- campus
- mes de inscripción
- mes de inicio del curso

### Columnas
- `ciclo`
- `temario`
- `campus`
- `campus_normalized`
- `inscription_month`
- `course_start_month`
- `goal`
- `notes`

### Ejemplo
| ciclo | temario | campus | campus_normalized | inscription_month | course_start_month | goal | notes |
|---|---|---|---|---|---|---:|---|
| 2026-2027 | EXANI II | Centro | Centro | 2026-03 | 2026-09 | 12 | Meta base |

### Regla
Si un campus tiene meta para septiembre, octubre y noviembre, deben existir filas separadas por cada mes de inicio y por cada mes de inscripción.

---

## 02_rhino_raw

### Qué va aquí
La exportación original de Rhino, tal como salga del sistema.

### Qué debes pegar
Todo el corte disponible, sin borrar columnas si no es necesario.

### Campos mínimos que deben existir
- `full_name`
- `inscription_datetime`
- `campus`
- `temario`
- `group_name`

### Ejemplo mínimo
| full_name | inscription_datetime | campus | temario | group_name |
|---|---|---|---|---|
| Juan Pérez López | 2026-03-18 10:32:00 | Centro | EXANI II | EXII 20 DE SEPTIEMBRE CENTRO G1 |

### Regla
Esta hoja no se limpia a mano. Se usa como respaldo de origen.

---

## 03_salesforce_raw

### Qué va aquí
La exportación cruda de Salesforce.

### Qué debes pegar
Una fila por lead u oportunidad exportada.

### Columnas mínimas esperadas
- `salesforce_record_id`
- `record_type`
- `full_name`
- `manychat_id`
- `created_at`
- `stage`
- `status`
- `specialist`
- `campus`
- `temario`
- `source`

### Ejemplo
| salesforce_record_id | record_type | full_name | manychat_id | created_at | stage | status | specialist | campus | temario | source |
|---|---|---|---|---|---|---|---|---|---|---|
| SF-001 | lead | Juan Pérez López | MC-99881 | 2026-03-17 09:15:00 | Nuevo | Abierto | Andrea Gómez | Centro | EXANI II | Instagram |

### Regla
Si hay campos extra, se conservan. Lo importante es que estas columnas no falten.

---

## 04_manychat_raw

### Qué va aquí
El log crudo de conversaciones de ManyChat.

### Columnas mínimas esperadas
- `manychat_id`
- `conversation_datetime`
- `contact_name`
- `channel`
- `campaign_or_flow`
- `assigned_specialist`
- `conversation_status`

### Ejemplo
| manychat_id | conversation_datetime | contact_name | channel | campaign_or_flow | assigned_specialist | conversation_status |
|---|---|---|---|---|---|---|
| MC-99881 | 2026-03-17 09:02:00 | Juan Pérez López | Instagram | EXANI2_SEPTIEMBRE | Andrea Gómez | abierta |

### Regla
Aunque al inicio no venga completo, el `manychat_id` y la fecha son críticos.

---

## 05_catalogos_campus

### Qué va aquí
Las equivalencias de nombres de campus.

### Columnas
- `raw_value`
- `normalized_value`
- `active_flag`
- `comments`

### Ejemplo
| raw_value | normalized_value | active_flag | comments |
|---|---|---|---|
| PATRIA | Norte / Patria | TRUE | Variación histórica |
| CEDU | Caucel / CEDU Noel / Humanitas | TRUE | Variación histórica |
| CEDUNOEL | Caucel / CEDU Noel / Humanitas | TRUE | Variación histórica |
| HUMANITAS | Caucel / CEDU Noel / Humanitas | TRUE | Variación histórica |

### Regla
Cuando aparezca una nueva variante, se corrige aquí, no en las hojas normalizadas.

---

## 06_catalogos_temario

### Qué va aquí
Las equivalencias de temario.

### Columnas
- `raw_value`
- `normalized_value`
- `active_flag`
- `comments`

### Ejemplo
| raw_value | normalized_value | active_flag | comments |
|---|---|---|---|
| EXANI I | EXANI I | TRUE | Valor homologado |
| EXANI II | EXANI II | TRUE | Valor homologado |
| EXI | EXANI I | TRUE | Abreviación |
| EXII | EXANI II | TRUE | Abreviación |

---

## 07_catalogos_especialistas

### Qué va aquí
Las equivalencias de nombres de especialistas, en caso de que Salesforce o ManyChat los traigan escritos diferente.

### Columnas
- `raw_value`
- `normalized_value`
- `active_flag`
- `comments`

### Ejemplo
| raw_value | normalized_value | active_flag | comments |
|---|---|---|---|
| Andy Gómez | Andrea Gómez | TRUE | Alias informal |
| Andrea G. | Andrea Gómez | TRUE | Variación abreviada |

---

## 08_rhino_normalized

### Qué va aquí
La versión limpia y homologada de Rhino. Esta hoja debe derivarse de `02_rhino_raw`.

### Columnas
- `rhino_row_id`
- `full_name`
- `full_name_normalized`
- `inscription_datetime`
- `inscription_date`
- `inscription_month`
- `campus`
- `campus_normalized`
- `temario`
- `temario_normalized`
- `group_name`
- `course_start_date`
- `course_start_month`
- `valid_record_flag`
- `exclusion_reason`

### Qué debes transformar
- convertir nombre a mayúsculas sin acentos
- homologar campus
- homologar temario
- sacar el mes de inicio desde `group_name`
- marcar si el registro es válido o no

### Ejemplo
| rhino_row_id | full_name | full_name_normalized | inscription_datetime | inscription_date | inscription_month | campus | campus_normalized | temario | temario_normalized | group_name | course_start_date | course_start_month | valid_record_flag | exclusion_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RH-1 | Juan Pérez López | JUAN PEREZ LOPEZ | 2026-03-18 10:32:00 | 2026-03-18 | 2026-03 | Centro | Centro | EXANI II | EXANI II | EXII 20 DE SEPTIEMBRE CENTRO G1 | 2026-09-20 | 2026-09 | TRUE | |

---

## 09_salesforce_normalized

### Qué va aquí
La versión limpia y homologada de Salesforce.

### Columnas
- `salesforce_record_id`
- `record_type`
- `full_name`
- `full_name_normalized`
- `manychat_id`
- `created_at`
- `created_date`
- `created_month`
- `stage`
- `status`
- `specialist`
- `specialist_normalized`
- `campus`
- `campus_normalized`
- `temario`
- `temario_normalized`
- `source`
- `valid_record_flag`
- `exclusion_reason`

### Qué debes transformar
- nombre normalizado
- campus homologado
- temario homologado
- especialista homologado
- marcar si falta `manychat_id`

### Ejemplo
| salesforce_record_id | record_type | full_name | full_name_normalized | manychat_id | created_at | created_date | created_month | stage | status | specialist | specialist_normalized | campus | campus_normalized | temario | temario_normalized | source | valid_record_flag | exclusion_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SF-001 | lead | Juan Pérez López | JUAN PEREZ LOPEZ | MC-99881 | 2026-03-17 09:15:00 | 2026-03-17 | 2026-03 | Nuevo | Abierto | Andrea Gómez | Andrea Gómez | Centro | Centro | EXANI II | EXANI II | Instagram | TRUE | |

---

## 10_manychat_normalized

### Qué va aquí
La versión limpia y homologada de ManyChat.

### Columnas
- `manychat_id`
- `conversation_datetime`
- `conversation_date`
- `conversation_month`
- `contact_name`
- `contact_name_normalized`
- `channel`
- `campaign_or_flow`
- `assigned_specialist`
- `specialist_normalized`
- `conversation_status`
- `valid_record_flag`
- `exclusion_reason`

### Qué debes transformar
- validar `manychat_id`
- normalizar nombre si existe
- homologar especialista

### Ejemplo
| manychat_id | conversation_datetime | conversation_date | conversation_month | contact_name | contact_name_normalized | channel | campaign_or_flow | assigned_specialist | specialist_normalized | conversation_status | valid_record_flag | exclusion_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| MC-99881 | 2026-03-17 09:02:00 | 2026-03-17 | 2026-03 | Juan Pérez López | JUAN PEREZ LOPEZ | Instagram | EXANI2_SEPTIEMBRE | Andrea Gómez | Andrea Gómez | abierta | TRUE | |

---

## 11_matching_results

### Qué va aquí
El resultado del match entre ManyChat, Salesforce y Rhino.

### Columnas
- `match_id`
- `manychat_id`
- `salesforce_record_id`
- `rhino_row_id`
- `full_name_normalized`
- `campus_normalized`
- `temario_normalized`
- `match_type`
- `match_reason`
- `confidence_score`
- `matched_at`

### Ejemplo
| match_id | manychat_id | salesforce_record_id | rhino_row_id | full_name_normalized | campus_normalized | temario_normalized | match_type | match_reason | confidence_score | matched_at |
|---|---|---|---|---|---|---|---|---|---:|---|
| M-1 | MC-99881 | SF-001 | RH-1 | JUAN PEREZ LOPEZ | Centro | EXANI II | exact | manychat_id + nombre + contexto | 100 | 2026-03-18 11:00:00 |

---

## 12_dashboard_kpis

### Qué va aquí
Una tabla resumen de tarjetas globales ya calculadas.

### Columnas sugeridas
- `kpi_name`
- `kpi_value`
- `period`
- `temario_filter`
- `campus_filter`
- `last_updated_at`

### Ejemplo
| kpi_name | kpi_value | period | temario_filter | campus_filter | last_updated_at |
|---|---:|---|---|---|---|
| meta_total | 2953 | 2026-2027 | ALL | ALL | 2026-04-21 20:00:00 |
| inscritos_reales | 143 | 2026-2027 | ALL | ALL | 2026-04-21 20:00:00 |

---

## 13_dashboard_campus

### Qué va aquí
La tabla final para ver campus contra meta.

### Columnas sugeridas
- `campus_normalized`
- `temario_normalized`
- `goal`
- `real_inscritos`
- `esperado_al_dia`
- `gap`
- `cumplimiento_pct`
- `semaforo`
- `leads`
- `oportunidades`
- `conversaciones`

### Ejemplo
| campus_normalized | temario_normalized | goal | real_inscritos | esperado_al_dia | gap | cumplimiento_pct | semaforo | leads | oportunidades | conversaciones |
|---|---|---:|---:|---:|---:|---:|---|---:|---:|---:|
| Centro | EXANI II | 549 | 44 | 50 | -6 | 0.80 | amarillo | 70 | 30 | 0 |

---

## 14_dashboard_inicio

### Qué va aquí
La tabla final para ver arranques por mes de inicio.

### Columnas sugeridas
- `course_start_month`
- `campus_normalized`
- `temario_normalized`
- `goal`
- `real_inscritos`
- `esperado_al_dia`
- `gap`
- `ritmo_requerido`
- `semaforo`

### Ejemplo
| course_start_month | campus_normalized | temario_normalized | goal | real_inscritos | esperado_al_dia | gap | ritmo_requerido | semaforo |
|---|---|---|---:|---:|---:|---:|---:|---|
| 2026-09 | Centro | EXANI II | 120 | 14 | 18 | -4 | 1.6 | amarillo |

---

## 15_dashboard_embudo

### Qué va aquí
La tabla resumida del funnel comercial.

### Columnas sugeridas
- `period`
- `campus_normalized`
- `temario_normalized`
- `specialist_normalized`
- `conversaciones`
- `leads`
- `oportunidades`
- `inscritos`
- `conv_to_lead_pct`
- `lead_to_opp_pct`
- `opp_to_inscrito_pct`
- `conv_to_inscrito_pct`

---

## 16_dashboard_data_quality

### Qué va aquí
La tabla de calidad de dato y trazabilidad.

### Columnas sugeridas
- `period`
- `leads_total`
- `leads_with_manychat_id`
- `leads_without_manychat_id`
- `pct_leads_with_manychat_id`
- `inscritos_total`
- `inscritos_matched`
- `inscritos_unmatched`
- `pct_exact_match`
- `pct_probable_match`
- `pct_no_match`

---

## 17_parametros

### Qué va aquí
Variables de control del archivo.

### Columnas sugeridas
- `parameter_name`
- `parameter_value`
- `description`

### Parámetros recomendados
| parameter_name | parameter_value | description |
|---|---|---|
| target_cycle | 2026-2027 | Ciclo activo |
| current_date_cutoff | 2026-04-21 | Fecha de corte |
| red_threshold | 0.80 | Umbral rojo |
| yellow_threshold | 0.95 | Umbral verde mínimo |
| match_confidence_exact | 90 | Puntaje para exact |
| match_confidence_probable | 60 | Puntaje para probable |
| date_window_days | 365 | Ventana máxima de match |

---

## Recomendación práctica

Si hoy quieres avanzar rápido, arma solo estas primero:
- `01_metas`
- `02_rhino_raw`
- `05_catalogos_campus`
- `06_catalogos_temario`
- `08_rhino_normalized`
- `12_dashboard_kpis`
- `13_dashboard_campus`
- `14_dashboard_inicio`

Con eso ya pueden enseñar mañana un MVP sólido de metas vs avance.
