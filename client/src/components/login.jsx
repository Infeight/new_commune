import React from 'react'
import './login.css'
import { useState,useEffect } from 'react';

const Login = () => {

  let [user,setUser] = useState({
    username:"",
    password:""
  })

  let [signup,setSignup] = useState({
    username:"",
    password:"",
    mail:""
  })

  const [logins,setLogins] = useState([])
  const [newuser,setNewuser] = useState(true)
  
  const followinglist2 = []

  // useEffect(()=>{
  //   userstat();

  // },)

  useEffect(()=>{
    getlogin();
  },[])

  const handlesignup_anim = ()=>{
    document.getElementById('cover').style.borderRadius = "5px 0px 0px 5px"
    document.getElementById('cover-p').innerText = 'Sign Up to Commune!'
    document.getElementById("input-cont").style.flexDirection = "row"
    document.getElementById('logincont').style.display = "none"
    document.getElementById('signupcont').style.display = "flex"
  }

  let name; let value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })

  }
  

  const handleSignup = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignup({ ...signup, [name]: value })

  }


  let getlogin = async()=>{
   let alllogin = await fetch ('https://new-commune.onrender.com/login',{headers:{accept:'application/json'}})
   let alllogin1 = await alllogin.json()

   setLogins(alllogin1)
  }

  const submit = async()=>{
  logins.map(login=>{
    if(login.username==user.username&& login.password == user.password){
      setNewuser(false)
      localStorage.setItem('current-users',user.username)
      localStorage.setItem('current-users-pass',user.password)
      // localStorage.setItem('current-users-following', user.)
    localStorage.setItem('followinglist1',JSON.stringify(followinglist2))

       fetch('https://new-commune.onrender.com/logins', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
      
    }
   
  })
  if(newuser==true){
 handlesignup_anim();

  }
  else if (newuser==false){
      document.getElementById("username").style.visibility = "visible"
  }
  }

  const submitSignup = async()=>{
    localStorage.setItem('current-users',signup.username)
    localStorage.setItem('current-users-pass',signup.password)
    localStorage.setItem('followinglist1',JSON.stringify(followinglist2))

    await  fetch('https://new-commune.onrender.com/signup', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(signup) })
  
    }
 

  // const userstat = async ()=>{
  //   let q= await fetch('https://commune1.onrender.com/logins')
  //   let userstate = await  q.json()
  //   console.log(userstate)
  // }

  // console.log(logins)

  return (
    <>

    <div className="cont">

      <div className="logo">COMMUNE</div>

<div className="input-cont" id='input-cont'>

 

    <div className="logincont" id='logincont'>

    <input type="text" name='username' value={user.username} placeholder='Username' id='username' onChange={handleChange}/>
    <input type="text" name='password' value={user.password} placeholder='Password' id='password' onChange={handleChange} />
   <div className='signbtn-holder'>
   <button type='submit' className='submit-btn' onClick={()=>{submit()}}>Log In</button>
   <button  className='submit-btn' onClick={handlesignup_anim}>Sign Up</button>
   </div>

    </div>

    <div className="cover" id='cover'>
      <p id='cover-p'>Log In to Commune!</p>
    </div>

    <div className="signupcont" id='signupcont'>

<input type="text" name='username' id='username1' placeholder='Username' value={signup.username}  onChange={handleSignup}/>
<input type="text" name='password' id='password1' placeholder='Password' value={signup.password}  onChange={handleSignup}/>
<input type="text" name='mail' id='mail1' placeholder='E-mail' value={signup.mail} onChange={handleSignup}/>
<button type='submit' className='submit-btn' onClick={()=>{submitSignup()}}>Sign up</button>

</div>

</div>

</div>
  
    </>
  )
}

export default Login
