import runSlugify from 'slugify';

export function slugify(val: string | string[]) {
  const slugs = Array.isArray(val)
    ? val.reduce(
        (acc, slug) => acc.concat(slug.includes('/') ? slug.split('/') : slug),
        [],
      )
    : [val];
  const slugified = slugs.map((str) => runSlugify(str, '_')).join('/');
  return slugified.charAt(0).toUpperCase() + slugified.slice(1);
}

export function revertSlugify(slug: string) {
  return slug.replace(/_/g, ' ');
}
