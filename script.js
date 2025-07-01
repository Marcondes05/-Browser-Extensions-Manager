let extensionsData = [];

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('extension-list');
  const filterButtons = document.querySelectorAll('.filters button');

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      extensionsData = data;
      renderExtensions(data);
    });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filters .active').classList.remove('active');
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let filtered = [...extensionsData];

      if (filter === 'active') {
        filtered = filtered.filter(ext => ext.isActive);
      } else if (filter === 'inactive') {
        filtered = filtered.filter(ext => !ext.isActive);
      }

      renderExtensions(filtered);
    });
  });

  function renderExtensions(list) {
    listContainer.innerHTML = '';

    list.forEach((ext, index) => {
      const card = document.createElement('div');
      card.className = 'extension-card';

      card.innerHTML = `
        <div class="toggle ${ext.isActive ? 'active' : ''}" data-index="${index}"></div>
        <img src="${ext.logo}" alt="${ext.name} logo">
        <h3>${ext.name}</h3>
        <p>${ext.description}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      listContainer.appendChild(card);
    });

    document.querySelectorAll('.toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const idx = toggle.dataset.index;
        extensionsData[idx].isActive = !extensionsData[idx].isActive;
        applyCurrentFilter();
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        extensionsData.splice(idx, 1);
        applyCurrentFilter();
      });
    });
  }

  function applyCurrentFilter() {
    const activeBtn = document.querySelector('.filters .active');
    activeBtn.click();
  }

  // Tema e ícone dinâmico
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeIcon() {
    const isLight = document.body.classList.contains('light');
    themeIcon.src = isLight
      ? './assets/images/icon-moon.svg'
      : './assets/images/icon-sun.svg';
    themeIcon.alt = isLight ? 'Switch to dark theme' : 'Switch to light theme';
  }

  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    updateThemeIcon();
  });
});
