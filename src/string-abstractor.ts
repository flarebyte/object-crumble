import { StringAbstractionRule } from './model.js';

/**
 * Detect an url
 * @category String abstractor
 * @param value the text to check
 * @returns the `url` keyword or false
 */
export const someUrl: StringAbstractionRule = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') ? 'url' : false;

/**
 * Detect a a string from a given list of string
 * @category String abstractor
 * @param name the keyword to return if the detection happens
 * @param options a list of string that would satisfy the detection
 * @returns the `name` keyword or false
 */
export const anyOfString =
  (name: string, options: string[]) => (value: string) =>
    options.includes(value) ? name : false;
