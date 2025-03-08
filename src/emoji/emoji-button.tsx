export const BUTTON_SIZE = 26;

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
      style={{
        'appearance': 'none',
        'display': 'flex',
        'width': `${BUTTON_SIZE}px`,
        'height': `${BUTTON_SIZE}px`,
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': `${BUTTON_SIZE}px`,
        'line-height': 1,
        'background': 'transparent',
        'text-rendering': 'optimizeSpeed',
        'border': 0,
        'cursor': 'pointer',
      }}
      onClick={props.onClick}
    >
      {props.unicode}
    </button>
  );
}
