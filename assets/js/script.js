const titles = ["Front-End", "JavaScript", "React", "Node.js", "PHP", "Python"];
let currentTitle = 0;
const titleElement = document.querySelector(".title");

function typeText(text) {
    let index = 0;
    titleElement.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    titleElement.appendChild(cursor);

    let lastTime = 0; 
    const typingSpeed = 100;

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

    requestAnimationFrame(typeCharacter);
}

function eraseText(text) {
    let index = text.length;
    const eraseSpeed = 120; 
    let lastTime = 0;

    function eraseCharacter(timestamp) {
        if (timestamp - lastTime >= eraseSpeed) {
            lastTime = timestamp;
            titleElement.textContent = text.slice(0, index);
            index--;

            if (index >= 0) {
                requestAnimationFrame(eraseCharacter);
            } else {
                // Atualiza o índice de currentTitle para o próximo título na lista
                currentTitle = (currentTitle + 1) % titles.length;
                setTimeout(() => typeText(titles[currentTitle]), 500);
            }
        } else {
            requestAnimationFrame(eraseCharacter);
        }
    }

    requestAnimationFrame(eraseCharacter);
}

// Inicia o efeito de digitação ao carregar a página
window.onload = function() {
    setTimeout(() => typeText(titles[currentTitle]), 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Configura o ScrollReveal para aplicar animações a todas as seções, exceto a home e a aboutme-container
    ScrollReveal().reveal('section:not(.home) *:not(.aboutme-container) *', {
        origin: 'top',       // A animação vai começar a partir de cima
        distance: '100px',    // A distância que o elemento vai percorrer durante a animação
        duration: 1000,       // Duração da animação em milissegundos
        delay: 200,           // Delay antes da animação começar
        opacity: 0,           // Inicia invisível e vai até 100% de opacidade
        scale: 0.9,           // Começa com uma escala menor
        easing: 'ease-out',   // Suavização do movimento
        reset: false,         // Não reinicia a animação
        once: true,           // A animação acontece apenas uma vez
        viewFactor: 0.2       // A animação ocorre quando 20% do elemento estiver visível
    });

    // Animação para a aboutme-container e todos os seus filhos, exceto a própria container
    ScrollReveal().reveal('.aboutme-container *', {
        origin: 'left',       // A animação vai começar a partir de cima
        distance: '40px',    // A distância que o elemento vai percorrer durante a animação
        duration: 1000,       // Duração da animação em milissegundos
        delay: 300,           // Delay antes da animação começar
        opacity: 0,           // Inicia invisível e vai até 100% de opacidade
        scale: 0.9,           // Começa com uma escala menor
        easing: 'ease-out',   // Suavização do movimento
        reset: false,         // Não reinicia a animação
        once: true,           // A animação acontece apenas uma vez
        viewFactor: 0.2       // A animação ocorre quando 20% do elemento estiver visível
    });

    // Animação para os títulos dentro da seção 'aboutme' e 'experience'
    ScrollReveal().reveal('h1.aboutme-title, h1.experience-title', {
        origin: 'left',     // A animação vai começar a partir de baixo
        distance: '20px',     // Distância do movimento durante a animação
        duration: 800,        // Duração da animação
        delay: 500,           // Delay para começar a animação
        opacity: 0,           // Começa invisível
        scale: 1,             // Escala normal (sem diminuição)
        easing: 'ease-out',   // Suavização do movimento
        reset: false,         // Não reinicia a animação
        once: true,           // A animação acontece apenas uma vez
        viewFactor: 0.2       // A animação ocorre quando 20% do elemento estiver visível
    });
});

