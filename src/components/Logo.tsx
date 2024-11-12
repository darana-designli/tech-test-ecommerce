import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/">
      <span className="sr-only">Your Company</span>
      <Image
        alt=""
        src="/next.svg"
        className="h-8 w-auto"
        width={20}
        height={20}
      />
    </Link>
  )
}
