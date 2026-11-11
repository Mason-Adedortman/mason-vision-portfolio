(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const menu = $('.nav-links');
  const menuButton = $('.menu-toggle');
  function closeMenu() {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

  const filters = $$('.filter');
  const projectCards = $$('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => {
      const active = button === filter;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    projectCards.forEach(card => {
      const matches = button.dataset.filter === 'all' || card.dataset.category.split(' ').includes(button.dataset.filter);
      card.hidden = !matches;
      if (matches) visible++;
    });
    $('.work-count').textContent = `${String(visible).padStart(2, '0')} selected projects`;
  }));

  const dialog = $('#project-dialog');
  const content = $('#dialog-content');
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
  };
  const projectNames = { basketball: 'AI Basketball Analysis', tennis: 'Tennis Analysis System', simshield: 'SimShieldAI', pdpods: 'PDPODS', replay: 'Session Replay Analytics' };

  const heroPreview = (() => {
    const video = $('#hero-loop');
    const toggle = $('.hero-loop-toggle');
    if (!video || !toggle) return { sync() {} };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let inViewport = false;
    let userPaused = false;
    let userEnabled = false;
    let autoplayBlocked = false;
    let playPending = false;
    let playbackRequest = 0;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';

    const playbackAllowed = () => inViewport && !document.hidden && !dialog.open &&
      !userPaused && !autoplayBlocked &&
      (userEnabled || (!reducedMotion.matches && !connection?.saveData));

    function updateToggle() {
      const paused = video.paused || video.ended;
      const label = paused ? 'Play preview' : 'Pause preview';
      toggle.textContent = label;
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('aria-pressed', String(paused));
    }

    function syncPlayback() {
      if (!playbackAllowed()) {
        playbackRequest++;
        video.pause();
        updateToggle();
        return;
      }
      if (!video.paused || playPending) return;
      // Request only the short silent preview, and only when playback is allowed.
      if (!video.hasAttribute('src')) {
        if (!video.dataset.src) return;
        video.src = video.dataset.src;
      }
      const request = ++playbackRequest;
      playPending = true;
      Promise.resolve(video.play()).then(() => {
        if (!playbackAllowed()) video.pause();
      }).catch(() => {
        if (request !== playbackRequest) return;
        autoplayBlocked = true;
        video.pause();
      }).finally(() => {
        playPending = false;
        updateToggle();
        // A visibility change can interrupt an outstanding play request.
        if (request !== playbackRequest && playbackAllowed()) syncPlayback();
      });
    }

    toggle.addEventListener('click', () => {
      if (!video.paused) {
        userPaused = true;
      } else {
        userPaused = false;
        userEnabled = true;
        autoplayBlocked = false;
      }
      syncPlayback();
    });
    video.addEventListener('playing', () => {
      if (!playbackAllowed()) video.pause();
      updateToggle();
    });
    ['play', 'pause', 'ended'].forEach(event => video.addEventListener(event, updateToggle));
    video.addEventListener('error', () => {
      autoplayBlocked = true;
      video.pause();
      updateToggle();
    });
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    connection?.addEventListener?.('change', syncPlayback);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        inViewport = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
        syncPlayback();
      });
      observer.observe(video);
    } else {
      const updateViewport = () => {
        const bounds = video.getBoundingClientRect();
        inViewport = bounds.bottom > 0 && bounds.top < window.innerHeight &&
          bounds.right > 0 && bounds.left < window.innerWidth;
        syncPlayback();
      };
      window.addEventListener('scroll', updateViewport, { passive: true });
      window.addEventListener('resize', updateViewport);
      updateViewport();
    }
    updateToggle();
    return { sync: syncPlayback };
  })();

  function releaseMedia() {
    $$('video', content).forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    $$('iframe', content).forEach(iframe => iframe.remove());
  }

  function makeMediaPanel(project, name) {
    const localVideo = project.video && /^assets\/media\/[a-z0-9._-]+\.(mp4|webm)$/i.test(project.video.src);
    const loomVideo = /^[a-f0-9]{32}$/.test(project.demoId || '');
    if (!localVideo && !loomVideo) return null;

    const panel = document.createElement('section');
    panel.className = 'media-panel';
    panel.setAttribute('aria-labelledby', 'media-title');
    const heading = document.createElement('div');
    heading.className = 'media-heading';
    const title = document.createElement('h3');
    title.id = 'media-title';
    title.textContent = localVideo ? project.video.label : `${name} walkthrough`;
    heading.append(title);
    const duration = localVideo ? project.video.duration : project.demoDuration;
    if (duration) {
      const length = document.createElement('span');
      length.className = 'media-duration';
      length.textContent = duration;
      heading.append(length);
    }
    panel.append(heading);

    const fallback = document.createElement('a');
    fallback.className = 'demo-fallback';
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';

    if (localVideo) {
      const video = document.createElement('video');
      video.className = 'project-video';
      video.controls = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.tabIndex = 0;
      video.setAttribute('aria-label', `${name} recorded demonstration`);
      video.src = project.video.src;
      if (/^assets\/media\/[a-z0-9._-]+\.(jpe?g|png|webp)$/i.test(project.video.poster || '')) video.poster = project.video.poster;
      const status = document.createElement('p');
      status.className = 'media-status';
      status.setAttribute('role', 'status');
      video.addEventListener('error', () => {
        status.textContent = 'The video could not load here. Open it directly using the link below.';
      });
      video.addEventListener('playing', () => { status.textContent = ''; });
      fallback.href = project.video.src;
      fallback.textContent = 'Open the video directly ↗';
      panel.append(video, status, fallback);
      return { panel, focusTarget: video, video, status };
    }

    const launch = document.createElement('button');
    launch.type = 'button';
    launch.className = 'demo-launch';
    launch.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-play"/></svg><span><strong>Play the ${escape(name)} walkthrough</strong><small>${duration ? `${escape(duration)} · ` : ''}Watch on this page</small></span>`;
    launch.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.className = 'video-frame';
      iframe.src = `https://www.loom.com/embed/${project.demoId}?autoplay=1`;
      iframe.title = `${name} recorded product walkthrough`;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      launch.replaceWith(iframe);
      iframe.focus({ preventScroll: true });
    });
    fallback.href = `https://www.loom.com/share/${project.demoId}`;
    fallback.textContent = 'Open the video on Loom ↗';
    panel.append(launch, fallback);
    return { panel, focusTarget: launch };
  }

  $$('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = window.PORTFOLIO_PROJECTS?.[button.dataset.project];
    if (!project) return;
    const name = projectNames[button.dataset.project] || 'Project';
    const links = (project.links || []).filter(link => safeUrl(link.url));
    releaseMedia();
    content.innerHTML = `
      <p class="eyebrow dialog-eyebrow">${escape(name)} · ${escape(project.eyebrow)}</p>
      <h2 id="dialog-title">${escape(project.title)}</h2>
      <p class="dialog-summary">${escape(project.summary)}</p>
      <div class="project-tags">${project.stack.map(item => `<span>${escape(item)}</span>`).join('')}</div>
      <p class="dialog-role">${escape(project.role)}</p>
      ${project.sections.map(section => `<section class="dialog-section"><h3>${escape(section.title)}</h3><p>${escape(section.body)}</p></section>`).join('')}
      ${links.length ? `<div class="dialog-links">${links.map(link => `<a href="${escape(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer">${escape(link.label)} ↗</a>`).join('')}</div>` : ''}`;
    const media = makeMediaPanel(project, name);
    if (media) $('.dialog-summary', content).after(media.panel);
    dialog.showModal();
    heroPreview.sync();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    if (button.hasAttribute('data-watch') && media) {
      media.focusTarget.focus({ preventScroll: true });
      const topBar = $('.dialog-top', dialog);
      dialog.scrollTop = media.panel.getBoundingClientRect().top - dialog.getBoundingClientRect().top + dialog.scrollTop - topBar.offsetHeight - 18;
      // Playback only follows an explicit watch action, never an ordinary details click.
      if (media.video) media.video.play().catch(() => {
        if (dialog.open && media.video.isConnected && !media.video.error) media.status.textContent = 'Press play in the video to start the demonstration.';
      });
    }
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    releaseMedia();
    document.body.classList.remove('modal-open');
    content.replaceChildren();
    heroPreview.sync();
  });

  let toastTimer;
  function notify(message) {
    const toast = $('.toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  }
  $('.copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('adedortman2020@gmail.com');
      notify('Email address copied. Let’s talk!');
    } catch {
      notify('Select the email address to copy it, or click it to write to me.');
    }
  });
  $('#year').textContent = new Date().getFullYear();

})();
