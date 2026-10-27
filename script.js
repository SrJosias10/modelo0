'use strict';

// Encabezado: arriba siempre visible; se oculta al bajar y aparece al subir.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-nav');
let lastScrollY = Math.max(0, window.scrollY);
let scrollTicking = false;

function closeMenu() {
  if (!menuButton || !menu) return;
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });
}

if (header) {
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY;
      header.classList.toggle('is-scrolled', currentY > 20);
      if (currentY <= 20) {
        header.classList.remove('is-hidden');
        lastScrollY = currentY;
      } else if (Math.abs(delta) >= 4) {
        if (delta > 0 && currentY > header.offsetHeight) {
          header.classList.add('is-hidden');
          closeMenu();
        } else if (delta < 0) {
          header.classList.remove('is-hidden');
        }
        lastScrollY = currentY;
      }
      scrollTicking = false;
    });
  }, { passive: true });
}

// Carrusel de proyectos: controles, indicadores y navegación con flechas.
const carousel = document.querySelector('.project-carousel');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.project-slide'));
  const controls = carousel.querySelector('.carousel-controls');
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const counter = carousel.querySelector('[data-current]');
  let current = 0;
  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  };
  if (slides.length && controls) {
    controls.hidden = false;
    carousel.querySelector('[data-carousel="prev"]').addEventListener('click', () => showSlide(current - 1));
    carousel.querySelector('[data-carousel="next"]').addEventListener('click', () => showSlide(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    controls.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
    });
    showSlide(0);
  }
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Demo sin servidor: abre el cliente de correo con los datos del formulario.
const form = document.querySelector('#intake-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      ['First and Last Name', data.get('name')],
      ['Email', data.get('email')],
      ['Property Owner / Authorized Signer', data.get('signer')],
      ['Phone', data.get('phone')],
      ['Property Address', data.get('address')],
      ['HOA community or building', data.get('hoa')],
      ['Reason for Contact', data.get('reason')],
      ['Scope of work', data.get('scope')],
      ['City violation details', data.get('violation') || 'Not provided']
    ];
    const body = lines.map(([label, value]) => `${label}: ${value}`).join('\n\n');
    const subject = `Project intake: ${data.get('name')}`;
    const status = document.querySelector('#form-status');
    status.textContent = 'Your email application should open with the completed form. Please review and send it there.';
    window.location.href = `mailto:Admin@jjsservicesinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('modal-close');
  const ctaBtn = document.getElementById('modal-cta-btn');
  const triggers = document.querySelectorAll('.service-modal-trigger');
  
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');

  // Contenido dinámico para los 3 servicios
  const servicesData = {
    "1": {
      title: 'Allow us to legalize your project',
      body: `
        <p class="modal-lead">
          We specialize in resolving building code issues for both commercial and residential properties across Florida while managing your project from start to finish. Our experienced team handles every step, so your property stays compliant with all local and state regulations.
        </p>
        <h3>What specifically we can do for you</h3>
        <ul class="modal-services-list">
          <li><strong>Building Violation Resolution</strong><p>Quickly address code violations with expert support. We create clear action plans and provide the required documentation to bring your property into compliance.</p></li>
          <li><strong>Stop Work Order (“Red Tag”) Solutions</strong><p>Dealing with a stop work order? We act fast to resolve the issue, minimize delays, and get your construction project moving again.</p></li>
          <li><strong>Unsafe Structure Board Representation</strong><p>We represent property owners at Unsafe Structure Board hearings, presenting certified engineering solutions to avoid costly demolitions.</p></li>
          <li><strong>Permit Expediting</strong><p>Our permit experts simplify the process in South Florida, from applications and plan submittals to follow-ups and final approvals.</p></li>
          <li><strong>Building Re-certification</strong><p>We manage 25, 30, 40, and 50-year re-certifications, helping your building meet current structural and safety requirements.</p></li>
          <li><strong>Expired Permit Resolution</strong><p>Have an expired permit in Miami, Fort Lauderdale, or elsewhere in Florida? We reopen and close permits across all jurisdictions to keep your project on track.</p></li>
          <li><strong>Special Magistrate Representation</strong><p>Let us speak on your behalf before special magistrates and code enforcement boards, providing a solid strategy for resolution.</p></li>
          <li><strong>Lien Searches & Clearance</strong><p>We perform thorough code lien searches and work to resolve outstanding issues, so you can move forward with closings or new development.</p></li>
          <li><strong>Certificate of Completion / Occupancy</strong><p>We help secure your Certificate of Completion (COC) or Certificate of Occupancy (CO) by coordinating inspections and ensuring all requirements are met.</p></li>
          <li><strong>Certificate of Use & Business Licensing</strong><p>From filing your Certificate of Use to obtaining your Business Tax License, we guide you through every step to get your property or business legally operational.</p></li>
        </ul>
      `
    },
    "2": {
      title: 'Restaurant buildouts',
      body: `
        <p class="modal-lead">
          As a construction and engineering company, we are well suited to handle both the design and build out of independent restaurants and franchises, allowing you to stay focused on running your business.
        </p>
        <p class="modal-lead">
          With both construction and engineering in-house, we help you move seamlessly from restaurant and equipment layout into the building phase. This integrated approach eliminates the back and forth often experienced between architects and contractors, creating a more efficient, coordinated process when everyone is working as one team.
        </p>
      `
    },
    "3": {
      title: 'Engineering plans',
      body: `
        <p class="modal-lead">
          With over two decades of architectural and engineering experience, JJS Services’ in house engineering department is well equipped to manage a wide range of projects.
        </p>
        <p class="modal-lead">
          We specialize in restaurant build-outs, residential additions, and engineering services related to city violations. Our depth of experience and in-house capabilities allow for faster turnaround times and more efficient coordination with city agencies. We welcome you to visit our office at any time to review your project on the big screen or explore a detailed 3D model for your next investment.
        </p>
      `
    }
  };

  function openModal(serviceId) {
    const data = servicesData[serviceId];
    if (!data) return;

    modalTitle.innerHTML = `${data.title}<span class="accent-dot">.</span>`;
    modalBodyContent.innerHTML = data.body;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const serviceId = trigger.getAttribute('data-service');
      openModal(serviceId);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});

///Boton arriba
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Muestra u oculta el botón según la posición del scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    });

    // Desplazamiento suave al hacer clic
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});