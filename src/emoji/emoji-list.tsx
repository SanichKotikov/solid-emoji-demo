import { createMemo, createSignal, For, onMount, Show } from 'solid-js';
import { type CompactEmoji } from 'emojibase';
import { BUTTON_SIZE, EmojiButton } from './emoji-button';
import { groups } from './emoji-groups';

const COLUMNS = 9;
const GAP = 10;

function calcContentSize(count: number): number {
  const rows = Math.ceil(count / COLUMNS);
  return (rows * BUTTON_SIZE) + ((rows - 1) * GAP);
}

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
    <div
      role="menu"
      style={{
        'width': '400px',
        'height': '600px',
        'overflow-y': 'auto',
      }}
    >
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
                <div
                  id={group.key}
                  style={{
                    'display': 'grid',
                    'padding': '20px 0',
                    'grid-template-columns': `repeat(${COLUMNS}, 1fr)`,
                    'justify-items': 'center',
                    'gap': `${GAP}px`,
                    // NOTE: Uncomment next lines to increase performance:
                    // 'content-visibility': 'auto',
                    // 'contain-intrinsic-size': `auto ${calcContentSize(items().length)}px`,
                  }}
                >
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
