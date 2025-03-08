import { createMemo, createSignal, For, onMount, Show } from 'solid-js';
import { type CompactEmoji } from 'emojibase';
import { EmojiButton } from './emoji-button';
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
          <For each={groups}>
            {(group) => {
              const items = createMemo(() => {
                return list().filter((item) => {
                  return item.group === group.order;
                });
              });

              return (
                <div id={group.key} class={css.group}>
                  <For each={items()}>
                    {(item) => (
                      <EmojiButton
                        label={item.label}
                        unicode={item.unicode}
                        onClick={() => props.onClick(item)}
                      />
                    )}
                  </For>
                </div>
              );
            }}
          </For>
        )}
      </Show>
    </div>
  );
}
