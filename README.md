# Conclusiones — Box Model (CSS)

## 1) Padding vs Margin
**Padding** es el espacio **dentro** de la caja (entre el contenido y el borde). Lo uso para que el texto/imagen no queden pegados al borde, tipo “tarjeta” o botón cómodo.  
**Margin** es el espacio **fuera** de la caja (separa elementos entre sí). Lo uso para dar aire entre secciones o centrar una caja con `margin: 10px auto;`.

## 2) ¿Qué hace `box-sizing: border-box`?
Hace que el `width`/`height` **incluyan** padding y borde. O sea: la caja **no crece** por subir el padding/border; el que se ajusta es el espacio del contenido por dentro. Esto ayuda a que el diseño sea más predecible.

## 3) Contenido más grande que el `height`
Si el contenido no cabe en un `height` fijo, **se desborda** (se sale o se encima).  
Soluciones típicas: `overflow: auto;` (scroll), `overflow: hidden;` (recorta) o mejor evitar altura fija y usar `min-height`/`height: auto;`.

## 4) Colapso de márgenes
Cuando dos elementos de bloque están uno debajo del otro, sus márgenes verticales **no se suman**: se “fusionan” y queda el **mayor** (ej. 20px + 20px se ve como 20px). Pasa en el flujo normal cuando no hay borde/padding/contenido separándolos.