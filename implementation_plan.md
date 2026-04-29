# Actualización Premium Cromatic Brand

Este plan detalla las modificaciones necesarias para transformar el prototipo en una tienda funcional y con estética premium.

## ⚠️ User Review Required

Por favor, revisa el plan a continuación. Una vez lo apruebes, procederé a implementarlo todo automáticamente. He dejado algunas preguntas para ti en la siguiente sección.

## ❓ Open Questions

1. **Limitación Técnica del "Bloc de Notas":** Como tu página está programada en HTML/JS puro y alojada en Vercel (un servidor en la nube), el código del lado del cliente (el navegador de tus clientes) **no puede crear ni escribir archivos directamente en tu computadora** por seguridad. Si un cliente en su celular llena el formulario, Vercel no tiene forma de guardar eso en un archivo TXT que quede en tu carpeta local.
   * *¿Cómo prefieres solucionarlo? Te doy las 2 mejores opciones:*
     - **Opción A (Recomendada y Rápida):** Que al hacer clic en "Obtener Descuento", los datos se te envíen directamente a tu WhatsApp (el mismo `+573128917257`) con un mensaje automático.
     - **Opción B (Por Correo):** Conectar el formulario a un servicio gratuito como *Formspree*, que te envía un correo electrónico cada vez que alguien se registra, creando así tu base de datos en tu email.

## Proposed Changes

---

### UI / UX (Animaciones y Experiencia)

- **Pantalla de Carga (Loader) y Popup de Descuento:**
  - **[MODIFY]** `index.html`: Agregar bloque HTML del loader al principio del `<body>` y el modal (popup) del descuento del 15%.
  - **[MODIFY]** `assets/css/styles.css`: CSS para la animación del loader y el diseño del popup (formulario, botón de cerrar "X").
  - **[MODIFY]** `assets/js/main.js`: Lógica para desaparecer el loader tras 1 segundo y acto seguido, mostrar el popup del descuento. Manejar el cierre del popup para que no vuelva a aparecer en la misma sesión.

- **Animaciones al hacer Scroll (Fade In):**
  - **[MODIFY]** `assets/css/styles.css`: Clases `.fade-in` (opacidad 0, movidas hacia abajo) y `.visible` (opacidad 1, posición original).
  - **[MODIFY]** `assets/js/main.js`: Usar `IntersectionObserver` para añadir la clase `.visible` a medida que el usuario baja.
  - **[MODIFY]** Todos los HTML: Añadir clase `.fade-in` a las secciones principales.

- **Cinta de Anuncios (Marquee):**
  - **[MODIFY]** `index.html` y `productos.html`: Añadir banner animado en la parte superior del `<header>` con promociones (ej. "ENVÍOS GRATIS A TODO EL PAÍS").

---

### Funcionalidad E-Commerce Core

- **Selección de Tallas:**
  - **[MODIFY]** `index.html` y `productos.html`: Agregar botones de talla (S, M, L, XL) en las tarjetas de producto.
  - **[MODIFY]** `assets/js/main.js`: Actualizar la lógica de añadir al carrito para que el ID del carrito sea único por talla (Ej: `1-M` vs `1-L`).

- **Página de Detalle de Producto:**
  - **[NEW]** `producto-detalles.html`: Plantilla en blanco con diseño enfocado al producto, mostrando su información técnica (composición, cuidado).
  - **[MODIFY]** `assets/js/main.js`: Función para leer el parámetro de la URL (ej. `?id=1`) y pintar la foto, nombre y precio dinámicamente usando una base de datos local (JSON o Array en JS).

---

### Checkout vía WhatsApp

- **Integración de API de WhatsApp:**
  - **[MODIFY]** `checkout.html`: Reemplazar el formulario de tarjeta de crédito (simulado) por un formulario de datos de envío simple. 
  - **[MODIFY]** `assets/js/main.js`: Función que tome los productos del carrito (ej. "1 Camiseta Own Frame - Talla L - $210.000 COP"), el total y los datos de envío, construya un texto formateado y redirija al usuario al API de WhatsApp: `wa.me/573128917257?text=...`.

---

### Marketing y Confianza

- **Lookbook / Galería:**
  - **[MODIFY]** `index.html`: Agregar nueva sección de cuadrícula de imágenes usando las fotos (2001, 2002, 2003, 2004, 2005) suministradas desde la carpeta `Imagenes cromatic`.
  - **[MODIFY]** `assets/css/styles.css`: Diseño CSS grid para acomodar imágenes de varios tamaños de forma elegante.

- **Etiquetas SEO (Open Graph):**
  - **[MODIFY]** Todos los archivos `.html`: Insertar `<meta property="og:image" content="...">` para optimizar cómo se ven los enlaces al compartirse en redes sociales.

## Verification Plan

- Navegar por la web localmente simulando ser un usuario.
- Añadir productos de diferentes tallas al carrito y asegurar que no se sobreescriban entre sí.
- Ir al carrito, proceder al checkout y verificar que el enlace de WhatsApp se genere correctamente con el número de teléfono brindado (`+573128917257`) y el resumen del pedido.
- Comprobar visualmente las animaciones y el loader.
