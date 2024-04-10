export function mergeClassName(...args: (string | undefined)[]): string {
  return args.filter((arg) => arg !== undefined).join(" ");
}

export function createRepeatBackground(
  base64: string,
  width: number,
  height: number,
  gap: number
) {
  const innerText = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${
    height + gap
  }"><image width="${
    width - 1
  }" height="${gap}" xlink:href="${base64}" /></svg>`;

  return `url('${innerText}')`;
}
