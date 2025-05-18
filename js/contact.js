document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Formulardaten sammeln
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In einer echten Anwendung würden die Daten an einen Server gesendet
            // Hier zeigen wir nur eine Benachrichtigung
            if (name && email && subject && message) {
                alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.');
                contactForm.reset();
            } else {
                alert('Bitte füllen Sie alle Felder aus.');
            }
        });
    }
});