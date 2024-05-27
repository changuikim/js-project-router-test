'use client'

const Search = () => {
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      ">
      <div className="flex flex-row items-center justify-between ">
        <div className="px-6 text-sm font-semibold ">어디든지</div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
          ">
          언제든 일주일
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 text-sm text-gray-600 ">
          <div className="hidden sm:block">게스트 추가</div>
          <div className="p-2 text-white rounded-full bg-rose-500">{/* <BiSearch size={18} /> */}</div>
        </div>
      </div>
    </div>
  )
}

export default Search
