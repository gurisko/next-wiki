import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export function generateMarkdown(str: string): string {
  return md.render(str);
}
