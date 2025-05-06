document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const numero = document.getElementById('numero').value;
            
            // Crear el cuerpo del correo
            const mailtoLink = `mailto:iniciar@atencion-aclientes-avif.org?subject=Nuevo contacto&body=Nombre: ${nombre}%0ANúmero: ${numero}`;
            
            // Abrir el cliente de correo
            window.location.href = mailtoLink;
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Mostrar mensaje de éxito
            alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');
        });
    }

    // --- APARTADO TESTIMONIOS ---
// Lista de videos obtenida de la carpeta TESTIMONIOS (solo los que existen realmente)
const videos = [
  "135.mp4", "134.mp4", "133.mp4", "132.mp4", "131.mp4", "130.mp4", "129.mp4", "128.mp4", "127.mp4", "126.mp4", "125.mp4", "124.mp4", "123.mp4", "122.mp4", "121.mp4", "120.mp4", "119.mp4", "118.mp4", "117.mp4", "116.mp4", "115.mp4", "114.mp4", "113.mp4", "112.mp4", "111.mp4", "110.mp4", "109.mp4", "108.mp4", "107.mp4", "106.mp4", "105.mp4", "104.mp4", "103.mp4", "102.mp4", "101.mp4", "100.mp4", "99.mp4", "98.mp4", "97.mp4", "96.mp4", "95.mp4", "94.mp4", "93.mp4", "92.mp4", "91.mp4", "90.mp4", "89.mp4", "88.mp4", "87.mp4", "86.mp4", "85.mp4", "84.mp4", "83.mp4", "82.mp4", "81.mp4", "80.mp4", "79.mp4", "78.mp4", "77.mp4", "76.mp4", "75.mp4", "74.mp4", "73.mp4", "72.mp4", "71.mp4", "70.mp4", "69.mp4", "68.mp4", "67.mp4", "66.mp4", "65.mp4", "64.mp4", "63.mp4", "62.mp4", "61.mp4", "60.mp4", "59.mp4", "58.mp4", "57.mp4", "56.mp4", "55.mp4", "54.mp4", "53.mp4", "52.mp4", "51.mp4", "50.mp4", "49.mp4", "48.mp4", "47.mp4", "46.mp4", "45.mp4", "44.mp4", "43.mp4", "42.mp4", "41.mp4", "40.mp4", "39.mp4", "38.mp4", "37.mp4", "36.mp4", "35.mp4", "34.mp4", "33.mp4", "32.mp4", "31.mp4", "30.mp4", "29.mp4", "28.mp4", "27.mp4", "26.mp4", "25.mp4", "24.mp4", "23.mp4", "22.mp4", "21.mp4", "20.mp4", "19.mp4", "18.mp4", "17.mp4", "16.mp4", "15.mp4", "14.mp4", "13.mp4", "12.mp4", "11.mp4", "10.mp4", "09.mp4", "08.mp4", "07.mp4", "06.mp4", "05.mp4", "04.mp4", "03.mp4", "02.mp4"
];
    // Filtrar solo los videos que realmente existen en la carpeta TESTIMONIOS
    // (En este caso, la lista ya corresponde a los archivos reales)

    // Botones de contacto en la franja inferior
    const btnsContainer = document.createElement('div');
    btnsContainer.className = 'footer-action-buttons';

    // Botón WhatsApp
    const btnWhats = document.createElement('a');
    btnWhats.href = 'https://wa.me/5215516181754';
    btnWhats.target = '_blank';
    btnWhats.className = 'btn btn-contacto';
    btnWhats.innerHTML = '<i class="fab fa-whatsapp"></i>';
    btnsContainer.appendChild(btnWhats);

    // Botón Facebook
    const btnFb = document.createElement('a');
    btnFb.href = 'https://www.facebook.com/profile.php?id=61572689940132&locale=es_LA';
    btnFb.target = '_blank';
    btnFb.className = 'btn btn-contacto';
    btnFb.innerHTML = '<i class="fab fa-facebook-f"></i>';
    btnsContainer.appendChild(btnFb);

    // Botón Correo
    const btnMail = document.createElement('a');
    btnMail.href = 'mailto:iniciar@atencion-aclientes-avif.org';
    btnMail.className = 'btn btn-contacto';
    btnMail.innerHTML = '<i class="fas fa-envelope"></i>';
    btnsContainer.appendChild(btnMail);

    // Botón Teléfono 1
    const btnTel1 = document.createElement('a');
    btnTel1.href = 'tel:5588981856,,3220';
    btnTel1.className = 'btn btn-contacto';
    btnTel1.innerHTML = '<i class="fas fa-phone"></i> Ext 3220';
    btnsContainer.appendChild(btnTel1);

    // Botón Teléfono 2
    const btnTel2 = document.createElement('a');
    btnTel2.href = 'tel:5588981856,,3110';
    btnTel2.className = 'btn btn-contacto';
    btnTel2.innerHTML = '<i class="fas fa-phone"></i> Ext 3110';
    btnsContainer.appendChild(btnTel2);

    // Botón Teléfono 3
    const btnTel3 = document.createElement('a');
    btnTel3.href = 'tel:5588982905,,3120';
    btnTel3.className = 'btn btn-contacto';
    btnTel3.innerHTML = '<i class="fas fa-phone"></i> Ext 3120';
    btnsContainer.appendChild(btnTel3);

    // Agregar los botones a la franja inferior
    document.querySelector('.footer-pleca').appendChild(btnsContainer);

    // Renderizar los videos
    function renderVideos() {
        const videoContainer = document.getElementById('video-container');
        if (!videoContainer) return;
        videoContainer.innerHTML = '';
        videos.forEach((video, idx) => {
            // Extraer fechas del nombre del archivo (si existen)
            let fechaIzq = '', fechaDer = '';
            const match = video.match(/(\d{2}[.\-_]\d{2}[.\-_]\d{2,4})/g);
            if (match && match.length > 0) {
                fechaIzq = match[0];
                fechaDer = match.length > 1 ? match[1] : match[0];
            }
            // Portada personalizada: busca una imagen con el mismo nombre que el video en TESTIMONIOS (jpg o png)
            let poster = `assets/PORTADA.jpg`;
            const baseName = video.replace(/\.[^/.]+$/, "");
            if (fileExists(`TESTIMONIOS/${baseName}.jpg`)) {
                poster = `TESTIMONIOS/${baseName}.jpg`;
            } else if (fileExists(`TESTIMONIOS/${baseName}.png`)) {
                poster = `TESTIMONIOS/${baseName}.png`;
            }
            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'col-md-6 col-lg-4 mb-4';
            videoWrapper.innerHTML = `
                <div class=\"video-card\">
                    <div class=\"d-flex justify-content-between mb-2\">
                        <span class=\"fecha-izq\">${fechaIzq}</span>
                        <span class=\"fecha-der\">${fechaDer}</span>
                    </div>
                    <video controls preload="none" width="100%" poster="${poster}" controlsList="nodownload">
                        <source src="TESTIMONIOS/${video}" type="video/mp4">
                        Tu navegador no soporta la reproducción de video.
                    </video>
                </div>
            `;
            videoContainer.appendChild(videoWrapper);
        });
    }

    // Función para mover videos en modo borrador
    window.moverVideo = function(idx, dir) {
        if (!modoBorrador) return;
        const nuevoIdx = idx + dir;
        if (nuevoIdx < 0 || nuevoIdx >= videos.length) return;
        const temp = videos[idx];
        videos[idx] = videos[nuevoIdx];
        videos[nuevoIdx] = temp;
        renderVideos();
    };

    // Cargar videos cuando la página esté lista
    renderVideos();

    // --- CARRUSEL DE VIDEOS TESTIMONIALES ---
    function renderVideoCarousel() {
        const carousel = document.getElementById('video-carousel');
        if (!carousel) return;
        let current = 0;
        carousel.innerHTML = '';
        videos.forEach((video, idx) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.style.display = idx === 0 ? 'block' : 'none';
            let fechaIzq = '', fechaDer = '';
            const match = video.match(/(\d{2}[.\-_]\d{2}[.\-_]\d{2,4})/g);
            if (match && match.length > 0) {
                fechaIzq = match[0];
                fechaDer = match.length > 1 ? match[1] : match[0];
            }
            let poster = null;
            const baseName = video.replace(/\.[^/.]+$/, "");
            if (fileExists(`TESTIMONIOS/${baseName}.jpg`)) {
                poster = `TESTIMONIOS/${baseName}.jpg`;
            } else if (fileExists(`TESTIMONIOS/${baseName}.png`)) {
                poster = `TESTIMONIOS/${baseName}.png`;
            }
            let videoPoster = poster;
            if (!poster) {
                const canvas = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 360;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#611232';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.fillText('Testimonio AVIF', canvas.width/2, canvas.height/2);
                videoPoster = canvas.toDataURL('image/png');
            }
            videoCard.innerHTML = `
                <div class=\"d-flex justify-content-between mb-2\">\n                    <span class=\"fecha-izq\">${fechaIzq}</span>\n                    <span class=\"fecha-der\">${fechaDer}</span>\n                </div>\n                <video preload=\"none\" width=\"100%\" poster=\"${videoPoster}\" controlsList=\"nodownload\">\n                    <source src=\"TESTIMONIOS/${video}\" type=\"video/mp4\">\n                    Tu navegador no soporta la reproducción de video.\n                </video>\n            `;
            carousel.appendChild(videoCard);
        });
        // Navegación
        const cards = carousel.querySelectorAll('.video-card');
        function showCard(idx) {
            cards.forEach((c, i) => c.style.display = i === idx ? 'block' : 'none');
        }
        function pauseAll() {
            cards.forEach(card => {
                const v = card.querySelector('video');
                if (v) v.pause();
            });
        }
        document.getElementById('carousel-prev').onclick = function() {
            pauseAll();
            current = (current - 1 + cards.length) % cards.length;
            showCard(current);
        };
        document.getElementById('carousel-next').onclick = function() {
            pauseAll();
            current = (current + 1) % cards.length;
            showCard(current);
        };
        // Play/pause al hacer clic en el video, y mostrar controles solo al reproducir
        cards.forEach(card => {
            const video = card.querySelector('video');
            video.setAttribute('controls', 'controls');
            video.addEventListener('click', function(e) {
                // Solo alternar si el clic es directamente sobre el video (no controles)
                if (e.target !== video) return;
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
            video.addEventListener('play', function() {
                // Pausar otros videos
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherVideo = otherCard.querySelector('video');
                        if (otherVideo) {
                            otherVideo.pause();
                        }
                    }
                });
            });
        });
    }

    // Función para verificar si un archivo existe (solo para imágenes de portada)
    function fileExists(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status != 404;
    }

    // Llama las funciones al cargar
    renderVideos();
    renderVideoCarousel();

    // --- ANIMACIÓN DE LA ESFERA DE CARACTERES Y VIDEOS TESTIMONIALES ---
    function initGlobe() {
        const canvas = document.getElementById('globe');
        let ctx = canvas.getContext('2d');
        let width = canvas.width;
        let height = canvas.height;
        let rotation = 0;
        let thumbs = [];
        let animationId = null;
        // Esfera de caracteres (versión anterior)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const latSteps = 24;
        const lonSteps = 48;
        const charSize = 16;
        // Generar malla de caracteres fija
        const charGrid = [];
        for (let lat = 0; lat <= latSteps; lat++) {
            const row = [];
            for (let lon = 0; lon < lonSteps; lon++) {
                row.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            charGrid.push(row);
        }
        function stopAnimation() {
            if (window._globeAnimationId) {
                cancelAnimationFrame(window._globeAnimationId);
                window._globeAnimationId = null;
            }
        }
        function resizeCanvas() {
            stopAnimation();
            const container = canvas.parentElement;
            const size = Math.min(container.offsetWidth, container.offsetHeight);
            canvas.width = size;
            canvas.height = size;
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
            width = canvas.width;
            height = canvas.height;
            ctx = canvas.getContext('2d');
            thumbs.forEach(thumb => {
                const x = width/2 + thumb.radius * Math.cos(thumb.angle + rotation);
                const y = height/2 + thumb.radius * Math.sin(thumb.angle + rotation);
                thumb.element.style.left = (x - 40) + 'px';
                thumb.element.style.top = (y - 40) + 'px';
                thumb.radius = Math.min(width, height) * 0.35;
            });
            animationId = requestAnimationFrame(animate);
            window._globeAnimationId = animationId;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        function drawCharGlobe(rot) {
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width/2, height/2);
            for (let lat = 0; lat <= latSteps; lat++) {
                const theta = Math.PI * (lat / latSteps - 0.5);
                const y = Math.sin(theta);
                const r = Math.cos(theta);
                for (let lon = 0; lon < lonSteps; lon++) {
                    const phi = 2 * Math.PI * (lon / lonSteps) + rot;
                    const x = r * Math.cos(phi);
                    const z = r * Math.sin(phi);
                    const px = x * (width/2 - 30);
                    const py = y * (height/2 - 30);
                    const depth = 0.5 + 0.5 * z;
                    ctx.globalAlpha = 0.25 + 0.75 * depth;
                    ctx.font = `${charSize}px Arial`;
                    ctx.fillStyle = '#1976d2';
                    const char = charGrid[lat][lon];
                    ctx.fillText(char, px - charSize/2, py + charSize/2);
                }
            }
            ctx.restore();
        }
        function initThumbs() {
            const thumbsContainer = document.getElementById('globe-testimonial-thumbs');
            if (!thumbsContainer) return;
            thumbs.forEach(thumb => {
                if (thumb.element && thumb.element.parentNode) {
                    thumb.element.parentNode.removeChild(thumb.element);
                }
            });
            thumbs = [];
            thumbsContainer.innerHTML = '';
            // Usar los videos locales de la carpeta FLOTANTES
            let flotantes = [
                'FLOTANTES/126.mp4',
                'FLOTANTES/107.mp4',
                'FLOTANTES/108.mp4',
                'FLOTANTES/118.mp4',
                'FLOTANTES/103.mp4',
                'FLOTANTES/132.mp4',
                'FLOTANTES/96.mp4',
                'FLOTANTES/127.mp4',
                'FLOTANTES/111.mp4',
                'FLOTANTES/122.mp4',
                'FLOTANTES/125.mp4',
                'FLOTANTES/117.mp4'
            ];
            const shuffled = flotantes.slice().sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 12);
            const videoSize = 80; // px, igual que en CSS
            const radioSeguro = (Math.min(width, height) - videoSize) / 2 - 10; // margen de seguridad
            selected.forEach((src, i) => {
                const thumb = document.createElement('video');
                thumb.className = 'globe-thumb';
                thumb.src = src;
                thumb.muted = true;
                thumb.loop = true;
                thumb.autoplay = true;
                thumb.playsInline = true;
                thumb.setAttribute('tabindex', '-1');
                thumb.setAttribute('title', src);
                thumb.style.background = '#000';
                thumb.style.objectFit = 'cover';
                thumb.style.width = videoSize + 'px';
                thumb.style.height = videoSize + 'px';
                const angle = (2 * Math.PI * i) / selected.length;
                const x = width/2 + radioSeguro * Math.cos(angle) - videoSize/2;
                const y = height/2 + radioSeguro * Math.sin(angle) - videoSize/2;
                thumb.style.left = x + 'px';
                thumb.style.top = y + 'px';
                thumb.style.position = 'absolute';
                thumb.style.borderRadius = '12px';
                thumb.style.overflow = 'hidden';
                thumbsContainer.appendChild(thumb);
                thumbs.push({
                    element: thumb,
                    angle: angle,
                    radius: radioSeguro,
                    speed: 0.2 + Math.random() * 0.3
                });
            });
        }
        function animate() {
            rotation += 0.002;
            drawCharGlobe(rotation);
            const videoSize = 80;
            const radioSeguro = (Math.min(width, height) - videoSize) / 2 - 10;
            thumbs.forEach(thumb => {
                thumb.angle += thumb.speed * 0.01;
                thumb.radius = radioSeguro;
                const x = width/2 + thumb.radius * Math.cos(thumb.angle + rotation) - videoSize/2;
                const y = height/2 + thumb.radius * Math.sin(thumb.angle + rotation) - videoSize/2;
                thumb.element.style.left = x + 'px';
                thumb.element.style.top = y + 'px';
                const scale = 0.5 + Math.abs(Math.cos(thumb.angle + rotation)) * 0.5;
                thumb.element.style.transform = `scale(${scale})`;
                thumb.element.style.opacity = scale;
            });
            animationId = requestAnimationFrame(animate);
            window._globeAnimationId = animationId;
        }
        stopAnimation();
        initThumbs();
        animationId = requestAnimationFrame(animate);
        window._globeAnimationId = animationId;
    }

    // Inicializar la esfera cuando la página esté lista
    initGlobe();
});