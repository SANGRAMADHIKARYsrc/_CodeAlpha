async function translateText() {
  const inputText = document.getElementById("inputText").value.trim();
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  if (!inputText) {
    alert("Please enter some text.");
    return;
  }

  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: inputText,
      source: sourceLang,
      target: targetLang,
      format: "text"
    })
  });

  const data = await res.json();

  if (data && data.translatedText) {
    document.getElementById("outputText").textContent = data.translatedText;
  } else {
    document.getElementById("outputText").textContent = "Translation failed.";
  }
}

function copyText() {
  const text = document.getElementById("outputText").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Translated text copied!");
  });
}

function speakText() {
  const text = document.getElementById("outputText").textContent;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
