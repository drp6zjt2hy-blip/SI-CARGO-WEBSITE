// ===========================
// SI CARGO UGANDA - main.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {


// -- NAVBAR scroll effect --
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// -- HAMBURGER menu --
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.querySelectorAll('span').forEach((s, i) => {
      if (open) {
        if (i === 0) s.style.transform = 'translateY(7px) rotate(45deg)';
        if (i === 1) s.style.opacity   = '0';
        if (i === 2) s.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        s.style.transform = '';
        s.style.opacity   = '';
      }
    });
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

}


// ── ACTIVE nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(l => {
        l.classList.remove('active');
      });
      this.classList.add('active');
    });
  });


// -- SCROLL REVEAL --
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ── FAQ accordion ──
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });


// -- TRACKING form --
function initHomeTracking() {
  const trackBtn = document.getElementById('trackBtn');
  const trackInput = document.getElementById('trackInput');

  if (!trackBtn || !trackInput) return;

  trackBtn.onclick = handleTracking;

  trackInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleTracking();
  });
}
if (!window.location.pathname.includes('tracking.html')) {
  initHomeTracking();
}


async function handleTracking() {
  const trackInput = document.getElementById('trackInput');
  const trackBtn = document.getElementById('trackBtn');

  const val = trackInput.value.trim();

  if (!val) {
    showTrackResult('error', '⚠️ Please enter a tracking number.');
    return;
  }

  trackBtn.textContent = 'Searching...';
  trackBtn.disabled = true;

  try {
   const result = await supabase(
      'GET',
      'tracking',
      null,
      `tracking_number=eq.${val}&select=*`
    );

    trackBtn.textContent = 'Track Cargo';
    trackBtn.disabled = false;

    if (!result || result.length === 0) {
      showTrackResult('error', '❌ Tracking number not found.');
      return;
    }

    const s = result[0];

    showTrackResult(
      'info',
      `🚛 <strong>Status:</strong> ${s.status}<br>
   📍 <strong>Location:</strong> ${s.location || '—'}<br><br>

   📦 <strong>ETA Updates:</strong><br>
   • Mombasa ETA: ${s.eta_mombasa || 'Not set'}<br>
   • ICD/Bond ETA: ${s.eta_icd || 'Not set'}<br>
  `
);

  } catch (e) {
    trackBtn.textContent = 'Track Cargo';
    trackBtn.disabled = false;
    showTrackResult('error', 'Connection error. Try again.');
  }
}
function showTrackResult(type, msg) {
  const trackResult = document.getElementById('trackResult');

  if (!trackResult) return;

  trackResult.innerHTML = msg;

  trackResult.className = 'track-result ' + type;
  trackResult.style.display = 'block';
}
// -- FILE UPLOAD --
setupUpload('deliveryNote', 'deliveryPreview', 'deliveryName', 'deliverySize', 'removeDelivery');

function setupUpload(zoneId, previewId, nameId, sizeId, removeId) {
  const zone    = document.getElementById(zoneId);
  const preview = document.getElementById(previewId);
  if (!zone || !preview) return;

  const input   = zone.querySelector('input[type="file"]');
  const nameEl  = document.getElementById(nameId);
  const sizeEl  = document.getElementById(sizeId);
  const removeBtn = document.getElementById(removeId);

  const showPreview = (file) => {
    nameEl.textContent = file.name;
    sizeEl.textContent = formatBytes(file.size);
    preview.classList.add('show');
    zone.style.display = 'none';
  };

  const clearUpload = () => {
    input.value = '';
    preview.classList.remove('show');
    zone.style.display = 'block';
  };

  input.addEventListener('change', () => {
    if (input.files[0]) showPreview(input.files[0]);
  });

  if (removeBtn) removeBtn.addEventListener('click', clearUpload);

  // Drag & drop
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      showPreview(file);
    }
  });
}

// -- REGISTRATION form submit --
const regForm = document.getElementById('regForm');
const successBanner = document.getElementById('successBanner');
if (regForm) {
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = regForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = 'Register Cargo';
      submitBtn.disabled = false;
      if (successBanner) successBanner.classList.add('show');
      regForm.reset();
      // Reset upload
      const preview = document.getElementById('deliveryPreview');
      const zone    = document.getElementById('deliveryNote');
      if (preview) preview.classList.remove('show');
      if (zone)    zone.style.display = 'block';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 2000);
  });
}

// -- COUNTER animations --
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const step = duration / target;
  let current = 0;
  const timer = setInterval(() => {
    current += Math.ceil(target / 60);
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, step);
}

// -- UTIL --
function formatBytes(bytes) {
  if (bytes < 1024)       return bytes + ' B';
  if (bytes < 1024*1024)  return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/1024/1024).toFixed(1) + ' MB';
}

});