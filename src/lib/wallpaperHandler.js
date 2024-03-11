import html2canvas from "html2canvas";

export function getAddressFromSessionStorage() {
  const rawData = sessionStorage.getItem("wallet");
  if (!rawData) throw new Error("connectionError");
  const connectedAddress = rawData.replace(/^__q_strn\|/, "");

  return connectedAddress;
}

const getBase64FromUrl = async (url) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `${url}?__v=${Date.now()}`;
  return new Promise((resolve) => {
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const base64String = canvas.toDataURL("image/png");
      resolve(base64String);
    };
  });
};

export async function createWallpaperImage() {
  const html = document.querySelector(".square");
  const container = document.createElement("div");

  // Copy the attributes and styles from html to container
  const computedStyles = getComputedStyle(html);
  for (const prop of computedStyles) {
    container.style[prop] = computedStyles[prop];
  }
  container.style.position = "fixed";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  container.innerHTML = html.innerHTML;
  container.className = html.className;
  container.id = html.id;
  container.style.height = "844px";
  container.style.borderRadius = 0;
  container.style.borderStyle = "none";
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    onclone: async (_, html) => {
      const images = html.querySelectorAll("img");
      for await (const img of images) {
        if (img.src.includes("data:image")) continue;
        img.src = await getBase64FromUrl(img.src);
      }
    },
  });

  const base64 = canvas.toDataURL("image/png");
  return base64;
}
