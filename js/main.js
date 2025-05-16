// Función para cargar los productos en la página
function cargarProductos() {
    const productosContainer = document.getElementById('productos-container');

    // Limpiar el contenedor
    productosContainer.innerHTML = '';

    // Recorrer los productos y mostrarlos
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.setAttribute('data-id', producto.id);
        productoElement.setAttribute('data-categoria', producto.categoria);

        // Generar el enlace de WhatsApp con el mensaje pre-configurado para cada producto
        const whatsappLink = generarEnlaceWhatsApp(producto);

        // Generar la lista de características
        let caracteristicasHTML = '';
        if (producto.caracteristicas && producto.caracteristicas.length > 0) {
            caracteristicasHTML = '<ul class="producto-caracteristicas">';
            producto.caracteristicas.forEach(caracteristica => {
                caracteristicasHTML += `<li><i class="fas fa-check"></i> ${caracteristica}</li>`;
            });
            caracteristicasHTML += '</ul>';
        }

        // Generar etiqueta de popular si corresponde
        const popularBadge = producto.popular ? '<span class="badge-popular">Popular</span>' : '';

        productoElement.innerHTML = `
            <div class="producto-img">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/placeholder.jpg'">
                ${popularBadge}
            </div>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                <p class="producto-descripcion">${producto.descripcion}</p>
                ${caracteristicasHTML}
                <span class="producto-precio">€${producto.precio.toFixed(2)}</span>
                <div class="producto-acciones">
                    <a href="${whatsappLink}" class="btn btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> Consultar
                    </a>
                </div>
            </div>
        `;

        productosContainer.appendChild(productoElement);
    });
}

// Función para generar el enlace de WhatsApp con un mensaje predefinido
function generarEnlaceWhatsApp(producto) {
    const numeroWhatsApp = "34XXXXXXXXX"; // Reemplazar con tu número de WhatsApp
    const mensaje = `Hola, estoy interesado en el producto: ${producto.nombre} - €${producto.precio.toFixed(2)}. ¿Me puedes dar más información?`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

// Datos de ofertas especiales
const ofertas = [
    {
        id: 1,
        titulo: "¡Oferta de lanzamiento!",
        descripcion: "20% de descuento en tu primer vaper",
        codigo: "NUEVO20"
    },
    {
        id: 2,
        titulo: "Pack Completo",
        descripcion: "Vaper + 3 líquidos + accesorios con 15% de descuento",
        codigo: "PACK15"
    },
    {
        id: 3,
        titulo: "Envío gratuito",
        descripcion: "En pedidos superiores a €50",
        codigo: "ENVIOGRATIS"
    }
];

// Función para mostrar ofertas en la sección principal
function mostrarOfertas() {
    const ofertasContainer = document.getElementById('ofertas-container');
    if (!ofertasContainer) return;

    ofertas.forEach(oferta => {
        const ofertaElement = document.createElement('div');
        ofertaElement.classList.add('oferta');

        const mensajeOferta = `Hola, me interesa la oferta: ${oferta.titulo} - Código: ${oferta.codigo}. ¿Me puedes dar más información?`;
        const whatsappLink = `https://wa.me/34XXXXXXXXX?text=${encodeURIComponent(mensajeOferta)}`;

        ofertaElement.innerHTML = `
            <h3>${oferta.titulo}</h3>
            <p>${oferta.descripcion}</p>
            <p class="codigo-oferta">Código: <strong>${oferta.codigo}</strong></p>
            <a href="${whatsappLink}" class="btn btn-whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i> Consultar oferta
            </a>
        `;

        ofertasContainer.appendChild(ofertaElement);
    });
}

// Función para seguimiento analítico de clics en WhatsApp
function registrarClicWhatsApp() {
    const botonesWhatsApp = document.querySelectorAll('.btn-whatsapp');

    botonesWhatsApp.forEach(boton => {
        boton.addEventListener('click', function () {
            // Aquí podrías implementar analytics para seguimiento
            console.log('Clic en botón de WhatsApp');

            // Si tienes Google Analytics u otra herramienta, aquí puedes añadir el código
            // Por ejemplo:
            // gtag('event', 'whatsapp_click', {
            //     'event_category': 'engagement',
            //     'event_label': this.closest('.producto') ? 'producto' : 'general'
            // });
        });
    });
}

// Función para personalizar mensajes según categoría de producto
function personalizarMensajesWhatsApp() {
    // Implementa lógica adicional para mensajes personalizados si es necesario
}

// Función para manejar el menú hamburguesa en dispositivos móviles
function manejarMenuHamburguesa() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            this.classList.toggle('active'); // Para aplicar los estilos visuales del botón activo

            // Prevenir scroll cuando el menú está abierto en móvil
            if (window.innerWidth <= 768) {
                if (mainNav.classList.contains('active')) {
                    body.style.overflow = 'hidden'; // Prevenir scroll
                } else {
                    body.style.overflow = ''; // Restaurar scroll
                }
            }

            // Cambiar icono entre hamburguesa y X con animación
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Animar la transición
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Restaurar
                icon.style.transform = 'rotate(0)';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mainNav.classList.remove('active');

                // Restaurar icono hamburguesa
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Función para ajustar el layout basado en el tamaño de la pantalla
function ajustarLayoutMobile() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Elementos a ajustar
    const productosGrid = document.querySelector('.productos-grid');
    const ofertasGrid = document.querySelector('.ofertas-grid');

    if (isMobile) {
        // Ajustes específicos para móviles
        if (productosGrid) {
            // Mostrar solo 3 productos inicialmente en móvil
            const productos = productosGrid.querySelectorAll('.producto');
            if (productos.length > 3) {
                for (let i = 3; i < productos.length; i++) {
                    productos[i].style.display = 'none';
                }

                // Añadir botón "Ver más"
                if (!document.getElementById('ver-mas-productos')) {
                    const verMasBtn = document.createElement('button');
                    verMasBtn.id = 'ver-mas-productos';
                    verMasBtn.className = 'btn';
                    verMasBtn.textContent = 'Ver más productos';
                    verMasBtn.addEventListener('click', function () {
                        productos.forEach(producto => {
                            producto.style.display = 'block';
                        });
                        this.style.display = 'none';
                    });

                    productosGrid.parentNode.appendChild(verMasBtn);
                }
            }
        }
    } else {
        // Restaurar estado para escritorio
        if (productosGrid) {
            const productos = productosGrid.querySelectorAll('.producto');
            productos.forEach(producto => {
                producto.style.display = 'block';
            });

            const verMasBtn = document.getElementById('ver-mas-productos');
            if (verMasBtn) {
                verMasBtn.style.display = 'none';
            }
        }
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Cargar los productos
    cargarProductos();

    // Mostrar ofertas especiales
    mostrarOfertas();

    // Verificar disponibilidad de productos
    verificarDisponibilidad();

    // Añadir seguimiento de clics en WhatsApp
    registrarClicWhatsApp();

    // Manejar el menú hamburguesa
    manejarMenuHamburguesa();

    // Ajustar layout para móviles
    ajustarLayoutMobile();

    // Mejorar experiencia móvil con cierre de menú al hacer click en links
    mejorarExperienciaMovil();

    // Detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', ajustarLayoutMobile);

    // Desplazamiento suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Añadir mensajes personalizados para cada categoría de producto
    personalizarMensajesWhatsApp();
});

// Función para mejorar la experiencia en dispositivos móviles
function mejorarExperienciaMovil() {
    // Cerrar menú al hacer clic en enlaces de navegación
    const navLinks = document.querySelectorAll('#main-nav a');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Mejorar comportamiento del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // Lazy loading para imágenes en móvil
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // Añadir efecto de scroll suave para toda la página en dispositivos móviles
    if (window.innerWidth <= 768) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}
