(() => {
  "use strict";

  const button = document.getElementById("claimButton");
  const audio = document.getElementById("prankAudio");
  const status = document.getElementById("status");

  if (!button || !audio) return;

  let started = false;

  button.addEventListener("click", async () => {
    if (started) return;

    status.textContent = "Liberando seu prêmio...";
    button.disabled = true;
    button.classList.add("shake");

    // O play() acontece diretamente dentro da ação de clique,
    // aproveitando a interação do usuário e evitando bloqueio de autoplay.
    try {
      audio.currentTime = 0;
      await audio.play();
      started = true;
      status.textContent = "Prêmio liberado! 🎉";
    } catch (error) {
      console.error("Não foi possível reproduzir o áudio:", error);
      button.disabled = false;
      status.textContent =
        "Não foi possível reproduzir o áudio. Toque novamente no botão.";
    }
  });

  audio.addEventListener("ended", () => {
    button.disabled = false;
    button.classList.remove("shake");
    started = false;
    status.textContent = "";
  });

  audio.addEventListener("error", () => {
    console.error("Erro ao carregar audio/premio.mp3");
    status.textContent =
      "Áudio não encontrado. Confira se audio/premio.mp3 está no GitHub.";
    button.disabled = false;
    started = false;
  });
})();
