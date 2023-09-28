
type Props = {
  onClick: any;
  classes?: string;
  text?: string;
}

export default function Button({onClick, classes, text}: Props) {
  return (
    <button className={`border-sm ${classes}`} onClick={onClick}>{text || "Button Text"}</button>
  )
}
