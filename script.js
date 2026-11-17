
function selectMedia(type) {
  const input = document.getElementById("media");

  input.accept = type === "image" ? "image/*" : "video/*";
  input.value = "";
  input.click();
}

const mediaInput = document.getElementById("media");
const preview = document.getElementById("preview");

let currentObjectURL = null;

mediaInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  if (currentObjectURL) {
    URL.revokeObjectURL(currentObjectURL);
  }

  currentObjectURL = URL.createObjectURL(file);
  preview.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Prévia do seu arquivo";
  preview.appendChild(title);

  let media;

  if (file.type.startsWith("image/")) {
    media = document.createElement("img");
    media.alt = "Foto selecionada";
  } else if (file.type.startsWith("video/")) {
    media = document.createElement("video");
    media.controls = true;
    media.playsInline = true;
  } else {
    preview.textContent = "Formato não suportado.";
    return;
  }

  media.src = currentObjectURL;
  media.style.width = "100%";
  media.style.maxHeight = "400px";
  media.style.objectFit = "contain";
  media.style.borderRadius = "14px";

  preview.appendChild(media);

  const name = document.createElement("p");
  name.textContent = "Arquivo: " + file.name;
  preview.appendChild(name);
});
