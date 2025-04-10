// Chatbot functionality
const chatbot = document.getElementById('chatbot');
const chatToggle = document.getElementById('chat-toggle');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.querySelector('.chatbot-messages');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');

// Initial bot messages
const initialMessages = [
    {
        text: "👋 Hi! I'm your Smart Cane Assistant. How can I help you today?",
        options: [
            "Tell me about Smart Cane features",
            "How does it work?",
            "Pricing information",
            "Technical support"
        ]
    }
];

// Bot responses based on user input
const botResponses = {
    "tell me about smart cane features": {
        text: "Smart Cane 2025 comes with several innovative features:",
        bullets: [
            "AI-Based Voice Navigation",
            "LiDAR Obstacle Detection",
            "Traffic Light Detection",
            "Emergency SOS System",
            "Fall Detection",
            "Weather Updates"
        ]
    },
    "how does it work": {
        text: "Smart Cane 2025 works through a combination of advanced technologies:",
        bullets: [
            "Speak your destination for voice-guided navigation",
            "LiDAR sensors scan for obstacles up to 8 meters ahead",
            "Built-in beacons detect traffic signals",
            "AI algorithms optimize your route in real-time"
        ]
    },
    "pricing information": {
        text: "Smart Cane 2025 is available in several packages:",
        bullets: [
            "Basic Package: $499 (Navigation + Obstacle Detection)",
            "Premium Package: $699 (All features included)",
            "Enterprise Package: Contact for pricing",
            "Monthly subscription plans available"
        ]
    },
    "technical support": {
        text: "We're here to help! Here are your support options:",
        bullets: [
                       "Email: nknileshkumar2.0@gmail.com",
            "Live Chat: Available Mon-Fri, 9AM-6PM EST",
            "Video Tutorials: Available in our Help Center"
        ]
    }
};

// Toggle chat visibility
chatToggle.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active') && chatMessages.children.length === 0) {
        displayBotMessage(initialMessages[0]);
    }
});

closeChat.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

// Send message functionality
const sendUserMessage = () => {
    const message = chatInput.value.trim();
    if (message) {
        displayUserMessage(message);
        chatInput.value = '';
        
        // Process user message and get bot response
        setTimeout(() => {
            const response = processUserMessage(message);
            displayBotMessage(response);
        }, 500);
    }
};

sendMessage.addEventListener('click', sendUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Display messages
function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayBotMessage(response) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Add main text
    const textP = document.createElement('p');
    textP.textContent = response.text;
    messageDiv.appendChild(textP);
    
    // Add bullets if they exist
    if (response.bullets) {
        const ul = document.createElement('ul');
        response.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.textContent = bullet;
            ul.appendChild(li);
        });
        messageDiv.appendChild(ul);
    }
    
    // Add options if they exist
    if (response.options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'message-options';
        response.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                displayUserMessage(option);
                const response = processUserMessage(option);
                setTimeout(() => {
                    displayBotMessage(response);
                }, 500);
            });
            optionsDiv.appendChild(button);
        });
        messageDiv.appendChild(optionsDiv);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user message and return appropriate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // If no exact match, check for keywords
    if (lowerMessage.includes('feature') || lowerMessage.includes('can')) {
        return botResponses["tell me about smart cane features"];
    } else if (lowerMessage.includes('work') || lowerMessage.includes('how')) {
        return botResponses["how does it work"];
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return botResponses["pricing information"];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        return botResponses["technical support"];
    }
    
    // Default response
    return {
        text: "I'm not sure I understand. Could you please choose one of these options?",
        options: [
            "Tell me about Smart Cane features",
            "How does it work?",
            "Pricing information",
            "Technical support"
        ]
    };
} 