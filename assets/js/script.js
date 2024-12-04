// Inicialização do i18next com traduções
i18next.init({
    lng: 'en', // Idioma padrão
    resources: {
        en: {
            translation: {
                home: "Home",
                contact: "Contact",
                projects: "Projects",
                about: "About",
                projectsButton: "Projects",
                aboutButton: "About Me"
            }
        },
        pt: {
            translation: {
                home: "Início",
                contact: "Contato",
                projects: "Projetos",
                about: "Sobre",
                projectsButton: "Projetos",
                aboutButton: "Sobre Mim"
            }
        }
    }
}, function(err, t) {
    if (err) {
        console.error("Erro ao inicializar o i18next:", err);
    } else {
        console.log("i18next inicializado com sucesso");
        updateContent();  // Atualiza o conteúdo assim que o i18next for inicializado
    }
});

// Função para atualizar o conteúdo com base na tradução
function updateContent() {
    const links = {
        home: 'home',
        contact: 'contact',
        projects: 'projects',
        about: 'about',
        projectsButton: 'projectsButton',
        aboutButton: 'aboutButton'
    };

    // Atualiza o texto de todos os elementos com as chaves de tradução
    Object.keys(links).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.innerText = i18next.t(links[key]);
        }

        // Atualizando os botões de "Projects" e "About Me"
        const projectButton = document.querySelector('.project');
        const aboutButton = document.querySelector('.aboutme');

        if (projectButton) {
            projectButton.innerText = i18next.t('projectsButton');
        }

        if (aboutButton) {
            aboutButton.innerText = i18next.t('aboutButton');
        }
    });
}

// Função para mudar o idioma
function changeLanguage(lng) {
    console.log("Mudando idioma para:", lng);
    i18next.changeLanguage(lng, function(err, t) {
        if (err) {
            console.error("Erro ao mudar idioma:", err);
        } else {
            console.log("Idioma mudado para:", lng);
            updateContent();
            updateLanguageButton(lng);
        }
    });
}

// Função para atualizar o botão de idioma ativo
function updateLanguageButton(lng) {
    document.querySelectorAll('.language-container button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = lng === 'en' ? '.language-container .english' : '.language-container .portuguese';
    document.querySelector(activeButton).classList.add('active');
}

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
