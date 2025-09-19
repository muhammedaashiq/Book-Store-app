import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bi'

function Backbutton() {
  return (
    <div>
        <Link 
            to={destination}
            className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
        />
        <BsArrowLeft className='text-2xl' />
    </div>
  )
}

export default Backbutton