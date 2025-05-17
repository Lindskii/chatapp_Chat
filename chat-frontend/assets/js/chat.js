// filepath: /chat-frontend/chat-frontend/assets/js/app.js

document.addEventListener('DOMContentLoaded', function() {
    const isPrivate = !!document.getElementById('user-name');
    const messagesDiv = document.getElementById('messages') || document.getElementById('chat-messages');
    const input = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-button');
    let chatKey = "group";
    if (isPrivate) {
        const params = new URLSearchParams(window.location.search);
        const user = params.get('user') || document.getElementById('user-name').textContent || "User";
        document.getElementById('user-name').textContent = user;
        chatKey = user;
    }

    function addDateIfNeeded() {
        const now = new Date();
        const today = now.toLocaleDateString();
        // Finde das letzte Datum im Chatverlauf
        const dateDivs = messagesDiv.querySelectorAll('.chat-date');
        let lastDate = null;
        if (dateDivs.length > 0) {
            lastDate = dateDivs[dateDivs.length - 1].textContent;
        }
        // Wenn noch kein Datum oder das letzte Datum ist nicht heute, neues Datum einfügen
        if (lastDate !== today) {
            const dateDiv = document.createElement('div');
            dateDiv.className = "chat-date";
            dateDiv.textContent = today;
            messagesDiv.appendChild(dateDiv);
        }
    }

    function addMessage(text) {
        addDateIfNeeded();
        const now = new Date();
        const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const div = document.createElement('div');
        div.className = "message own";
        const textDiv = document.createElement('div');
        textDiv.className = "text";
        textDiv.textContent = text;
        const timeDiv = document.createElement('span');
        timeDiv.className = "time";
        timeDiv.textContent = time;
        textDiv.appendChild(timeDiv);
        div.appendChild(textDiv);
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text);
        input.value = "";
    }

    sendBtn.onclick = sendMessage;
    input.addEventListener('keydown', function(e) {
        if (e.key === "Enter") sendMessage();
    });

    // Optional: Beim ersten Laden das heutige Datum anzeigen
    if (!messagesDiv.querySelector('.chat-date')) {
        const dateDiv = document.createElement('div');
        dateDiv.className = "chat-date";
        dateDiv.textContent = new Date().toLocaleDateString();
        messagesDiv.appendChild(dateDiv);
    }
});

function getContacts() {
    return JSON.parse(localStorage.getItem('contacts') || "[]");
}
const chatData = { group: `...` };
const chatTitles = { group: "Group Chat" };
function renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = `<li class="chat-item" data-chat="group" onclick="openChat('group')"><span class="chat-name">Group Chat</span></li>`;
    getContacts().forEach(name => {
        chatTitles[name] = "Chat mit " + name;
        chatList.innerHTML += `<li class="chat-item" data-chat="${name}" onclick="openChat('${name}')"><span class="chat-name">Chat mit ${name}</span></li>`;
    });
}
function openChat(chatId) {
    let data = chatData[chatId];
    if (!data) {
        const chatDataStore = JSON.parse(localStorage.getItem('chatData') || "{}");
        data = chatDataStore[chatId] || `<div class="chat-date">${new Date().toLocaleDateString()}</div>`;
    }
    document.getElementById('chat-title').textContent = chatTitles[chatId] || chatId;
    document.getElementById('chat-messages').innerHTML = data;
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.chat-item[data-chat="${chatId}"]`);
    if (activeItem) activeItem.classList.add('active');
}
renderChatList();
openChat('group');
window.addEventListener('storage', function(e) {
    if (e.key === 'contacts' || e.key === 'chatData') renderChatList();
});