
function selectMedia(type) {
  const input = document.getElementById("media");

  if (type === "image") {
    input.accept = "image/*";
  } else {
    input.accept = "video/*";
  }

  input.click();
}

const mediaInput = document.getElementById("media");

mediaInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const message = document.querySelector(".upload p");

  message.textContent =
    "Arquivo selecionado: " + file.name;

  message.style.color = "#a879ff";
});
