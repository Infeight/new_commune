import React from 'react'

import './home.css'
import './MyPosts.css'
import './people.css'
import Usernamecont from './usernamecont'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

const People = () => {

  const [allusernames,setAllusernames] = useState([]);
  const [search,setSearch] = useState('');
  // localStorage.removeItem()

 const followinglist = JSON.parse(localStorage.getItem('followinglist1'))

//  cont[follow]


  useEffect(()=>{
    allusers();
  },[])


  const handleaccountfollow = (e)=>{

    const username = e.target.closest('.namecont').querySelector('.peoplename').innerText
    const password =  e.target.closest('.namecont').querySelector('.passhold').innerHTML
    const id = e.target.closest('.namecont').querySelector('.idcont').innerText
   let curuser = localStorage.getItem('current-users')
   let curuserpass = localStorage.getItem('current-users-pass')
   let followdetails = {
    username:username,
    password:password,
    curuser:curuser,
    curuserpass: curuserpass
  
   }
  
   fetch('https://new-commune-3.onrender.com/follow',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(followdetails)})
   
       e.target.innerText = "Following"
     
      e.target.removeEventListener("click",handleaccountfollow)
      e.target.addEventListener("click",handleacctunfollow)
      followinglist.push({
        name:username,id: id
       })

       localStorage.removeItem('followinglist1')
       localStorage.setItem('followinglist1',JSON.stringify(followinglist))
  
      // setOpenacct1(!openacct1)
    
  }


  const handleacctunfollow = (e)=>{
    const username = e.target.closest('.namecont').querySelector('.peoplename').innerText
    const password =  e.target.closest('.namecont').querySelector('.passhold').innerHTML
    const id = e.target.closest('.namecont').querySelector('.idcont').innerText
  
   let curuser = localStorage.getItem('current-users')
   let curuserpass = localStorage.getItem('current-users-pass')
   let followdetails = {
    username:username,
    password:password,
    curuser:curuser,
    curuserpass: curuserpass
   }
  
   fetch('https://new-commune-3.onrender.com/unfollow',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(followdetails)})
  
   setTimeout(()=>{
    e.target.innerText = "Follow"
  },100)
  
   e.target.removeEventListener("click",handleacctunfollow)
   e.target.addEventListener("click",handleaccountfollow)
  
   followinglist.pop({
    name:username,id: id
   })
  
   localStorage.removeItem('followinglist1')
   localStorage.setItem('followinglist1',JSON.stringify(followinglist))
  //  setOpenacct1(!openacct1)
  }



  const allusers = async() =>{
       const alluserdet = await fetch('https://new-commune-3.onrender.com/alluserdet',{headers:{accept:'application/json'}}) 
       const alluserdet1 = await alluserdet.json();
       setAllusernames(alluserdet1)
//  console.log(alluserdet1)
     
  }

  //    const namecont = document.createElement('div')
  //    const name = document.createElement('div')
  //    const followbtn = document.createElement('button')
  //    const idcont = document.createElement('span')
  //    const passhold= document.createElement('span');

  //    name.className = 'peoplename'
  //    namecont.className = 'namecont'
  //    followbtn.className = 'followbtn'
  //    idcont.className = 'idcont'
  //    passhold.className = 'passhold'

  //    name.innerText = names.username;
  //    passhold.innerText = names.password;

  //   followbtn.innerText = 'Follow'
  //   followbtn.addEventListener('click',handleaccountfollow);
  //     // console.log(followinglist)
  //   

  //   //  followbtn.innerText = 'follow';
  //    idcont.innerText = names._id

  //    namecont.appendChild(name)
  //    namecont.appendChild(followbtn)
  //    namecont.appendChild(idcont)
  //    namecont.appendChild(passhold)

  // document.getElementById('home').appendChild(namecont);


  


  return (
    <>
      <Navbar />
     <div className="home" id='home'>
     <div className="logohome">COMMUNE
    <div className="logoanim">
    <iframe src="https://lottie.host/embed/34d1a88f-3548-427c-8957-4b232d15e76c/zN3N8fdCZp.lottie" frameborder="0"></iframe>
    </div>
  </div>
          <div className="searchbar">
            <input placeholder='Search people...' type="text" id='searchinput' onChange={(e)=>{setSearch(e.target.value)}}/>
            {
                allusernames && allusernames.filter((item)=>{
                  return search.toLowerCase()===''?item:
                  item.username.toLowerCase().includes(search);
                }).map(names=>{

                  let followingyes = false; 
                  let followtext =   followinglist.map(following=>{
                    if(following.id===names._id ){
                      return 'Following';
                    }
                    else{return 'Follow'}
                    
                   })

                   let i=0; 
                   for(i;i<followtext.length;i++){
                       if(followtext[i]=='Following'){
                           followingyes = true;
               
                           break;
                       }
                   }
                  //  console.log(followingyes)
                 const userinfo = {
                    username: names.username,
                    password: names.password,
                    _id:names._id,
                    followfunc: handleaccountfollow,
                    unfollowfunc:handleacctunfollow,
                    following: followingyes
              
                  }
              
                  return <Usernamecont userinformation={userinfo} />
                })
            }
          </div>
     </div>
    </>
  )
}

export default People
