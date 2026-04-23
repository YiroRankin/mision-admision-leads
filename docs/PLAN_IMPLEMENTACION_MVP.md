# Plan de Implementación del MVP

## Aclaración importante

Sí, el objetivo es construir una **aplicación web** y dejarla versionada en GitHub.

La razón por la que primero armamos hojas en Google Sheets es porque esas hojas cumplen el papel de:

- capa de datos inicial
- entorno de validación rápida
- fuente de verdad temporal para el MVP
- forma más rápida de probar la lógica sin frenar el desarrollo

En otras palabras:

- **GitHub** = código, documentación y aplicación web
- **Google Sheets** = datos, catálogos, metas y tablas calculadas del MVP

---

## Arquitectura del MVP

```text
Google Sheets (datos base y tablas calculadas)
        ↓
AppScript o frontend ligero
        ↓
Dashboard web MVP
        ↓
GitHub (repo del proyecto y versionado)
```

---

## Qué estamos haciendo hoy

### Fase de datos
Armando la base mínima para que la app tenga algo correcto que leer.

Hojas clave:
- `01_metas`
- `02_rhino_raw`
- `05_catalogos_campus`
- `06_catalogos_temario`
- `08_rhino_normalized`

Después:
- `12_dashboard_kpis`
- `13_dashboard_campus`
- `14_dashboard_inicio`

Estas últimas ya no son solo hojas: son la **salida que la aplicación web podrá consumir**.

---

## Qué sigue inmediatamente después

### Paso 1
Terminar las tablas calculadas:
- `12_dashboard_kpis`
- `13_dashboard_campus`
- `14_dashboard_inicio`

### Paso 2
Construir la aplicación web en el repo para leer y mostrar esas tablas.

### Paso 3
Conectar después Salesforce y ManyChat.

---

## Opción recomendada para mañana

### MVP web simple
Una app con tres vistas:

1. **Resumen**
   - meta total
   - inscritos reales
   - gap
   - cumplimiento

2. **Campus**
   - tabla por campus y temario

3. **Fechas de inicio**
   - tabla por inicio, campus y temario

---

## Qué se puede mostrar mañana

Aunque la app todavía sea sencilla, ya puede vivir como aplicación web si:
- lee datos desde una hoja o un archivo JSON derivado
- muestra KPIs
- muestra tabla campus
- muestra tabla inicios

Eso ya es un MVP real.

---

## Reparto correcto del trabajo

### En Sheets
- preparar datos
- limpiar datos
- calcular tablas analíticas

### En GitHub
- construir frontend
- organizar componentes
- documentar proyecto
- versionar cambios

---

## Decisión práctica

Para no frenar el MVP, primero cerramos la lógica en Sheets y enseguida la montamos en la web.

No son dos proyectos distintos.
Son dos capas del mismo MVP.

---

## Próximo entregable técnico

Una vez listas `12`, `13` y `14`, el siguiente paso en el repo será:
- crear estructura base de la app web
- conectar lectura de los datos resumidos
- pintar el dashboard inicial
