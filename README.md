# Misión Admisión Leads

Sistema de inteligencia comercial para visualizar y gestionar el embudo completo de captación de Misión Admisión:

**Conversaciones → Leads → Oportunidades → Inscritos**

## Objetivo

Construir un MVP operativo que permita:

- medir avance vs meta por campus, temario y fecha de inicio
- visualizar el embudo comercial desde ManyChat, Salesforce y Rhino
- detectar cuellos de botella en el proceso de captación
- homologar criterios de medición entre Comercial, Identidad y Crecimiento, y Dirección
- preparar una base escalable para una AppWeb interna

## Alcance del MVP

Esta primera versión está diseñada para salir rápido y ser útil desde operación, aunque todavía no exista histórico completo de ManyChat.

### Sí incluye

- metas por campus, temario, mes de inscripción y fecha de inicio
- inscritos históricos y operativos desde Rhino
- estructura para leads y oportunidades desde Salesforce
- estructura lista para recibir conversaciones desde ManyChat
- definición de KPIs, reglas de negocio y matching
- documentación funcional y técnica base

### No incluye todavía

- automatización completa entre fuentes
- matching nominal perfecto persona por persona
- histórico completo de conversaciones ManyChat
- versión final de interfaz

## Fuentes de datos

### ManyChat
Fuente de verdad para conversaciones.

Campos objetivo:
- manychat_id
- conversation_datetime
- contact_name
- channel
- campaign_or_flow
- assigned_specialist
- conversation_status

### Salesforce
Fuente de verdad para leads y oportunidades.

Campos objetivo:
- salesforce_record_id
- full_name
- manychat_id
- created_at
- stage
- specialist
- campus
- temario
- source
- status

### Rhino
Fuente de verdad para inscritos.

Campos objetivo:
- full_name
- inscription_datetime
- campus
- temario
- group_name
- start_date_or_start_month

### Metas
Fuente de verdad para objetivos comerciales.

Campos objetivo:
- ciclo
- temario
- campus
- inscription_month
- course_start_month
- goal

## Llaves de integración

### Match fuerte
- `manychat_id` para unir ManyChat con Salesforce

### Match puente
- `full_name_normalized` para unir Salesforce con Rhino

### Campos de apoyo
- campus_normalized
- temario_normalized
- date_window
- specialist_normalized

## Niveles de matching

### Match exacto
Se encuentra coincidencia robusta usando `manychat_id` o nombre normalizado más contexto suficiente.

### Match probable
Se encuentra coincidencia alta por nombre, campus, temario y ventana de tiempo, pero sin una llave fuerte única.

### Sin match
No existe evidencia suficiente para unir registros.

## KPIs esperados

### Volumen
- conversaciones
- leads
- oportunidades
- inscritos

### Conversión
- conversación a lead
- lead a oportunidad
- oportunidad a inscrito
- conversación a inscrito

### Cumplimiento
- meta
- real
- esperado
- gap
- porcentaje de cumplimiento
- ritmo requerido

### Calidad de datos
- porcentaje de leads con manychat_id
- porcentaje de inscritos con match
- porcentaje de match exacto vs probable
- porcentaje de registros sin trazabilidad

## Vistas del dashboard MVP

### 1. Resumen ejecutivo
- meta del ciclo
- inscritos reales
- esperado al día
- gap
- proyección simple
- split EXANI I vs EXANI II

### 2. Campus
- meta por campus
- real por campus
- cumplimiento
- gap
- semáforo

### 3. Fechas de inicio
- meta por mes de inicio
- real acumulado
- esperado al día
- riesgo por arranque

### 4. Comercial inicial
- leads creados
- oportunidades activas
- distribución por especialista
- transición básica hacia inscritos

### 5. Calidad de datos
- leads con y sin manychat_id
- registros listos para match
- pendientes de homologación

## Reglas operativas mínimas

1. El `manychat_id` debe capturarse en Salesforce cuando la conversación provenga de ManyChat.
2. El nombre completo debe capturarse de forma consistente y sin abreviaturas.
3. Campus y temario deben usar catálogos homologados.
4. Cada etapa tiene una fuente de verdad única:
   - conversaciones: ManyChat
   - leads y oportunidades: Salesforce
   - inscritos: Rhino

## Arquitectura propuesta

### Capa 1. Datos fuente
- ManyChat
- Salesforce
- Rhino
- Metas

### Capa 2. Normalización
- nombres
- campus
- temarios
- especialistas
- fechas

### Capa 3. Matching
- exacto
- probable
- sin match

### Capa 4. Modelo analítico
- embudo
- cumplimiento
- proyecciones
- alertas

### Capa 5. Visualización
- Google Sheets como base operativa
- AppScript como capa AppWeb inicial

## Estructura del repositorio

```text
/docs
  README_FUNCIONAL.md
  DICCIONARIO_DATOS.md
  REGLAS_MATCHING.md
  MVP_SCOPE.md
/data
  /templates
/src
  /apps_script
  /transform
```

## Siguientes pasos

1. cerrar documentación base
2. definir diccionario de datos
3. definir estructura de hojas/tablas
4. montar MVP con metas + Rhino
5. incorporar export de Salesforce
6. dejar lista la recepción de ManyChat
7. iterar hacia automatización

## Criterio de éxito del MVP

El MVP será exitoso si permite:

- ver metas vs inscritos
- ver avance por campus
- ver avance por fecha de inicio
- incorporar una muestra útil de Salesforce
- dejar preparada la integración de ManyChat
- establecer reglas operativas mínimas
