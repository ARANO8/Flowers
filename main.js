onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
};
function PlayAudio() {
  var audio = document.getElementById("audio");
  audio.play();
}

function activarAnimacion() {
  const elementos = document.querySelectorAll(".estilo");
  for (const elemento of elementos) {
    elemento.style.animationPlayState = "running";
  }
}
function ejecutar() {
  PlayAudio();
  activarAnimacion();
}