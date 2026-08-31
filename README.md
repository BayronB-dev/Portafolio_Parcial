# Portafolio personal — Bayron Steven Barrios Donoso

Parcial de **Tecnologías Web** — proyecto individual.

Sitio de una sola página que presenta mi trabajo como desarrollador web. Las
tarjetas de proyecto y las filas de la tabla no están escritas en el HTML: las
genera JavaScript recorriendo dos arreglos de objetos.

- **Sitio publicado:** https://bayronb-dev.github.io/Portafolio_Parcial/
- **Repositorio:** https://github.com/BayronB-dev/Portafolio_Parcial

## Cómo verlo en local

El sitio no necesita instalar nada. Solo un servidor estático para que las rutas
relativas funcionen igual que en producción:

```bash
python -m http.server 8080
```

Luego abrir http://localhost:8080

## Estructura

```
index.html          estructura semántica y contenedores vacíos
css/estilos.css     variables, modelo de caja, Flexbox y responsividad
js/main.js          modelos de datos, render, eventos y validación
img/                imágenes de los cuatro proyectos
favicon.svg         icono del sitio
```

## Requisitos cubiertos

### HTML

| Requisito | Dónde |
|---|---|
| DOCTYPE, `lang="es"`, charset UTF-8, meta viewport | `index.html` 1-6 |
| Etiquetas semánticas `header`, `nav`, `main`, `section`, `footer` | `index.html` 14, 15, 26, 27, 134 |
| Un único `<h1>` y jerarquía sin saltos | `h1` en 28; `h2` en 40 y 63; `h3` los crea `crearTarjeta` |
| 4 imágenes con `alt` descriptivo | las crea `crearTarjeta`, texto en el arreglo `proyectos` |
| Formulario con `label` asociado por `for`/`id` | `index.html` 66-110 |
| 6 tipos de campo distintos | text, email, select, date, number, checkbox |
| `required` donde aplica | nombre, correo, tipo y checkbox |
| Tabla con `caption`, `thead`, `tbody` y `scope` | `index.html` 115-130 |

### CSS

| Requisito | Dónde |
|---|---|
| Hoja externa con `<link>`, cero estilos en línea | `index.html` 8 |
| 6 variables en `:root` usadas con `var()` | `estilos.css` 5 |
| Modelo de caja `box-sizing: border-box` | `estilos.css` 17 |
| Flexbox contenedor 1: barra de navegación | `estilos.css` 37 |
| Flexbox contenedor 2: rejilla de tarjetas | `estilos.css` 135 |
| Efecto `:hover` | `estilos.css` 64 (nav) y 155 (tarjeta) |
| `@media` responsiva | `estilos.css` 317 |

### JavaScript

| Requisito | Dónde |
|---|---|
| Modelo de datos en memoria | `main.js` — arreglos `proyectos` y `solicitudes` |
| `querySelector` / `querySelectorAll` | en todas las funciones |
| `createElement` + `appendChild` | `crearTarjeta`, `renderizarSolicitudes`, `crearCelda` |
| Elemento creado por acción del usuario | filtro, envío del formulario y borrado de filas |
| `submit` con `preventDefault()` | `manejarEnvio` |
| Validación de campos vacíos | `manejarEnvio`, cuatro comprobaciones |
| Evento adicional | dos `click` con delegación: filtros y tabla |
| Año dinámico en el footer | `mostrarAnio` |

### Conceptos adicionales

| Concepto | Dónde |
|---|---|
| Delegación de eventos (`evento.target`) | `manejarFiltro` y `manejarQuitar` |
| Atributos `data-*` con `dataset` | `data-categoria` en filtros, `data-indice` en la tabla |
| Tabla con `thead`, `tbody`, `caption`, `scope` | sección de contacto |
| Filtro dinámico sobre el contenido renderizado | botones de categoría |

## Decisiones

**No se usa `innerHTML` en ninguna parte.** Todo nodo se construye con
`createElement` y se rellena con `textContent`. Es lo que pide la rúbrica y
además evita inyectar HTML sin control.

**El `<script>` va al final del `<body>`.** Cuando se ejecuta, todo el HTML ya
existe, así que no hace falta esperar a `DOMContentLoaded`.

**Los datos no se guardan.** Las solicitudes viven en memoria y se pierden al
recargar. Es intencional: el proyecto no tiene servidor ni base de datos.
