document.getElementById("generate").addEventListener("click", () => {
  const prompt = document.getElementById("prompt").value.trim();
  if (!prompt) {
    document.getElementById("status").innerText = "Please enter a music prompt.";
    return;
  }

  document.getElementById("status").innerText = "Generating music... please wait.";
  document.getElementById("generate").disabled = true;

  // Simulate music generation
  setTimeout(() => {
    document.getElementById("status").innerText = `Music generated for prompt: "${prompt}"`;
    document.getElementById("listen").disabled = false;
    document.getElementById("download").disabled = false;

    // Load mock audio for demonstration
    const audio = document.getElementById("audioPlayer");
    audio.src = "sample_music.mp3"; // Replace with real generated audio path
    audio.style.display = "block";

    document.getElementById("generate").disabled = false;
  }, 3000);
});

document.getElementById("listen").addEventListener("click", () => {
  const audio = document.getElementById("audioPlayer");
  audio.play();
});

document.getElementById("download").addEventListener("click", () => {
  const audio = document.getElementById("audioPlayer");
  const link = document.createElement("a");
  link.href = audio.src;
  link.download = "generated_music.mp3";
  link.click();
});
