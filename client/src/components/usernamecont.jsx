import React from 'react'
import { useState } from 'react'
const Usernamecont = (props) => {

    const following = JSON.parse(localStorage.getItem('followinglist1'))
     
    let followingyes = false;
   

    

  return (
     
    <>
    <div className='namecont'>
        <div className='peoplename'>{props.userinformation.username}</div>
        <div className='followtext' id='followtext'></div>
      
        <button className='followbtn' onClick={props.userinformation.following==true?props.userinformation.unfollowfunc:props.userinformation.followfunc}>{props.userinformation.following==true?'Following':'Follow'}</button>

        <span className='idcont'>{props.userinformation._id}</span>
        <span className='passhold'>{props.userinformation.password}</span>
    </div>
    </>
  )
}

export default Usernamecont
