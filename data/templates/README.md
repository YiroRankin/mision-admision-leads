# Templates de Datos

## Objetivo

Documentar qué archivos o exportaciones mínimas deben colocarse como base de trabajo para el MVP.

---

## Archivos esperados

### 1. `metas.csv`
Debe contener, al menos:
- ciclo
- temario
- campus
- campus_normalized
- inscription_month
- course_start_month
- goal

### 2. `rhino.csv`
Debe contener, al menos:
- full_name
- inscription_datetime
- campus
- temario
- group_name

### 3. `salesforce.csv`
Debe contener, al menos:
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

### 4. `manychat.csv`
Debe contener, al menos:
- manychat_id
- conversation_datetime
- contact_name
- channel
- campaign_or_flow
- assigned_specialist
- conversation_status

---

## Recomendaciones

1. Mantener nombres de columnas estables.
2. Usar UTF-8.
3. Evitar celdas combinadas o encabezados dobles.
4. No modificar manualmente los archivos raw dentro del flujo operativo.
5. Conservar una muestra mínima aun cuando la extracción completa no esté lista.

---

## Prioridad para el MVP

### Imprescindible
- `metas.csv`
- `rhino.csv`

### Muy útil
- `salesforce.csv`

### Puede entrar en segunda carga
- `manychat.csv`
