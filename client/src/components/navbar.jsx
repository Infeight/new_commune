import React from 'react'
import './navbar.css'
import { useNavigate,useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Navbar = () => {

  return (
    <>
    <div className="nav-btns1">
      <div className='profileinfo'>
        <img src="communelogo.png" alt="" />
        <div className="profilename">{localStorage.getItem('current-users').slice(0,11)}</div>
      </div>
    <button className='navbtn' ><Link to={'/Home'}>Home</Link></button>
    <button  className='navbtn'><Link to={'/MyPosts'}>People</Link></button>
    <button className='navbtn'><Link to={'/LikedPosts'}>#Trending</Link></button>
    <button className='navbtn' id=''><Link to={'/chat'}>Chats</Link></button>
    <button className='navbtn'><Link to={'/Profile'}>Profile</Link></button>
</div>
    </>
  )
}

export default Navbar
