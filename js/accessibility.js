document.addEventListener('DOMContentLoaded', function() {
    const btn = document.createElement('button');
    btn.id = "accessibility-btn";
    btn.title = "Barrierefreiheit";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-controls", "accessibility-menu");
    btn.className = "a11y-btn";
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>';
    document.body.appendChild(btn);

    const menu = document.createElement('div');
    menu.id = "accessibility-menu";
    menu.className = "a11y-menu";
    menu.innerHTML = `
        <label><input type="checkbox" id="contrast-toggle"> Hoher Kontrast</label>
        <label><input type="checkbox" id="font-toggle"> Große Schrift</label>
    `;
    document.body.appendChild(menu);

    btn.onclick = e => {
        e.stopPropagation();
        menu.classList.toggle("open");
        if(menu.classList.contains("open")) menu.querySelector("input").focus();
    };
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("open");
        }
    });

    document.getElementById('contrast-toggle').onchange = function() {
        document.body.classList.toggle('high-contrast', this.checked);
        localStorage.setItem('contrast', this.checked ? 'on' : 'off');
    };
    document.getElementById('font-toggle').onchange = function() {
        document.body.classList.toggle('big-font', this.checked);
        localStorage.setItem('bigfont', this.checked ? 'on' : 'off');
    };

    // Zustand beim Laden wiederherstellen
    if(localStorage.getItem('contrast') === 'on') {
        document.body.classList.add('high-contrast');
        document.getElementById('contrast-toggle').checked = true;
    }
    if(localStorage.getItem('bigfont') === 'on') {
        document.body.classList.add('big-font');
        document.getElementById('font-toggle').checked = true;
    }
});