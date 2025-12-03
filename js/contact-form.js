/**
 * Contact Form Handler
 * Gestisce l'invio del form tramite Formspree e mostra il messaggio di conferma
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disabilita il bottone durante l'invio
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        try {
            // Invia i dati a Formspree
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Successo: mostra il messaggio di conferma
                form.style.display = 'none';
                successMessage.classList.add('show'); // Aggiunge classe per mostrare
                
                // Scroll al messaggio di successo
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset del form dopo 3 secondi (opzionale)
                setTimeout(() => {
                    form.reset();
                }, 3000);
                
            } else {
                // Errore dal server
                throw new Error('Errore durante l\'invio');
            }
            
        } catch (error) {
            // Gestione errori
            alert('Si è verificato un errore durante l\'invio del messaggio. Per favore riprova o contattaci direttamente.');
            console.error('Errore:', error);
            
            // Ripristina il bottone
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});