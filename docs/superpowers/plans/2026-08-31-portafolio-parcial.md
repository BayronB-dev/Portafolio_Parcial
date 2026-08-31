# Portafolio del Parcial — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portafolio personal de una página, en HTML/CSS/JS puro, que cumpla todos los requisitos del parcial de Tecnologías Web y sea defendible línea por línea en una sustentación oral.

**Architecture:** Tres archivos con una responsabilidad cada uno: `index.html` aporta la estructura semántica y los contenedores vacíos; `css/estilos.css` aporta variables, caja, Flexbox y responsividad; `js/main.js` aporta los dos modelos de datos en memoria y las funciones que los vuelcan al DOM. El HTML no contiene ninguna tarjeta de proyecto ni fila de tabla escrita a mano: todo eso lo crea JavaScript.

**Tech Stack:** HTML5, CSS3 (sin preprocesadores), JavaScript ES5/ES6 básico. Cero dependencias, cero build, cero `node_modules`.

## Global Constraints

Estas reglas aplican a **todas** las tareas:

- **Nivel Laboratorio 01/02 únicamente.** Permitido: `const`, `let`, `function` clásica, `forEach`, `querySelector`, `querySelectorAll`, `createElement`, `appendChild`, `textContent`, `addEventListener`, `preventDefault()`, `dataset`.
- **Prohibido:** `innerHTML`, `fetch`, `async`/`await`, clases, módulos ES, arrow functions, template literals, CSS Grid, frameworks, cualquier dependencia externa.
- **`innerHTML` está prohibido por la rúbrica**, que lo califica como insuficiente. Todo nodo se arma con `createElement` y se rellena con `textContent`.
- **Cero estilos en línea.** Toda regla CSS vive en `css/estilos.css`, vinculada con `<link>`.
- **Todo el texto visible en español.**
- **Comentarios en español**, explicando el *porqué* de cada función, no el *qué*.
- **Sin errores en la consola del navegador** al terminar cada tarea.
- Autor: **Bayron Steven Barrios Donoso**. Repo: `BayronB-dev/Portafolio_Parcial`. Rama `main`.

### Contrato de nombres (HTML ↔ CSS ↔ JS)

Estos identificadores los crea la Tarea 1 y los consumen las Tareas 2 y 3. No cambiarlos.

| Identificador | Tipo | Quién lo usa |
|---|---|---|
| `.barra-navegacion` | clase | CSS (Flexbox #1) |
| `#lista-proyectos` | id | CSS (Flexbox #2), JS (contenedor de tarjetas) |
| `.tarjeta` | clase | CSS, JS (creada dinámicamente) |
| `#filtros` | id | JS (delegación de click) |
| `#formulario` | id | JS (submit) |
| `#campo-nombre` `#campo-correo` `#campo-tipo` `#campo-fecha` `#campo-presupuesto` `#campo-acepto` | id | JS (lectura y validación) |
| `#mensaje` | id | JS (retroalimentación) |
| `#cuerpo-tabla` | id | JS (filas de solicitudes) |
| `#anio` | id | JS (año dinámico) |

---

## Task 1: Estructura HTML semántica y activos

**Files:**
- Create: `index.html`
- Create: `img/folkdone.png`, `img/take-and-run.webp`, `img/sabor-urbano.webp`, `img/oh-la-la.webp`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nada (primera tarea)
- Produces: todos los identificadores del contrato de nombres. Las Tareas 2 y 3 dependen de que existan exactamente con esos nombres.

- [ ] **Step 1: Copiar las cuatro imágenes desde el proyecto Folkdone**

```powershell
New-Item -ItemType Directory -Force "D:\Paginas\Portafolio_Parcial\img" | Out-Null
Copy-Item "D:\Paginas\Folkdone\public\og.png"                      "D:\Paginas\Portafolio_Parcial\img\folkdone.png"
Copy-Item "D:\Paginas\Folkdone\public\portfolio\take-and-run.webp" "D:\Paginas\Portafolio_Parcial\img\take-and-run.webp"
Copy-Item "D:\Paginas\Folkdone\public\portfolio\sabor-urbano.webp" "D:\Paginas\Portafolio_Parcial\img\sabor-urbano.webp"
Copy-Item "D:\Paginas\Folkdone\public\portfolio\oh-la-la.webp"     "D:\Paginas\Portafolio_Parcial\img\oh-la-la.webp"
```

Verificar que las cuatro existen y ninguna pesa 0 bytes.

- [ ] **Step 2: Crear `.gitignore`**

```
# Este proyecto no usa dependencias ni build. Solo ruido del sistema.
Thumbs.db
.DS_Store
.vscode/
```

- [ ] **Step 3: Escribir `index.html`**

Estructura obligatoria, en este orden:

1. `<!DOCTYPE html>`, `<html lang="es">`
2. `<head>`: `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>Bayron Barrios — Desarrollador web</title>`, `<link rel="stylesheet" href="css/estilos.css">`
3. `<header>` con `<nav class="barra-navegacion">`: un `<span class="marca">` con el nombre y una `<ul>` con tres `<li><a>` a `#inicio`, `#proyectos`, `#contacto`
4. `<main>` con tres `<section>`:
   - `id="inicio"`: `<h1>Bayron Steven Barrios Donoso</h1>`, más estos dos párrafos exactos:

```html
<p class="presentacion">
  Desarrollador web. Construyo sitios rápidos y hechos a la medida de cada negocio.
</p>
<p>Escríbeme a <a href="mailto:hello@folkdone.com">hello@folkdone.com</a></p>
```
   - `id="proyectos"`: `<h2>Proyectos</h2>`, `<div id="filtros">` con cuatro `<button type="button" data-categoria="...">`, y `<div id="lista-proyectos"></div>` **vacío**
   - `id="contacto"`: `<h2>Contacto</h2>`, el `<form id="formulario">`, un `<p id="mensaje"></p>`, y la `<table>`
5. `<footer>` con `<p>` que contiene `<span id="anio"></span>`

Los cuatro botones de filtro llevan `data-categoria` con estos valores exactos: `todos`, `negocio-local`, `tienda-online`, `marca-propia`. Etiquetas visibles: `Todos`, `Negocio local`, `Tienda online`, `Marca propia`.

El formulario, con `<label for>` apuntando al `id` de cada campo:

```html
<form id="formulario">
  <div class="campo">
    <label for="campo-nombre">Nombre</label>
    <input type="text" id="campo-nombre" name="nombre" required>
  </div>
  <div class="campo">
    <label for="campo-correo">Correo electrónico</label>
    <input type="email" id="campo-correo" name="correo" required>
  </div>
  <div class="campo">
    <label for="campo-tipo">Tipo de proyecto</label>
    <select id="campo-tipo" name="tipo" required>
      <option value="">Selecciona una opción</option>
      <option value="Landing page">Landing page</option>
      <option value="Tienda online">Tienda online</option>
      <option value="Sitio de negocio">Sitio de negocio</option>
      <option value="Otro">Otro</option>
    </select>
  </div>
  <div class="campo">
    <label for="campo-fecha">Fecha deseada de entrega</label>
    <input type="date" id="campo-fecha" name="fecha">
  </div>
  <div class="campo">
    <label for="campo-presupuesto">Presupuesto aproximado (COP)</label>
    <input type="number" id="campo-presupuesto" name="presupuesto" min="0" step="50000">
  </div>
  <div class="campo campo-linea">
    <input type="checkbox" id="campo-acepto" name="acepto" required>
    <label for="campo-acepto">Acepto ser contactado por correo</label>
  </div>
  <button type="submit" class="boton-enviar">Enviar solicitud</button>
</form>
```

La tabla, con `<tbody>` **vacío**:

```html
<table class="tabla-solicitudes">
  <caption>Solicitudes registradas en esta sesión</caption>
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Correo</th>
      <th scope="col">Tipo</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody id="cuerpo-tabla"></tbody>
</table>
```

Cerrar `<body>` con `<script src="js/main.js"></script>` justo antes de `</body>`, para que el DOM exista cuando el script corra. Es la razón por la que **no** hace falta `DOMContentLoaded`, y es una pregunta probable en la sustentación.

- [ ] **Step 4: Verificar la estructura en el navegador**

Levantar un servidor estático y abrir la página:

```bash
python -m http.server 8080 --directory "D:/Paginas/Portafolio_Parcial"
```

Comprobar en `http://localhost:8080`:
- La página carga sin estilos (aún no hay CSS) pero con todo el texto visible
- La consola (F12) no muestra errores rojos — el 404 de `css/estilos.css` es esperado en este punto
- Las cuatro imágenes **todavía no aparecen**: las crea JS en la Tarea 3
- `document.querySelectorAll('section').length` devuelve `3`
- `document.querySelectorAll('h1').length` devuelve `1`
- `document.querySelector('#lista-proyectos').children.length` devuelve `0`
- `document.querySelectorAll('#filtros button').length` devuelve `4`
- Cada `<label>` enfoca su campo al hacer clic

- [ ] **Step 5: Commit**

```bash
git add index.html img .gitignore
git commit -m "feat: estructura HTML semantica, formulario y tabla base"
```

---

## Task 2: Hoja de estilos

**Files:**
- Create: `css/estilos.css`

**Interfaces:**
- Consumes: los identificadores del contrato de nombres (Tarea 1)
- Produces: la clase `.tarjeta` estilizada, que la Tarea 3 creará dinámicamente; y `.activo` para el botón de filtro seleccionado

- [ ] **Step 1: Escribir `css/estilos.css`**

Orden del archivo: variables → reset de caja → base → header/nav → secciones → filtros → tarjetas → formulario → tabla → footer → media query.

Las seis variables en `:root`, todas usadas después con `var()`:

```css
:root {
  --color-fondo: #14110f;
  --color-texto: #e8e2dc;
  --color-acento: #c9884a;
  --color-borde: #2e2823;
  --espacio: 16px;
  --radio: 8px;
}
```

Modelo de caja explícito:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**Flexbox contenedor #1** — la barra de navegación:

```css
.barra-navegacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--espacio);
  padding: var(--espacio);
}
```

La `<ul>` interna también es flex, con `gap: var(--espacio)` y `list-style: none`.

**Flexbox contenedor #2** — la rejilla de tarjetas:

```css
#lista-proyectos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espacio);
  align-items: stretch;
}

.tarjeta {
  flex: 1 1 280px;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  padding: var(--espacio);
  background-color: #1b1714;
}
```

La imagen de la tarjeta: `width: 100%`, `height: auto`, `border-radius: var(--radio)`, `display: block`.

**Dos efectos `:hover`** (el requisito pide al menos uno):

```css
.barra-navegacion a:hover {
  color: var(--color-acento);
}

.tarjeta:hover {
  border-color: var(--color-acento);
}
```

Añadir `transition: border-color 0.2s;` a `.tarjeta` y `transition: color 0.2s;` a los enlaces. Es la única animación del sitio.

**Media query** para pantallas pequeñas:

```css
@media (max-width: 700px) {
  .barra-navegacion {
    flex-direction: column;
    align-items: flex-start;
  }
  .tarjeta {
    flex-basis: 100%;
  }
  .tabla-solicitudes th,
  .tabla-solicitudes td {
    padding: 6px;
    font-size: 14px;
  }
}
```

Estilos restantes, sin código prescrito pero obligatorios: cuerpo con `--color-fondo`, `--color-texto` y `font-family: system-ui, sans-serif`; secciones con ancho máximo de 960px centradas con `margin: 0 auto`; campos del formulario con `.campo` en bloque y `.campo-linea` en flex para el checkbox; tabla con `border-collapse: collapse`, `<caption>` alineado a la izquierda y celdas con borde inferior `var(--color-borde)`; botón `.activo` con fondo `var(--color-acento)`.

- [ ] **Step 2: Verificar en el navegador**

Con el servidor de la Tarea 1 corriendo, recargar y comprobar:
- La consola no muestra errores ni el 404 anterior de CSS
- El nav queda en una fila, con los enlaces a la derecha
- Al pasar el mouse sobre un enlace del nav, cambia a color acento
- En DevTools, con el ancho a 375px: el nav se apila en columna
- `getComputedStyle(document.querySelector('.barra-navegacion')).display` devuelve `flex`
- `getComputedStyle(document.documentElement).getPropertyValue('--color-acento').trim()` devuelve `#c9884a`
- No hay barra de desplazamiento horizontal en 375px

Las tarjetas aún no se ven: no existen hasta la Tarea 3.

- [ ] **Step 3: Commit**

```bash
git add css/estilos.css
git commit -m "style: variables en root, modelo de caja, flexbox y responsividad"
```

---

## Task 3: JavaScript — modelos de datos, render y eventos

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: todos los identificadores del contrato de nombres, y la clase `.tarjeta` y `.activo` de la Tarea 2
- Produces: el sitio funcional completo. Ninguna tarea posterior depende de sus internos.

- [ ] **Step 1: Escribir el modelo de datos de proyectos**

Al inicio de `js/main.js`. Los `alt` y sectores son los que el autor ya escribió en `Folkdone/dictionaries/es.json`.

```js
// Modelo de datos en memoria. Cada objeto describe un proyecto real.
// Cambiar algo aqui cambia lo que se ve en pantalla, sin tocar el HTML.
const proyectos = [
  {
    nombre: "Folkdone",
    sector: "Estudio de diseno web & software",
    descripcion: "Sitio propio del estudio, con portafolio y contacto en dos idiomas.",
    imagen: "img/folkdone.png",
    alt: "Sitio web del estudio Folkdone con portafolio de proyectos y seccion de contacto",
    enlace: "https://folkdone.com",
    categoria: "marca-propia"
  },
  {
    nombre: "Take and Run",
    sector: "Tienda online de zapatos",
    descripcion: "Tienda con catalogo, carrito y pago en linea.",
    imagen: "img/take-and-run.webp",
    alt: "Sitio web de la tienda de zapatos Take and Run con catalogo, carrito y pago en linea, diseno oscuro con acentos neon",
    enlace: "https://take-and-run.folkdone.workers.dev/",
    categoria: "tienda-online"
  },
  {
    nombre: "Sabor Urbano",
    sector: "Restaurante",
    descripcion: "Landing de restaurante con menu, galeria y reservas.",
    imagen: "img/sabor-urbano.webp",
    alt: "Sitio web del restaurante Sabor Urbano con menu y reservas, composicion editorial oscura y fotografia gastronomica",
    enlace: "https://saborurbano-elj.pages.dev/",
    categoria: "negocio-local"
  },
  {
    nombre: "Oh La La!",
    sector: "Peluqueria canina",
    descripcion: "Sitio de servicios con galeria de cortes y agenda de citas.",
    imagen: "img/oh-la-la.webp",
    alt: "Sitio web de la peluqueria canina Oh La La! con galeria de cortes y servicios para perros",
    enlace: "https://ohlala-bxg.pages.dev/",
    categoria: "negocio-local"
  }
];

// Segundo modelo: empieza vacio y crece cuando el usuario envia el formulario.
let solicitudes = [];
```

Nota sobre acentos: los textos van sin tildes en el JS para evitar cualquier problema de codificación al servirse desde GitHub Pages. El HTML sí lleva tildes porque declara `charset="UTF-8"`.

- [ ] **Step 2: Escribir `crearTarjeta` y `renderizarProyectos`**

```js
// Arma UN elemento <article> completo a partir de un objeto del arreglo.
// Se usa createElement + textContent, nunca innerHTML.
function crearTarjeta(proyecto) {
  const articulo = document.createElement("article");
  articulo.className = "tarjeta";

  const imagen = document.createElement("img");
  imagen.src = proyecto.imagen;
  imagen.alt = proyecto.alt;

  const titulo = document.createElement("h3");
  titulo.textContent = proyecto.nombre;

  const sector = document.createElement("p");
  sector.className = "sector";
  sector.textContent = proyecto.sector;

  const descripcion = document.createElement("p");
  descripcion.textContent = proyecto.descripcion;

  const enlace = document.createElement("a");
  enlace.href = proyecto.enlace;
  enlace.textContent = "Ver sitio";
  enlace.target = "_blank";
  enlace.rel = "noopener";

  articulo.appendChild(imagen);
  articulo.appendChild(titulo);
  articulo.appendChild(sector);
  articulo.appendChild(descripcion);
  articulo.appendChild(enlace);

  return articulo;
}

// Vacia el contenedor y lo vuelve a llenar recorriendo la lista recibida.
function renderizarProyectos(lista) {
  const contenedor = document.querySelector("#lista-proyectos");
  contenedor.textContent = "";
  lista.forEach(function (proyecto) {
    contenedor.appendChild(crearTarjeta(proyecto));
  });
}
```

`contenedor.textContent = ""` es la forma de vaciar sin usar `innerHTML`.

- [ ] **Step 3: Escribir el filtro con delegación de eventos**

```js
// Un solo listener en el contenedor padre, en vez de uno por boton.
// Se lee que boton se pulso con evento.target y su atributo data-categoria.
function manejarFiltro(evento) {
  const boton = evento.target;
  if (boton.tagName !== "BUTTON") {
    return;
  }

  const categoria = boton.dataset.categoria;

  if (categoria === "todos") {
    renderizarProyectos(proyectos);
  } else {
    const filtrados = proyectos.filter(function (proyecto) {
      return proyecto.categoria === categoria;
    });
    renderizarProyectos(filtrados);
  }

  marcarBotonActivo(boton);
}

// Quita la clase .activo de todos los botones y se la pone al pulsado.
function marcarBotonActivo(botonPulsado) {
  const botones = document.querySelectorAll("#filtros button");
  botones.forEach(function (boton) {
    boton.classList.remove("activo");
  });
  botonPulsado.classList.add("activo");
}
```

- [ ] **Step 4: Escribir el render de solicitudes y el borrado**

```js
// Mismo patron que renderizarProyectos: vaciar, recorrer, crear, agregar.
function renderizarSolicitudes() {
  const cuerpo = document.querySelector("#cuerpo-tabla");
  cuerpo.textContent = "";

  solicitudes.forEach(function (solicitud, indice) {
    const fila = document.createElement("tr");

    fila.appendChild(crearCelda(solicitud.nombre));
    fila.appendChild(crearCelda(solicitud.correo));
    fila.appendChild(crearCelda(solicitud.tipo));
    fila.appendChild(crearCelda(solicitud.fecha));

    const celdaAccion = document.createElement("td");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Quitar";
    boton.dataset.indice = indice;
    celdaAccion.appendChild(boton);
    fila.appendChild(celdaAccion);

    cuerpo.appendChild(fila);
  });
}

// Pequena ayuda para no repetir cinco veces las mismas tres lineas.
function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

// Delegacion otra vez: las filas no existen cuando la pagina carga,
// asi que el listener vive en el <tbody>, que si existe siempre.
function manejarQuitar(evento) {
  if (evento.target.tagName !== "BUTTON") {
    return;
  }
  const indice = Number(evento.target.dataset.indice);
  solicitudes.splice(indice, 1);
  renderizarSolicitudes();
}
```

- [ ] **Step 5: Escribir el envío del formulario con validación**

```js
// preventDefault() evita que el navegador recargue la pagina al enviar.
// Sin el, el formulario haria una peticion y perderiamos todo el estado.
function manejarEnvio(evento) {
  evento.preventDefault();

  const nombre = document.querySelector("#campo-nombre").value.trim();
  const correo = document.querySelector("#campo-correo").value.trim();
  const tipo = document.querySelector("#campo-tipo").value;
  const fecha = document.querySelector("#campo-fecha").value;
  const acepto = document.querySelector("#campo-acepto").checked;
  const mensaje = document.querySelector("#mensaje");

  if (nombre === "") {
    mostrarMensaje(mensaje, "Escribe tu nombre.", "error");
    return;
  }
  if (correo === "") {
    mostrarMensaje(mensaje, "Escribe tu correo electronico.", "error");
    return;
  }
  if (tipo === "") {
    mostrarMensaje(mensaje, "Selecciona un tipo de proyecto.", "error");
    return;
  }
  if (acepto === false) {
    mostrarMensaje(mensaje, "Debes aceptar ser contactado.", "error");
    return;
  }

  solicitudes.push({
    nombre: nombre,
    correo: correo,
    tipo: tipo,
    fecha: fecha === "" ? "Sin definir" : fecha
  });

  renderizarSolicitudes();
  document.querySelector("#formulario").reset();
  mostrarMensaje(mensaje, "Solicitud registrada. Gracias, " + nombre + ".", "exito");
}

// Escribe el texto y cambia la clase para que el CSS lo pinte.
function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = tipo;
}
```

- [ ] **Step 6: Escribir el año dinámico y el arranque**

```js
// Requisito de manipulacion del DOM: el anio no esta escrito en el HTML.
function mostrarAnio() {
  const fecha = new Date();
  document.querySelector("#anio").textContent = fecha.getFullYear();
}

// Arranque. El script va al final del <body>, asi que el DOM ya existe
// y no hace falta esperar a DOMContentLoaded.
document.querySelector("#formulario").addEventListener("submit", manejarEnvio);
document.querySelector("#filtros").addEventListener("click", manejarFiltro);
document.querySelector("#cuerpo-tabla").addEventListener("click", manejarQuitar);

renderizarProyectos(proyectos);
mostrarAnio();
```

- [ ] **Step 7: Añadir al CSS los estilos de `#mensaje`**

En `css/estilos.css`, antes de la media query:

```css
#mensaje {
  margin: var(--espacio) 0;
  min-height: 1.2em;
}

#mensaje.error {
  color: #e07a5f;
}

#mensaje.exito {
  color: var(--color-acento);
}
```

- [ ] **Step 8: Verificar todo el comportamiento en el navegador**

Recargar `http://localhost:8080` y comprobar, en orden:

1. Aparecen **cuatro tarjetas** con sus imágenes cargadas
2. La consola (F12) está limpia, sin un solo error rojo
3. Clic en **Negocio local** → quedan 2 tarjetas (Sabor Urbano y Oh La La!)
4. Clic en **Tienda online** → queda 1 tarjeta (Take and Run)
5. Clic en **Todos** → vuelven las 4
6. El botón pulsado queda resaltado con la clase `.activo`
7. Enviar el formulario **vacío** → aparece "Escribe tu nombre." y **no** se agrega fila
8. Marcar todo menos el checkbox → aparece "Debes aceptar ser contactado."
9. Llenar todo correctamente → se agrega una fila a la tabla, el formulario se limpia y sale el mensaje de éxito
10. La página **no se recarga** al enviar (prueba de que `preventDefault()` funciona)
11. Clic en **Quitar** de una fila → la fila desaparece
12. Agregar tres solicitudes y quitar la del medio → quitar la correcta, no otra
13. El footer muestra el año actual
14. En DevTools a 375px: una tarjeta por fila, sin desplazamiento horizontal

Comprobación de que no se usó `innerHTML` en ningún sitio:

```bash
grep -n "innerHTML" js/main.js || echo "OK: sin innerHTML"
```

- [ ] **Step 9: Commit**

```bash
git add js/main.js css/estilos.css
git commit -m "feat: modelo de datos, render dinamico, filtro y validacion del formulario"
```

---

## Task 4: README y publicación

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: el sitio funcional de las Tareas 1-3
- Produces: la entrega lista

- [ ] **Step 1: Escribir `README.md`**

Debe contener: título y autor (Bayron Steven Barrios Donoso), asignatura (Tecnologías Web — Parcial), la URL pública, una descripción de dos líneas, la lista de requisitos cubiertos con la ruta y línea donde se cumple cada uno, y cómo correrlo en local con `python -m http.server`.

La tabla de requisitos cubiertos sirve doble: documenta el proyecto y le da al autor una chuleta para la sustentación.

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: readme con requisitos cubiertos y guia de ejecucion local"
```

- [ ] **Step 3: Publicar (acción del autor)**

Requiere que el repo sea **público** — GitHub Pages no publica repos privados en cuenta gratuita.

```bash
git -C "D:/Paginas/Portafolio_Parcial" push -u origin main
```

Después, en GitHub: `Settings` → `Pages` → Source: `Deploy from a branch` → Branch: `main`, carpeta `/ (root)` → Save. Esperar 1-2 minutos.

- [ ] **Step 4: Verificar el sitio publicado**

Abrir `https://bayronb-dev.github.io/Portafolio_Parcial/` y repetir las comprobaciones 1-14 del Step 8 de la Tarea 3, esta vez sobre la URL pública. Revisar en particular que las rutas de `css/`, `js/` e `img/` resuelvan (son relativas, así que deberían), y que la consola esté limpia.

---

## Verificación final contra la rúbrica

Antes de entregar, confirmar una por una:

- [ ] El sitio carga en la URL pública, no en 127.0.0.1
- [ ] La consola no muestra errores en rojo
- [ ] El formulario no permite enviarse vacío y da retroalimentación
- [ ] Al menos un elemento se crea con JS al interactuar
- [ ] El diseño se adapta a pantalla de celular
- [ ] El repositorio tiene más de un commit (van 5: spec, HTML, CSS, JS, README)
- [ ] Enlace público y enlace del repo listos para Aula Extendida
- [ ] Nombre completo: Bayron Steven Barrios Donoso
