import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './home'
import MyPosts from './MyPosts'
import LikedPosts from './LikedPosts'
import Navbar from './navbar'

import { IoMdSettings } from "react-icons/io";

import './profile.css'
import './MyPosts.css'

const Profile = () => {
  const[show,setShow] = useState(false)
  const [followerno, setFollowerno] = useState('');
  const [followingno, setFollowingno] = useState('')
  const [currentuser_id, setCurrentuser_id] = useState({
    userId: ""
  })

  let curuser = localStorage.getItem('current-users')
  const curuser1 = localStorage.getItem('current-users')
  console.log(curuser)
  const [image, setImage] = useState({
    file: null,
    url: ""
  })

  const curuserpass = localStorage.getItem('current-users-pass')
  const followinglist = []

  useEffect(() => {
    allusers()
  }, [])
  useEffect(()=>{
    posts1()
  },[])
 

  if(show==true){
    document.getElementById('loading').style.display = 'none'
    document.getElementById('profile').style.display = window.innerWidth<='600px'?'flex':'grid'
    
  }
  

  const deleteCookie = (name) => {
    document.cookie = `${name}=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    console.log(`Cookie "${name}" deleted.`);
  };

  console.log(document.cookie)

  const handlelogout = async () => {
    localStorage.removeItem('current-users')
    localStorage.removeItem('current-users-pass')
    localStorage.removeItem('curuserid')
    deleteCookie('user');
    console.log(document.cookie)
 
  }
  const conflogout = () => {
    document.getElementById('confirmdel1').style.display = 'flex'
  }

  const handleimage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
    document.querySelector('.selectimg').style.display = 'none'
  }

  const updatepic = () => {

    if (document.getElementById('newprofilepic').files.length != 0) {
      document.getElementById('picupdateform').submit()


      document.getElementById('post-btn1').style.display = "none"
    }
    else {
      document.querySelector('.profilepicture').style.display = "initial"
      document.querySelector('.picupdateform').style.display = "none"
      document.getElementById('post-btn1').style.display = "none"
    }
  }

  localStorage.setItem('followinglist1', JSON.stringify(followinglist))

  const updateholdclose = () => {
    document.getElementById('updatehold').style.display = 'none'
    document.getElementById('update-cancel').style.display = 'none'
    document.getElementById('profile-det').style.gridTemplateRows = 'max-content 65%'
  }

  const updateprofilepic = () => {
    document.querySelector('.profilepicture').style.display = "none"
    document.getElementById('profilepicture2').style.display = "initial"
    document.querySelector('.selectimg').style.display = 'flex'
    document.querySelector('.picupdateform').style.display = "flex"
    document.getElementById('post-btn1').style.display = "flex"
  }

  const cancelpicupdate = () => {
    document.querySelector('.profilepicture').style.display = "initial"
    document.getElementById('profilepicture2').style.display = 'none'
    document.querySelector('.picupdateform').style.display = "none"
    document.getElementById('post-btn1').style.display = "none"
    document.querySelector('.selectimg').style.display = 'none'

    setImage({
      file: null,
      url: ''
    })
  }

  const allusers = async () => {
    let followers = []
    let userdet = {
      username: curuser,
      password: curuserpass
    }
    let allusers1 = fetch('https://new-commune-2.onrender.com/login1', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userdet) })
    let profilepic = fetch('https://new-commune-2.onrender.com/profilepic1', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userdet) })
    const user_id = fetch('https://new-commune-2.onrender.com/user_id', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userdet) })
    let user_id1;

    user_id.then(response => response.json()).
      then(data => {
        console.log(data.userid._id)
        setCurrentuser_id({ 'userId': data.userid._id })
        localStorage.setItem('curuserid', data.userid._id)
      }
      )

    try {
      profilepic.then(response => response.json()).then(data => {
        console.log(data)
        if (data.profilepicture) {

          const arr = data.profilepicture.profile.data.data
          console.log('yes')
          const base64String =

            btoa(
              arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
          document.getElementById('profilepicture1').src = `data:image/png;base64,${base64String}`
        }
        else {
          document.getElementById('profilepicture1').src = `facelogo.jpeg`
        }
      })
    }
    catch (err) {
      document.getElementById('profilepicture1').src = `facelogo.jpeg`
    }


    allusers1.then(response => response.json()).then(data => {
      setShow(true);
      
      data.logins1.followers.map(follower => {
        const followerli = document.createElement('li')
        followerli.className = "followerli"
        followerli.innerText = follower.name
        document.getElementById('followers').appendChild(followerli)
      });

      data.logins1.following.map(follower => {
        followers.push(follower)
        const followingli = document.createElement('li')
        followingli.className = "followerli"
        followingli.innerText = follower.name
        document.getElementById('following').appendChild(followingli)
      });

      setFollowerno(data.logins1.followers.length)
      setFollowingno(data.logins1.following.length)
    })



    document.getElementById('update-btn').addEventListener("click", () => {
      const updatebtn = document.getElementById('update-btn')
      if (updatebtn.ariaValueText == 'off') {
        updatebtn.style.transform = 'rotate(90deg)'
        if (document.getElementById('update-options').style.display == "none") { document.getElementById('update-options').style.display = "initial" }
        document.getElementById('update-options').style.left = "1vw"
        document.getElementById('update-options').style.visibility = "visible"

        document.getElementById('update-options').style.opacity = "1"
        updatebtn.ariaValueText = 'on'
      }
      else if (updatebtn.ariaValueText == 'on') {
        updatebtn.style.transform = 'rotate(0)'
        document.getElementById('update-options').style.opacity = "0"
        document.getElementById('update-options').style.visibility = "hidden"
        document.getElementById('update-options').style.left = "-5vw"
        updatebtn.ariaValueText = 'off'
      }
    })

    document.querySelectorAll('.update-options-btns').forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.getElementById('updatehold').style.display = 'flex'
        document.getElementById('profile-det').style.gridTemplateRows = '50% 50%'
        document.getElementById('update-options').style.display = "none"
        document.getElementById('update-cancel').style.display = 'initial'
        document.getElementById('update-btn').ariaValueText = 'off'
        console.log(e.target.innerText)
        const profileupdatebtn = document.getElementById('prof-update-btn')
        if (e.target.innerText == 'E mail') {

          document.getElementById('update-input').placeholder = 'Enter new E mail'
        }
      })
    })
  }


  const deletepost = async (e) => {
    document.getElementById('confirmdel').style.display = 'flex'
    document.getElementById('homeprofile').style.opacity = '50%'
    document.getElementById('confdel').addEventListener('click', async () => {
      document.getElementById('homeprofile').removeChild(e.target.closest('.postdisp'))
      let del_id = e.target.querySelector('.postid').innerHTML
      let del_id_det = {
        delid: del_id,
      }
      document.getElementById('confirmdel').style.display = 'none'
      document.getElementById('homeprofile').style.opacity = '100%'
      await fetch('https://new-commune-2.onrender.com/delpost', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(del_id_det) })
    })
    document.getElementById('cancdel').addEventListener('click', async () => {
      document.getElementById('confirmdel').style.display = 'none'
      document.getElementById('homeprofile').style.opacity = '100%'
    })
  }

  
  const posts1 = async () => {

    let userdata = {
      username: localStorage.getItem("current-users"),
      password: localStorage.getItem("current-users-pass")
    }

    const allPosts = await fetch('https://new-commune-2.onrender.com/myPost', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userdata) })
    const allPosts1 = await allPosts.json()
    const allpostsrev = allPosts1.reverse()

    allpostsrev && allpostsrev.forEach(element => {
      let arr = element.post.data.data
      const base64String =
        btoa(
          arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

      const postdisp = document.createElement("div")
      const postimgholder = document.createElement("div")
      const postimg = document.createElement("img")
      const postcomment = document.createElement("div")
      const postowner = document.createElement('div')
      const postcomment_hold = document.createElement("div")
      const postlike = document.createElement('div')
      const commdisp = document.createElement('div')
      const likesym = document.createElement('span')
      const date = document.createElement('div')
      const deletebtn = document.createElement('button')
      const postid = document.createElement('span')

      postid.className = 'postid'
      postid.innerHTML = element._id
      postid.style.display = 'none'
      deletebtn.innerText = 'Delete'
      deletebtn.id = 'delbtn1'
      deletebtn.className = 'postlike'
      deletebtn.appendChild(postid)
      postimg.className = "postimg"
      postcomment.className = "postcomment"
      postimg.src = `data:image/png;base64,${base64String}`
      postimg.type = 'images/base64'
      postcomment_hold.innerText = element.caption
      postimgholder.className = "post-img-cap"
      postdisp.className = "postdisp"
      postowner.className = 'postowner'
      postowner.id = 'postowner1'
      postcomment_hold.className = "postcomment_hold"
      postlike.className = 'postlike'
      postlike.id = 'postlike1'
      commdisp.className = 'commdisp'
      commdisp.id = 'commdisp1'
      commdisp.innerText = 'No comments yet'
      likesym.className = 'likesym'
      date.className = 'date'
      likesym.innerText = '❤️'
      date.innerHTML = `Posted on ${element.date}`


      element.comments.forEach(e => {
        const comhold = document.createElement('div')
        const com = document.createElement("li")
        const commentor = document.createElement("li")
        commentor.className = 'commentli'
        commentor.id = 'commentor'
        comhold.className = "commentli"
        comhold.id = "comhold"
        com.id = 'commentli1'
        com.innerHTML = e.comment
        commentor.innerHTML = e.username

        if (commdisp.innerText == 'No comments yet') {
          commdisp.innerText = ''
        }
        comhold.appendChild(com)
        comhold.appendChild(commentor)
        commdisp.appendChild(comhold)
      })

      deletebtn.addEventListener('click', deletepost)
      postlike.innerText = `${element.likes}`
      postlike.appendChild(likesym)
      postcomment.appendChild(postcomment_hold)
      postcomment.appendChild(postowner)
      postowner.appendChild(postlike)
      postowner.appendChild(deletebtn)
      postowner.appendChild(commdisp)
      postimgholder.appendChild(postimg)
      postimgholder.appendChild(postcomment)
      postdisp.appendChild(postimgholder)
      postdisp.appendChild(date)

      document.getElementById("communeload").style.display = "none"
      document.getElementById("homeprofile").appendChild(postdisp)
    })
  }

  return (
    <>
          <Navbar />

          <div className="loading" id='loading'>
<iframe id='loadingframe' src="https://lottie.host/embed/0779841c-24c8-4da4-b4bb-8b366930a3af/z6EltEHTOI.lottie" frameborder="0"></iframe>

<p className='loadingstatement' id='loadingstatement'></p>
<p className='loadingstatement' id='notfound' style={{display:'none'}}>We're sorry for the inconvenience 😔</p>
</div>

      <div className='profile' id='profile' style={{display:'none'}}>
        <div className="logo-name">COMMUNE</div>
        <div className='profilepic' id='profilepic'>
          <div className="profilepic1"><img src='' onClick={updateprofilepic} id='profilepicture1' className='profilepicture' alt="" />
            <img src={image.url ? image.url : ''} style={{ position: 'absolute' }} onClick={updateprofilepic} id='profilepicture2' className='profilepicture' alt="" />
          </div>

          <label htmlFor="newprofilepic">
            <div className='selectimg' style={{ position: 'absolute' }}>Select Picture</div>
          </label>
          {/* {console.log(currentuser_id.userId)} */}
          <form style={{ position: 'absolute' }} id='picupdateform' className='picupdateform' action="https://new-commune-2.onrender.com/profilepic" method='post' encType='multipart/form-data'>
            <input type="file" style={{ display: 'none' }} onChange={handleimage} name="newprofilepic" id='newprofilepic' />
            <input value={curuser} name='username' style={{ display: 'none' }} />
            <input value={curuserpass} name='userpass' style={{ display: 'none' }} />
            <input value={localStorage.getItem('curuserid')} name='userId' style={{ display: 'none' }} />
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

       

{/* Your posts */}




<div className="home" id='homeprofile' >
 <div className="yourposthead">Your Posts</div>

 <div className = "communeload" id='communeload' >
<iframe id='loadinganime' src="https://lottie.host/embed/fb7368f5-4618-4c6d-a8da-641058d0018c/2i41WWJ7M2.lottie" frameborder="0"></iframe>
    </div> 
 </div>
 <div className='confirmdel' id='confirmdel'>⚠ This post gets deleted permanently.
  <div style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
  <button id='cancdel'>Cancel</button>
  <button id='confdel'>Delete</button></div>
 </div>


{/* End of your posts */}


<div className='confirmlogout' id='confirmdel1'>
  <iframe style={{ width: '25%', height: '50%' }} src="https://lottie.host/embed/7e551e9a-b560-4cbc-bd23-bbad97d95a03/LQemBCcnYs.lottie" frameborder="0"></iframe>
  Are you sure you want to Log out ?
  <div style={{ display: 'flex', width: '40%', marginTop: '2vw', justifyContent: 'space-evenly' }}>
    <button id='cancdel' className='Nobtn' onClick={() => { document.getElementById('confirmdel1').style.display = 'none' }}>No</button>
    <button id='confdel' className='logoutyesbtn' onClick={handlelogout}><Link to={'/'}>Log out</Link></button></div>
</div>
<button id='logoutbtn' onClick={conflogout}>Log Out</button>

</div>


      {/* <div className="nav-btns" id='nav-btns'>
        <button id='homebtn'><Link to={'/Home'}>Home</Link></button>
        <button><Link to={'/MyPosts'}>Posts</Link></button>
        <button><Link to={'/LikedPosts'}>#Trending</Link></button>
        <button id=''><Link to={'/chat'}>Chats</Link></button>
        <button><Link to={'/Profile'}>Profile</Link></button>
      </div> */}
    </>
  )
}

export default Profile
