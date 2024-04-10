export function mergeClassName(...args: (string | undefined)[]): string {
  return args.filter((arg) => arg !== undefined).join(" ");
}

export function createRepeatBackground(
  base64: string,
  width: number,
  height: number,
  gap: number,
  direction: "col" | "row"
) {
  const outWidth = direction === "col" ? width : width + gap;
  const outHeight = direction === "col" ? height + gap : height;

  const innerWidth = direction === "col" ? width - 1 : gap;
  const innerHeight = direction === "col" ? gap : height - 1;
  const innerText = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${outWidth}" height="${outHeight}"><image width="${innerWidth}" height="${innerHeight}" xlink:href="${base64}" /></svg>`;

  return `url('${innerText}')`;
}
