// ═══════════════════════════════
// Shared layout components
// ═══════════════════════════════

const NAV_HTML = `

<header>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <a href="index.html" class="nav-logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
        </svg>
      </div>
      <div class="brand">SI <span>CARGO</span> UGANDA</div>
    </a>

    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav-links" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="tracking.html">Tracking</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="register.html" class="nav-cta">Register Cargo</a></li>
      <li><a href="admin.html">Admin</a></li>
    </ul>

  </nav>
</header>
`;

const FOOTER_HTML = `

<footer role="contentinfo">
  <div class="footer-top">

    <div class="footer-brand">
      <div class="nav-logo" style="margin-bottom:16px;">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
          </svg>
        </div>
        <div class="brand" style="color:white;">SI <span>CARGO</span> UGANDA</div>
      </div>

      <p>
        Your trusted logistics partner for shipping goods from China to Uganda — fast, safe, and affordable.
      </p>
    </div>

    <div class="footer-col">
      <h4>Navigation</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="tracking.html">Track Cargo</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="services.html#air">Air Freight</a></li>
        <li><a href="services.html#sea">Sea Freight</a></li>
        <li><a href="services.html#d2d">Door-to-Door</a></li>
        <li><a href="services.html#customs">Customs Clearance</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:+256700000000">+256 700 000 000</a></li>
        <li><a href="mailto:info@sicargouganda.com">info@sicargouganda.com</a></li>
        <li><a href="contact.html">Kampala, Uganda</a></li>
        <li><a href="faq.html">FAQ</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <p>© 2026 SI CARGO UGANDA. All rights reserved.</p>

    <div class="social-links">
      <div class="social-link" title="WhatsApp">📱</div>
      <div class="social-link" title="Facebook">📘</div>
      <div class="social-link" title="Instagram">📸</div>
      <div class="social-link" title="Twitter/X">🐦</div>
    </div>
  </div>
</footer>
`;

// Inject shared layout
document.getElementById('nav-placeholder').innerHTML = NAV_HTML;
document.getElementById('foot-placeholder').innerHTML = FOOTER_HTML;