import runSlugify from 'slugify';

export function generateSlug(str: string) {
  // `slugify` ignores `/` characters
  const slugified = str.split('/')
    .map((chunk) => runSlugify(chunk, '_'))
    .join('/');
  // We follow Wikipedia's lead in setting the first letter uppercase
  return slugified.charAt(0).toUpperCase() + slugified.slice(1);
}
