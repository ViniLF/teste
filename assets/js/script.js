// Inicialização do i18next com traduções
i18next.init({
    lng: 'en', // Idioma padrão
    resources: {
        en: {
            translation: {
                home: "Home",
                contact: "Contact",
                projects: "Projects",
                about: "About"
            }
        },
        pt: {
            translation: {
                home: "Início",
                contact: "Contato",
                projects: "Projetos",
                about: "Sobre"
            }
        }
    }
}, function(err, t) {
    if (err) {
        console.error("Erro ao inicializar o i18next:", err);
    } else {
        console.log("i18next inicializado com sucesso");
        updateContent();
    }
});

function updateContent() {
    const links = {
        home: 'home',
        contact: 'contact',
        projects: 'projects',
        about: 'about'
    };

    Object.keys(links).forEach(key => {
        document.getElementById(key).querySelector('a').innerText = i18next.t(links[key]);
    });
}

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

function updateLanguageButton(lng) {

    document.querySelectorAll('.language-container button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = lng === 'en' ? '.language-container .english' : '.language-container .portuguese';
    document.querySelector(activeButton).classList.add('active');
}


const titles = ["Full-Stack", "JavaScript", "React", "Node.js", "Front-end", "Back-end"];
let currentTitle = 0;
const titleElement = document.querySelector(".title");

function typeText(text) {
    let index = 0;
    titleElement.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    titleElement.appendChild(cursor);

    const interval = setInterval(() => {
        titleElement.textContent += text.charAt(index);
        index++;

        if (index === text.length) {
            clearInterval(interval);
            setTimeout(() => eraseText(text), 2000);
        }
    }, 150);
}

function eraseText(text) {
    let index = text.length;

    const interval = setInterval(() => {
        titleElement.textContent = text.slice(0, index);
        index--;

        if (index < 0) {
            clearInterval(interval);
            currentTitle = (currentTitle + 1) % titles.length;
            setTimeout(() => typeText(titles[currentTitle]), 500);
        }
    }, 100);
}

window.onload = function() {
    setTimeout(() => typeText(titles[currentTitle]), 2000);
}
