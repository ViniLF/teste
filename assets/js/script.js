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
    // Configura o ScrollReveal para aplicar animações a todas as seções, exceto a home
    ScrollReveal().reveal('section:not(.home) *', {
        origin: 'left',       // A animação vai começar a partir da esquerda
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

    // Se você quiser customizar para elementos específicos dentro de uma seção:
    ScrollReveal().reveal('.aboutme-content', {
        origin: 'right',      // A animação vai começar a partir da direita
        distance: '100px',
        duration: 1000,
        delay: 300,
        opacity: 0,
        scale: 0.9,
        easing: 'ease-out',
        reset: false,
        once: true,
        viewFactor: 0.2
    });

    // Função de movimento de mouse (efeito parallax) que você já tem
    const aboutMeContent = document.querySelector('.aboutme-content');
    aboutMeContent.addEventListener('mousemove', function(e) {
        const rect = aboutMeContent.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (offsetX - centerX) / centerX * 10;
        const moveY = (offsetY - centerY) / centerY * 10;

        aboutMeContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    aboutMeContent.addEventListener('mouseleave', function() {
        aboutMeContent.style.transform = 'translate(0, 0)';
    });
});
