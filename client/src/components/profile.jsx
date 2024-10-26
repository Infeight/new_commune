import React from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Home from './home'
import MyPosts from './MyPosts'
import LikedPosts from './LikedPosts'
import { IoMdSettings } from "react-icons/io";

import './profile.css'
const Profile = () => {

  const [followerno,setFollowerno] = useState('');
  const [followingno,setFollowingno] = useState('')
  const [currentuser,setCurrentuser]= useState({
    username:""
  })

  let curuser = localStorage.getItem('current-users')
  const curuser1 = localStorage.getItem('current-users')
  const[image,setImage]  = useState({
    file:null,
    url :""
  })

  const curuserpass = localStorage.getItem('current-users-pass')
  const followinglist =[]

useEffect(()=>{
  allusers()
},[])

const handleimage = (e)=>{
  if(e.target.files[0]){
  setImage({
    file: e.target.files[0],
    url:URL.createObjectURL(e.target.files[0])
  })
}
document.querySelector('.selectimg').style.display = 'none'
}

const updatepic = ()=>{

  if(document.getElementById('newprofilepic').files.length!=0){
    document.getElementById('picupdateform').submit()
  document.getElementById('post-btn1').style.display = "none"
  }
  else{
      document.querySelector('.profilepicture').style.display = "initial"
  document.querySelector('.picupdateform').style.display = "none"
  document.getElementById('post-btn1').style.display = "none"
  }
}

localStorage.setItem('followinglist1',JSON.stringify(followinglist))

const updateholdclose = ()=>{
  document.getElementById('updatehold').style.display = 'none'
 document.getElementById('update-cancel').style.display ='none'
 document.getElementById('profile-det').style.gridTemplateRows = 'max-content 65%'
}

const updateprofilepic = ()=>{
  document.querySelector('.profilepicture').style.display = "none"
  document.getElementById('profilepicture2').style.display = "initial"
  document.querySelector('.selectimg').style.display = 'flex'
   document.querySelector('.picupdateform').style.display = "flex"
   document.getElementById('post-btn1').style.display = "flex"
}

const cancelpicupdate = ()=>{
  document.querySelector('.profilepicture').style.display = "initial"
  document.getElementById('profilepicture2').style.display = 'none'
  document.querySelector('.picupdateform').style.display = "none"
  document.getElementById('post-btn1').style.display = "none"
  document.querySelector('.selectimg').style.display = 'none'

  setImage({
    file:null,
    url:''
  })
}

  const allusers = async()=>{
    let followers=[]
    let allusers1 = await fetch('http://localhost:5004/login',{headers:{accept:'application/json'}})
    let profilepic = await fetch('http://localhost:5004/profilepic',{headers:{accept:'application/json'}})
    const user_id = await fetch('http://localhost:5004/user_id',{headers:{accept:'application/json'}})

    let allusers11 = await allusers1.json()
    let profilepic1
   try{
     profilepic1= await profilepic.json()
   }
   catch(err){
     profilepic1 = {
      profile:{},
      username:"",
      password:""
     }
     document.getElementById('profilepicture1').src = `facelogo.jpeg`
   }
    

      if(profilepic1.username == curuser && profilepic1.password == curuserpass){
        const arr = profilepic1.profile.data.data

        const base64String = 
    
             btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
             );
  
              document.getElementById('profilepicture1').src = `data:image/png;base64,${base64String}`
      }

    allusers11.map(elem=>{
    if(elem.username == curuser && elem.password === curuserpass){
    localStorage.setItem('curuserid',elem._id)
      let followerno = elem.followers.length
      let followingno = elem.following.length

      elem.followers.map(follower=>{
        const followerli = document.createElement('li')
        followerli.className = "followerli"
        followerli.innerText = follower.name
        document.getElementById('followers').appendChild(followerli)
      })
      
      localStorage.setItem('followinglist2',JSON.stringify(elem.following))
      
      elem.following.map(follower=>{
        followers.push(follower)
        const followingli = document.createElement('li')
        followingli.className = "followerli"
        followingli.innerText = follower.name
        document.getElementById('following').appendChild(followingli)
      })
       
      setFollowerno(followerno)
      setFollowingno(followingno)
    }})


    document.getElementById('update-btn').addEventListener("click",()=>{
      const updatebtn = document.getElementById('update-btn')
      if( updatebtn.ariaValueText =='off' ){
         updatebtn.style.transform = 'rotate(90deg)'
       if(document.getElementById('update-options').style.display == "none"){document.getElementById('update-options').style.display = "initial"}
                document.getElementById('update-options').style.left = "1vw"
        document.getElementById('update-options').style.visibility = "visible"

        document.getElementById('update-options').style.opacity = "1"
        updatebtn.ariaValueText ='on'
      }
      else if(updatebtn.ariaValueText =='on'){
         updatebtn.style.transform = 'rotate(0)'
        document.getElementById('update-options').style.opacity = "0"
        document.getElementById('update-options').style.visibility = "hidden"
        document.getElementById('update-options').style.left = "-5vw"
        updatebtn.ariaValueText ='off'
      }
    })

document.querySelectorAll('.update-options-btns').forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    document.getElementById('updatehold').style.display = 'flex'
    document.getElementById('profile-det').style.gridTemplateRows = '50% 50%'
     document.getElementById('update-options').style.display = "none"
     document.getElementById('update-cancel').style.display = 'initial'
     document.getElementById('update-btn').ariaValueText = 'off'
     console.log(e.target.innerText)
     const profileupdatebtn = document.getElementById('prof-update-btn')
     if(e.target.innerText=='E mail'){
      
      document.getElementById('update-input').placeholder = 'Enter new E mail'
     }
  })})
}

  return (
   <>
<div className='profile'>
<div className="logo-name">COMMUNE</div>
<div className='profilepic' id='profilepic'> 
    <div className="profilepic1"><img src='' onClick={updateprofilepic} id='profilepicture1' className='profilepicture' alt="" />
    <img src={image.url?image.url:''} style={{position:'absolute'}}  onClick={updateprofilepic}  id='profilepicture2' className='profilepicture' alt="" />
    </div>

    <label htmlFor="newprofilepic">
      <div className='selectimg' style={{position:'absolute'}}>Select Picture</div>
    </label>

    <form style={{position:'absolute'}} id='picupdateform' className='picupdateform' action="hhttp://localhost:5004/profilepic" method='post' encType='multipart/form-data'>
          <input type="file" style={{display:'none'}} onChange={handleimage} name="newprofilepic" id='newprofilepic' />
          
          <div className="post-btn" id='cancelpic' onClick={cancelpicupdate}>Cancel</div>


        </form>
        <button id='post-btn1' className='post-btn' type='' onClick={updatepic}>Update</button>

</div>
<div className="profile-det " id='profile-det'>
   
        <li className='username'>
          <div className="username" id='username-update-hold'>
            <div className="username">{curuser}</div>
            <div id="update-btn" aria-valuetext='off'><IoMdSettings /></div>
            <div id='update-options'> 
              <div className='update-options-btns'>Username</div>
              <div className='update-options-btns'>Password</div>
              <div className='update-options-btns'>E mail</div>
              </div>
              <button id='update-cancel' onClick={updateholdclose}>Cancel</button>
          </div>

        <div className='updatehold' id='updatehold'><input id='update-input' type="text" />
        <button className='prof-update-btn' id='prof-update-btn' onClick={updateholdclose}>Update</button></div>
        </li>

        <div className="followers" id='followers'>  <h6>Followers ({followerno})</h6>        </div>
        <div className="following" id='following'> <h6>Following ({followingno})</h6>    </div>
  
</div>

</div>
<div className="nav-btns" id='nav-btns'>
    <button id='homebtn'><Link to={'/Home'}>Home</Link></button>
    <button><Link to={'/MyPosts'}>Posts</Link></button>
    <button><Link to={'/LikedPosts'}>#Trending</Link></button>
    <button id=''><Link to={'/chat'}>Chats</Link></button>
    <button><Link to={'/Profile'}>Profile</Link></button>
</div>
   </>
  )
}

export default Profile
