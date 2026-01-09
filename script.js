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

    // Botones de contacto en la franja inferior
    const btnsContainer = document.createElement('div');
    btnsContainer.className = 'footer-action-buttons';

    // Botón WhatsApp
    const btnWhats = document.createElement('a');
    btnWhats.href = 'https://wa.me/5255531360398';
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
    btnTel1.href = 'tel:525588985614';
    btnTel1.className = 'btn btn-contacto';
    btnTel1.innerHTML = '<i class="fas fa-phone"></i>';
    btnsContainer.appendChild(btnTel1);

    // Botón Teléfono 2
    const btnTel2 = document.createElement('a');
    btnTel2.href = 'tel:525583051172';
    btnTel2.className = 'btn btn-contacto';
    btnTel2.innerHTML = '<i class="fas fa-phone"></i>';
    btnsContainer.appendChild(btnTel2);

    // Agregar los botones a la franja inferior
    // document.querySelector('.footer-pleca').appendChild(btnsContainer); // Eliminado porque ya no existe .footer-pleca

    // --- CARRUSEL DE VIDEOS DE YOUTUBE CON API OFICIAL ---
    const youtubeVideos = [
        { id: 'yUxKdSWLVXc', title: '1' },
        { id: 'of79FUoFAjs', title: '2' },
        { id: '_eIcJYVSl0I', title: '3' },
        { id: 'rupwv2W1Qec', title: '4' },
        { id: 'I8iyua0SUwM', title: '5' },
        { id: 'D9-gHvhsLkM', title: '6' },
        { id: 'BLxLy9OZ3vc', title: '7' },
        { id: 'J-YtggCoBLk', title: '8' },
        { id: 'MrSmFfBM3PY', title: '9' },
        { id: 'oSjFnKd6_L4', title: '10' },
        { id: 'kmQLQTEuQLQ', title: '11' },
        { id: 'zIqjjn63rhc', title: '12' },
        { id: 'IUswzkd88eA', title: '13' },
        { id: 'L-hQNLE0G1c', title: '14' },
        { id: 'iPpf1ZoGAkc', title: '15' },
        { id: 'RMmWnHbkhi4', title: '16' },
        { id: '2O_TqcfiAME', title: '17' },
        { id: '6sqYYVZtK_Q', title: '18' },
        { id: 'gayzuih0yKw', title: '19' },
        { id: 'wYVRdHii2CQ', title: '20' },
        { id: 'VfAGSePYy5U', title: '21' },
        { id: 'eWLWnASYgE0', title: '22' },
        { id: 'bzJoXJaNHMs', title: '23' },
        { id: 'ed60rcQHBEw', title: '24' },
        { id: 'PJBeIuoMXJk', title: '25' },
        { id: 'LeKAKJM5CkY', title: '26' },
        { id: 'wp86VdU3e1A', title: '27' },
        { id: 'JrM_lXvfnvg', title: '28' },
        { id: '9-iV9rN0qw8', title: '29' },
        { id: 'lD8sPCBVvus', title: '30' },
        { id: 'RSM9qE3S-U0', title: '31' },
        { id: '9zezqIAynr4', title: '32' },
        { id: '-T8Gio9Vot8', title: '33' },
        { id: 'uEECqvVKzl0', title: '34' },
        { id: '_h-V9Is6zJE', title: '35' },
        { id: 'nl_ZSFcBaXo', title: '36' },
        { id: 'B1oV8G_SAos', title: '37' },
        { id: 'ZB2QM5pwEkY', title: '38' },
        { id: 'UNGAXpPxeoI', title: '39' },
        { id: 'icnbVH7jKNI', title: '40' },
        { id: '7c7p9Yn-tBU', title: '41' },
        { id: '9QQgguWp1KQ', title: '42' },
        { id: 'oj5eNkvrRLE', title: '43' },
        { id: 'Ka53qsTfCAo', title: '44' },
        { id: 'CeW0qdYMCps', title: '45' },
        { id: '1uk5WELteac', title: '46' },
        { id: 'lOupeHzoBrQ', title: '47' },
        { id: 'A0b6_GeZaJw', title: '48' },
        { id: 'wYbo3g8WyJA', title: '49' },
        { id: 'K0nYhLyW4GA', title: '50' },
        { id: 'h0SSXTCEJ_c', title: '51' },
        { id: 'bKLu5_whBVE', title: '52' },
        { id: 'EuCTwcThFQE', title: '53' },
        { id: 'AiG-SmPUZMI', title: '54' },
        { id: 'SQxN8fyN1kU', title: '55' },
        { id: 'UQgG7Pd8LG0', title: '56' },
        { id: 'gpElkuaUjbc', title: '57' },
        { id: '-N13TU1bFyE', title: '58' },
        { id: 'BzQA5N7KMMI', title: '59' },
        { id: '1RV2YTPHqlU', title: '60' },
        { id: 'dIiAGu7Lg3s', title: '61' },
        { id: 'kdcLepZ2dCM', title: '62' },
        { id: 'BmgvJACpOJI', title: '63' },
        { id: 'oXNSeVCG0Wo', title: '64' },
        { id: 'Q891EUCdYoc', title: '65' },
        { id: 'KD2x1FvHEws', title: '66' },
        { id: 'XBQvaBkC5qQ', title: '67' },
        { id: '3usLDUdxF7s', title: '68' },
        { id: 'ig7bjiISGkM', title: '69' },
        { id: 'St0FMvj3cJk', title: '70' },
        { id: 'mz0xZJnavqQ', title: '71' },
        { id: '5mxJXv4-yIw', title: '72' },
        { id: 'QkZA0-2HCrQ', title: '73' },
        { id: 'Hw88vi9MUIQ', title: '74' },
        { id: 'sonitjZ2koI', title: '75' },
        { id: 'HP6M8QDgnyY', title: '76' },
        { id: '-cjFyMAc8SE', title: '77' },
        { id: 'tFdrzLHIZG4', title: '78' },
        { id: 'hXQyGHsjTdc', title: '79' },
        { id: 'c-lBVxGKViM', title: '80' },
        { id: 'JO6K74cPrxw', title: '81' },
        { id: 'oHeSo7uo4oM', title: '82' },
        { id: 'GQSmpxOhYVA', title: '83' },
        { id: 'dme5bWEa33k', title: '84' },
        { id: 'CBSYUgE0caA', title: '85' },
        { id: 'E2j6YmEDG04', title: '86' },
        { id: 'JfgR5KOECyc', title: '87' },
        { id: 'xlo4PvDS-ic', title: '88' },
        { id: 'KgeBn3d77wM', title: '89' }
    ];
    let currentVideoIndex = 0;
    let ytPlayer = null;

    function onYouTubeIframeAPIReady() {
        console.log('Iniciando reproductor con video:', youtubeVideos[currentVideoIndex].id);
        
        ytPlayer = new YT.Player('youtube-player', {
            height: '315',
            width: '560',
            videoId: youtubeVideos[currentVideoIndex].id,
            playerVars: { 
                rel: 0, 
                enablejsapi: 1,
                autoplay: 1
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });

        // Botones de navegación
        document.getElementById('prev-video').onclick = function() {
            console.log('Botón PREV clickeado. Video actual:', currentVideoIndex);
            currentVideoIndex = (currentVideoIndex - 1 + youtubeVideos.length) % youtubeVideos.length;
            console.log('Cargando video:', currentVideoIndex, youtubeVideos[currentVideoIndex].id);
            ytPlayer.loadVideoById(youtubeVideos[currentVideoIndex].id);
            updateTitle();
        };

        document.getElementById('next-video').onclick = function() {
            console.log('Botón NEXT clickeado. Video actual:', currentVideoIndex);
            currentVideoIndex = (currentVideoIndex + 1) % youtubeVideos.length;
            console.log('Cargando video:', currentVideoIndex, youtubeVideos[currentVideoIndex].id);
            ytPlayer.loadVideoById(youtubeVideos[currentVideoIndex].id);
            updateTitle();
        };
    }

    function onPlayerReady(event) {
        console.log('Reproductor listo. Reproduciendo video:', currentVideoIndex);
        event.target.playVideo();
        updateTitle();
    }

    function onPlayerStateChange(event) {
        console.log('Estado del reproductor cambiado:', event.data);
        
        // Cuando el video termina
        if (event.data === YT.PlayerState.ENDED) {
            console.log('Video terminado. Video actual:', currentVideoIndex);
            // Avanzar al siguiente video
            currentVideoIndex = (currentVideoIndex + 1) % youtubeVideos.length;
            console.log('Cargando siguiente video:', currentVideoIndex, youtubeVideos[currentVideoIndex].id);
            // Cargar y reproducir el siguiente video
            ytPlayer.loadVideoById(youtubeVideos[currentVideoIndex].id);
            updateTitle();
        }
    }

    function updateTitle() {
        const titleDiv = document.getElementById('video-title');
        if (titleDiv) {
            titleDiv.textContent = youtubeVideos[currentVideoIndex].title;
            console.log('Título actualizado:', youtubeVideos[currentVideoIndex].title);
        }
    }

    // Asegurarnos de que la API de YouTube esté cargada
    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    // Slider tipo carrusel portada (solo una imagen visible)
    const slides = document.querySelectorAll('#slider-carrusel-list .slider-carrusel-slide');
    if (slides.length > 0) {
        let current = 0;
        setInterval(() => {
            slides[current].style.opacity = 0;
            slides[current].style.zIndex = -1;
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].style.opacity = 1;
            slides[current].style.zIndex = 1;
            slides[current].classList.add('active');
        }, 5000);
    }

    // Modal personalizado para opinión de la presidenta
    const btnModal = document.getElementById('btn-opinion-presidenta');
    const modal = document.getElementById('modal-presidenta');
    const closeModal = document.getElementById('close-modal-presidenta');
    if (btnModal && modal && closeModal) {
        btnModal.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(function() {
                modal.style.display = 'flex';
                if (window.innerWidth <= 991) {
                  document.body.style.overflow = 'hidden';
                  document.documentElement.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'hidden';
                }
            }, 350);
        });
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            if (window.innerWidth <= 991) {
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
            } else {
              document.body.style.overflow = '';
            }
        });
        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-presidenta-backdrop')) {
                modal.style.display = 'none';
                if (window.innerWidth <= 991) {
                  document.body.style.overflow = '';
                  document.documentElement.style.overflow = '';
                } else {
                  document.body.style.overflow = '';
                }
            }
        });
    }
});