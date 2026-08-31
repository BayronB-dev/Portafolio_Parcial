/* ==================================================================
   Portafolio de Bayron Barrios
   Parcial de Tecnologías Web

   La idea de todo el archivo es siempre la misma:
   un arreglo de objetos  ->  una función que lo recorre  ->  el DOM.
   ================================================================== */

/* ------------------------------------------------------------------
   1. MODELOS DE DATOS EN MEMORIA
   ------------------------------------------------------------------ */

// Cada objeto describe un proyecto real. Si cambio algo aquí, cambia lo
// que se ve en pantalla, sin tocar una sola línea del HTML.
const proyectos = [
  {
    nombre: "Folkdone",
    sector: "Estudio de diseño web & software",
    descripcion:
      "Sitio propio del estudio, con portafolio y contacto en dos idiomas.",
    imagen: "img/folkdone.png",
    alt: "Sitio web del estudio Folkdone con portafolio de proyectos y sección de contacto",
    enlace: "https://folkdone.com",
    categoria: "marca-propia",
  },
  {
    nombre: "Take and Run",
    sector: "Tienda online de zapatos",
    descripcion: "Tienda con catálogo, carrito y pago en línea.",
    imagen: "img/take-and-run.webp",
    alt: "Sitio web de la tienda de zapatos Take and Run con catálogo, carrito y pago en línea, diseño oscuro con acentos neón",
    enlace: "https://take-and-run.folkdone.workers.dev/",
    categoria: "tienda-online",
  },
  {
    nombre: "Sabor Urbano",
    sector: "Restaurante",
    descripcion: "Landing de restaurante con menú, galería y reservas.",
    imagen: "img/sabor-urbano.webp",
    alt: "Sitio web del restaurante Sabor Urbano con menú y reservas, composición editorial oscura y fotografía gastronómica",
    enlace: "https://saborurbano-elj.pages.dev/",
    categoria: "negocio-local",
  },
  {
    nombre: "Oh La La!",
    sector: "Peluquería canina",
    descripcion: "Sitio de servicios con galería de cortes y agenda de citas.",
    imagen: "img/oh-la-la.webp",
    alt: "Sitio web de la peluquería canina Oh La La! con galería de cortes y servicios para perros",
    enlace: "https://ohlala-bxg.pages.dev/",
    categoria: "negocio-local",
  },
];

// Segundo modelo. Empieza vacío y crece cuando el usuario envía el
// formulario. Es `const` porque nunca lo reasigno: solo lo modifico
// por dentro con push() y splice().
const solicitudes = [];

/* ------------------------------------------------------------------
   2. PROYECTOS: crear una tarjeta y pintar la lista
   ------------------------------------------------------------------ */

// Arma UN elemento <article> completo a partir de un objeto del arreglo.
// Uso createElement + textContent y nunca innerHTML: así el navegador
// trata todo el contenido como texto y no como HTML ejecutable.
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

// Vacía el contenedor y lo vuelve a llenar recorriendo la lista recibida.
// Recibe la lista por parámetro (y no lee `proyectos` directamente) para
// poder pintar tanto el arreglo completo como uno ya filtrado.
function renderizarProyectos(lista) {
  const contenedor = document.querySelector("#lista-proyectos");

  // Vaciar sin innerHTML: poner el texto en blanco borra todos los hijos.
  contenedor.textContent = "";

  lista.forEach(function (proyecto) {
    contenedor.appendChild(crearTarjeta(proyecto));
  });
}

/* ------------------------------------------------------------------
   3. FILTRO (delegación de eventos)
   ------------------------------------------------------------------ */

// Un solo listener vive en el contenedor #filtros, en vez de uno por
// botón. Con evento.target sé cuál se pulsó, y con dataset leo su
// atributo data-categoria del HTML.
function manejarFiltro(evento) {
  const boton = evento.target;

  // El clic pudo caer en el hueco entre botones: si no fue un botón, salgo.
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

// Quita la clase .activo de todos los botones y se la pone solo al pulsado.
function marcarBotonActivo(botonPulsado) {
  const botones = document.querySelectorAll("#filtros button");

  botones.forEach(function (boton) {
    boton.classList.remove("activo");
  });

  botonPulsado.classList.add("activo");
}

/* ------------------------------------------------------------------
   4. SOLICITUDES: pintar la tabla y quitar filas
   ------------------------------------------------------------------ */

// Mismo patrón que renderizarProyectos: vaciar, recorrer, crear, agregar.
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

    // Guardo la posición del arreglo en el propio botón. Así, al pulsarlo,
    // sé exactamente qué solicitud tengo que borrar.
    boton.dataset.indice = indice;

    celdaAccion.appendChild(boton);
    fila.appendChild(celdaAccion);

    cuerpo.appendChild(fila);
  });
}

// Pequeña ayuda para no repetir cuatro veces las mismas tres líneas.
function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

// Delegación otra vez. Las filas no existen cuando la página carga, así
// que el listener vive en el <tbody>, que sí existe siempre.
function manejarQuitar(evento) {
  if (evento.target.tagName !== "BUTTON") {
    return;
  }

  // dataset devuelve texto, y splice necesita un número.
  const indice = Number(evento.target.dataset.indice);

  solicitudes.splice(indice, 1);
  renderizarSolicitudes();
}

/* ------------------------------------------------------------------
   5. FORMULARIO: envío y validación
   ------------------------------------------------------------------ */

// preventDefault() evita que el navegador recargue la página al enviar.
// Sin él, el formulario haría una petición, la página se reiniciaría y
// perderíamos el arreglo `solicitudes` entero.
function manejarEnvio(evento) {
  evento.preventDefault();

  const nombre = document.querySelector("#campo-nombre").value.trim();
  const correo = document.querySelector("#campo-correo").value.trim();
  const tipo = document.querySelector("#campo-tipo").value;
  const fecha = document.querySelector("#campo-fecha").value;
  const acepto = document.querySelector("#campo-acepto").checked;
  const mensaje = document.querySelector("#mensaje");

  // Validación de campos vacíos, uno por uno, antes de procesar nada.
  if (nombre === "") {
    mostrarMensaje(mensaje, "Escribe tu nombre.", "error");
    return;
  }

  if (correo === "") {
    mostrarMensaje(mensaje, "Escribe tu correo electrónico.", "error");
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

  // Si llegué hasta aquí, todo está bien: agrego al modelo de datos.
  solicitudes.push({
    nombre: nombre,
    correo: correo,
    tipo: tipo,
    fecha: fecha === "" ? "Sin definir" : fecha,
  });

  // Y vuelvo a pintar la tabla desde el arreglo actualizado.
  renderizarSolicitudes();

  document.querySelector("#formulario").reset();
  mostrarMensaje(mensaje, "Solicitud registrada. Gracias, " + nombre + ".", "exito");
}

// Escribe el texto y cambia la clase para que el CSS lo pinte de rojo
// (error) o de color acento (éxito).
function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = tipo;
}

/* ------------------------------------------------------------------
   6. PIE DE PÁGINA
   ------------------------------------------------------------------ */

// El año no está escrito en el HTML: lo calcula JavaScript cada vez que
// se carga la página, así el sitio no se queda desactualizado solo.
function mostrarAnio() {
  const fecha = new Date();
  document.querySelector("#anio").textContent = fecha.getFullYear();
}

/* ------------------------------------------------------------------
   7. ARRANQUE
   Este script está al final del <body>, así que todo el HTML ya existe
   cuando llega aquí. Por eso no hace falta esperar a DOMContentLoaded.
   ------------------------------------------------------------------ */

document.querySelector("#formulario").addEventListener("submit", manejarEnvio);
document.querySelector("#filtros").addEventListener("click", manejarFiltro);
document.querySelector("#cuerpo-tabla").addEventListener("click", manejarQuitar);

renderizarProyectos(proyectos);
mostrarAnio();
