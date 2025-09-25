/* ========================================
   PORTFOLIO WEB - JAVASCRIPT
   Funcionalidades interactivas y efectos
   ======================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVEGACIÓN MÓVIL
    // ========================================
    
    // Obtener elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animar las barras del hamburguesa
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Resetear animación de barras
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
    
    // ========================================
    // SCROLL SUAVE Y NAVEGACIÓN ACTIVA
    // ========================================
    
    // Función para scroll suave a secciones
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 70; // Compensar navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Función para actualizar enlace activo según scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                // Agregar clase activa al enlace actual
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar formulario
    function validateForm(formData) {
        const errors = [];
        
        // Validar nombre
        if (!formData.nombre.trim()) {
            errors.push('El nombre es requerido');
        } else if (formData.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        
        // Validar email
        if (!formData.email.trim()) {
            errors.push('El email es requerido');
        } else if (!isValidEmail(formData.email)) {
            errors.push('El email no tiene un formato válido');
        }
        
        // Validar mensaje
        if (!formData.mensaje.trim()) {
            errors.push('El mensaje es requerido');
        } else if (formData.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        return errors;
    }
    
    // Función para mostrar mensajes de error
    function showErrors(errors) {
        // Remover errores anteriores
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Mostrar nuevos errores
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #ff4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                padding: 0.5rem;
                background: #ffe6e6;
                border-radius: 4px;
                border-left: 3px solid #ff4444;
            `;
            errorDiv.textContent = error;
            contactForm.appendChild(errorDiv);
        });
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            color: #00aa44;
            font-size: 1rem;
            margin-top: 1rem;
            padding: 1rem;
            background: #e6ffe6;
            border-radius: 8px;
            border-left: 3px solid #00aa44;
            text-align: center;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ¡Mensaje enviado correctamente! Te contactaré pronto.
        `;
        contactForm.appendChild(successDiv);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Función para limpiar formulario
    function clearForm() {
        contactForm.reset();
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(message => message.remove());
    }
    
    // Event listener para el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío por defecto
            
            // Obtener datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Validar formulario
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                showErrors(errors);
                return;
            }
            
            // Simular envío del formulario
            console.log('Formulario enviado correctamente');
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showSuccess();
            
            // Limpiar formulario después de un breve delay
            setTimeout(clearForm, 2000);
        });
    }
    
    // ========================================
    // ANIMACIONES DE SCROLL
    // ========================================
    
    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-card, .project-card, .skill-progress');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
                
                // Animar barras de habilidades
                if (element.classList.contains('skill-progress')) {
                    const width = element.getAttribute('data-width');
                    element.style.width = width;
                }
            }
        });
    }
    
    // Event listener para scroll con throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(animateOnScroll, 10);
    });
    
    // Ejecutar animación inicial
    animateOnScroll();
    
    // ========================================
    // EFECTOS HOVER MEJORADOS
    // ========================================
    
    // Efecto de hover para tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de hover para botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // NAVEGACIÓN CON TECLADO
    // ========================================
    
    // Función para navegación con teclado
    document.addEventListener('keydown', function(e) {
        // Navegación con flechas arriba/abajo
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = ['inicio', 'experiencia', 'proyectos', 'contacto'];
            const currentSection = getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
            }
            
            smoothScroll(`#${sections[nextIndex]}`);
        }
        
        // Cerrar menú móvil con Escape
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Función para obtener la sección actual
    function getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                return section.getAttribute('id');
            }
        }
        return 'inicio';
    }
    
    // ========================================
    // EFECTOS DE TIPOGRAFÍA
    // ========================================
    
    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de escritura al título si está visible
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // ========================================
    // CARGAR IMÁGENES CON EFECTO FADE
    // ========================================
    
    // Función para cargar imágenes con efecto fade
    function loadImagesWithFade() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Solo aplicar fade si la imagen no está cargada
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
            } else {
                // Si la imagen ya está cargada, asegurar que sea visible
                img.style.opacity = '1';
            }
        });
    }
    
    // Ejecutar carga de imágenes después de un pequeño delay
    setTimeout(loadImagesWithFade, 100);
    
    // ========================================
    // INICIALIZACIÓN FINAL
    // ========================================
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido al portafolio de Oscar Alberto Santos Rojas!', 
                'color: #0066ff; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado con HTML5, CSS3 y JavaScript vanilla', 
                'color: #ff6600; font-size: 12px;');
    
    // Mostrar información de contacto en consola
    console.log('📧 Email: osalsa63@gmail.com');
    console.log('📱 Teléfono: +57 318 700 9246');
    console.log('🌐 Redes sociales disponibles en la sección de contacto');
    
    // Función para mostrar estadísticas de la página
    function showPageStats() {
        const stats = {
            secciones: document.querySelectorAll('section').length,
            enlaces: document.querySelectorAll('a').length,
            imagenes: document.querySelectorAll('img').length,
            formularios: document.querySelectorAll('form').length
        };
        
        console.log('📊 Estadísticas de la página:', stats);
    }
    
    // Mostrar estadísticas después de 2 segundos
    setTimeout(showPageStats, 2000);
    
    // ========================================
    // MANEJO DE ERRORES
    // ========================================
    
    // Función para manejar errores de JavaScript
    window.addEventListener('error', function(e) {
        console.error('Error en la página:', e.error);
        console.log('La página continuará funcionando normalmente');
    });
    
    // Función para manejar errores de recursos
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Error no manejado:', e.reason);
    });
    
    console.log('✅ JavaScript cargado correctamente');
    console.log('🚀 Todas las funcionalidades están activas');
});
