// Inicialização do i18next com traduções
i18next.init({
    lng: 'en', // Idioma padrão
    resources: {
        en: {
            translation: {
                home: "Home",
                contact: "Contact",
                projects: "Projects",
                about: "About Me",
                projectsButton: "Projects",
                aboutButton: "About Me"
            }
        },
        pt: {
            translation: {
                home: "Início",
                contact: "Contato",
                projects: "Projetos",
                about: "Sobre Mim",
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

function updateContent() {
    const links = {
        home: 'home',
        contact: 'contact',
        projects: 'projects',
        about: 'about'
    };

    // Atualiza o texto de todos os links com as chaves de tradução
    Object.keys(links).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            // Atualiza apenas o texto dentro do link <a> (não altera estrutura interna)
            const linkText = i18next.t(links[key]);
            const anchor = element.querySelector('a');
            if (anchor) {
                anchor.innerText = linkText; // Atualiza o texto dentro do <a>
            }
        }
    });

    // Re-aplica os listeners de clique (se necessário)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Lógica para o clique no link
            console.log('Link clicado:', e.target);
        });
    });

    // Atualiza os botões de "Projects" e "About Me"
    const projectButton = document.querySelector('.project-button');
    const aboutButton = document.querySelector('.aboutme-button');

    if (projectButton) {
        projectButton.textContent = i18next.t('projectsButton');
    }

    if (aboutButton) {
        aboutButton.textContent = i18next.t('aboutButton');
    }
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
