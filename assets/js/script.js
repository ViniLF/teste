const titles = ["Full-Stack", "JavaScript", "React", "Node.js", "PHP", "Python"];
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
    const aboutMeContent = document.querySelector('.aboutme-content');

    // Função para aplicar fade-in quando a seção entra na tela
    aboutMeContent.classList.add('fade-in');
});

// Função para detectar quando a seção entra na tela ao rolar
window.addEventListener('scroll', function() {
    const aboutMeSection = document.getElementById('aboutme');
    const aboutMeContent = document.querySelector('.aboutme-content');

    const sectionTop = aboutMeSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Verifica se a seção está visível na tela
    if (sectionTop < windowHeight - 100) {
        aboutMeContent.classList.add('fade-in'); // Ativa o efeito de fade-in
    }
});

// Função para mover o .aboutme-content com base no movimento do mouse
const aboutMeContent = document.querySelector('.aboutme-content');

// Movimentação ao passar o mouse dentro de .aboutme-content
aboutMeContent.addEventListener('mousemove', function(e) {
    const rect = aboutMeContent.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (offsetX - centerX) / centerX * 10;
    const moveY = (offsetY - centerY) / centerY * 10;

    aboutMeContent.style.transform = `translate(${moveX}px, ${moveY}px)`; // Aplica a transformação de movimento
});

// Resetando o movimento ao sair do .aboutme-content
aboutMeContent.addEventListener('mouseleave', function() {
    aboutMeContent.style.transform = 'translate(0, 0)'; // Volta para a posição inicial
});

// Função para aplicar o efeito hover com JS (opcional)
aboutMeContent.addEventListener('mouseenter', () => {
    aboutMeContent.style.transform = 'scale(1.05)';
    aboutMeContent.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    aboutMeContent.style.backgroundColor = 'var(--highlight-color)';
});

aboutMeContent.addEventListener('mouseleave', () => {
    aboutMeContent.style.transform = 'scale(1)';
    aboutMeContent.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    aboutMeContent.style.backgroundColor = 'var(--primary-bg)';
});

