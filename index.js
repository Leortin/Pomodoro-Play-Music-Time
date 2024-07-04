document.addEventListener("DOMContentLoaded", function() {
    const buttonToggleMode = document.getElementById('toggle-mode');
    const htmlElement = document.documentElement;

    buttonToggleMode.addEventListener("click", function(event) {
        htmlElement.classList.toggle('light');
    });

    const seconds = document.querySelector('#seconds');
    const minutes = document.querySelector('#minutes');
    const buttonPlay = document.querySelector('.ph-play-circle');
    const buttonPause = document.querySelector('.ph-pause-circle');
    const buttonStop = document.querySelector('.ph-stop-circle');
    const musicButtons = document.querySelectorAll('[data-action="toggleMusic"]');
    const bgAudio = document.getElementById('bgAudio'); // Referência para o elemento de áudio
    let intervalo;
    let inicio = 60;
    let minutos = 25;
    let timerRunning = false;

    function startTimer() {
        intervalo = setInterval(function() {
            inicio--;

            if (inicio < 0) {
                minutos--;
                inicio = 59;
            }

            let segundosFormatados = inicio < 10 ? '0' + inicio : inicio;
            let minutosFormatados = minutos < 10 ? '0' + minutos : minutos;

            seconds.innerText = segundosFormatados;
            minutes.innerText = minutosFormatados;

            if (minutos === 0 && inicio === 0) {
                clearInterval(intervalo);
            }

        }, 1000);
    }

    buttonPlay.addEventListener("click", function(event) {
        if (!timerRunning) {
            timerRunning = true;
            document.getElementById('timer').classList.add('running');
            startTimer();
            bgAudio.play(); // Inicia a reprodução da música de fundo
        }
    });

    buttonPause.addEventListener("click", function(event) {
        if (timerRunning) {
            timerRunning = false;
            document.getElementById('timer').classList.remove('running');
            clearInterval(intervalo);
            bgAudio.pause(); // Pausa a reprodução da música de fundo
        }
    });

    buttonStop.addEventListener("click", function(event) {
        timerRunning = false;
        document.getElementById('timer').classList.remove('running');
        clearInterval(intervalo);
        inicio = 60;
        minutos = 25;
        seconds.innerText = '00';
        minutes.innerText = '25';
        bgAudio.pause(); // Pausa a reprodução da música de fundo
        bgAudio.currentTime = 0; // Reinicia a posição da música para o início
    });

    musicButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const musicIcon = button.querySelector('i');
            if (bgAudio.paused) {
                bgAudio.play();
                musicIcon.classList.remove('ph-speaker-none');
                musicIcon.classList.add('ph-speaker-high');
            } else {
                bgAudio.pause();
                musicIcon.classList.remove('ph-speaker-high');
                musicIcon.classList.add('ph-speaker-none');
            }
        });
    });
});
