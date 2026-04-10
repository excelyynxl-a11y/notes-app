import { Search, X } from 'lucide-react'
import React from 'react'

const SearchBar = ({
    value,
    onChange,
    handleSearch,
    onClearSearch,
}) => {
  return (
    <div className='w-50 flex items-center px-4 bg-slate-100 rounded-md'>
        <input 
            type='text'
            placeholder='Search Note'
            className='w-full text-xs bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
        />

        {/* X icon button */}
        {value && (
            <X 
                className='text-xl text-slate-500 cursor-pointer hover:text-black mr-2'
                onClick={onClearSearch}
            />
        )}

        {/* search icon button */}
        <Search 
            className='text-slate-400 cursor-pointer hover:text-black' 
            onClick={handleSearch}
        />
    </div>
  )
}

export default SearchBar