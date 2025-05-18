document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.opacity = '0.3'; // Reduzierte Opazität
        particle.style.left = Math.random() * 100 + '%';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    setInterval(createParticle, 100);
});