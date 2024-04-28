export async function loadMedia(
  mediaEl: HTMLVideoElement | HTMLAudioElement,
  src: string | MediaStream
) {
  await new Promise<void>((resolve, reject) => {
    if (mediaEl.readyState > 2) resolve();
    mediaEl.onloadedmetadata = async () => {
      resolve();
    };
    mediaEl.onerror = (err) => reject(err);

    if (typeof src === "string") {
      mediaEl.src = src;
    } else {
      mediaEl.srcObject = src;
    }
  });
}

export function createVideoElement() {
  const videoEl = document.createElement("video");
  videoEl.crossOrigin = "anonymous";

  return videoEl;
}

export function createAudioElement() {
  const audioEl = document.createElement("audio");
  audioEl.crossOrigin = "anonymous";

  return audioEl;
}
