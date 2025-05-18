// Funktion zur Aktualisierung der Uhrzeit
function updateClock() {
    const now = new Date();                                    // Erstellt neues Datum-Objekt mit aktueller Zeit
    const time = now.toLocaleTimeString();                    // Formatiert Zeit als String (HH:MM:SS)
    document.getElementById('clock').textContent = time;       // Aktualisiert den Inhalt des clock-Elements
}

// Timer starten, der updateClock jede Sekunde (1000ms) ausführt
setInterval(updateClock, 1000);                               // Aktualisiert die Uhr jede Sekunde

// Erste Ausführung sofort beim Laden
updateClock();                                                // Zeigt initiale Zeit an, ohne auf ersten Timer zu warten