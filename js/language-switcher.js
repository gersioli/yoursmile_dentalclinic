document.addEventListener('DOMContentLoaded', function () {
    const langElements = document.querySelectorAll('[data-lang]');
    const currentLang = localStorage.getItem('language') || 'en';

    function loadLanguage(lang) {
        fetch(`lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load language file: ${lang}.json`);
                }
                return response.json();
            })
            .then(data => {
                document.querySelectorAll('[data-translate]').forEach(element => {
                    const key = element.getAttribute('data-translate');
                    element.textContent = data[key];
                });
            })
            .catch(error => {
                console.error('Error loading language:', error);
            });
    }

    langElements.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            localStorage.setItem('language', selectedLang);
            loadLanguage(selectedLang);
        });
    });

    loadLanguage(currentLang);
});