# Ejercicio 1 - Panel de Datos de la Estación Espacial

## Descripción
Panel que carga datos desde archivos XML locales:
- `soporte_vital.xml` (mediciones)
- `inventario.xml` (ítems con cantidad y consumo)

Incluye:
- Mostrar última medición de soporte vital.
- Gestión e inspección del inventario.
- Cálculo de autonomía para una tripulación de 4 personas.
- Manejo de errores 404 si faltan archivos.

## Archivos
- index.html
- style.css
- script.js
- soporte_vital.xml
- inventario.xml
- img/ (opcional: iconos, imágenes)

## Instrucciones para desplegar en Netlify
1. Crea una nueva web en Netlify y conecta a tu repositorio (o sube la carpeta `ej1/`).
2. Asegúrate de que los archivos XML estén incluidos en la carpeta pública.
3. Publica.

**URL Netlify:** `https://your-site-name.netlify.app/`  ← reemplaza con la URL real una vez desplegado.

## Notas
- Si ves mensajes de "archivo ... no encontrado (404)", revisa que los XML estén en la misma carpeta que `index.html` y que se hayan subido al deploy.
