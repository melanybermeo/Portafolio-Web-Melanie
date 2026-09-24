/* =========================================================
   PORTAFOLIO WEB — Melanie Bermeo
   1) Menú responsive (mobile nav)
   2) Modo claro / oscuro con persistencia en localStorage
   3) Botón "volver arriba"
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

});
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