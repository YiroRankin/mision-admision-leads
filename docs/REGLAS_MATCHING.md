# Reglas de Matching

## Objetivo

Definir cómo se relacionarán los registros de ManyChat, Salesforce y Rhino para construir trazabilidad comercial desde la conversación hasta la inscripción.

---

## Principio general

El sistema debe priorizar trazabilidad confiable antes que volumen artificial de matches.

Es mejor tener registros sin match que generar uniones incorrectas que dañen la credibilidad del tablero.

---

## Flujo esperado

1. ManyChat genera la conversación.
2. El `manychat_id` se captura en Salesforce.
3. Salesforce registra lead u oportunidad.
4. Rhino registra la inscripción.
5. El sistema intenta unir los tres momentos del embudo.

---

## Llaves principales

### ManyChat → Salesforce
Llave oficial:
- `manychat_id`

Este match debe considerarse de alta confianza cuando el valor coincide exactamente.

### Salesforce → Rhino
Llave puente principal:
- `full_name_normalized`

Llaves de apoyo:
- `campus_normalized`
- `temario_normalized`
- ventana de tiempo entre creación e inscripción

---

## Niveles de matching

### 1. Match exacto
Aplicar cuando:
- ManyChat y Salesforce comparten el mismo `manychat_id`, o
- Salesforce y Rhino comparten `full_name_normalized` y además coinciden en suficiente contexto operativo

#### Contexto suficiente sugerido
Al menos dos de los siguientes:
- mismo campus homologado
- mismo temario homologado
- inscripción dentro de una ventana razonable desde la creación del lead
- ausencia de candidatos duplicados conflictivos

### 2. Match probable
Aplicar cuando:
- no existe llave exacta suficiente, pero
- existe coincidencia alta por nombre normalizado y contexto parcial

Ejemplos:
- mismo nombre, mismo campus y fechas cercanas
- mismo nombre, mismo temario y sin candidatos alternativos fuertes

Los matches probables deben mostrarse como tales y no mezclarse con exactos al evaluar calidad de trazabilidad.

### 3. Sin match
Aplicar cuando:
- no existe coincidencia confiable, o
- existen múltiples candidatos y no es posible resolver el caso con suficiente confianza

---

## Ventana temporal sugerida

Para ligar Salesforce con Rhino, se recomienda evaluar una ventana operativa razonable entre la creación del registro y la fecha de inscripción.

Ejemplo inicial para MVP:
- desde 0 hasta 365 días

Después puede ajustarse por tipo de curso o ciclo.

---

## Reglas de descarte

No hacer match automático cuando:
- el nombre normalizado coincide con múltiples personas posibles
- los campus son incompatibles sin justificación
- los temarios son incompatibles
- la fecha de inscripción cae fuera de la ventana razonable

---

## Puntaje de confianza sugerido

Modelo simple para MVP:

- `manychat_id` exacto: +100
- nombre normalizado exacto: +60
- campus homologado coincide: +15
- temario homologado coincide: +15
- fecha dentro de ventana esperada: +10
- múltiples candidatos conflictivos: -40

### Clasificación sugerida
- 90 o más: `exact`
- 60 a 89: `probable`
- menor a 60: `no_match`

---

## Calidad de dato asociada

El sistema debe medir también la salud del proceso de captura:

- porcentaje de registros Salesforce con `manychat_id`
- porcentaje de inscritos Rhino con match a Salesforce
- porcentaje de matches exactos
- porcentaje de matches probables
- porcentaje de registros sin trazabilidad

---

## Reglas operativas que soportan el matching

1. Toda conversación útil que pase a seguimiento debe registrar `manychat_id` en Salesforce.
2. El nombre completo debe capturarse sin abreviaciones.
3. Deben usarse catálogos homologados para campus y temario.
4. No deben alterarse manualmente valores homologados fuera del catálogo.

---

## Enfoque para el MVP

Para la primera versión:
- priorizar match exacto y probable transparente
- no ocultar registros sin match
- permitir revisión manual de casos dudosos
- usar el sistema también para identificar fallas de captura

---

## Evolución futura

En una segunda etapa se podrá fortalecer el matching con:
- teléfono
- correo
- identificadores adicionales
- reglas por especialista
- reglas por campaña o canal
- validación manual asistida
