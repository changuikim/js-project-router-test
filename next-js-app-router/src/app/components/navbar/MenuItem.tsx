'use client'

interface MenuItemProps {
  label: string
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return (
    <div
      className="px-4 py-3 font-semibold transition  hover:bg-neutral-100">
      {label}
    </div>
  )
}

export default MenuItem
