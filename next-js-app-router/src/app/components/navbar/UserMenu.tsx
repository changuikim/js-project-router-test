'use client'

import Profile from '@/app/components/(common)/images/Profile'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100">
          당신의 공간을 에어비엔비하세요
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          ">
          <div className="hidden md:block">
            <Profile />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          ">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="회원가입" />
              <MenuItem label="로그인" />
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
