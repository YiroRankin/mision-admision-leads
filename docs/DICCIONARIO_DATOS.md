# Diccionario de Datos

## Objetivo

Definir las estructuras mínimas necesarias para construir el MVP del sistema de inteligencia comercial.

---

## 1. Tabla: metas

Fuente: planeación comercial interna.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| ciclo | string | sí | Ciclo escolar o periodo de planeación |
| temario | string | sí | EXANI I o EXANI II |
| campus | string | sí | Nombre operativo del campus |
| campus_normalized | string | sí | Campus homologado |
| inscription_month | date/string | sí | Mes de inscripción objetivo |
| course_start_month | date/string | sí | Mes de inicio del curso |
| goal | integer | sí | Meta de inscritos |
| source_note | string | no | Observaciones o fuente del dato |

---

## 2. Tabla: inscritos_rhino

Fuente: Rhino.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| rhino_record_id | string | no | Identificador interno si existe |
| full_name | string | sí | Nombre completo capturado |
| full_name_normalized | string | sí | Nombre homologado para match |
| inscription_datetime | datetime | sí | Fecha y hora de inscripción |
| inscription_date | date | sí | Fecha de inscripción |
| inscription_month | string | sí | Mes de inscripción derivado |
| campus | string | sí | Campus capturado |
| campus_normalized | string | sí | Campus homologado |
| temario | string | sí | Temario capturado |
| temario_normalized | string | sí | Temario homologado |
| group_name | string | sí | Nombre del grupo |
| course_start_date | date | no | Fecha de inicio inferida o capturada |
| course_start_month | string | sí | Mes de inicio derivado |
| match_status | string | no | exact, probable, no_match |

---

## 3. Tabla: salesforce_raw

Fuente: export de Salesforce.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| salesforce_record_id | string | sí | ID del registro en Salesforce |
| record_type | string | no | lead, contact, opportunity u otro |
| full_name | string | sí | Nombre completo |
| full_name_normalized | string | sí | Nombre homologado |
| manychat_id | string | no, pero debería | Llave de conversación si aplica |
| created_at | datetime | sí | Fecha de creación |
| created_date | date | sí | Fecha derivada |
| stage | string | no | Etapa comercial |
| status | string | no | Estatus del registro |
| specialist | string | no | Especialista asignado |
| specialist_normalized | string | no | Especialista homologado |
| campus | string | no | Campus capturado |
| campus_normalized | string | no | Campus homologado |
| temario | string | no | Temario capturado |
| temario_normalized | string | no | Temario homologado |
| source | string | no | Fuente o canal |
| notes | string | no | Observaciones |

---

## 4. Tabla: manychat_raw

Fuente: export o log de ManyChat.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| manychat_id | string | sí | Identificador único de conversación/contacto |
| conversation_datetime | datetime | sí | Fecha y hora de la conversación |
| conversation_date | date | sí | Fecha derivada |
| contact_name | string | no | Nombre capturado |
| contact_name_normalized | string | no | Nombre homologado |
| channel | string | no | Facebook, Instagram u otro |
| campaign_or_flow | string | no | Campaña o flujo origen |
| assigned_specialist | string | no | Especialista asignado |
| specialist_normalized | string | no | Especialista homologado |
| conversation_status | string | no | Estado de conversación |

---

## 5. Tabla: catalogos

Fuente: administración interna del sistema.

### campus_catalog
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| raw_value | string | sí | Valor original |
| normalized_value | string | sí | Valor homologado |
| category | string | sí | campus |

### temario_catalog
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| raw_value | string | sí | Valor original |
| normalized_value | string | sí | Valor homologado |
| category | string | sí | temario |

### specialist_catalog
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| raw_value | string | sí | Valor original |
| normalized_value | string | sí | Valor homologado |
| category | string | sí | specialist |

---

## 6. Tabla: matching_results

Fuente: proceso de unión entre fuentes.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| match_id | string | sí | ID interno del match |
| manychat_id | string | no | ID de ManyChat |
| salesforce_record_id | string | no | ID de Salesforce |
| rhino_record_id | string | no | ID de Rhino |
| full_name_normalized | string | no | Nombre normalizado |
| match_type | string | sí | exact, probable, no_match |
| match_reason | string | no | Regla que generó el match |
| confidence_score | number | no | Puntaje interno de confianza |
| matched_at | datetime | no | Fecha de evaluación |

---

## Reglas mínimas de normalización

### Nombre
- convertir a mayúsculas
- remover acentos
- quitar espacios dobles
- remover caracteres especiales innecesarios
- usar nombre completo sin abreviaciones

### Campus
Usar un catálogo homologado.
Ejemplos:
- PATRIA → Norte / Patria
- CEDU, CEDUNOEL, HUMANITAS → Caucel / CEDU Noel / Humanitas
- INTENSIVO, SANTA, SEMANA → Intensivo / Semana Santa

### Temario
Usar una taxonomía simple y estable:
- EXANI I
- EXANI II

---

## Campos críticos del MVP

Los siguientes campos son críticos para que el sistema funcione:

- manychat_id
- full_name
- full_name_normalized
- inscription_datetime
- created_at
- campus_normalized
- temario_normalized
- course_start_month
- goal
