/**
 * Template Loader
 * Carica automaticamente header e footer in tutte le pagine
 */
async function loadTemplate(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Errore nel caricamento di ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            
            // Se abbiamo caricato l'header, inizializza il menu mobile
            if (elementId === 'header-placeholder') {
                initMobileMenu();
            }
        } else {
            console.error(`Elemento con id "${elementId}" non trovato`);
        }
    } catch (error) {
        console.error('Errore nel template:', error);
    }
}

/**
 * Inizializza il menu mobile dopo il caricamento dell'header
 */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!hamburgerBtn || !closeMenuBtn || !mobileMenu) return;
    
    // Apertura menu mobile
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Blocca scroll della pagina
    });
    
    // Chiusura menu mobile
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Ripristina scroll
    });
    
    // Chiusura menu quando si clicca su un link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Chiusura menu con tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Carica i componenti quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('header-placeholder', 'components/header.html');
    loadTemplate('footer-placeholder', 'components/footer.html');
});