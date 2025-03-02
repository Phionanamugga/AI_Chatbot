function toggleChat() {
    let chatWindow = document.getElementById("chat-container");
    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "flex" : "none";
}

