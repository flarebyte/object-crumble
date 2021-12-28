import { StringAbstractionRule } from './model';

export const someUrl: StringAbstractionRule = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') ? 'url' : false;

export const anyOfString =
  (name: string, options: string[]) => (value: string) =>
    options.includes(value) ? name : '';
