document.addEventListener('DOMContentLoaded', function() {
    const btn = document.createElement('button');
    btn.id = "accessibility-btn";
    btn.title = "Barrierefreiheit";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-controls", "accessibility-menu");
    btn.className = "a11y-btn";
    btn.innerHTML = '<img src="assets/Pictures/accessibility-symbol-768x644.png" alt="Barrierefreiheit" width="28" height="28" style="display:block;margin:auto;border-radius:50%;object-fit:cover;width:28px;height:28px;">';
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