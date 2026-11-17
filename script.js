
function selectMedia(type) {
  const input = document.getElementById("media");
  input.accept = type === "image" ? "image/*" : "video/*";
  input.value = "";
  input.click();
}

const mediaInput = document.getElementById("media");
const preview = document.getElementById("preview");

let currentURL = null;

mediaInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (currentURL) URL.revokeObjectURL(currentURL);

  currentURL = URL.createObjectURL(file);
  preview.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Seu arquivo selecionado";
  preview.appendChild(title);

  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = currentURL;
    img.style.width = "100%";
    img.style.borderRadius = "14px";
    preview.appendChild(img);

    const button = document.createElement("button");
    button.textContent = "✨ Melhorar minha foto";
    button.style.cssText =
      "width:100%;padding:18px;margin-top:20px;border-radius:12px;background:#9564ed;color:white;font-weight:bold;border:0;font-size:17px";
    button.onclick = () => improvePhoto(img);
    preview.appendChild(button);

  } else if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = currentURL;
    video.controls = true;
    video.playsInline = true;
    video.style.width = "100%";
    preview.appendChild(video);

    const message = document.createElement("p");
    message.textContent =
      "A melhoria de vídeos será disponibilizada na próxima etapa.";
    preview.appendChild(message);
  }
});

function improvePhoto(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter = "brightness(1.06) contrast(1.12) saturate(1.10)";
  ctx.drawImage(img, 0, 0);

  canvas.toBlob(function (blob) {
    if (!blob) {
      alert("Não foi possível processar esta imagem.");
      return;
    }

    const resultURL = URL.createObjectURL(blob);

    const resultTitle = document.createElement("h3");
    resultTitle.textContent = "✨ Sua foto melhorada";
    preview.appendChild(resultTitle);

    const resultImage = document.createElement("img");
    resultImage.src = resultURL;
    resultImage.style.width = "100%";
    resultImage.style.borderRadius = "14px";
    preview.appendChild(resultImage);

    const download = document.createElement("a");
    download.href = resultURL;
    download.download = "CriaLab-foto-melhorada.jpg";
    download.textContent = "⬇️ Salvar foto melhorada";
    download.style.cssText =
      "display:block;text-align:center;padding:18px;margin-top:16px;background:#9564ed;color:white;border-radius:12px;text-decoration:none;font-weight:bold";

    preview.appendChild(download);

  }, "image/jpeg", 0.95);
}
