import {Button} from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {useRouter} from 'next/router';
import * as React from 'react';

import {slugify} from '../lib/slugify';
import { savePage } from '../services/pages';
import WysiwygEditor from './WysiwygEditor';

interface Props {
  content?: string;
  title: string;
}

function showTitleErrorCaption(originalSlug: string, newSlug: string): string {
  if (!newSlug) {
    return "Title can't be empty";
  }
  if (originalSlug !== newSlug) {
    return `Original URL /${originalSlug} will redirect to /${newSlug}. Do you want to edit that insted?`; // @FIXME
  }
  return '';
}

export const EditPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const originalSlug = slugify(router.query.slugs ?? []);
  const [content, setContent] = React.useState(props.content ?? '');
  const [slug, setSlug] = React.useState(originalSlug);
  const [title, setTitle] = React.useState(props.title);

  return (
    <>
      <h1>Edit Page</h1>
      <FormControl error={() => showTitleErrorCaption(originalSlug, slug)}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            const {value: newTitle} = e.target as HTMLInputElement;
            setTitle(newTitle);
            setSlug(slugify(newTitle));
          }}
          error={title === ''}
          required
        />
      </FormControl>
      <WysiwygEditor
        initialValue={content}
        onChange={(value) => setContent(value)}
      />
      <Button
        onClick={async () => {
          await savePage({title, content});
          console.dir(router);
          router.push(router.asPath.replace(/\?.*/g, ''));
        }}
      >
        Save
      </Button>
    </>
  );
};
