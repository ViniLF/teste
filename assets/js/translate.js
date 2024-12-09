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
                aboutButton: "About Me",
                aboutmeTitle: "About Me",
                aboutmeP1: "Hi, I'm Vinícius – a web developer fueled by a passion for innovation and problem-solving. I craft responsive, intuitive websites that prioritize user experience and leverage the latest technologies to drive business growth.",
                aboutmeP2: "Outside of coding, I’m an avid traveler, family-oriented, and always looking to explore new places and ideas. My mission? To build websites that not only look great but deliver real results for businesses and users alike."
            }
        },
        pt: {
            translation: {
                home: "Início",
                contact: "Contato",
                projects: "Projetos",
                about: "Sobre Mim",
                projectsButton: "Projetos",
                aboutButton: "Sobre Mim",
                aboutmeTitle: "Sobre Mim",
                aboutmeP1: "Olá, sou Vinícius – um desenvolvedor web movido pela paixão por inovação e resolução de problemas. Eu crio sites responsivos e intuitivos que priorizam a experiência do usuário e alavancam as últimas tecnologias para impulsionar o crescimento dos negócios.",
                aboutmeP2: "Fora da codificação, sou um viajante ávido, voltado para a família e sempre procurando explorar novos lugares e ideias. Minha missão? Construir sites que não apenas tenham uma ótima aparência, mas que ofereçam resultados reais para empresas e usuários."
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
            const linkText = i18next.t(links[key]);
            const anchor = element.querySelector('a');
            if (anchor) {
                anchor.innerText = linkText; // Atualiza o texto dentro do <a>
            }
        }
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

    // Atualiza o título e os parágrafos da seção "About Me"
    const aboutTitle = document.querySelector('.aboutme-title');
    const aboutParagraph1 = document.querySelector('.aboutme-p1');
    const aboutParagraph2 = document.querySelector('.aboutme-p2');

    if (aboutTitle) {
        aboutTitle.textContent = i18next.t('aboutmeTitle');
    }

    if (aboutParagraph1) {
        aboutParagraph1.textContent = i18next.t('aboutmeP1');
    }

    if (aboutParagraph2) {
        aboutParagraph2.textContent = i18next.t('aboutmeP2');
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
