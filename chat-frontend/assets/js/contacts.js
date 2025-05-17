// Dummy-Daten für Suchfunktion (kannst du ersetzen)
const allUsers = [
    "Michaela", "Quirin", "Samy"
];

// Kontakte aus localStorage laden
function getContacts() {
    return JSON.parse(localStorage.getItem('contacts') || "[]");
}
function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Private Chats im localStorage verwalten
function ensurePrivateChat(username) {
    let chatData = JSON.parse(localStorage.getItem('chatData') || "{}");
    if (!chatData[username]) {
        chatData[username] = `
            <div class="chat-date">${new Date().toLocaleDateString()}</div>
            <div class="message own">
                <span class="user">Du:</span>
                <span class="text">
                    Hi ${username}!
                    <span class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </span>
            </div>
        `;
        localStorage.setItem('chatData', JSON.stringify(chatData));
    }
}

// Kontakte anzeigen
function renderContacts() {
    const contacts = getContacts();
    const list = document.getElementById('contact-list');
    list.innerHTML = "";
    contacts.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;

        // Löschen-Button
        const delBtn = document.createElement('button');
        delBtn.className = "delete-btn";
        delBtn.title = "Kontakt löschen";
        delBtn.innerHTML = "&#128465;"; // Mülleimer-Icon
        delBtn.onclick = function() {
            deleteContact(name);
        };
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

function deleteContact(name) {
    let contacts = getContacts();
    contacts = contacts.filter(c => c !== name);
    saveContacts(contacts);

    // Optional: Privaten Chat auch entfernen
    let chatData = JSON.parse(localStorage.getItem('chatData') || "{}");
    delete chatData[name];
    localStorage.setItem('chatData', JSON.stringify(chatData));

    renderContacts();
}

// Suche
function searchContacts(event) {
    event.preventDefault();
    const input = document.getElementById('search-input');
    const query = input.value.trim().toLowerCase();
    const resultsList = document.getElementById('search-results');
    resultsList.innerHTML = "";

    if (!query) return;

    // Filtere alle Nutzer, die nicht schon in den Kontakten sind und zum Suchbegriff passen
    const contacts = getContacts();
    const matches = allUsers.filter(name =>
        name.toLowerCase().includes(query) && !contacts.includes(name)
    );

    matches.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;

        // Hinzufügen-Button
        const addBtn = document.createElement('button');
        addBtn.className = "add-btn";
        addBtn.title = "Kontakt hinzufügen";
        addBtn.innerHTML = "+";
        addBtn.onclick = function() {
            addContact(name, li, addBtn);
        };
        li.appendChild(addBtn);

        resultsList.appendChild(li);
    });

    if (matches.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Kein Treffer gefunden";
        resultsList.appendChild(li);
    }
}

// Kontakt hinzufügen
function addContact(name, li, btn) {
    let contacts = getContacts();
    if (!contacts.includes(name)) {
        contacts.push(name);
        saveContacts(contacts);
        ensurePrivateChat(name);
        renderContacts();
        btn.remove();
        const added = document.createElement('span');
        added.className = "added";
        added.textContent = "Hinzugefügt";
        li.appendChild(added);
        // Optional: Chatseite im Hintergrund aktualisieren (z.B. über localStorage-Event)
    }
}

// Initial anzeigen
document.addEventListener('DOMContentLoaded', renderContacts);