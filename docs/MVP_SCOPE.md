# MVP Scope

## Objetivo del MVP

Tener una primera versión funcional del sistema de inteligencia comercial que permita medir el avance de captación de Misión Admisión con foco en operación y toma de decisiones.

El MVP debe ser útil aunque ManyChat todavía no tenga histórico completo bajo el nuevo esquema de captura.

---

## Qué debe resolver el MVP

### Núcleo del negocio
- meta vs inscritos
- avance por campus
- avance por temario
- avance por fecha de inicio del curso
- esperado vs real
- riesgo operativo

### Inicio del embudo
- estructura para conversaciones ManyChat
- estructura para leads y oportunidades desde Salesforce
- primera lectura parcial del funnel comercial

---

## Qué sí entra al MVP

### 1. Metas y cumplimiento
- metas por campus
- metas por temario
- metas por mes de inscripción
- metas por mes de inicio
- cálculo de esperado vs real
- semáforo operativo

### 2. Inscritos Rhino
- carga base histórica
- homologación de campus
- homologación de temario
- extracción de mes de inicio desde grupo
- análisis acumulado y por corte

### 3. Salesforce inicial
- carga de export manual
- estructura de leads y oportunidades
- distribución por especialista
- primeras tasas de conversión hacia inscritos cuando sea posible

### 4. ManyChat listo para recibir
- definición de campos
- estructura de carga
- papel del `manychat_id`
- medición inicial desde que empiece el nuevo registro

### 5. Documentación base
- README maestro
- README funcional
- diccionario de datos
- reglas de matching
- alcance del MVP

---

## Qué no entra al MVP

- automatización total entre sistemas
- histórico completo normalizado de ManyChat
- matching perfecto persona por persona
- alertas automáticas por correo o WhatsApp
- interfaz final pulida
- permisos avanzados por usuario

---

## Visualizaciones mínimas del MVP

### Tarjetas principales
- meta total
- inscritos reales
- esperado al día
- gap
- proyección simple

### Tablas / vistas
- campus
- temario
- fecha de inicio
- leads y oportunidades
- calidad de datos

### Indicadores clave
- % cumplimiento
- gap absoluto
- ritmo requerido
- porcentaje de leads con manychat_id
- porcentaje de registros con match

---

## Requisitos mínimos para montar el MVP

### Ya disponible
- metas comerciales
- base de inscritos Rhino

### Requerido por parte del equipo
- export de Salesforce con muestra funcional
- definición del nuevo esquema de captura de ManyChat
- alineación operativa sobre uso obligatorio de `manychat_id`

---

## Riesgos aceptables

- matching parcial
- carga manual inicial
- datasets incompletos en primera iteración
- visualización más funcional que estética

Estos riesgos son aceptables si la lógica del sistema y la documentación quedan bien establecidas.

---

## Criterio de éxito

El MVP se considera exitoso si logra:

1. mostrar metas vs inscritos de forma confiable
2. mostrar avance por campus y por inicio
3. incorporar Salesforce en al menos una muestra operativa
4. dejar preparada la integración futura de ManyChat
5. establecer reglas claras de captura y medición

---

## Siguiente iteración recomendada

1. automatización diaria de cargas
2. fortalecimiento del matching
3. tablero AppScript
4. alertas automáticas
5. análisis por canal y especialista
