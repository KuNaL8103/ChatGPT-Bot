const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyDHa6kBeMrvUdNB9Pep9zZq0_so6eUqx2k';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') {
        return;
    }

    else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);

        setTimeout(() => {
            appendMessage('bot', 'This Source is coded By Kunal');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';

    const requestBody = {
        contents: [{
            parts: [{
                text: message
            }]
        }]
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };

    fetch(GEMINI_API_URL, options)
        .then((response) => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then((response) => {
            console.log('Full API Response:', response);
            
            if (response.error) {
                console.error('API Error:', response.error);
                appendMessage('bot', `API Error: ${response.error.message || 'Unknown error'}`);
            } else if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
                const botMessage = response.candidates[0].content.parts[0].text;
                appendMessage('bot', botMessage);
            } else if (response.candidates && response.candidates[0] && response.candidates[0].finishReason) {
                appendMessage('bot', `Response blocked: ${response.candidates[0].finishReason}. Try rephrasing your message.`);
            } else {
                console.log('Unexpected response structure:', response);
                appendMessage('bot', 'Sorry, I could not generate a response. Please try again.');
            }

            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        })
        .catch((err) => {
            console.error('Fetch Error:', err);
            appendMessage('bot', 'Error: Check Your Gemini API Key or network connection!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        });
}

function appendMessage(sender, message) {
    info.style.display = "none";

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }
    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}