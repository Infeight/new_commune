import React from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const alreadyname = localStorage.getItem('current-users')
const alreadypass = localStorage.getItem('current-users-pass')

if(alreadyname!="" && alreadypass !=""){
  await fetch ('https://new-commune-2.onrender.com/alreadylogin',{headers:{accept:'application/json'}})

}
// import React from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// const App = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/5da5bb72-96d6-4259-8dfa-587faa9c0e51/1qJAOfYK4M.lottie"
//       loop
//       autoplay
//     />
//   );
// };


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
  const [showinp,setShowinp] = useState(false);
  
  const followinglist2 = []

if(showinp==true){
  document.getElementById('loading').style.display = 'none';
  document.getElementById('logo').style.display = 'flex'
document.getElementById('input-cont').style.display = 'flex'

}

  useEffect(()=>{
    getlogin();
  },[])

  const handlesignup_anim = ()=>{
    document.getElementById('cover').style.borderRadius = "5px 0px 0px 5px"
    // document.getElementById('cover').getElementsByTagName('iframe').src= 'https://lottie.host/embed/4ed902e0-497a-48fe-a39b-045df9baf9db/4SqjSEaEBR.lottie'
    document.getElementById('signupgif').style.display = 'block'
    document.getElementById('signingif').style.display = 'none'

    document.getElementById("input-cont").style.flexDirection = "row"
    document.getElementById('logincont').style.display = "none"
    document.getElementById('signupcont').style.display = "flex"
  }

  const handlesignin_anim = ()=>{
    document.getElementById('cover').style.borderRadius = "5px 0px 0px 5px"
    document.getElementById('cover').getElementsByTagName('iframe').src = 'https://lottie.host/embed/fe93e82c-38bc-45ec-aa6a-2dc72341d3c1/hO0M5SKM7L.lottie'
    document.getElementById("input-cont").style.flexDirection = "row"
    document.getElementById('signingif').style.display = 'block'
    document.getElementById('signupgif').style.display = 'none'

    document.getElementById('logincont').style.display = "flex"
    document.getElementById('signupcont').style.display = "none"
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
    try{
      let alllogin = await fetch ('https://new-commune-2.onrender.com/login',{headers:{accept:'application/json'}})
      let alllogin1 = await alllogin.json()
       console.log(alllogin1)
      setLogins(alllogin1)
      setShowinp(true);
      clearInterval(loadinterval)
    }
   catch{
    
  document.getElementById('loadingstatement').style.display = 'none'
    document.getElementById('notfound').style.display = 'block'
   document.getElementById('loadingframe').src = 'https://lottie.host/embed/022135e1-57a1-4e84-a7bc-fabf4d41815c/sTQR4TIHQw.lottie'
   }
  }

  const submit = async()=>{
  logins.map(login=>{
    if(login.username===user.username&& login.password === user.password){

      // setNewuser(false)
      localStorage.setItem('current-users',user.username)
      localStorage.setItem('current-users-pass',user.password)
      // localStorage.setItem('current-users-following', user.)
    localStorage.setItem('followinglist1',JSON.stringify(followinglist2))
   document.getElementById('input-cont').style.display = 'none'
   document.getElementById('logo').style.display ='none'
     document.getElementById('welcomebackcont').style.display = 'flex'
      //  fetch('https://new-commune.onrender.com/logins', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
      

    }
    else{
       document.getElementById('wrongpass').style.display = 'initial'
    }
   
  })

 if (newuser==false){
      document.getElementById("username").style.visibility = "visible"
  }
  }

  const submitSignup = async()=>{
  
     if(signup.username==''|| signup.password==''){
 document.getElementById('username1').style.border = '1px solid red'
      document.getElementById('password1').style.border = '1px solid red'
    }
    else{
      localStorage.setItem('current-users',signup.username)
      localStorage.setItem('current-users-pass',signup.password)
   
      localStorage.setItem('followinglist1',JSON.stringify(followinglist2))
      document.getElementById('input-cont').style.display = 'none'
      document.getElementById('logo').style.display = 'none'
      document.getElementById('newusercont').style.display = 'flex'
      await  fetch('https://new-commune-2.onrender.com/signup', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(signup) })
    }

   
   
  
    }
 

    let loadingstatements  = ['Just a moment... Excellence can’t be rushed!',
      'Grabbing the magic wand... Sparkles loading!',
      'Almost there! Great experiences are just seconds away.',
      'We’re cooking up something great—almost done baking!',
      'Loading... This is a great time to take a deep breath!']

    let loadinterval =  setInterval(()=>{
        document.getElementById('loadingstatement').innerText = loadingstatements[Math.floor(Math.random()*5)]
      },3000)

  return (
    <>

    <div className="cont">

      <div className="logo" id='logo'>COMMUNE</div>
      <div className="loading" id='loading'>

      {/* <DotLottieReact
      src="https://lottie.host/5da5bb72-96d6-4259-8dfa-587faa9c0e51/1qJAOfYK4M.lottie"
      loop
      autoplay
    /> */}
    <iframe id='loadingframe' src="https://lottie.host/embed/0779841c-24c8-4da4-b4bb-8b366930a3af/z6EltEHTOI.lottie" frameborder="0"></iframe>

    <p className='loadingstatement' id='loadingstatement'></p>
    <p className='loadingstatement' id='notfound' style={{display:'none'}}>We're sorry for the inconvenience 😔</p>
      </div>

<div className="input-cont" id='input-cont'>

 

    <div className="logincont" id='logincont'> Sign In
<div id='wrongpass' style={{display:'none'}}>Incorrect username or password.<br /> New to Commune? Please sign up!</div>


    <input type="text" name='username' value={user.username} placeholder='Username' id='username' onChange={handleChange}/>
    <input type="text" name='password' value={user.password} placeholder='Password' id='password' onChange={handleChange} />
   <div className='signbtn-holder'>
   <button type='submit' className='submit-btn' onClick={()=>{submit()}}>Log In</button>
   <button  className='submit-btn' onClick={handlesignup_anim}>Sign Up</button>
   </div>

    </div>

    <div className="cover" id='cover'>
      {/* <p id='cover-p'>Log In to Commune!</p> */}
      <iframe id='signingif' style={{display:'block'}} src="https://lottie.host/embed/fe93e82c-38bc-45ec-aa6a-2dc72341d3c1/hO0M5SKM7L.lottie" frameborder="0"></iframe>
      <iframe id='signupgif' style={{display:'none'}} src="https://lottie.host/embed/002408d7-8a31-4096-9651-9d3e0d9bbb03/72dB3Boe0J.lottie" frameborder="0"></iframe>
    </div>

    <div className="signupcont" id='signupcont'> Sign Up

<input type="text" name='username' id='username1' placeholder='Username' value={signup.username}  onChange={handleSignup}/>
<input type="text" name='password' id='password1' placeholder='Password' value={signup.password}  onChange={handleSignup}/>
<input type="text" name='mail' id='mail1' placeholder='E-mail' value={signup.mail} onChange={handleSignup}/>

<div className='signbtn-holder'>
<button type='submit' className='submit-btn' onClick={handlesignin_anim}>Log In</button>

<button type='submit' className='submit-btn' onClick={()=>{submitSignup()}}>Sign up</button>
</div>
</div>

</div>

</div>


<div id='welcomebackcont'>
 
<div className="celebration1">
  <iframe id='celebration' src="https://lottie.host/embed/503bed59-c29d-46eb-935d-a996c60858a3/geOsLMBMTf.lottie" frameborder="0"></iframe>

  </div>

  <p className='welcomeback'>Welcome Back {user.username} !</p>
<button className='navbtn1'  ><Link to={'/Profile'}>Home</Link></button>

</div>

<div id='newusercont'>
  <div className="celebration">
  <iframe id='celebration' src="https://lottie.host/embed/d7852d0f-dbde-43f2-9223-9233d839e93f/9i7ZLGOPeC.lottie" frameborder="0"></iframe>

  </div>
  <p className='welcomeback'>
Welcome to Commune! 🎉 <br />

We're so glad you've joined us.</p>
<button className='navbtn1'  ><Link to={'/Profile'}>Home</Link></button>

</div>

  
    </>
  )
}

export default Login
