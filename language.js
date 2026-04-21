// wwwroot/js/language.js

const languageData = {
    ro: { flag: "https://flagcdn.com/20x15/md.png", code: "ro", cartTitle: "Coșul meu" },
    ru: { flag: "https://flagcdn.com/20x15/ru.png", code: "rus", cartTitle: "Моя корзина" },
    en: { flag: "https://flagcdn.com/20x15/us.png", code: "en", cartTitle: "My Cart" }
};

function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    updateLanguageUI(lang);
}

function updateLanguageUI(lang) {
    const data = languageData[lang] || languageData.ro;

    // Actualizează drapel + cod limbă
    const flagImg = document.getElementById('current-flag');
    const langText = document.getElementById('current-lang');
    if (flagImg) flagImg.src = data.flag;
    if (langText) langText.textContent = data.code;

    // Actualizează titlul "Coșul meu"
    const cartTitleEl = document.getElementById('cart-title');
    if (cartTitleEl) cartTitleEl.textContent = data.cartTitle;
}

// Inițializare
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'ro';
    setTimeout(() => updateLanguageUI(savedLang), 200); // mic delay pentru navbar
});