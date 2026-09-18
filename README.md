# Portafolio Web Profesional — Melanie Bermeo

Portafolio web personal e interactivo, de varias páginas, desarrollado con **HTML5 semántico, CSS propio (con Custom Properties) y JavaScript**.

## Enlaces

- **Repositorio:** [Portafolio-Web-Melanie](https://github.com/melanybermeo/Portafolio-Web-Melanie)
- **Sitio publicado (GitHub Pages):** se agrega al publicar

## Tecnologías utilizadas

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `footer`)
- CSS3 con Custom Properties (colores, tipografía, espaciado, bordes, sombras) + tema claro/oscuro
- JavaScript (vanilla, sin frameworks)
- Google Fonts (Poppins + Inter)

## Estructura del proyecto

```
portafolio-melanie/
├── index.html            (Inicio)
├── sobre-mi.html
├── habilidades.html
├── proyectos.html
├── design-system.html
├── contacto.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── cv-melanie-bermeo.pdf 
    └── img/
        ├── avatar.png
        ├── project-smartfinance.png
        ├── project-biblioteca.png
        └── project-thesis.png
```

Cada página comparte el mismo `header`/`nav` y `footer`, y enlaza los mismos `css/style.css` y `js/script.js`, así que el idioma y el tema elegidos se mantienen al cambiar de página.

## Páginas incluidas

1. `index.html` — Inicio / Presentación
2. `sobre-mi.html` — Sobre mí (incluye nivel académico y botón para descargar el CV)
3. `habilidades.html` — Habilidades / Skills
4. `proyectos.html` — Proyectos destacados
5. `design-system.html` — Design System / Componentes
6. `contacto.html` — Contacto

## Funcionalidades interactivas (JavaScript)

1. **Menú responsive** — el menú de navegación se convierte en un menú hamburguesa en pantallas pequeñas.
2. **Selector de idioma ES/EN** — cambia todo el contenido del portafolio entre español e inglés y recuerda la preferencia del visitante con `localStorage`.
3. **Modo claro / oscuro** — botón 🌙/☀️ en la barra de navegación, con la preferencia guardada en `localStorage`.
4. **Filtro de proyectos por tecnología** — permite explorar los proyectos destacados filtrando por Python, Django, React o IA (en `proyectos.html`).
5. **Validación del formulario de contacto** — valida nombre, correo y mensaje en tiempo real, con mensajes de error claros (es un formulario de demostración, no envía datos a un servidor).
6. **Botón "volver arriba"** — aparece al hacer scroll y regresa suavemente al inicio.

## Cómo verlo localmente

1. Descarga o clona la carpeta del proyecto.
2. Abre `index.html` directamente en tu navegador (doble clic), **o** usa la extensión "Live Server" de VS Code para verlo con recarga automática y navegar entre páginas con normalidad.
