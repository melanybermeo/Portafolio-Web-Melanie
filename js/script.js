/* =========================================================
   PORTAFOLIO WEB — Melanie Bermeo
   1) Menú responsive (mobile nav)
   2) Modo claro / oscuro con persistencia en localStorage
   3) Filtro de proyectos por tecnología
   4) Botón "volver arriba"
   5) Validación y envío del formulario de contacto
   6) Animación al hacer scroll (reveal)
   7) Selector de idioma ES / EN con traducción dinámica
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1) MENÚ RESPONSIVE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      const clickedInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!clickedInsideNav) closeMenu();
    });
  }

  /* ============================================================
     2) MODO CLARO / OSCURO CON localStorage
     ============================================================ */
  const THEME_KEY = 'portfolio-theme';
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('span') : null;
  let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    if (themeToggle) {
      const label = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
      themeToggle.setAttribute('aria-label', label);
    }
  }

  function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  applyTheme(currentTheme);

  /* ============================================================
     3) FILTRO DE PROYECTOS POR TECNOLOGÍA
     ============================================================ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('emptyState');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const tech = card.getAttribute('data-tech') || '';
        const matches = filter === 'all' || tech.includes(filter);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });

  /* ============================================================
     4) BOTÓN "VOLVER ARRIBA"
     ============================================================ */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      backToTop.style.opacity = show ? '1' : '0';
      backToTop.style.pointerEvents = show ? 'auto' : 'none';
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     5) VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
     ============================================================ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(input, message) {
    input.classList.add('is-invalid');
    const errorEl = contactForm.querySelector(`[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const errorEl = contactForm.querySelector(`[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener('input', () => clearError(input));
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Escribe tu nombre completo.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Escribe un correo válido.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Tu mensaje debe tener al menos 10 caracteres.');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
          .then((response) => {
            if (response.ok) {
              formSuccess.hidden = false;
              contactForm.reset();
              setTimeout(() => { formSuccess.hidden = true; }, 6000);
            } else {
              alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
            }
          })
          .catch(() => {
            alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
          });
      } else {
        formSuccess.hidden = true;
      }
    });
  }

  /* ============================================================
     6) ANIMACIÓN AL HACER SCROLL (reveal)
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     7) IDIOMA ES / EN CON TRADUCCIÓN DINÁMICA
     ============================================================ */
  const translations = {
    es: {
      "a11y.skip": "Saltar al contenido principal",
      "nav.home": "Inicio",
      "nav.about": "Sobre mí",
      "nav.skills": "Habilidades",
      "nav.projects": "Proyectos",
      "nav.design": "Design System",
      "nav.contact": "Contacto",

      "hero.eyebrow": "Portafolio profesional",
      "hero.greeting": "Hola, soy",
      "hero.role": "Estudiante de Ingeniería en Software",
      "hero.desc": "Construyo aplicaciones web con foco en experiencias claras y útiles: desde finanzas personales hasta asistencia inteligente para personas con desafíos sensoriales.",
      "hero.cta1": "Ver proyectos",
      "hero.cta2": "Contactarme",
      "hero.stat1": "Proyectos destacados",
      "hero.stat2": "Certificado",
      "hero.stat3": "Lenguajes de backend",

      "about.eyebrow": "Conóceme",
      "about.title": "Sobre mí",
      "about.p1": "Soy estudiante de Ingeniería en Software en la Universidad Estatal de Milagro (UNEMI), Ecuador. Me interesa el desarrollo web full-stack y la aplicación práctica de la inteligencia artificial en productos reales.",
      "about.p2": "Actualmente combino cursos de Business Intelligence, Gestión de Tecnología de la Información, Gestión de Proyectos Informáticos e Inteligencia Artificial con proyectos personales y un trabajo de tesis enfocado en accesibilidad.",
      "about.downloadCv": "Descargar mi CV (PDF)",
      "about.langTitle": "Idioma de lectura",
      "about.langDesc": "¿Prefieres leer este portafolio en otro idioma? Usa el botón ES / EN en la parte superior de la página; todo el contenido se adapta al instante.",
      "about.eduTitle": "Formación académica",
      "about.edu1": "Ingeniería en Software — Universidad Estatal de Milagro (UNEMI)",
      "about.edu2": "Enfoque actual: desarrollo web, gestión de proyectos de TI e inteligencia artificial aplicada",
      "about.academicLevelLabel": "Nivel académico:",
      "about.academicLevelValue": "8vo semestre",
      "about.credentialsTitle": "Certificaciones e idiomas",
      "about.cert1": "🎓 Certificado AWS — UNEMI (2025)",
      "about.hobbiesTitle": "Más allá de la pantalla",
      "about.hobbiesTag": "VIDA & HOBBIES",
      "about.hobby1Title": "Lectura",
      "about.hobby1Desc": "Libros de tecnología y Python; me ayudan a enriquecer la mentalidad.",
      "about.hobby2Title": "Música",
      "about.hobby2Desc": "K-pop y música clásica para acompañar el día.",
      "about.hobby3Title": "Deporte",
      "about.hobby3Desc": "Natación, básquet y fútbol para mantenerme activa fuera de la pantalla.",
      "about.hobby4Title": "Dibujo",
      "about.hobby4Desc": "Bocetos y dibujo digital como forma de relajarme y crear fuera del código.",

      "level.native": "Nativo",
      "level.advanced": "Avanzado",
      "level.intermediate": "Intermedio",
      "level.learning": "Aprendiendo",

      "skills.eyebrow": "Lo que sé hacer",
      "skills.title": "Habilidades / Skills",
      "skills.subtitle": "Tecnologías que domino o me encuentro aprendiendo activamente, organizadas por categoría.",
      "skills.frontend": "Frontend",
      "skills.backend": "Backend",
      "skills.database": "Bases de datos",
      "skills.tools": "Herramientas",
      "skills.ai": "Inteligencia Artificial",

      "projects.eyebrow": "Mi trabajo",
      "projects.title": "Proyectos destacados",
      "projects.subtitle": "Filtra por tecnología para explorar cada proyecto.",
      "filter.all": "Todos",
      "filter.ai": "IA",
      "filter.empty": "No hay proyectos con esta tecnología todavía.",
      "proj.sf.desc": "Aplicación web de finanzas personales que permite registrar ingresos y gastos, y visualizar el estado financiero del usuario en un solo lugar.",
      "proj.problemLabel": "Problema que resuelve:",
      "proj.sf.problem": "Muchas personas pierden el control de sus finanzas por falta de herramientas simples y centralizadas.",
      "proj.repoLink": "Repositorio",
      "proj.lib.name": "Sistema de Biblioteca",
      "proj.lib.desc": "Sistema de gestión bibliotecaria universitaria con catálogo de libros, préstamos identificados mediante código único y exportación de datos.",
      "proj.lib.problem": "La gestión manual de préstamos y catálogo genera errores y pérdida de tiempo en una biblioteca universitaria.",
      "proj.thesis.name": "Asistente sensorial con IA (Tesis)",
      "proj.thesis.desc": "Aplicación móvil que utiliza inteligencia artificial para ofrecer asistencia contextual a personas con desafíos sensoriales, desarrollada junto a un compañero.",
      "proj.thesis.problem": "Las personas con desafíos sensoriales enfrentan barreras para interpretar su entorno; la app ofrece asistencia contextual en tiempo real.",

      "design.eyebrow": "Sistema visual",
      "design.title": "Design System / Componentes",
      "design.subtitle": "Decisiones visuales y componentes reutilizables que se usan en todo el portafolio.",
      "design.colorsTitle": "Colores",
      "design.typeTitle": "Tipografía",
      "design.typeParagraph": "Párrafo de ejemplo: así se ve el texto normal del portafolio.",
      "design.typeMuted": "Texto secundario o de apoyo (muted).",
      "design.typeLink": "Enlace de ejemplo",
      "design.spaceTitle": "Espaciado",
      "design.compTitle": "Componentes",
      "design.btnPrimary": "Botón primario",
      "design.btnSecondary": "Botón secundario",
      "design.inputLabel": "Input de ejemplo",
      "design.inputPlaceholder": "Input de ejemplo",
      "design.textareaLabel": "Textarea de ejemplo",
      "design.textareaPlaceholder": "Textarea de ejemplo",
      "design.cardSample": "Así se ve una card de proyecto reutilizable.",

      "contact.eyebrow": "Hablemos",
      "contact.title": "Contacto",
      "contact.subtitle": "¿Tienes un proyecto en mente o alguna pregunta? Escríbeme.",
      "contact.name": "Nombre",
      "contact.email": "Correo electrónico",
      "contact.message": "Mensaje",
      "contact.send": "Enviar mensaje",
      "contact.success": "¡Gracias! Tu mensaje fue enviado correctamente. Te responderé pronto.",
      "contact.connectTitle": "Conecta conmigo",
      "contact.linkedinPlaceholder": "LinkedIn — melanybermeo",

      "footer.rights": "© 2026 Melanie Bermeo. Todos los derechos reservados."
    },
    en: {
      "a11y.skip": "Skip to main content",
      "nav.home": "Home",
      "nav.about": "About me",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.design": "Design System",
      "nav.contact": "Contact",

      "hero.eyebrow": "Professional portfolio",
      "hero.greeting": "Hi, I'm",
      "hero.role": "Software Engineering Student",
      "hero.desc": "I build web applications focused on clear, useful experiences: from personal finance to smart assistance for people with sensory challenges.",
      "hero.cta1": "View projects",
      "hero.cta2": "Contact me",
      "hero.stat1": "Featured projects",
      "hero.stat2": "Certificates",
      "hero.stat3": "Backend languages",

      "about.eyebrow": "Get to know me",
      "about.title": "About me",
      "about.p1": "I'm a Software Engineering student at Universidad Estatal de Milagro (UNEMI), Ecuador. I'm interested in full-stack web development and the practical application of artificial intelligence in real products.",
      "about.p2": "I'm currently combining Business Intelligence, IT Management, IT Project Management, and Artificial Intelligence coursework with personal projects and a thesis focused on accessibility.",
      "about.downloadCv": "Download my CV (PDF)",
      "about.langTitle": "Reading language",
      "about.langDesc": "Prefer to read this portfolio in another language? Use the ES / EN button at the top of the page; all the content adapts instantly.",
      "about.eduTitle": "Education",
      "about.edu1": "Software Engineering — Universidad Estatal de Milagro (UNEMI)",
      "about.edu2": "Current focus: web development, IT project management, and applied artificial intelligence",
      "about.academicLevelLabel": "Academic level:",
      "about.academicLevelValue": "8th semester",
      "about.credentialsTitle": "Certifications & languages",
      "about.cert1": "🎓 AWS Certificate — UNEMI (2025)",
      "about.hobbiesTitle": "Beyond the screen",
      "about.hobbiesTag": "LIFE & HOBBIES",
      "about.hobby1Title": "Reading",
      "about.hobby1Desc": "Tech and Python books that help broaden my mindset.",
      "about.hobby2Title": "Music",
      "about.hobby2Desc": "K-pop and classical music to go with the day.",
      "about.hobby3Title": "Sports",
      "about.hobby3Desc": "Swimming, basketball, and soccer to stay active off-screen.",
      "about.hobby4Title": "Drawing",
      "about.hobby4Desc": "Sketching and digital drawing as a way to relax and create outside of code.",

      "level.native": "Native",
      "level.advanced": "Advanced",
      "level.intermediate": "Intermediate",
      "level.learning": "Learning",

      "skills.eyebrow": "What I can do",
      "skills.title": "Skills",
      "skills.subtitle": "Technologies I master or am actively learning, organized by category.",
      "skills.frontend": "Frontend",
      "skills.backend": "Backend",
      "skills.database": "Databases",
      "skills.tools": "Tools",
      "skills.ai": "Artificial Intelligence",

      "projects.eyebrow": "My work",
      "projects.title": "Featured projects",
      "projects.subtitle": "Filter by technology to explore each project.",
      "filter.all": "All",
      "filter.ai": "AI",
      "filter.empty": "No projects with this technology yet.",
      "proj.sf.desc": "Personal finance web application that lets users track income and expenses and view their financial status in one place.",
      "proj.problemLabel": "Problem it solves:",
      "proj.sf.problem": "Many people lose track of their finances due to a lack of simple, centralized tools.",
      "proj.repoLink": "Repository",
      "proj.lib.name": "Library System",
      "proj.lib.desc": "University library management system with a book catalog, loans identified by a unique code, and data export.",
      "proj.lib.problem": "Manual loan and catalog management causes errors and wasted time in a university library.",
      "proj.thesis.name": "AI Sensory Assistant (Thesis)",
      "proj.thesis.desc": "Mobile application that uses artificial intelligence to provide contextual assistance to people with sensory challenges, developed with a classmate.",
      "proj.thesis.problem": "People with sensory challenges face barriers to interpreting their surroundings; the app provides real-time contextual assistance.",

      "design.eyebrow": "Visual system",
      "design.title": "Design System / Components",
      "design.subtitle": "Visual decisions and reusable components used across the portfolio.",
      "design.colorsTitle": "Colors",
      "design.typeTitle": "Typography",
      "design.typeParagraph": "Sample paragraph: this is what regular portfolio text looks like.",
      "design.typeMuted": "Secondary or supporting (muted) text.",
      "design.typeLink": "Sample link",
      "design.spaceTitle": "Spacing",
      "design.compTitle": "Components",
      "design.btnPrimary": "Primary button",
      "design.btnSecondary": "Secondary button",
      "design.inputLabel": "Sample input",
      "design.inputPlaceholder": "Sample input",
      "design.textareaLabel": "Sample textarea",
      "design.textareaPlaceholder": "Sample textarea",
      "design.cardSample": "This is what a reusable project card looks like.",

      "contact.eyebrow": "Let's talk",
      "contact.title": "Contact",
      "contact.subtitle": "Have a project in mind or a question? Write to me.",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send message",
      "contact.success": "Thank you! Your message was sent successfully. I'll get back to you soon.",
      "contact.connectTitle": "Connect with me",
      "contact.linkedinPlaceholder": "LinkedIn — melanybermeo",

      "footer.rights": "© 2026 Melanie Bermeo. All rights reserved."
    }
  };

  const LANG_KEY = 'portfolio-lang';
  const langButtons = document.querySelectorAll('.lang-btn');
  let currentLang = localStorage.getItem(LANG_KEY) || 'es';

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.es;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    langButtons.forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('is-active', btnLang === lang);
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang-btn'));
    });
  });

  applyTranslations(currentLang);

});