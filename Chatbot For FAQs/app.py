from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

app = Flask(__name__)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Sample FAQ data
faq_data = {
    "What is your return policy?": "Our return policy allows returns within 30 days.",
    "How do I track my order?": "You can track your order using the tracking ID sent to your email.",
    "What payment methods do you accept?": "We accept credit card, PayPal, and UPI.",
    "Do you ship internationally?": "Yes, we offer worldwide shipping.",
    "How can I contact support?": "You can contact our support team at support@example.com."
}

questions = list(faq_data.keys())

def preprocess(text):
    doc = nlp(text.lower())
    return " ".join([token.lemma_ for token in doc if not token.is_stop and not token.is_punct])

processed_questions = [preprocess(q) for q in questions]
vectorizer = TfidfVectorizer().fit(processed_questions)
vectors = vectorizer.transform(processed_questions)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    processed_input = preprocess(user_input)
    user_vec = vectorizer.transform([processed_input])
    similarities = cosine_similarity(user_vec, vectors)
    max_sim_idx = similarities.argmax()
    if similarities[0, max_sim_idx] < 0.3:
        return jsonify({"response": "Sorry, I don't understand your question."})
    return jsonify({"response": faq_data[questions[max_sim_idx]]})

if __name__ == "__main__":
    app.run(debug=True)
