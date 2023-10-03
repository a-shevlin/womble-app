import Link from "next/link"
import { ReactNode } from "react";

type Props = {
  classes?: string,
  text?: string,
  linkTo: string,
  children: ReactNode,
}

export default function ReusableLink({ linkTo, classes, text, children }: Props) {
  return (
    <Link className={`hover:text-slate-700 dark:hover:text-slate-300 w-fit ${classes}`} href={linkTo}>{children}</Link>
  )
}
