import { createSignal, onMount, Show } from 'solid-js';
import { type CompactEmoji } from 'emojibase';
import { groups } from './emoji-groups';
import css from './emoji-list.module.css';

interface IProps {
  onClick: (emoji: CompactEmoji) => void;
}

export function EmojiList(props: IProps) {
  const [list, setList] = createSignal<CompactEmoji[]>();

  onMount(() => {
    import('emojibase-data/en/compact.json')
      .then((compact) => setList(compact.default))
      .catch(console.error);
  });

  return (
    <div role="menu" class={css.root}>
      <Show when={list()}>
        {(list) => (
          groups.map((group) => {
            const items = list().filter((item) => {
              return item.group === group.order;
            });

            return (
              <div id={group.key} class={css.group}>
                {items.map((item) => (
                  <button
                    role="menuitem"
                    aria-label={item.label}
                    title={item.label}
                    class={css.button}
                    onClick={() => props.onClick(item)}
                  >
                    {item.unicode}
                  </button>
                ))}
              </div>
            );
          })
        )}
      </Show>
    </div>
  );
}
