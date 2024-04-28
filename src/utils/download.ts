type DownloadType = "application/json" | "video/webm";

export function download(name: string, object: BlobPart, type: DownloadType) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([object], { type }));
  a.download = name;
  a.click();
}
