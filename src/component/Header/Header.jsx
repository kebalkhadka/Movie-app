import React from 'react'
import'./Header.css'

const Header = () => {
  return (
       <span className='header' onClick={()=>window.scroll(0,0)}>🎬 movie Hub 🎥</span>
     
  )
}

export default Header