export function removeTag(text: string): string {
  return text.replace(/<(?:.|\n)*?>/gm, '');
}
