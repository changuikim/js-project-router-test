'use client'

import Container from '@/app/components/Container'
import Logo from '@/app/components/(common)/images/Logo'
import Search from '@/app/components/navbar/Search'
import UserMenu from '@/app/components/navbar/UserMenu'

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
      <div
        className="
          py-4
          border-b-[1px]          
        ">
        <Container>
          <div className="flex flex-col ">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <UserMenu />
            </div>
            <div className="flex flex-row items-center justify-center">
              <Search />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
