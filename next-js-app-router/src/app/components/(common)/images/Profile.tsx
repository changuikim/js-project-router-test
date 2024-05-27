'use client'

import Image from 'next/image'

const Profile = () => {
  return (
    <Image
      priority={true}
      className="rounded-full"
      height={30}
      width={30}
      alt="Profile"
      src="/images/placeholder.svg"
    />
  )
}

export default Profile
