document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatBody = document.querySelector('.chat-body');
    const lastSeenTime = document.getElementById('last-seen-time');
    const t3Icon = document.querySelector('.t3');
    const menu = document.getElementById('menu');
    const emojiPicker = document.getElementById('emoji-picker');
    let isMyMessage = true;

    // Update "Last Seen" time
    function updateLastSeen() {
        const now = new Date();
        const randomMinutes = Math.floor(Math.random() * 120) + 1; // Random between 1 and 120 minutes
        const lastSeenDate = new Date(now.getTime() - randomMinutes * 60000);
        lastSeenTime.textContent = `Terakhir dilihat hari ini pukul ${lastSeenDate.toTimeString().slice(0, 5)}`;
    }
    updateLastSeen();

    // Change icon from voice note to send when typing
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            sendButton.src = 'kirim.png';
        } else {
            sendButton.src = 'vn.png';
        }
    });

    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', isMyMessage ? 'sent' : 'received');

        const textElement = document.createElement('span');
        textElement.textContent = messageText;

        const timeElement = document.createElement('div');
        timeElement.classList.add('chat-time');
        const now = new Date();
        timeElement.textContent = now.toTimeString().slice(0, 5);

        messageElement.appendChild(textElement);
        messageElement.appendChild(timeElement);
        chatBody.appendChild(messageElement);

        messageInput.value = '';
        sendButton.src = 'vn.png';

        // Scroll to the bottom of the chat
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key press
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    });

    // Delete all messages
    function clearChat() {
        chatBody.innerHTML = '';
    }

    // Toggle chat role
    function toggleRole(role) {
        isMyMessage = role === 'role1';
        alert(`Peran: ${isMyMessage ? 'Peran 1 (Saya)' : 'Peran 2 (Orang Lain)'}`);
    }

    // Show/Hide menu
    t3Icon.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Menu item event listeners
    document.getElementById('clear-chat').addEventListener('click', () => {
        clearChat();
        menu.style.display = 'none';
    });
    document.getElementById('toggle-role1').addEventListener('click', () => {
        toggleRole('role1');
        menu.style.display = 'none';
    });
    document.getElementById('toggle-role2').addEventListener('click', () => {
        toggleRole('role2');
        menu.style.display = 'none';
    });

    // Show emoji picker
    const emojiIcon = document.querySelector('.emoji');
    emojiIcon.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
    });

    // Populate emoji picker
    const emojis = ['😊', '😂', '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛' ,'😝', '😜' ,'🤪', '🤨', '🧐', '🤓' ,'😎', '🥳', '🤯', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔' ,'😪', '🤤', '😴', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿']; // Add more emojis as needed
    emojis.forEach(emoji => {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.style.cursor = 'pointer';
        emojiElement.style.fontSize = '20px';
        emojiElement.style.margin = '5px';
        emojiElement.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPicker.style.display = 'none';
        });
        emojiPicker.appendChild(emojiElement);
    });

    // File picker
    const fileIcon = document.querySelector('.file');
    fileIcon.addEventListener('click', () => {
        alert('File picker clicked!'); // Implement your file picker logic here
    });

    // Camera picker
    const cameraIcon = document.querySelector('.camera');
    cameraIcon.addEventListener('click', () => {
        alert('Camera picker clicked!'); // Implement your camera picker logic here
    });
});
