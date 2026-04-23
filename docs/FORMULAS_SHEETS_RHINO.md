# Fórmulas de Google Sheets para `08_rhino_normalized`

## `course_start_date` desde `group_name`

Si `group_name` está en la columna K y el texto viene en formatos como:
- `EXI 6 DE SEPTIEMBRE CENTRO G1`
- `EXII 26 DE SEPTIEMBRE CENTRO MAT G1`
- `EXI 1 DE OCTUBRE CENTRO VESP G1`

se puede construir la fecha de inicio con esta fórmula:

```gs
=ARRAYFORMULA(IF(K2:K="","",DATE(IF(REGEXMATCH(K2:K,"ENERO|FEBRERO|MARZO|ABRIL|MAYO"),2027,2026),MATCH(REGEXEXTRACT(K2:K,"ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE"),{"ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"},0),VALUE(REGEXEXTRACT(K2:K,"\b(\d{1,2})\b")))))
```

## `course_start_month`

Si `course_start_date` quedó en la columna L:

```gs
=ARRAYFORMULA(IF(L2:L="","",TEXT(L2:L,"yyyy-mm")))
```

## `full_name_normalized`

Si `full_name` está en la columna B:

```gs
=ARRAYFORMULA(IF(B2:B="","",TRIM(REGEXREPLACE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(UPPER(B2:B),"Á","A"),"É","E"),"Í","I"),"Ó","O"),"Ú","U"),"Ñ","N"),"\s+"," "))))
```

## `rhino_row_id`

Si la columna B indica que la fila tiene registro:

```gs
=ARRAYFORMULA(IF(B2:B="","","RH-" & ROW(B2:B)-1))
```

## `inscription_date`

Si `inscription_datetime` está en la columna D:

```gs
=ARRAYFORMULA(IF(D2:D="","",TO_DATE(INT(D2:D))))
```

## `inscription_month`

Si `inscription_date` está en la columna E:

```gs
=ARRAYFORMULA(IF(E2:E="","",TEXT(E2:E,"yyyy-mm")))
```
