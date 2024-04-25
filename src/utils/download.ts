export function download(name: string, object: BlobPart) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([object], { type: "application/json" })
  );
  a.download = name;
  a.click();
}
