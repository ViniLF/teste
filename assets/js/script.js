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
    const aboutMeSection = document.getElementById('aboutme');
  
    // Função para aplicar fade-in quando a seção entra na tela
    function checkVisibility(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutMeContent.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing after fade-in
            }
        });
    }

    // Utilizando Intersection Observer para melhorar a performance de visibilidade
    const observer = new IntersectionObserver(checkVisibility, {
        threshold: 0.1, // A seção será observada quando 10% dela estiver visível
    });
    observer.observe(aboutMeSection); // Inicia a observação

    // Função para movimentação do mouse (efeito parallax)
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
});

document.addEventListener('scroll', function() {
    const homeSection = document.querySelector('.home');
    const aboutMeSection = document.querySelector('.aboutme');
    
    const homeSectionBottom = homeSection.getBoundingClientRect().bottom;
    const aboutMeSectionTop = aboutMeSection.getBoundingClientRect().top;

    // Adiciona sombra na parte inferior da Home
    if (homeSectionBottom < window.innerHeight) {
        homeSection.classList.add('with-bottom-shadow');
    } else {
        homeSection.classList.remove('with-bottom-shadow');
    }

    // Adiciona sombra no topo da About Me
    if (aboutMeSectionTop < window.innerHeight) {
        aboutMeSection.classList.add('with-top-shadow');
    } else {
        aboutMeSection.classList.remove('with-top-shadow');
    }
});
