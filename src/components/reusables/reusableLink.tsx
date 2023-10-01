import Link from "next/link"

type Props = {
  classes?: string;
  text?: string,
  linkTo: string,
}

export default function ReusableLink({ linkTo, classes, text }: Props) {
  return (
    <Link className={`px-1 w-fit ${classes}`} href={linkTo}>{text}</Link>
  )
}
