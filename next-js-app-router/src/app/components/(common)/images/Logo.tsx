'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      priority={true}
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height={100}
      width={100}
      src="/images/logo.svg"
      style={{ height: 'auto', width: 'auto' }}
    />
  )
}

export default Logo
