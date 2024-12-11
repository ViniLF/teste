// Lista de títulos a serem exibidos e a variável que mantém o índice atual
const titles = ["Front-End", "JavaScript", "React", "Node.js", "PHP", "Python"];
let currentTitle = 0;
const titleElement = document.querySelector(".title");

// Função que digita o texto caractere por caractere
function typeText(text) {
    let index = 0;
    titleElement.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    titleElement.appendChild(cursor);

    let lastTime = 0;
    const typingSpeed = 100;  // Velocidade de digitação

    // Função recursiva que simula a digitação do texto
    function typeCharacter(timestamp) {
        if (timestamp - lastTime >= typingSpeed) {
            lastTime = timestamp;
            titleElement.textContent += text.charAt(index);
            index++;

            if (index < text.length) {
                requestAnimationFrame(typeCharacter);
            } else {
                setTimeout(() => eraseText(text), 2000);
            }
        } else {
            requestAnimationFrame(typeCharacter);
        }
    }

    requestAnimationFrame(typeCharacter);  // Inicia o efeito de digitação
}

// Função que apaga o texto
function eraseText(text) {
    let index = text.length;
    const eraseSpeed = 120;  // Velocidade de apagamento
    let lastTime = 0;

    // Função recursiva que apaga o texto caractere por caractere
    function eraseCharacter(timestamp) {
        if (timestamp - lastTime >= eraseSpeed) {
            lastTime = timestamp;
            titleElement.textContent = text.slice(0, index);
            index--;

            if (index >= 0) {
                requestAnimationFrame(eraseCharacter);
            } else {
                currentTitle = (currentTitle + 1) % titles.length;
                setTimeout(() => typeText(titles[currentTitle]), 500);
            }
        } else {
            requestAnimationFrame(eraseCharacter);
        }
    }

    requestAnimationFrame(eraseCharacter);
}

// Inicializa o efeito de digitação após o carregamento da página
window.onload = function() {
    setTimeout(() => typeText(titles[currentTitle]), 2000);  // Começa a digitar após 2 segundos
}

// Configura os efeitos de ScrollReveal para os elementos da página
document.addEventListener('DOMContentLoaded', function() {
    // Animações de Reveal para os elementos com diferentes delays
    ScrollReveal().reveal('.delay-slow', {
        origin: 'top',          // A animação começa de cima
        distance: '100px',      // Distância do movimento durante a animação
        duration: 1000,         // Duração de 1 segundo
        delay: 200,             // Delay de 1 segundo
        opacity: 0,             // Começa invisível
        scale: 0.9,             // Escala menor no início
        easing: 'ease-out',     // Suavização da animação
        reset: false,           // Não reinicia a animação
        once: true,             // A animação ocorre apenas uma vez
        viewFactor: 0.2         // A animação ocorre quando 20% do elemento estiver visível
    });

    ScrollReveal().reveal('.delay-medium', {
        origin: 'top',
        distance: '100px',
        duration: 700,
        delay: 200,
        opacity: 0,
        scale: 0.9,
        easing: 'ease-out',
        reset: false,
        once: true,
        viewFactor: 0.2
    });

    ScrollReveal().reveal('.delay-fast', {
        origin: 'top',
        distance: '100px',
        duration: 400,
        delay: 200,
        opacity: 0,
        scale: 0.9,
        easing: 'ease-out',
        reset: false,
        once: true,
        viewFactor: 0.2
    });

    // Aplicando ScrollReveal aos parágrafos com classes específicas
    ScrollReveal().reveal('.aboutme-p1, .aboutme-p2', {
        origin: 'top', 
        distance: '50px',
        duration: 700,
        delay: 200,
        opacity: 0,
        scale: 0.9,
        easing: 'ease-out',
        reset: false,
        once: true,
        viewFactor: 0.2
    });
});
