function toggleChat() {
    let chatWindow = document.getElementById("chat-container");
    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "flex" : "none";
    async function sendMessage() {
        let userInput = document.getElementById("user-input").value;
        if (!userInput.trim()) return;
    
        let chatBody = document.getElementById("chat-body");
    
        let userMessage = document.createElement("div");
        userMessage.className = "message user-message";
        userMessage.innerText = userInput;
        chatBody.appendChild(userMessage);
    
        document.getElementById("user-input").value = "";
    
        try {
            const response = await fetch('http://localhost:5002/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });
    
            const data = await response.json();
            let botMessage = document.createElement("div");
            botMessage.className = "message bot-message";
            botMessage.innerText = data.reply;
            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            let botMessage = document.createElement("div");
            botMessage.className = "message bot-message";
            botMessage.innerText = "Sorry, something went wrong. Please try again.";
            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
}

