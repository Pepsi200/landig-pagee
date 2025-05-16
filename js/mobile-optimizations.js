// Optimizaciones para mejorar la experiencia en dispositivos móviles
// Este archivo contiene funciones específicas para optimizar la experiencia en móviles

// Función para optimizar imágenes en dispositivos móviles
function optimizarImagenesMobile() {
    // Si estamos en un dispositivo móvil
    if (window.innerWidth <= 768) {
        const imagenes = document.querySelectorAll('img:not([data-optimized])');
        
        imagenes.forEach(img => {
            // Marcar como optimizada para no procesarla múltiples veces
            img.setAttribute('data-optimized', 'true');
            
            // Aplicar carga lazy para todas las imágenes
            img.setAttribute('loading', 'lazy');
            
            // Añadir evento para mostrar animación al cargar
            img.addEventListener('load', function() {
                this.classList.add('img-loaded');
            });
            
            // Añadir clase para efectos de entrada
            img.classList.add('mobile-img');
        });
    }
}

// Función para mejorar el scroll en dispositivos móviles
function mejorarScrollMobile() {
    // Detectar elementos que entran en la vista
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparece');
                observer.unobserve(entry.target); // Dejar de observar después de que se haya mostrado
            }
        });
    }, observerOptions);
    
    // Observar productos, secciones y otros elementos importantes
    const elementos = document.querySelectorAll('.producto, .oferta, .section-title, .hero-content, .contacto-metodo');
    elementos.forEach(el => {
        el.classList.add('animado');
        observer.observe(el);
    });
}

// Inicializar optimizaciones cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si es un dispositivo móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        optimizarImagenesMobile();
        mejorarScrollMobile();
        
        // Añadir clase al body para aplicar estilos específicos de móvil
        document.body.classList.add('mobile-device');
    }
    
    // Actualizar optimizaciones cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            optimizarImagenesMobile();
        } else {
            document.body.classList.remove('mobile-device');
        }
    });
});

// Función para verificar la disponibilidad de productos
function verificarDisponibilidad() {
    // Esta función se puede usar para chequear disponibilidad en tiempo real
    // por ejemplo, conectándose a un API o base de datos
    console.log('Verificando disponibilidad de productos...');
}
