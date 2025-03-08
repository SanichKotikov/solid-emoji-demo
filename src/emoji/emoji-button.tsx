import css from './emoji-button.module.css';

type TProps = {
  label: string;
  unicode: string;
  disabled?: boolean;
  onClick?: VoidFunction;
};

export function EmojiButton(props: TProps) {
  return (
    <button
      role="menuitem"
      aria-label={props.label}
      title={props.label}
      disabled={props.disabled}
      class={css.button}
      onClick={props.onClick}
    >
      {props.unicode}
    </button>
  );
}
