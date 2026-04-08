const chatConfig = {
    typingDelay: 800,
    responses: {
        greeting: [
            "Oi! Eu sou o Byte 🤖 Como posso te ajudar hoje? 😊",
            "Olá! Bem-vindo! Como posso ajudar?"
        ],
        wellbeing: [
            "Estou funcionando perfeitamente! ⚡ E você?",
            "Tudo certo comigo! 💻✨"
        ],
        thanks: [
            "De nada! Fico feliz em ajudar 😄✨",
            "Sempre que precisar, é só chamar! 👍"
        ],
        goodbye: [
            "Até mais! Volte sempre 💙👋",
            "Tchau! Foi um prazer conversar com você! 😊"
        ],
        help: [
            "Posso ajudar com dúvidas, responder perguntas ou conversar com você! 💬"
        ],
        notFound: [
            "Hmm... não entendi 😅 Pode tentar explicar de outro jeito?",
            "Desculpa, ainda estou aprendendo 🤓 Tenta novamente?"
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            sendMessage();
        }
    });

    setTimeout(() => {
        addMessage("Olá! 👋 Eu sou o Byte. Bem-vindo ao meu chat!", "bot");
    }, 500);
});

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message === '') return;

    addMessage(message, 'user');
    input.value = '';

    const sendBtn = document.getElementById('send-btn');
    sendBtn.disabled = true;

    displayTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
        sendBtn.disabled = false;
    }, chatConfig.typingDelay);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msg = document.createElement('div');

    msg.classList.add('message', sender);
    msg.textContent = text;
    msg.setAttribute('role', 'article');

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typing = document.createElement('div');
    typing.id = 'typing-indicator';
    typing.classList.add('message', 'bot');
    typing.textContent = '⏳ Digitando...';
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}


function getBotResponse(message) {
    const msg = message.toLowerCase().trim();

    if (containsKeywords(msg, ['olá', 'oi', 'e aí', 'e ai', 'opa'])) {
        return getRandomResponse(chatConfig.responses.greeting);
    }
   
    else if (containsKeywords(msg, ['como vai', 'tudo bem', 'como você está', 'tá tudo bem'])) {
        return getRandomResponse(chatConfig.responses.wellbeing);
    }
 
    else if (containsKeywords(msg, ['obrigado', 'valeu', 'obrigada', 'brigado', 'thanks'])) {
        return getRandomResponse(chatConfig.responses.thanks);
    }
   
    else if (containsKeywords(msg, ['tchau', 'adeus', 'até logo', 'falou', 'até mais'])) {
        return getRandomResponse(chatConfig.responses.goodbye);
    }
    
    else if (containsKeywords(msg, ['ajuda', 'help', 'pode fazer', 'o que você faz', 'quem é you'])) {
        return getRandomResponse(chatConfig.responses.help);
    }
    
    else {
        return getRandomResponse(chatConfig.responses.notFound);
    }
}

function containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}