import { Edit, Pin, Trash } from 'lucide-react'
import React from 'react'
import moment from 'moment';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
  return (
    <div className='border border-gray-400 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>
                    {title}
                </h6>

                <span className='text-sm text-slate-500'>
                    {moment(date).format('Do MMM YYYY')}
                </span>
            </div>

            <Pin 
                className={`icon-btn ${isPinned ? 'text-blue-500' : 'text-slate-600'}`}
                onClick={onPinNote}
            />
        </div>

        <p className='text-xs text-slate-800 mt-2'>
            {content?.slice(0, 60)}
        </p>

        <div className='flex items-center gap-2 mt-2'>
            <div className='text-xs text-slate-500'>
                {tags.map((item, index) => `#${item} `)}
            </div>

            <div className='flex items-center gap-2'>
                <Edit 
                    className='icon-btn hover:text-green-600'
                    onClick={onEdit}
                />
                <Trash 
                    className='icon-btn hover:text-red-500'
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard