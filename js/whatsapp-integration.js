// Función para verificar disponibilidad de productos
function verificarDisponibilidad() {
    // Esta función podría integrarse con un sistema de inventario
    // Por ahora, solo simularemos la disponibilidad con datos locales

    // Verificar cada producto en el catálogo
    productos.forEach(producto => {
        // Simulamos una verificación - en un entorno real esto vendría de una API o base de datos
        const disponible = Math.random() > 0.2; // 80% de probabilidad de estar disponible

        // Obtener los elementos del producto
        const productoElements = document.querySelectorAll(`.producto[data-id="${producto.id}"]`);

        productoElements.forEach(element => {
            // Actualizar la UI según disponibilidad
            if (!disponible) {
                // Si no está disponible, añadir una etiqueta
                const badge = document.createElement('div');
                badge.classList.add('producto-badge', 'agotado');
                badge.innerText = 'Agotado';

                // Añadir al elemento del producto
                element.querySelector('.producto-img').appendChild(badge);

                // Modificar el botón para consultar disponibilidad
                const btnWhatsapp = element.querySelector('.btn-whatsapp');
                btnWhatsapp.innerHTML = '<i class="fab fa-whatsapp"></i> Preguntar disponibilidad';
                btnWhatsapp.href = generarEnlaceWhatsAppDisponibilidad(producto);
            } else {
                // Si está disponible, mostrar etiqueta de stock
                const badge = document.createElement('div');
                badge.classList.add('producto-badge', 'disponible');
                badge.innerText = 'En stock';

                // Añadir al elemento del producto
                element.querySelector('.producto-img').appendChild(badge);
            }
        });
    });
}

// Generar enlace para consultar disponibilidad
function generarEnlaceWhatsAppDisponibilidad(producto) {
    const numeroWhatsApp = "34XXXXXXXXX"; // Reemplazar con tu número de WhatsApp
    const mensaje = `Hola, me gustaría saber cuándo estará disponible el producto: ${producto.nombre}. ¿Tienen alguna fecha estimada de reposición?`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

// Función para integrar con WhatsApp Business API (para futuras implementaciones)
function prepararWhatsAppBusiness() {
    // Esta es una función de ejemplo para mostrar cómo se podría integrar con WhatsApp Business API
    // Para implementarla, necesitarías una cuenta de WhatsApp Business API y seguir su documentación

    console.log('Preparando integración con WhatsApp Business API');

    // Ejemplo de cómo sería manejar un catálogo de WhatsApp Business
    function sincronizarCatalogoWhatsApp() {
        // Código para sincronizar productos con catálogo de WhatsApp Business
        console.log('Simulando sincronización con catálogo de WhatsApp Business');
    }

    // Esta función podría ejecutarse periódicamente o cuando se actualicen productos
    // sincronizarCatalogoWhatsApp();
}
