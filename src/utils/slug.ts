export function transformSlug(str: string) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD') // Splits accented characters
    .replace(/[\u0300-\u036f]/g, '') // Removes accent marks
    .replace(/[^a-z0-9 -]/g, '') // Removes invalid chars
    .replace(/\s+/g, '-') // Replaces spaces with hyphens
    .replace(/-+/g, '-'); // Collapses duplicate hyphens
}
