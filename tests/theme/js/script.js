document.addEventListener('DOMContentLoaded', function () {
  // Theme Switcher
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = themeToggle.querySelector('.dropdown__theme-label');
  const sunIcon = themeToggle.querySelector('.dropdown__theme-icon--sun');
  const moonIcon = themeToggle.querySelector('.dropdown__theme-icon--moon');
  const body = document.body;

  function updateThemeLabel(isDark) {
    themeLabel.textContent = isDark ? 'Светлая тема' : 'Темная тема';
    sunIcon.style.display = isDark ? 'inline' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline';
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('body--dark-theme');
    updateThemeLabel(true);
  } else {
    updateThemeLabel(false);
  }

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('body--dark-theme');
    const isDark = body.classList.contains('body--dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeLabel(isDark);
  });

  // Burger Menu
  const burgerButton = document.getElementById('burger-button');
  const mainMenu = document.getElementById('main-menu');
  const headerControls = document.querySelector('.header__controls');

  function toggleMenu() {
    const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !isExpanded);
    mainMenu.classList.toggle('menu--open');
    burgerButton.classList.toggle('burger--open');

    if (window.innerWidth <= 768) {
      headerControls.style.display = isExpanded ? 'flex' : 'none';
    }
  }

  burgerButton.addEventListener('click', toggleMenu);

  // Close menu when clicking a menu link on mobile
  mainMenu.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Dropdowns
  document.querySelectorAll('.dropdown__toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const dropdown = toggle.closest('.dropdown');
      const content = dropdown.querySelector('.dropdown__content');
      const isOpen = content.style.display === 'block';

      document.querySelectorAll('.dropdown__content').forEach(c => {
        c.style.display = 'none';
      });

      content.style.display = isOpen ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown__content').forEach(content => {
        content.style.display = 'none';
      });
      document.querySelectorAll('.dropdown__toggle').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Language Dropdown
  const langDropdown = document.getElementById('lang-dropdown');
  const langToggle = langDropdown.querySelector('.dropdown__toggle');
  const langText = langToggle.querySelector('.dropdown__text');

  langDropdown.querySelectorAll('.dropdown__item--lang').forEach(item => {
    item.addEventListener('click', function () {
      const lang = this.dataset.lang;
      langText.textContent = lang.toUpperCase();
      langDropdown.querySelectorAll('.dropdown__item--lang').forEach(i => {
        i.classList.remove('dropdown__item--selected');
      });
      this.classList.add('dropdown__item--selected');
      langDropdown.querySelector('.dropdown__content').style.display = 'none';
      langToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Tabs
  document.querySelectorAll('.tournament__tab-btn').forEach(button => {
    button.addEventListener('click', function () {
      const tabId = this.dataset.tab;
      document.querySelectorAll('.tournament__tab-btn').forEach(btn => {
        btn.classList.remove('tournament__tab-btn--active');
      });
      document.querySelectorAll('.tournament__tab').forEach(tab => {
        tab.classList.remove('tournament__tab--active');
      });
      this.classList.add('tournament__tab-btn--active');
      document.getElementById(`${tabId}-tab`).classList.add('tournament__tab--active');
    });
  });

  // Leaderboard Details Toggle
  document.querySelectorAll('.leaderboard-grid__details-btn').forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('.leaderboard-grid__row');
      const playerId = row.dataset.playerId;
      const details = document.getElementById(`player-${playerId}-tournaments`);
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.leaderboard-grid__cell--full').forEach(detail => {
        detail.hidden = true;
      });
      document.querySelectorAll('.leaderboard-grid__details-btn').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        details.hidden = false;
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mainMenu.classList.remove('menu--open');
      burgerButton.classList.remove('burger--open');
      burgerButton.setAttribute('aria-expanded', 'false');
      headerControls.style.display = 'flex';
    }
  });
});