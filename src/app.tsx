import { type Component } from 'solid-js';
import { EmojiList } from './emoji';

export const App: Component = () => {
  return <EmojiList onClick={console.log} />;
};
