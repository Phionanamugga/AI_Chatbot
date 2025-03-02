function toggleChat() {
    let chatWindow = document.getElementById("chat-container");
    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "flex" : "none";
}

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    let chatBody = document.getElementById("chat-body");

    let userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.innerText = userInput;
    chatBody.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    setTimeout(() => {
        let botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.innerText = "Hello! How can I assist you?";
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

