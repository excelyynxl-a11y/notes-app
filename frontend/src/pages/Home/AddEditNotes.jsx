import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { X } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ 
    noteData,
    type,
    getAllNotes,
    onClose,
    showToastMessage
}) => {
    const [title, setTitle] = useState(noteData?.title || '');
    const [content, setContent] = useState(noteData?.content || '');
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    // add note
    const addNewNote = async () => {
        try {
            const reponse = await axiosInstance.post('/add-note',  {
                title,
                content,
                tags,
            });

            if (reponse.data && reponse.data.note) {
                showToastMessage('Note Added Succesfully')
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error.reponse && error.reponse.data && error.response.data.message) {
                setError(error.reponse.data.message);
            }
        }
    }

    // edit note
    const editNote = async () => {
        const noteId = noteData._id; 

        try {
            const reponse = await axiosInstance.put('/edit-note/' + noteId,  {
                title,
                content,
                tags,
            });

            if (reponse.data && reponse.data.note) {
                showToastMessage('Note Edited Succesfully')
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error.reponse && error.reponse.data && error.response.data.message) {
                setError(error.reponse.data.message);
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError('Please enter title.')
            return; 
        }

        if (!content) {
            setError('Please enter content.')
            return;
        }

        setError('');

        if (type === 'edit') {
            console.log('edit mode');
            editNote();
        } else {
            console.log('add mode')
            addNewNote();
        }
    }
    return (
        <div className='relative'>
            {/* close AddEditNote popup button */}
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
                onClick={onClose}
            >
                <X className='text-xl text-slate-400'/>
            </button>

            {/* title input */}
            <div className='flex flex-col gap-2'>
                <label className='input-label'>
                    TITLE 
                </label>
                <input 
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go to the gym....'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            {/* content input */}
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>
                    CONTENT 
                </label>
                <textarea 
                    type='text'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content'
                    rows={7}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            {/* tags input */}
            <div className='mt-3'>
                <label className='input-label'>
                    TAGS 
                </label>
                <TagInput 
                    tags={tags}
                    setTags={setTags}
                />
            </div>

            {error && <p className='text-red-500 text-xs pt-2'>{error}</p>}

            {/* add button */}
            <button 
                className='btn-primary font-medium mt-5 p-3'
                onClick={handleAddNote}
            >
                {type === 'add' ? 'ADD' : 'EDIT' }
            </button>
        </div>
    )
}

export default AddEditNotes