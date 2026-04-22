# README Funcional

## Propósito

Este proyecto busca construir un sistema de inteligencia comercial para Misión Admisión que permita medir, visualizar y gestionar el embudo completo de captación:

**Conversaciones → Leads → Oportunidades → Inscritos**

No se trata solo de reporteo. El objetivo es crear una herramienta de gestión que permita detectar fugas, anticipar riesgos y tomar decisiones operativas con base en datos.

## Preguntas que el sistema debe responder

- ¿Cuántos inscritos llevamos vs cuántos deberíamos llevar?
- ¿Cómo vamos por campus?
- ¿Cómo vamos por temario?
- ¿Qué fechas de inicio están en riesgo?
- ¿Cuántas conversaciones se convierten en leads?
- ¿Cuántos leads llegan a oportunidad?
- ¿Cuántas oportunidades terminan inscritas?
- ¿Dónde se rompe más el embudo?

## Usuarios objetivo

### Dirección
Necesita lectura ejecutiva del avance global, campus en riesgo, tendencias y proyección.

### Gerencia de Identidad y Crecimiento
Necesita entender volumen de entrada, comportamiento de conversaciones, desempeño por campus y posibles alertas tempranas.

### Área Comercial
Necesita seguimiento operativo del funnel, cumplimiento de metas, ritmo requerido y riesgo por fecha de inicio.

## Filosofía del sistema

El sistema debe ayudar a responder una pregunta central:

> No solo qué pasó, sino dónde intervenir y con qué urgencia.

## Vistas funcionales del MVP

### Resumen ejecutivo
Muestra:
- meta total
- inscritos reales
- esperado al día
- gap
- proyección simple
- split por temario

### Vista campus
Muestra:
- meta por campus
- real por campus
- cumplimiento
- gap
- semáforo

### Vista fechas de inicio
Muestra:
- mes de inicio del curso
- meta por inicio
- real acumulado
- esperado al día
- riesgo operativo

### Vista comercial inicial
Muestra:
- leads creados
- oportunidades activas
- especialistas
- primeras conversiones

### Vista calidad de datos
Muestra:
- leads con manychat_id
- leads sin manychat_id
- registros homologados
- registros pendientes de match

## Principios de diseño

1. Debe ser entendible para operación y dirección.
2. Debe priorizar claridad sobre complejidad técnica.
3. Debe tener una sola fuente de verdad por etapa.
4. Debe evidenciar problemas de captura y no esconderlos.
5. Debe permitir crecer hacia una AppWeb más robusta.

## Fuentes de verdad

| Etapa | Sistema |
|---|---|
| Conversaciones | ManyChat |
| Leads y Oportunidades | Salesforce |
| Inscritos | Rhino |
| Metas | Planeación comercial |

## Decisiones clave del MVP

- El MVP puede salir sin histórico completo de ManyChat.
- El matching nominal puede empezar como parcial.
- Primero debe servir para gestión, después se perfecciona automatización.
- Se prioriza rapidez de implementación sin perder lógica de negocio.

## Resultado esperado de la primera versión

Una base funcional y documentada que permita:
- medir avance vs meta
- visualizar campus y arranques en riesgo
- conectar el proceso comercial con el resultado final
- sentar las reglas de captura para que el sistema mejore con el tiempo
