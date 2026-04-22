# KPIs y Semáforos

## Objetivo

Definir los indicadores clave del MVP y las reglas de evaluación visual para que Dirección, Comercial e Identidad y Crecimiento interpreten el tablero con el mismo criterio.

---

## Principios

1. Cada KPI debe tener una fórmula clara.
2. Cada KPI debe tener una fuente de verdad.
3. Los semáforos deben ser simples, consistentes y accionables.
4. El tablero debe privilegiar gestión, no solo lectura histórica.

---

## KPIs globales

### 1. Meta total
**Definición:** suma de metas del periodo filtrado.

**Fuente:** `01_metas`

**Fórmula base:**
```text
SUM(goal)
```

---

### 2. Inscritos reales
**Definición:** total de registros válidos de inscritos dentro del filtro activo.

**Fuente:** `08_rhino_normalized`

**Fórmula base:**
```text
COUNT(valid_record_flag = TRUE)
```

---

### 3. Esperado al día
**Definición:** cantidad de inscritos que se debería llevar al corte actual según la curva esperada.

**Fuente:** `01_metas` + lógica histórica de distribución.

**Uso:** principal referencia para gestión diaria o semanal.

---

### 4. Gap
**Definición:** diferencia entre inscritos reales y esperado al día.

**Fórmula base:**
```text
real_inscritos - esperado_al_dia
```

**Interpretación:**
- positivo: por encima de esperado
- cero: en línea
- negativo: por debajo

---

### 5. % Cumplimiento
**Definición:** avance real respecto a la meta total del filtro.

**Fórmula base:**
```text
real_inscritos / goal
```

---

### 6. Proyección simple de cierre
**Definición:** estimación del cierre si se mantiene el ritmo actual.

**Fórmula sugerida MVP:**
```text
(real_inscritos / dias_transcurridos) * dias_totales_periodo
```

**Nota:** Es una proyección simple, útil para alerta temprana, no un forecast avanzado.

---

### 7. Ritmo requerido
**Definición:** cantidad de inscritos por día necesarios para alcanzar la meta remanente.

**Fórmula base:**
```text
(goal - real_inscritos) / dias_restantes
```

**Uso:** indicador operativo crítico para Comercial.

---

## KPIs por campus

### 8. Meta por campus
Suma de metas del campus en el filtro activo.

### 9. Inscritos por campus
Total de inscritos válidos del campus.

### 10. Esperado por campus
Inscritos que deberían llevarse en ese campus al corte.

### 11. Gap por campus
```text
real_campus - esperado_campus
```

### 12. % cumplimiento por campus
```text
real_campus / goal_campus
```

### 13. Proyección por campus
```text
(real_campus / dias_transcurridos) * dias_totales_periodo
```

### 14. Ritmo requerido por campus
```text
(goal_campus - real_campus) / dias_restantes
```

---

## KPIs por fecha de inicio

### 15. Meta por inicio
Meta asociada al mes de inicio del curso.

### 16. Inscritos reales por inicio
Inscritos válidos ligados a ese arranque.

### 17. Esperado por inicio
Lo que debería llevarse acumulado para ese arranque al corte actual.

### 18. Gap por inicio
```text
real_inicio - esperado_inicio
```

### 19. Ritmo requerido por inicio
```text
(goal_inicio - real_inicio) / dias_restantes_relevantes
```

**Observación:** puede usarse la fecha de inicio del curso como límite operativo, no solo el cierre del ciclo.

---

## KPIs del embudo

### 20. Conversaciones
**Fuente:** `10_manychat_normalized`

```text
COUNT(manychat_id)
```

### 21. Leads
**Fuente:** `09_salesforce_normalized`

```text
COUNT(salesforce_record_id WHERE record_type = lead OR equivalent)
```

### 22. Oportunidades
**Fuente:** `09_salesforce_normalized`

```text
COUNT(salesforce_record_id WHERE stage in opportunity stages)
```

### 23. Conversación a lead
```text
leads / conversaciones
```

### 24. Lead a oportunidad
```text
oportunidades / leads
```

### 25. Oportunidad a inscrito
```text
inscritos / oportunidades
```

### 26. Conversación a inscrito
```text
inscritos / conversaciones
```

---

## KPIs de calidad de datos

### 27. % Leads con ManyChat ID
```text
leads_con_manychat_id / leads_total
```

### 28. % Inscritos con match
```text
inscritos_matched / inscritos_total
```

### 29. % Match exacto
```text
matches_exactos / matches_totales
```

### 30. % Match probable
```text
matches_probables / matches_totales
```

### 31. % Sin match
```text
registros_sin_match / registros_totales_evaluados
```

---

## Reglas de semáforo

## Semáforo base para avance vs esperado

### Verde
Cuando el resultado está en línea o por encima del esperado.

**Regla sugerida MVP:**
```text
real / esperado >= 0.95
```

### Amarillo
Cuando existe desviación moderada, pero recuperable.

**Regla sugerida MVP:**
```text
0.80 <= real / esperado < 0.95
```

### Rojo
Cuando la desviación es significativa y requiere intervención.

**Regla sugerida MVP:**
```text
real / esperado < 0.80
```

---

## Semáforo alterno para cumplimiento de meta

Útil cuando se quiera revisar desempeño acumulado sin depender del esperado diario.

### Verde
```text
cumplimiento_pct >= 0.95
```

### Amarillo
```text
0.80 <= cumplimiento_pct < 0.95
```

### Rojo
```text
cumplimiento_pct < 0.80
```

---

## Semáforo para calidad de datos

### Leads con ManyChat ID
- Verde: 90% o más
- Amarillo: 75% a 89%
- Rojo: menor a 75%

### Inscritos con match
- Verde: 85% o más
- Amarillo: 70% a 84%
- Rojo: menor a 70%

---

## Semáforo para ritmo requerido

Este no debe evaluarse solo en porcentaje, sino en viabilidad operativa.

### Interpretación sugerida
- Verde: ritmo requerido <= ritmo histórico promedio del mismo segmento
- Amarillo: ritmo requerido entre 1.0x y 1.25x del ritmo histórico
- Rojo: ritmo requerido > 1.25x del ritmo histórico

**Nota:** para el MVP puede mostrarse primero como número, y semaforizar en iteración posterior.

---

## KPIs prioritarios para la primera pantalla

1. Meta total
2. Inscritos reales
3. Esperado al día
4. Gap
5. % cumplimiento
6. Proyección simple
7. Ritmo requerido

---

## KPIs prioritarios para campus

1. Meta campus
2. Real campus
3. Esperado campus
4. Gap campus
5. % cumplimiento campus
6. Semáforo

---

## KPIs prioritarios para fechas de inicio

1. Meta por inicio
2. Real por inicio
3. Esperado por inicio
4. Gap por inicio
5. Ritmo requerido por inicio
6. Semáforo

---

## KPIs prioritarios para calidad de dato

1. % leads con ManyChat ID
2. % inscritos con match
3. % match exacto
4. % sin match

---

## Recomendación de implementación MVP

### Fase 1
Implementar primero:
- meta_total
- real_inscritos
- esperado_al_dia
- gap
- cumplimiento_pct
- campus
- inicio
- semáforo base

### Fase 2
Agregar:
- proyección simple
- ritmo requerido
- Salesforce
- calidad de dato

### Fase 3
Agregar:
- embudo completo
- ManyChat
- conversiones entre etapas
- calidad de trazabilidad avanzada
