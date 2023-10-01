
type Props = {
  onClick: any;
  classes?: string;
  text?: string;
}

export default function Button({onClick, classes, text}: Props) {
  return (
    <button 
      className={`px-1 border-[1px] rounded-sm w-fit ${classes}`} 
      onClick={onClick}>
      {text || "Button Text"}
    </button>
  )
}
