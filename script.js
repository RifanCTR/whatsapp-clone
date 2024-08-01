document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatBody = document.querySelector('.chat-body');
    const lastSeenTime = document.getElementById('last-seen-time');
    const t3Icon = document.querySelector('.t3');
    const menu = document.getElementById('menu');
    const emojiPicker = document.getElementById('emoji-picker');
    const fileIcon = document.querySelector('.file');
    const fileInput = document.getElementById('file-input');
    let selectedFile = null;
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
        if (messageInput.value.trim() !== '' || selectedFile) {
            sendButton.src = 'kirim.png';
        } else {
            sendButton.src = 'vn.png';
        }
    });

    // Handle file selection
    fileIcon.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Clear previous content and display the selected image
                messageInput.value = ''; 
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px'; // Adjust size as needed
                img.style.maxHeight = '200px'; // Adjust size as needed
                img.style.display = 'block'; // Ensure image is displayed
                messageInput.parentElement.insertBefore(img, messageInput);

                // Store the selected file
                selectedFile = file;
                
                // Change send button icon to kirim.png
                sendButton.src = 'kirim.png';
            };
            reader.readAsDataURL(file);
        }
    });

    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '' && !selectedFile) return;

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', isMyMessage ? 'sent' : 'received');
        
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('message-content');

        if (selectedFile) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(selectedFile);
            img.style.maxWidth = '200px'; // Adjust size as needed
            img.style.maxHeight = '200px'; // Adjust size as needed
            contentWrapper.appendChild(img);
        } else {
            const textElement = document.createElement('span');
            textElement.textContent = messageText;
            contentWrapper.appendChild(textElement);
        }

        const timeElement = document.createElement('div');
        timeElement.classList.add('chat-time');
        const now = new Date();
        timeElement.textContent = now.toTimeString().slice(0, 5);

        messageElement.appendChild(contentWrapper);
        messageElement.appendChild(timeElement);

        const statusElement = document.createElement('img');
        statusElement.classList.add('status-icon');
        statusElement.src = 'c1a.png'; // Default status: belum dibaca
        messageElement.appendChild(statusElement);

        chatBody.appendChild(messageElement);

        messageInput.value = '';
        selectedFile = null; // Clear the selected file
        sendButton.src = 'vn.png'; // Change icon back to vn.png

        // Scroll to the bottom of the chat
        chatBody.scrollTop = chatBody.scrollHeight;

        // Add event listener for status change
        statusElement.addEventListener('click', () => {
            changeMessageStatus(statusElement);
        });
    }

    // Change message status function
    function changeMessageStatus(statusElement) {
        const statuses = ['c1a.png', 'c2a.png', 'c2.png'];
        let currentStatusIndex = statuses.indexOf(statusElement.src.split('/').pop());

        currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        statusElement.src = statuses[currentStatusIndex];
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

    const emojiIcon = document.querySelector('.emoji');
    emojiIcon.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
    });
    
       // Populate emoji picker
       const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥹', '😊', '😇', '🙂', '🙃',
        '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐',
        '🤓', '😎', '🥸', '🤩', '🥳', '🙂‍↕️', '😏', '😒', '🙂‍↔️', '😞', '😔', '😟', '😕', '🙁',
        '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨', '😤', '😠', '😡', '🤬', '🤯',
        '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫',
        '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫨', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲',
        '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒',
        '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖',
        '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐', '✋', '🖖',
        '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🤟', '🤘', '🤙', '🫵', '🫱', '🫲', '🫸', '🫷',
        '🫳', '🫴', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜',
        '👏', '🫶', '🙌', '👐', '🤲', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👣',
        '👂', '🦻', '👃', '🫀', '🫁', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '🫦', '💋', '🩸',
        '👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👩‍🦱', '🧑‍🦱', '👨‍🦱', '👩‍🦰', '🧑‍🦰', '👨‍🦰',
        '👱‍♀️', '👱', '👱‍♂️', '👩‍🦳', '🧑‍🦳', '👨‍🦳', '👩‍🦲', '🧑‍🦲', '👨‍🦲', '🧔‍♀️', '🧔',
        '🧔‍♂️', '👵', '🧓', '👴', '👲', '👳‍♀️', '👳', '👳‍♂️', '🧕', '👮‍♀️', '👮', '👮‍♂️',
        '👷‍♀️', '👷', '👷‍♂️', '💂‍♀️', '💂', '💂‍♂️', '🕵️‍♀️', '🕵️', '🕵️‍♂️', '👩‍⚕️', '🧑‍⚕️',
        '👨‍⚕️', '👩‍🌾', '🧑‍🌾', '👨‍🌾', '👩‍🍳', '🧑‍🍳', '👨‍🍳', '👩‍🎓', '🧑‍🎓', '👨‍🎓',
        '👩‍🎤', '🧑‍🎤', '👨‍🎤', '👩‍🏫', '🧑‍🏫', '👨‍🏫', '👩‍🏭', '🧑‍🏭', '👨‍🏭', '👩‍💻',
        '🧑‍💻', '👨‍💻', '👩‍💼', '🧑‍💼', '👨‍💼', '👩‍🔧', '🧑‍🔧', '👨‍🔧', '👩‍🔬', '🧑‍🔬',
        '👨‍🔬', '👩‍🎨', '🧑‍🎨', '👨‍🎨', '👩‍🚒', '🧑‍🚒', '👨‍🚒', '👩‍✈️', '🧑‍✈️', '👨‍✈️',
        '👩‍🚀', '🧑‍🚀', '👨‍🚀', '👩‍⚖️', '🧑‍⚖️', '👨‍⚖️', '👰‍♀️', '👰', '👰‍♂️', '🤵‍♀️',
        '🤵', '🤵‍♂️', '👸', '🫅', '🤴', '🥷', '🦸‍♀️', '🦸', '🦸‍♂️', '🦹‍♀️', '🦹', '🦹‍♂️',
        '🤶', '🧑‍🎄', '🎅', '🧙‍♀️', '🧙', '🧙‍♂️', '🧝‍♀️', '🧝', '🧝‍♂️', '🧛‍♀️', '🧛',
        '🧛‍♂️', '🧟‍♀️', '🧟', '🧟‍♂️', '🧞‍♀️', '🧞', '🧞‍♂️', '🧜‍♀️', '🧜', '🧜‍♂️',
        '🧚‍♀️', '🧚', '🧚‍♂️', '🧌', '👼', '🤰', '🫄', '🫃', '🤱', '👩‍🍼', '🧑‍🍼', '👨‍🍼',
        '🙇‍♀️', '🙇', '🙇‍♂️', '💁‍♀️', '💁', '💁‍♂️', '🙅‍♀️', '🙅', '🙅‍♂️', '🙆‍♀️', '🙆',
        '🙆‍♂️', '🙋‍♀️', '🙋', '🙋‍♂️', '🧏‍♀️', '🧏', '🧏‍♂️', '🤦‍♀️', '🤦', '🤦‍♂️',
        '🤷‍♀️', '🤷', '🤷‍♂️', '🙎‍♀️', '🙎', '🙎‍♂️', '🙍‍♀️', '🙍', '🙍‍♂️', '💇‍♀️', '💇',
        '💇‍♂️', '💆‍♀️', '💆', '💆‍♂️', '🧖‍♀️', '🧖', '🧖‍♂️', '💅', '🤳', '💪', '🦾', '🦵',
        '🦿', '🦶', '👣', '👂', '🦻', '👃', '🫀', '🫁', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄',
        '🫦', '💋', '🩸', '👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👩‍🦱', '🧑‍🦱', '👨‍🦱',
        '👩‍🦰', '🧑‍🦰', '👨‍🦰', '👱‍♀️', '👱', '👱‍♂️', '👩‍🦳', '🧑‍🦳', '👨‍🦳', '👩‍🦲',
        '🧑‍🦲', '👨‍🦲', '🧔‍♀️', '🧔', '🧔‍♂️', '👵', '🧓', '👴', '👲', '👳‍♀️', '👳', '👳‍♂️',
        '🧕', '👮‍♀️', '👮', '👮‍♂️', '👷‍♀️', '👷', '👷‍♂️', '💂‍♀️', '💂', '💂‍♂️', '🕵️‍♀️',
        '🕵️', '🕵️‍♂️', '👩‍⚕️', '🧑‍⚕️', '👨‍⚕️', '👩‍🌾', '🧑‍🌾', '👨‍🌾', '👩‍🍳', '🧑‍🍳',
        '👨‍🍳', '👩‍🎓', '🧑‍🎓', '👨‍🎓', '👩‍🎤', '🧑‍🎤', '👨‍🎤', '👩‍🏫', '🧑‍🏫', '👨‍🏫',
        '👩‍🏭', '🧑‍🏭', '👨‍🏭', '👩‍💻', '🧑‍💻', '👨‍💻', '👩‍💼', '🧑‍💼', '👨‍💼', '👩‍🔧',
        '🧑‍🔧', '👨‍🔧', '👩‍🔬', '🧑‍🔬', '👨‍🔬', '👩‍🎨', '🧑‍🎨', '👨‍🎨', '👩‍🚒', '🧑‍🚒',
        '👨‍🚒', '👩‍✈️', '🧑‍✈️', '👨‍✈️', '👩‍🚀', '🧑‍🚀', '👨‍🚀', '👩‍⚖️', '🧑‍⚖️', '👨‍⚖️',
        '👰‍♀️', '👰', '👰‍♂️', '🤵‍♀️', '🤵', '🤵‍♂️', '👸', '🫅', '🤴', '🥷', '🦸‍♀️', '🦸',
        '🦸‍♂️', '🦹‍♀️', '🦹', '🦹‍♂️', '🤶', '🧑‍🎄', '🎅', '🧙‍♀️', '🧙', '🧙‍♂️', '🧝‍♀️',
        '🧝', '🧝‍♂️', '🧛‍♀️', '🧛', '🧛‍♂️', '🧟‍♀️', '🧟', '🧟‍♂️', '🧞‍♀️', '🧞', '🧞‍♂️',
        '🧜‍♀️', '🧜', '🧜‍♂️', '🧚‍♀️', '🧚', '🧚‍♂️', '🧌', '👼', '🤰', '🫄', '🫃', '🤱',
        '👩‍🍼', '🧑‍🍼', '👨‍🍼', '🙇‍♀️', '🙇', '🙇‍♂️', '💁‍♀️', '💁', '💁‍♂️', '🙅‍♀️', '🙅',
        '🙅‍♂️', '🙆‍♀️', '🙆', '🙆‍♂️', '🙋‍♀️', '🙋', '🙋‍♂️', '🧏‍♀️', '🧏', '🧏‍♂️', '🤦‍♀️',
        '🤦', '🤦‍♂️', '🤷‍♀️', '🤷', '🤷‍♂️', '🙎‍♀️', '🙎', '🙎‍♂️', '🙍‍♀️', '🙍', '🙍‍♂️',
        '💇‍♀️', '💇', '💇‍♂️', '💆‍♀️', '💆', '💆‍♂️', '🧖‍♀️', '🧖', '🧖‍♂️', '💅', '🤳',
        '💪', '🦾', '🦵', '🦿', '🦶', '👣', '👂', '🦻', '👃', '🫀', '🫁', '🧠', '🦷', '🦴', '👀',
        '👁', '👅', '👄', '🫦', '💋', '🩸', '👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👩‍🦱',
        '🧑‍🦱', '👨‍🦱', '👩‍🦰', '🧑‍🦰', '👨‍🦰', '👱‍♀️', '👱', '👱‍♂️', '👩‍🦳', '🧑‍🦳',
        '👨‍🦳', '👩‍🦲', '🧑‍🦲', '👨‍🦲', '🧔‍♀️', '🧔', '🧔‍♂️', '👵', '🧓', '👴', '👲',
        '👳‍♀️', '👳', '👳‍♂️', '🧕', '👮‍♀️', '👮', '👮‍♂️', '👷‍♀️', '👷', '👷‍♂️', '💂‍♀️',
        '💂', '💂‍♂️', '🕵️‍♀️', '🕵️', '🕵️‍♂️', '👩‍⚕️', '🧑‍⚕️', '👨‍⚕️', '👩‍🌾', '🧑‍🌾',
        '👨‍🌾', '👩‍🍳', '🧑‍🍳', '👨‍🍳', '👩‍🎓', '🧑‍🎓', '👨‍🎓', '👩‍🎤', '🧑‍🎤', '👨‍🎤',
        '👩‍🏫', '🧑‍🏫', '👨‍🏫', '👩‍🏭', '🧑‍🏭', '👨‍🏭', '👩‍💻', '🧑‍💻', '👨‍💻', '👩‍💼',
        '🧑‍💼', '👨‍💼', '👩‍🔧', '🧑‍🔧', '👨‍🔧', '👩‍🔬', '🧑‍🔬', '👨‍🔬', '👩‍🎨', '🧑‍🎨',
        '👨‍🎨', '👩‍🚒', '🧑‍🚒', '👨‍🚒', '👩‍✈️', '🧑‍✈️', '👨‍✈️', '👩‍🚀', '🧑‍🚀', '👨‍🚀',
        '👩‍⚖️', '🧑‍⚖️', '👨‍⚖️', '👰‍♀️', '👰', '👰‍♂️', '🤵‍♀️', '🤵', '🤵‍♂️', '👸', '🫅',
        '🤴', '🥷', '🦸‍♀️', '🦸', '🦸‍♂️', '🦹‍♀️', '🦹', '🦹‍♂️', '🤶', '🧑‍🎄', '🎅', '🧙‍♀️',
        '🧙', '🧙‍♂️', '🧝‍♀️', '🧝', '🧝‍♂️', '🧛‍♀️', '🧛', '🧛‍♂️', '🧟‍♀️', '🧟', '🧟‍♂️',
        '🧞‍♀️', '🧞', '🧞‍♂️', '🧜‍♀️', '🧜', '🧜‍♂️', '🧚‍♀️', '🧚', '🧚‍♂️', '🧌', '👼',
        '🤰', '🫄', '🫃', '🤱', '👩‍🍼', '🧑‍🍼', '👨‍🍼', '🙇‍♀️', '🙇', '🙇‍♂️', '💁‍♀️', '💁',
        '💁‍♂️', '🙅‍♀️', '🙅', '🙅‍♂️', '🙆‍♀️', '🙆', '🙆‍♂️', '🙋‍♀️', '🙋', '🙋‍♂️', '🧏‍♀️',
        '🧏', '🧏‍♂️', '🤦‍♀️', '🤦', '🤦‍♂️', '🤷‍♀️', '🤷', '🤷‍♂️', '🙎‍♀️', '🙎', '🙎‍♂️',
        '🙍‍♀️', '🙍', '🙍‍♂️', '💇‍♀️', '💇', '💇‍♂️', '💆‍♀️', '💆', '💆‍♂️', '🧖‍♀️', '🧖',
        '🧖‍♂️', '💅', '🤳'
      ]; // Add more emojis as needed
    emojis.forEach(emoji => {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.style.cursor = 'pointer';
        emojiElement.style.fontSize = '20px';
        emojiElement.style.margin = '5px';
        emojiElement.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPicker.style.display = 'none';
            sendButton.src = 'kirim.png'; // Change icon to 'kirim.png'
        });
        emojiPicker.appendChild(emojiElement);
    });
    

    // Camera picker (dummy implementation)
    const cameraIcon = document.querySelector('.camera');
    cameraIcon.addEventListener('click', () => {
        alert('Camera picker clicked!'); // Implement your camera picker logic here
    });
});

