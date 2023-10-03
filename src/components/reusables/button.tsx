import { ReactNode } from "react";

type Props = {
  onClick: any;
  classes?: string;
  text?: string;
  children: ReactNode;
}

export default function Button({onClick, classes, text, children}: Props) {
  return (
    <button 
      className={`hover:text-slate-700 hover:border-slate-700 dark:hover:border-slate-300 dark:hover:text-slate-300 w-fit`} 
      onClick={onClick}>
      {children}
    </button>
  )
}
