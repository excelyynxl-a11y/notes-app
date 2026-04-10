import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { Plus } from 'lucide-react'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null, 
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {}
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      {/* container for displaying NoteCard */}
      <div className='px-10 container mx-auto'>
        <div className='grid grid-cols-3 gap-6 mt-5'>
          <NoteCard 
            title='Meeting'
            date='3rd April 2026'
            content='Meet with agile subteam'
            tags='#meeting'
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      {/* add icon button */}
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ 
            isShown: true,
            type: 'add',
            date: null 
          });
        }}
      >
        <Plus 
          className='text-[32px] text-white'
        />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel=''
        className='w-[60%] max-h-4/4 bg-white rounded-md mx-auto mt-14 p-5'
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {setOpenAddEditModal({
            isShown: false,
            type: 'add',
            data: null, 
          })}}
        />
      </Modal>
    </>
  )
}

export default Home