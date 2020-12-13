import axios from 'axios';

import {isAxiosError} from '../lib/axios';
import {getUrl} from './utils';

export async function* getPages(start = 0, limit = 100) {
  const url = getUrl('pages');
  const {
    data: {_meta: meta, data: pages},
  } = await axios({
    url,
    method: 'GET',
    params: {start, limit},
  });
  for (const page of pages) {
    yield page;
  }
  if (meta.count + meta.start < meta.fullCount) {
    yield* getPages(start + meta.count, limit);
  }
}

export async function getPage(slug: string) {
  try {
    const url = getUrl(`/pages/${slug}`);
    const {data: page} = await axios({
      url,
      method: 'GET',
    });
    return page;
  } catch (err) {
    if (!isAxiosError(err)) {
      throw err;
    }
    return null;
  }
}

export async function savePage(page: any) {
  const {data} = await axios({
    data: page,
    method: 'POST',
    url: getUrl('/pages'),
  });
  return data;
}
