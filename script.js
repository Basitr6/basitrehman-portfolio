const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.setAttribute('aria-hidden', 'true');
}));
document.addEventListener('click', (event) => {
  if (!mobileNav?.classList.contains('open') || mobileNav.contains(event.target) || menuToggle?.contains(event.target)) return;
  mobileNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.setAttribute('aria-hidden', 'true');
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !mobileNav?.classList.contains('open')) return;
  mobileNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.setAttribute('aria-hidden', 'true');
});

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');
function updateThemeButton() {
  const lightMode = document.body.classList.contains('light-mode');
  themeToggle?.setAttribute('aria-pressed', String(lightMode));
  themeToggle?.setAttribute('aria-label', lightMode ? 'Switch to dark mode' : 'Switch to light mode');
  if (themeToggle) themeToggle.innerHTML = `<span class="theme-icon">${lightMode ? '☾' : '☼'}</span><span class="theme-label">${lightMode ? 'Dark mode' : 'Light mode'}</span>`;
}
updateThemeButton();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  updateThemeButton();
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Project enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
  window.location.href = `mailto:basitrehman159@gmail.com?subject=${subject}&body=${body}`;
  contactForm.querySelector('.form-status').textContent = 'Opening your email client…';
});

const newsGrid = document.querySelector('#news-grid');
const newsStatus = document.querySelector('#news-status');
const refreshNews = document.querySelector('#refresh-news');
const newsFallback = [
  { title: 'The technology feed is temporarily offline', text: 'The live feed could not be reached. Refresh to try again, or explore Basit’s technical projects below.', url: '#work', source: 'LOCAL FALLBACK' },
  { title: 'Building network security tools', text: 'NetSentinel explores packet inspection, ARP spoof detection and practical security reporting.', url: 'https://github.com/Basitr6/NetSentinel', source: 'BASIT // LAB' },
  { title: 'Hardware meets software', text: 'The RISC-V Simulator connects Verilog hardware, a Python assembler and a browser dashboard.', url: 'https://github.com/Basitr6/RISC--V-Simulator-', source: 'BASIT // LAB' }
];
function renderNews(items, fallback = false) {
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));
  newsGrid.innerHTML = items.map((item, index) => {
    const safeTitle = escapeHtml(item.title || 'Untitled technology story');
    const safeText = escapeHtml(item.text || 'Read the original story for the full technical context.');
    const safeUrl = escapeHtml(item.url || '#');
    const source = escapeHtml(item.source || 'TECH FEED');
    return `<article class="update-card news-card"><span class="update-date">${source} // ${String(index + 1).padStart(2, '0')}</span><span class="update-icon">↗</span><h3>${safeTitle}</h3><p>${safeText}</p><a href="${safeUrl}" target="${safeUrl.startsWith('http') ? '_blank' : '_self'}" rel="noreferrer">Read original story <span>↗</span></a></article>`;
  }).join('');
  newsStatus.textContent = fallback ? 'Showing saved portfolio updates while the live feed reconnects.' : `Live feed refreshed · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
async function loadNews() {
  refreshNews?.classList.add('is-loading');
  if (newsStatus) newsStatus.textContent = 'Refreshing technology feed…';
  try {
    const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&query=technology&hitsPerPage=6');
    if (!response.ok) throw new Error(`News feed returned ${response.status}`);
    const data = await response.json();
    const items = data.hits.filter((hit) => hit.title && hit.url).slice(0, 3).map((hit) => ({
      title: hit.title,
      text: `${hit.author || 'Community contributor'} · ${hit.points || 0} points · ${hit.num_comments || 0} comments`,
      url: hit.url,
      source: 'HACKER NEWS'
    }));
    if (!items.length) throw new Error('No news stories returned');
    renderNews(items);
  } catch (error) {
    renderNews(newsFallback, true);
  } finally {
    refreshNews?.classList.remove('is-loading');
  }
}
refreshNews?.addEventListener('click', loadNews);
if (newsGrid) loadNews();

const aiPanel = document.querySelector('#ai-panel');
const aiMessages = document.querySelector('#ai-messages');
const aiInput = document.querySelector('#ai-input');
document.querySelector('#ai-trigger')?.addEventListener('click', () => {
  aiPanel.classList.add('open');
  aiPanel.setAttribute('aria-hidden', 'false');
  aiInput.focus();
});
document.querySelector('#ai-close')?.addEventListener('click', () => {
  aiPanel.classList.remove('open');
  aiPanel.setAttribute('aria-hidden', 'true');
});

const answers = [
  { keys: ['do', 'does', 'work', 'who'], answer: 'Basit is a product-minded software engineer who designs and builds thoughtful web products, AI tools and digital experiences from Pakistan, working remotely with teams everywhere.' },
  { keys: ['available', 'hire', 'work together', 'contact'], answer: 'Yes — Basit is available for select projects. The best way to start is to send a note through the contact form or email hello@basitrehman.tech with a little about your idea.' },
  { keys: ['project', 'portfolio', 'made', 'work'], answer: 'You can explore Saffron (operations), Orbit AI (a team second brain), Nomad (slow travel) and Frames (a motion experiment) in the work section above.' },
  { keys: ['process', 'how'], answer: 'Basit’s process is simple: listen first, make the idea tangible with prototypes, then build with care and attention to the long term.' },
  { keys: ['skill', 'tech', 'technology'], answer: 'His sweet spot is product engineering: modern web development, AI and automation, interaction design, and making complex things feel clear.' }
];
function getAnswer(question) {
  const normalized = question.toLowerCase();
  const match = answers.find((item) => item.keys.some((key) => normalized.includes(key)));
  return match?.answer || 'That’s a good question. I know Basit best through his work, process and availability — try asking about one of those, or send him a message directly at hello@basitrehman.tech.';
}
function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}
function ask(question) {
  if (!question.trim()) return;
  addMessage(question, 'user');
  setTimeout(() => addMessage(getAnswer(question), 'assistant'), 350);
}
document.querySelector('#ai-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  ask(aiInput.value);
  aiInput.value = '';
});
document.querySelectorAll('.quick-prompts button').forEach((button) => button.addEventListener('click', () => ask(button.textContent)));

document.querySelectorAll('.sparkle-field i').forEach((sparkle, index) => {
  const drift = 10 + Math.random() * 18;
  sparkle.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 90}px`);
  sparkle.style.setProperty('--drift-y', `${(Math.random() - 0.5) * 90}px`);
  sparkle.style.setProperty('--drift-time', `${drift}s`);
  sparkle.style.animationDelay = `${-(Math.random() * drift)}s`;
  sparkle.style.fontSize = `${9 + Math.random() * 10}px`;
  sparkle.style.left = `${Math.random() * 96}%`;
  sparkle.style.top = `${Math.random() * 94}%`;
  sparkle.dataset.index = String(index);
});

const pointerFine = window.matchMedia('(pointer: fine)').matches;
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');
if (pointerFine && cursorGlow && cursorDot) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    cursorDot.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
  });
  document.querySelectorAll('a, button, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

document.querySelectorAll('.button, .ai-trigger').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    if (!pointerFine) return;
    const bounds = button.getBoundingClientRect();
    button.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px, ${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px)`;
  });
  button.addEventListener('pointerleave', () => { button.style.transform = ''; });
});

document.querySelectorAll('.project-card').forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('pointermove', (event) => {
    if (!pointerFine) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-7px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

const projectModal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalTag = document.querySelector('#modal-tag');
const modalCta = document.querySelector('#modal-cta');
function openProject(card) {
  window.location.href = `project.html?id=${encodeURIComponent(card.dataset.category)}`;
}
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => openProject(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(card); }
  });
});
function closeProject() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
}
document.querySelector('#modal-close')?.addEventListener('click', closeProject);
projectModal?.addEventListener('click', (event) => { if (event.target === projectModal) closeProject(); });
document.querySelector('#modal-cta')?.addEventListener('click', closeProject);

const revealItems = document.querySelectorAll('.section-heading, .project-card, .process-item, .about-content, .about-facts, .contact-copy, .contact-form');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12 });
revealItems.forEach((element) => { element.classList.add('reveal-item'); revealObserver.observe(element); });

const heroArt = document.querySelector('.hero-art');
window.addEventListener('scroll', () => {
  if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) heroArt.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 30)}px)`;
}, { passive: true });

const networkCanvas = document.querySelector('#network-background');
const networkContext = networkCanvas?.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let networkPoints = [];
let networkFrame;

function resizeNetwork() {
  if (!networkCanvas || !networkContext) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  networkCanvas.width = window.innerWidth * ratio;
  networkCanvas.height = window.innerHeight * ratio;
  networkCanvas.style.width = `${window.innerWidth}px`;
  networkCanvas.style.height = `${window.innerHeight}px`;
  networkContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(44, Math.max(18, Math.floor((window.innerWidth * window.innerHeight) / 34000)));
  networkPoints = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    radius: Math.random() * 1.7 + 0.5
  }));
}

function drawNetwork() {
  if (!networkContext || !networkCanvas) return;
  if (document.hidden) {
    networkFrame = null;
    return;
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  networkContext.clearRect(0, 0, width, height);
  const points = networkPoints;
  points.forEach((point) => {
    if (!reduceMotion) {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < -20 || point.x > width + 20) point.vx *= -1;
      if (point.y < -20 || point.y > height + 20) point.vy *= -1;
    }
    networkContext.beginPath();
    networkContext.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    networkContext.fillStyle = 'rgba(16, 17, 19, .44)';
    networkContext.fill();
  });
  for (let first = 0; first < points.length; first += 1) {
    for (let second = first + 1; second < points.length; second += 1) {
      const dx = points[first].x - points[second].x;
      const dy = points[first].y - points[second].y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < 17640) {
        const distance = Math.sqrt(distanceSquared);
        networkContext.beginPath();
        networkContext.moveTo(points[first].x, points[first].y);
        networkContext.lineTo(points[second].x, points[second].y);
        networkContext.strokeStyle = `rgba(16, 17, 19, ${0.16 * (1 - distance / 145)})`;
        networkContext.lineWidth = 0.7;
        networkContext.stroke();
      }
    }
  }
  if (!reduceMotion) networkFrame = requestAnimationFrame(drawNetwork);
}

resizeNetwork();
drawNetwork();
window.addEventListener('resize', resizeNetwork);
window.addEventListener('resize', () => {
  if (!reduceMotion) {
    cancelAnimationFrame(networkFrame);
    drawNetwork();
  }
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !reduceMotion && !networkFrame) drawNetwork();
});
const labNodes = {
  client: { kicker: 'NODE 01 // CLIENT', title: 'Understand the user path', text: 'I start from the person, workflow or operational pain—not from a tool. That keeps the system useful and measurable.', tags: ['requirements', 'documentation'] },
  firewall: { kicker: 'NODE 02 // FIREWALL', title: 'Make trust boundaries visible', text: 'I think about what should be allowed, denied and logged. Clear rules reduce risk without making the network impossible to use.', tags: ['ACLs', 'monitoring'] },
  router: { kicker: 'NODE 03 // ROUTER', title: 'Move traffic deliberately', text: 'Addressing, routing and segmentation turn a collection of devices into an infrastructure that can be diagnosed and scaled.', tags: ['TCP/IP', 'routing'] },
  server: { kicker: 'NODE 04 // SERVER', title: 'Automate the repeatable work', text: 'Python and Linux help me convert manual checks, reports and operational tasks into repeatable workflows with useful evidence.', tags: ['Python', 'Linux'] },
  cloud: { kicker: 'NODE 05 // CLOUD', title: 'Design for visibility', text: 'Cloud systems should be understandable after deployment. I value logs, documentation and simple operational handoffs as much as the build.', tags: ['cloud', 'observability'] }
};
const coverImages = { python: 'assets/covers/smart-file-organizer.svg', hardware: 'assets/covers/risc-v-simulator.svg', security: 'assets/covers/netsentinel.svg', networking: 'assets/covers/campus-network.svg' };
document.querySelectorAll('.project-card[data-category]').forEach((card) => {
  const image = coverImages[card.dataset.category];
  const visual = card.querySelector('.project-visual');
  if (!image || !visual || visual.querySelector('.project-cover')) return;
  const cover = document.createElement('img');
  cover.className = 'project-cover';
  cover.src = image;
  cover.alt = `${card.querySelector('h3')?.textContent || 'Project'} interface preview`;
  cover.loading = 'lazy';
  visual.prepend(cover);
});
document.querySelectorAll('.lab-node').forEach((node) => node.addEventListener('click', () => {
  const data = labNodes[node.dataset.node];
  if (!data) return;
  document.querySelectorAll('.lab-node').forEach((item) => item.classList.toggle('active', item === node));
  document.querySelector('#lab-kicker').textContent = data.kicker;
  document.querySelector('#lab-title').textContent = data.title;
  document.querySelector('#lab-text').textContent = data.text;
  document.querySelector('#lab-tags').innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
}));
