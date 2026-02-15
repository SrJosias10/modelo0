window.addEventListener('load', () => {
    setTimeout(() => {
      const splash = document.getElementById('splash');
      const main = document.getElementById('mainContent');
      splash.classList.add('hidden');
      main.style.display = 'block';
    }, 2000); // 3.5 segundos (ajustalo según el video)
  });
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


  //////////////////// boton hamburguesa ////////////////////////

  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.getElementById('menu-links');
  
    menuToggle.addEventListener('click', () => {
      menuLinks.classList.toggle('show');
  
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  
    document.querySelectorAll('.linksmenu').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1000) {
          menuLinks.classList.remove('show');
          const icon = menuToggle.querySelector('i');
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
    
    // Cerrar menú al hacer clic en un enlace (en dispositivos móviles)
    const links = document.querySelectorAll('.linksmenu');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1000) {
                menuLinks.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});

// --- MODO OSCURO ---
const btnDarkMode = document.getElementById('dark-mode-toggle');
const iconDarkMode = btnDarkMode.querySelector('i');

btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Cambiar el icono según el modo
    if (document.body.classList.contains('dark-mode')) {
        iconDarkMode.classList.replace('fa-moon', 'fa-sun');
    } else {
        iconDarkMode.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- SCROLL HACIA ARRIBA ---
const btnScrollUp = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
    // Si bajamos más de 300px, mostramos el botón
    if (window.scrollY > 300) {
        btnScrollUp.classList.add('show');
    } else {
        btnScrollUp.classList.remove('show');
    }
});

btnScrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll suave
    });
});