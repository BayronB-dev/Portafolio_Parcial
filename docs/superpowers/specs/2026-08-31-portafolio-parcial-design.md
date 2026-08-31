# Portafolio personal — Parcial de Tecnologías Web

Fecha: 2026-08-31
Autor: Bayron Steven Barrios Donoso
Repositorio: https://github.com/BayronB-dev/Portafolio_Parcial
URL pública prevista: https://bayronb-dev.github.io/Portafolio_Parcial/

## 1. Objetivo

Sitio web de una sola página que presenta a Bayron Barrios como desarrollador
web, mostrando sus proyectos reales. Debe cumplir los requisitos obligatorios del
parcial y ser **explicable línea por línea en una sustentación oral**.

## 2. Restricción rectora

Solo HTML, CSS y JavaScript de nivel Laboratorio 01 / 02. Sin frameworks, sin
`fetch`, sin `async`, sin clases, sin módulos, sin CSS Grid.

Se usa: `const` / `let`, `function` clásica, `forEach`, `querySelector`,
`querySelectorAll`, `createElement`, `appendChild`, `textContent`,
`addEventListener`, `preventDefault()`.

**`innerHTML` está prohibido.** La rúbrica lo califica como insuficiente
("contenido manipulado con innerHTML sin control"). Todo nodo se arma con
`createElement` y se rellena con `textContent`.

Si un requisito se puede cumplir de dos formas, gana la que sea más fácil de
defender en voz alta.

## 3. Estructura de archivos

```
Portafolio_Parcial/
  index.html
  css/estilos.css
  js/main.js
  img/
    folkdone.png
    take-and-run.webp
    sabor-urbano.webp
    oh-la-la.webp
  README.md
```

Las cuatro imágenes de proyecto se copian desde `D:\Paginas\Folkdone\public\`
(trabajo propio del autor). Con ellas ya se cumple el requisito de "al menos dos
imágenes con `alt` descriptivo", así que el sitio queda completo sin la foto de
perfil; cuando el autor la entregue se agrega como `img/perfil.jpg` sin tocar el
resto del maquetado.

## 4. HTML

Documento con `<!DOCTYPE html>`, `lang="es"`, `charset="UTF-8"` y meta viewport.
Hoja de estilos vinculada con `<link>`. Cero estilos en línea.

| Zona | Contenido |
|---|---|
| `<header>` + `<nav>` | Marca y tres enlaces internos: Inicio, Proyectos, Contacto |
| `<section id="inicio">` | `<h1>` con el nombre y párrafo de presentación (la foto se añade cuando el autor la entregue) |
| `<section id="proyectos">` | `<h2>`, botones de filtro, contenedor de tarjetas **vacío** |
| `<section id="contacto">` | `<h2>`, formulario, tabla de solicitudes |
| `<footer>` | Año calculado por JS |

Jerarquía de encabezados: un solo `<h1>` (el nombre), un `<h2>` por sección, y
`<h3>` en el título de cada tarjeta de proyecto. Sin saltos de nivel.

El contenedor `#lista-proyectos` y el `<tbody>` de la tabla salen **vacíos** del
HTML: todo su contenido lo genera JavaScript. Esto es lo que la rúbrica exige
para la nota máxima ("contenido generado 100% desde JS, sin HTML escrito a
mano").

### Formulario

Seis campos, cinco tipos distintos, cada uno con `<label for>` apuntando al `id`
del campo:

| Campo | `id` | Tipo | `required` |
|---|---|---|---|
| Nombre | `campo-nombre` | `text` | sí |
| Correo | `campo-correo` | `email` | sí |
| Tipo de proyecto | `campo-tipo` | `select` | sí |
| Fecha deseada | `campo-fecha` | `date` | no |
| Presupuesto aproximado | `campo-presupuesto` | `number` | no |
| Acepto ser contactado | `campo-acepto` | `checkbox` | sí |

### Tabla de solicitudes

`<table>` con `<caption>`, `<thead>` (celdas con `scope="col"`) y `<tbody>`
vacío. Columnas: Nombre, Correo, Tipo, Fecha, Acción.

La columna Acción lleva un botón "Quitar" con `data-indice` para poder borrar la
fila. Cubre el bono de atributos `data-*`.

## 5. CSS

Paleta sobria y oscura. Tipografía del sistema (`system-ui`). Sin animaciones;
solo transiciones de color en los `:hover`.

**Variables en `:root`** (seis, todas usadas con `var()`):

```
--color-fondo    --color-texto    --color-acento
--color-borde    --espacio        --radio
```

**Modelo de caja**: `box-sizing: border-box` aplicado con el selector universal,
más `padding` y `margin` explícitos en secciones y tarjetas.

**Flexbox en dos contenedores distintos** (requisito explícito):

1. `.barra-navegacion` — `display: flex`, `justify-content: space-between`,
   `align-items: center`, `gap`.
2. `.lista-proyectos` — `display: flex`, `flex-wrap: wrap`, `gap`, con tarjetas
   de ancho base fijo que se reacomodan.

**`:hover`**: en los enlaces del nav (cambia el color) y en las tarjetas (se
levanta el borde al color de acento).

**`@media (max-width: 700px)`**: el nav pasa a columna, las tarjetas ocupan el
100% del ancho, y la tabla reduce su padding.

## 6. JavaScript

### Modelos de datos en memoria

```js
const proyectos = [ { nombre, sector, descripcion, imagen, alt, enlace, categoria } ];
let solicitudes = [];
```

`proyectos` tiene cuatro entradas con datos reales del autor:

| Nombre | Sector | Categoría | Enlace |
|---|---|---|---|
| Folkdone | Estudio de diseño web & software | Marca propia | https://folkdone.com |
| Take and Run | Tienda online de zapatos | Tienda online | https://take-and-run.folkdone.workers.dev/ |
| Sabor Urbano | Restaurante | Negocio local | https://saborurbano-elj.pages.dev/ |
| Oh La La! | Peluquería canina | Negocio local | https://ohlala-bxg.pages.dev/ |

Los textos `alt` y los sectores se toman de los que el autor ya escribió en
`Folkdone/dictionaries/es.json`, que son descriptivos y propios. El campo
`descripcion` no existe en esa fuente: se redacta nuevo, una sola línea por
proyecto, describiendo qué se construyó.

### Funciones

| Función | Responsabilidad |
|---|---|
| `renderizarProyectos(lista)` | Vacía el contenedor y recorre `lista` creando una tarjeta por proyecto |
| `crearTarjeta(proyecto)` | Arma un `<article>` con imagen, `<h3>`, sector, descripción y enlace |
| `renderizarSolicitudes()` | Vacía el `<tbody>` y crea una `<tr>` por cada solicitud |
| `manejarEnvio(evento)` | `preventDefault()`, valida, agrega a `solicitudes`, re-renderiza, limpia |
| `manejarFiltro(evento)` | Lee `evento.target.dataset.categoria` y re-renderiza |
| `manejarQuitar(evento)` | Lee `data-indice`, quita del arreglo, re-renderiza |
| `mostrarAnio()` | Escribe el año actual en el footer |

El patrón se repite en las tres funciones de render: **vaciar el contenedor →
recorrer el arreglo → `createElement` → `appendChild`**. Un solo concepto,
aplicado tres veces.

### Eventos

- `submit` en el formulario → `manejarEnvio`, con `preventDefault()`
- `click` en el contenedor de filtros → `manejarFiltro` (delegación)
- `click` en el `<tbody>` → `manejarQuitar` (delegación)

Los dos `click` usan **delegación de eventos**: un solo listener en el padre que
lee `evento.target`. Es menos código que un listener por botón, y resuelve el
problema de que las filas de la tabla no existen cuando la página carga.

### Validación

`manejarEnvio` comprueba, antes de procesar:

1. Nombre no vacío (tras `.trim()`)
2. Correo no vacío
3. Tipo de proyecto seleccionado
4. Checkbox marcado

Si algo falla, escribe un mensaje en un `<p>` de retroalimentación con
`textContent` y no agrega nada. Si todo pasa, agrega la solicitud, re-renderiza
la tabla, limpia el formulario con `.reset()` y muestra confirmación.

El mensaje de retroalimentación se crea con `createElement` la primera vez, lo
que satisface "elemento creado dinámicamente a partir de una acción del usuario".

## 7. Filtro de proyectos

Cuatro botones: **Todos**, **Negocio local**, **Tienda online**, **Marca
propia**. Cada uno con `data-categoria`.

Con cuatro proyectos, "Negocio local" muestra dos tarjetas y las otras
categorías una. Es poco, pero el filtro es real y funcional; se prefiere ser
honesto con el número de proyectos antes que inventar entradas de relleno.

## 8. Fuera de alcance

- `localStorage` — decisión explícita del autor: no añadir conceptos nuevos que
  haya que defender en frío. Las solicitudes viven en memoria y se pierden al
  recargar.
- CSS Grid, animaciones, modo claro/oscuro, múltiples páginas, framework alguno.

## 9. Cobertura de la rúbrica

| Requisito del parcial | Dónde se cumple |
|---|---|
| DOCTYPE, lang, charset, viewport | `index.html`, `<head>` |
| Semántica header/nav/main/section/footer | Sección 4 |
| Un `<h1>`, jerarquía correcta | Sección 4 |
| 2+ imágenes con `alt` descriptivo | 4 imágenes de proyecto (la foto de perfil es adicional, no necesaria) |
| Formulario, labels `for/id`, 4+ tipos, `required` | Sección 4 |
| CSS externo con `<link>` | `css/estilos.css` |
| 4+ variables en `:root` | 6 variables, sección 5 |
| Modelo de caja | `box-sizing: border-box` |
| Flexbox en 2 contenedores | nav + lista de proyectos |
| `:hover` y `@media` | Sección 5 |
| `querySelector` / `querySelectorAll` | Todas las funciones |
| `createElement` + `appendChild` por acción del usuario | Filtro, tabla, mensaje |
| `click` / `submit` con `preventDefault()` | Sección 6 |
| Modelo de datos en memoria recorrido para renderizar | `proyectos`, `solicitudes` |
| **Bono**: delegación de eventos | Filtros y tabla |
| **Bono**: `data-*` / `dataset` | `data-categoria`, `data-indice` |
| **Bono**: tabla con thead/tbody/caption/scope | Tabla de solicitudes |
| **Bono**: filtro dinámico | Sección 7 |

## 10. Entrega

Mínimo tres commits que reflejen avance real:

1. Estructura HTML semántica y contenido base
2. Hoja de estilos: variables, caja, Flexbox, responsividad
3. JavaScript: modelo de datos, render, eventos y validación

Publicación en GitHub Pages desde la rama `main`, carpeta raíz.

## 11. Pendientes de confirmar con el autor

Estos valores están asumidos y deben confirmarse antes de dar por cerrado el
contenido:

- **Frase de presentación**: se asume *"Desarrollador web. Construyo sitios
  rápidos y hechos a la medida de cada negocio."*
- **Correo de contacto**: se asume `hello@folkdone.com`, tomado de
  `Folkdone/data/brand.ts`.
- **Foto de perfil**: pendiente de entrega. Hasta que llegue, `img/perfil.jpg`
  no existe; la sección de inicio se construye sin la imagen y esta se agrega
  después sin tocar el resto del maquetado.
