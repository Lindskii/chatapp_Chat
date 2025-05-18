document.addEventListener('DOMContentLoaded', function() {
    // DOM-Elemente
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('chat-messages');
    const roomList = document.getElementById('room-list');
    const currentRoomElement = document.getElementById('current-room');
    const newRoomButton = document.getElementById('new-room-btn');
    
    // Aktueller Chatraum
    let currentRoom = 'general';
    
    // Event-Listener für das Senden von Nachrichten
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const msg = messageInput.value.trim();
        
        if (msg) {
            // Nachricht hinzufügen
            addMessage({
                username: 'Benutzer',
                text: msg,
                time: new Date().toLocaleTimeString(),
                isSelf: true
            });
            
            messageInput.value = '';
            messageInput.focus();
            
            // Simuliere eine Antwort
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    const users = ['Anna', 'Max', 'Julia'];
                    const randomUser = users[Math.floor(Math.random() * users.length)];
                    
                    addMessage({
                        username: randomUser,
                        text: generateRandomResponse(),
                        time: new Date().toLocaleTimeString(),
                        isSelf: false
                    });
                }, 1000 + Math.random() * 2000);
            }
        }
    });
    
    // Event-Listener für das Wechseln des Raums
    roomList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            const room = e.target.getAttribute('data-room');
            if (room && room !== currentRoom) {
                changeRoom(room, e.target.textContent);
            }
        }
    });
    
    // Event-Listener für neuen Raum erstellen
    newRoomButton.addEventListener('click', function() {
        const roomName = prompt('Name des neuen Raums:');
        if (roomName && roomName.trim()) {
            const sanitizedRoomName = roomName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
            if (sanitizedRoomName) {
                createNewRoom(sanitizedRoomName, roomName.trim());
            }
        }
    });
    
    // Funktion zum Erstellen eines neuen Raums
    function createNewRoom(roomId, roomName) {
        const roomItem = document.createElement('li');
        roomItem.setAttribute('data-room', roomId);
        roomItem.textContent = roomName;
        roomList.appendChild(roomItem);
        
        // Direkt in den neuen Raum wechseln
        changeRoom(roomId, roomName);
    }
    
    // Funktion zum Wechseln des Raums
    function changeRoom(roomId, roomName) {
        currentRoom = roomId;
        
        // UI aktualisieren
        document.querySelectorAll('#room-list li').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-room') === roomId) {
                item.classList.add('active');
            }
        });
        
        currentRoomElement.textContent = roomName || 'Unbekannt';
        
        // Nachrichtencontainer leeren
        messagesContainer.innerHTML = '';
        
        // Willkommensnachricht
        addSystemMessage(`Willkommen im Chat! Du bist dem Raum '${roomName}' beigetreten.`);
    }
    
    // Funktion zum Hinzufügen einer Nachricht
    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.isSelf ? 'sent' : 'received');
        
        const messageHTML = `
            <div class="message-info">
                <span class="message-sender">${message.username}</span>
                <span class="message-time">${message.time}</span>
            </div>
            <div class="message-text">${escapeHTML(message.text)}</div>
        `;
        
        messageElement.innerHTML = messageHTML;
        messagesContainer.appendChild(messageElement);
        
        // Scroll zum unteren Rand des Nachrichtenfensters
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Funktion zum Hinzufügen einer Systemnachricht
    function addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('system-message');
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        
        // Scroll zum unteren Rand des Nachrichtenfensters
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Hilfsfunktion zum Escapen von HTML
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Generiert eine zufällige Antwort
    function generateRandomResponse() {
        const responses = [
            "Hallo, wie geht's?",
            "Interessantes Thema!",
            "Was meinst du damit?",
            "Ich verstehe, was du sagen willst.",
            "Cool! Danke für die Info.",
            "Das ist wirklich interessant!",
            "Ich stimme dir zu.",
            "Ich bin nicht sicher, ob ich das richtig verstehe.",
            "Kannst du das näher erklären?",
            "Das ist eine gute Idee!",
            "Ich arbeite gerade an einem ähnlichen Projekt."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
});