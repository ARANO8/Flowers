onload = () => {
    PlayAudio();
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
};
function PlayAudio() {
  var audio = document.getElementById("audio");
  audio.play();
}