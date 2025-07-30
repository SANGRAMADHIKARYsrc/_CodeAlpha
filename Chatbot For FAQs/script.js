const faqs = {
  "what is your return policy": "Our return policy allows returns within 30 days.",
  "how do i track my order": "You can track your order using the tracking ID sent to your email.",
  "what payment methods do you accept": "We accept Credit Card, UPI, and PayPal.",
  "do you ship internationally": "Yes, we ship worldwide with delivery within 10-15 days.",
  "how can i contact support": "You can contact our support team at support@example.com."
};

function sendMessage() {
  const inputField = document.getElementById("userInput");
  const message = inputField.value.trim();

  if (!message) return;

  appendMessage("user", message);
  inputField.value = "";

  const response = getBotResponse(message.toLowerCase());
  setTimeout(() => appendMessage("bot", response), 600);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
  for (let question in faqs) {
    if (userInput.includes(question)) {
      return faqs[question];
    }
  }
  return "Sorry, I couldn’t understand your question. Try asking something else!";
}
