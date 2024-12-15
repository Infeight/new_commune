import React, { Fragment } from 'react'
import { useEffect,useState,useMemo } from 'react'
import './home.css'
import './medqhome.css'
import InputEmoji from "react-input-emoji";
import Navbar from './navbar'
import MovingText from 'react-moving-text'
import { Link,useLocation } from 'react-router-dom'
import Post from './post'
import likedpoststest from '../js/posts';

const Home1 = () => {
  

  let curuser = localStorage.getItem('current-users')
  const curuserpass = localStorage.getItem('current-users-pass')
  let curuserid = localStorage.getItem('curuserid')
  const postsarr = [];

 const followinglist = JSON.parse(localStorage.getItem('followinglist1'))
  const [load,setLoad] = useState(true)
  const [load1,setLoad1] = useState(true)

 const [followstat,setFollowstat] = useState(false)
 const [acctclose,setAcctclose] = useState(false)
 const [openacct1,setOpenacct1] = useState(true)
 const [followerlist,setFollowerlist] = useState([]);
const [allpostdata,setallpostdata] = useState([]);
const [profilephoto,setProfilephoto] = useState([]);


  const[newComment,setNewComment] = useState({
    comment:"",
    postid:""
  })
  const[founduser,setFounduser]=useState({
    username:"",
    user_id:"",
    followerno:'',
    followingno:'',
    password:''
  })

  const[likedposts1,setLikedposts1] = useState([])



  useEffect(()=>{

  posts()

  },[])

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     allpostsappend()
  //   },1000)  
  //     },[])
  // openacct1

if(load == false){
  document.getElementById('communeload').style.display = "none"
}

// if(load1 == false){
//   document.getElementById('communeload1').style.display = "none"
// }



const handlecommentsend = async(e)=>{
  e.target.closest(".postowner").classList.remove('click')
  e.target.closest(".postowner").closest(".postcomment").querySelector(".postcomment_hold").classList.remove('click')
  e.target.closest(".postowner").querySelector(".postcomments_user").classList.remove('click')
  e.target.classList.remove('click')
  let comment = e.target.closest(".postowner").querySelector(".postcomments_user").value
  let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

  let commentinfo = {
    comment: comment,
    postid:postid,
    username:curuser
  }

  if(comment!=""){
    fetch('https://new-commune-3.onrender.com/comment', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(commentinfo) })

  }

e.target.closest(".postowner").querySelector(".postcomments_user").value = ""
let newcomli = document.createElement("li")
newcomli.className = "commentli"
newcomli.innerText = comment
e.target.closest('.postdisp').querySelector('.allcommentshold').appendChild(newcomli)
}

const handlelikes = async(e)=>{
  e.target.closest(".postowner").querySelector(".postlike").removeEventListener("click",handlelikes)
  e.target.closest(".postowner").querySelector(".postlike").addEventListener("click",handleremovelikes)
e.target.closest('.postowner').querySelector('.postlike').querySelector('.likesym').innerText = '❤️'
e.target.closest('.postowner').querySelector('.postlike').querySelector('.likesym').style.animationName = 'liked'
 let curlikes =  e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML
 curlikes = Number.parseInt(curlikes)+1

 let likes =curlikes
 let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

 let likeinfo = {
   likes: likes,
   postid:postid,
   username: curuser,
   user_id:curuserid,
   password:curuserpass
 }

fetch('https://new-commune-3.onrender.com/likes', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(likeinfo) })
 e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML = `${curlikes}`
}

const handleremovelikes = async(e)=>{
  e.target.closest(".postowner").querySelector(".postlike").removeEventListener("click",handleremovelikes)
  e.target.closest(".postowner").querySelector(".postlike").addEventListener("click",handlelikes)
  e.target.closest('.postowner').querySelector('.postlike').querySelector('.likesym').innerHTML = '🤍'
  e.target.closest('.postowner').querySelector('.postlike').querySelector('.likenum').style.color = '#fff'
  e.target.closest('.postowner').querySelector('.postlike').style.backgroundColor = 'purple'

 let curlikes =  e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML
 curlikes = Number.parseInt(curlikes)-1
 let likes =curlikes
 let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

 let likeinfo = {
   likes: likes,
   postid:postid,
   username: curuser,
   user_id:curuserid,
   password:curuserpass
 }
 e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML = `${curlikes}`

fetch('https://new-commune-3.onrender.com/removelikes', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(likeinfo) })
}

const handlefollow=async(e)=>{
  const username = e.target.closest('.postdisp').querySelector('.postcomment').querySelector('.postownname').innerText
  const password = e.target.closest('.postowner').querySelector('.postownpass').innerText

 let curuser = localStorage.getItem('current-users')
 let curuserpass = localStorage.getItem('current-users-pass')
 let followdetails = {
  username:username,
  password:password,
  curuser:curuser,
  curuserpass: curuserpass

 }

 fetch('https://new-commune-3.onrender.com/follow',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(followdetails)})
 
   setTimeout(()=>{
     e.target.closest('.postowner').querySelector('.postfollow').innerText = "Following"
   },1000)
    e.target.removeEventListener("click",handlefollow)
    e.target.addEventListener("click",handleunfollow)
    setFollowstat(!followstat)
}

const handleaccountfollow = (e)=>{

  const username = e.target.closest('.postownname').querySelector('.name').innerText
  const password =  e.target.closest('.acctname').querySelector('.postownpass').innerHTML
  const id = e.target.closest('.postownname').querySelector('.postownuser_id').innerText
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
    e.target.addEventListener("click",handleunfollow)
    followinglist.push({
      name:username,id: id
     })

    setOpenacct1(!openacct1)
  
}


const handleunfollow=async(e)=>{
  const username = e.target.closest('.postdisp').querySelector('.postcomment').querySelector('.postownname').innerText
  const password = e.target.closest('.postowner').querySelector('.postownpass').innerText
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
  e.target.closest('.postowner').querySelector('.postfollow').innerText = "Follow 📌"

},500)
 e.target.removeEventListener("click",handleunfollow)
 e.target.addEventListener("click",handlefollow)
 setFollowstat(!followstat)

}

const handleacctunfollow = (e)=>{
  const username = e.target.closest('.postownname').querySelector('.name').innerText
  const password =  e.target.closest('.acctname').querySelector('.postownpass').innerHTML
  const id = e.target.closest('.postownname').querySelector('.postownuser_id').innerText

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
},1000)

 e.target.removeEventListener("click",handleacctunfollow)
 e.target.addEventListener("click",handleaccountfollow)

 followinglist.pop({
  name:username,id: id
 })

 setOpenacct1(!openacct1)
}






const openacct = async(e) =>{

  // document.getElementById('acctname').innerHTML = ''
  // document.getElementById('acctposts1').innerHTML = ''
  document.getElementById('followerlist1').innerHTML = ''
 document.getElementById('otheraccount').style.display = 'initial'
 const postownerid = localStorage.getItem('postownerid')
 const ownername = e.target.innerText
 const ownerid =postownerid !=''? postownerid: e.target.closest('.postownname').querySelector('.postownuser_id').innerText

  localStorage.setItem('postownerid',ownerid)

//  console.log(ownerid)
  const searchdet = {
    ownerid:ownerid,
    ownername:ownername
  }

 const detailsuser =  fetch('https://new-commune-3.onrender.com/searchusersdet',{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(searchdet)});
 const detailsdp =  fetch('https://new-commune-3.onrender.com/searchusersdp',{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(searchdet)});

 const details =  fetch('https://new-commune-3.onrender.com/searchusers',{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(searchdet)});
  
 
 detailsuser.then(response => response.json())
  .then(data => {setFounduser({username:data.founduser.username,user_id:data.founduser._id,followerno:data.founduser.followers.length,followingno:data.founduser.following.length,password:data.founduser.password,})




// var followerlist = document.createElement('div')
// followerlist.className = 'followerlist'
// followerlist.id = 'followerlist'

  data.founduser.followers.map(follower=>{

 setFollowerlist(prev=>[...prev,follower])
  })

  
}).catch(err=>console.log(err))

detailsdp.then(response=>response.json()).then(data=>{
  if(data.userdp){
    const arr = data.userdp.profile.data.data
    const base64String = 
  
         btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
         );
  
  document.getElementById('profilepicdisp').src = `data:image/png;base64,${base64String}`;}
})

details.then(response=>response.json()).then(data=>{

  data.posts.map(element=>{
    const arr = element.post.data.data
    const base64String = 
  
         btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
         );
  
        const postdisp = document.createElement ("div")
        const postimgholder = document.createElement("div")
         const postimg = document.createElement("img")
         const postcomment = document.createElement("div")
       const  postcomment_hold = document.createElement("div")
         const postowner = document.createElement('div')
        //  const postownname = document.createElement('div')
        //  const name = document.createElement('div')
        //  const postownpass = document.createElement('div')
         const postfollow = document.createElement('div')
         const postlike = document.createElement('div')
         const likenum = document.createElement('div')
         const showcomment = document.createElement('div')
         const postcommments_user = document.createElement('textarea')
  
         const sendcomment = document.createElement("div")
         const likesym = document.createElement("span")
         const commentsym = document.createElement("span")
         const postid = document.createElement('span')
         const allcommentshold = document.createElement("div")
         const date = document.createElement('div')
         const postownuser_id = document.createElement('span')
         
         postownuser_id.className = 'postownuser_id'
        //  name.className = 'name'
         postowner.className = 'postowner'
         postowner.id = 'postowneracct'
        //  postownname.className = 'postownname'
        //  postownpass.className = 'postownpass'
         postfollow.className = 'postfollow'
         postfollow.id = 'postfollow1'
         postlike.className = "postlike"
         postlike.id = 'postlikeacct'
         showcomment.className = "showcomment1"
         postcommments_user.className= "postcomments_user"
         postcommments_user.placeholder = "Comment on this post!"
         sendcomment.className = "sendcomment-btn"
         sendcomment.id = 'sendcomment'
         likesym.className = "likesym"
         commentsym.className = "commentsym"
         postid.className = "postid"
         allcommentshold.className = "allcommentshold"
         likenum.className = "likenum"
         date.className = 'date'
        // name.innerText = element.username
        // postownpass.innerText = element.password
        postid.innerHTML = element._id
        postfollow.innerText = "Follow"
        likesym.innerHTML = '🤍'
        commentsym.innerText = "📤"
        likenum.innerHTML = element.likes
        sendcomment.innerText = "Comment"
        showcomment.innerText=" Comments"
       postcomment_hold.className = "postcomment_hold"
       date.innerHTML = `Posted on ${element.date}`
       postownuser_id.innerText = element.user_id
       postownuser_id.style.display = 'none'
      // postownname.appendChild(name)
      //  postownname.appendChild(postownuser_id)
      //  postownname.addEventListener('click',openacct)
  
       element.comments.forEach(e=>{
        console.log(e)
      const com=  document.createElement("li")
      const commentor = document.createElement("li")
      commentor.className = 'commentli'
      com.className = "commentli"
      com.innerHTML = e.comment
      commentor.innerHTML = e.username
      com.appendChild(commentor)
      allcommentshold.appendChild(com)
       })
  
     sendcomment.addEventListener("click",handlecommentsend)
     postfollow.addEventListener("click", handleaccountfollow)
     postlike.addEventListener("click",handlelikes)
  
         postimg.className = "postimg"
         postcomment.className = "postcomment"
         postimg.src =  `data:image/png;base64,${base64String}`
         postimg.type = 'images/base64'
         postcomment_hold.innerText = element.caption
         postimgholder.className = "post-img-cap" 
         postdisp.className = "postdisp"
         postimgholder.appendChild(postimg)
         postimgholder.appendChild(postcomment)
        postlike.appendChild(likenum)
         postlike.appendChild(likesym)
         sendcomment.appendChild(commentsym)
  
     postdisp.appendChild(postimgholder)
     postdisp.appendChild(date)
     postdisp.appendChild(allcommentshold)
     postowner.appendChild(showcomment)
    // postcomment.appendChild(postownname)
    // postownname
     postowner.appendChild(postlike)
     postowner.appendChild(postcommments_user)
     postowner.appendChild(sendcomment)
     postowner.appendChild(postid)
  
     postcomment.appendChild(postcomment_hold)
     postcomment.appendChild(postowner)
  
      followinglist.map(following=>{
        if(element.user_id === following.id){
  
          postfollow.innerHTML = "Following"
          postfollow.addEventListener("click",handleacctunfollow)
          postfollow.removeEventListener("click",handleaccountfollow)
        }
       })
  
       if(!document.getElementById('postownname1').contains(document.getElementById('postfollow1'))){
        document.getElementById('postownname1').appendChild(postfollow)
       }
  
      //  document.getElementById('followerlist1').appendChild(followerlist)
       
        // document.getElementById('acctname').innerHTML =''
      //  document.getElementById('acctname').appendChild(postownname)
      
      //  document.getElementById('acctname').appendChild(postownpass)
      //  document.getElementById('communeload').style.display = 'none'
    

      setLoad1(false);
      // document.getElementById('acctposts').innerHTML = ''


      document.getElementById('acctposts').appendChild(postdisp) 
      
      
      document.querySelectorAll(".showcomment1").forEach(e=>{
        e.addEventListener("click",()=>{
          e.closest(".postdisp").querySelector('.allcommentshold').classList.toggle('show')
        })
      })
      
      document.querySelectorAll('.postcomments_user').forEach(e=>{
        e.addEventListener("click",()=>{
          e.classList.add('click')  
          e.closest(".postowner").classList.add('click')
          e.closest(".postowner").closest(".postcomment").querySelector(".postcomment_hold").classList.add('click')
          e.closest(".postowner").querySelector(".sendcomment-btn").classList.add("click")
        })
        })
  })
})




  
} 



const close = ()=>{
  
  document.getElementById('otheraccount').style.display = 'none'
  document.getElementById('profilepicdisp').src = ''
  document.getElementById('acctposts').innerHTML = ''
  document.getElementById('postownname1').removeChild(document.getElementById('postfollow1'))
  localStorage.removeItem('postownerid')
  localStorage.setItem('postownerid','')

  setAcctclose(!acctclose)

}

const showfollowers = ()=>{
  document.querySelector('.followerlist1').classList.toggle('clicked')
}

  const posts = async()=>{

  localStorage.setItem('postownerid','')
    

    let userdet = {
      userid:curuserid
    }
    
    const allPosts = await fetch('https://new-commune-3.onrender.com/newPost',{headers:{accept:'application/json'}});
    const profilepics = await fetch('https://new-commune-3.onrender.com/profilepics',{headers:{accept:'application/json'}})
    const likedposts =  fetch('https://new-commune-3.onrender.com/likedposts',{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(userdet)})
    // const user_id = await fetch('https://new-commune.onrender.com/user_id',{headers:{accept:'application/json'}})
    const allPosts1 = await allPosts.json()
    const profilepics1 = await profilepics.json()
    setProfilephoto(profilepics1);

    const allpostsrev = allPosts1.reverse()
    setallpostdata(allpostsrev);
    // const allpostsrev = allpostdata.reverse()


   
  //  var likedposts1 = [];
     likedposts.then(response=>response.json()).
     then(data=>{
       setLikedposts1(data.likedposts)})

       setLoad (false)

     }

     console.log(likedposts1)


     useEffect(()=>{
    
        allpostsappend()
     
        },[load])

const allpostsappend = ()=>{
  let i=0;
// document.getElementById("home").innerHTML = '';

 while(i<=allpostdata.length-1){
      // allpostsrev.forEach(element => {
        let element = allpostdata[i];
        const arr = element.post.data.data
        const base64String = 
    
             btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
             );
    
            const postdisp = document.createElement ("div")
            const postimgholder = document.createElement("div")
             const postimg = document.createElement("img")
             const postcomment = document.createElement("div")
           const  postcomment_hold = document.createElement("div")
             const postowner = document.createElement('div')
             const postownname = document.createElement('div')
             const postownpass = document.createElement('div')
             const postfollow = document.createElement('div')
             const postlike = document.createElement('div')
             const likenum = document.createElement('div')
             const showcomment = document.createElement('div')
             const postcommments_user = document.createElement('textarea')
             const sendcomment = document.createElement("div")
             const likesym = document.createElement("span")
             const followsym = document.createElement("span")
             const commentsym = document.createElement("span")
             const postid = document.createElement('span')
             const allcommentshold = document.createElement("div")
             const date = document.createElement('div')
             const profilepichold = document.createElement('img')
             const postownuser_id = document.createElement('span')
             const name = document.createElement('div')
        
             postownuser_id.className = 'postownuser_id'
             postowner.className = 'postowner'
             postownname.className = 'postownname'
             name.className = 'name'
             postownpass.className = 'postownpass'
             postfollow.className = 'postfollow'
             postlike.className = "postlike"
             showcomment.className = "showcomment"
             postcommments_user.className= "postcomments_user"
             postcommments_user.placeholder = "Comment on this post!"
             sendcomment.className = "sendcomment-btn"
             likesym.className = "likesym"
             followsym.className = "followsym"
             commentsym.className = "commentsym"
             postid.className = "postid"
             allcommentshold.className = "allcommentshold"
             likenum.className = "likenum"
             date.className = 'date'
             profilepichold.className = 'profilepichold'
    
            name.innerText = element.username
            postownpass.innerText = element.password
            postid.innerHTML = element._id
            postfollow.innerText = "Follow"
            likesym.innerHTML = '🤍'
            followsym.innerText = "📌"
            commentsym.innerText = "📤"
            likenum.innerHTML = element.likes
            sendcomment.innerText = "Comment"
            showcomment.innerText=" Comments"
           postcomment_hold.className = "postcomment_hold"
           date.innerHTML = `Posted on ${element.date}`
           postownuser_id.innerText = element.user_id
          
           postownuser_id.style.display = 'none'
    
           profilephoto.map(elements=>{
            const arr1 = elements.profile.data.data
          const base64String1 = 
      
               btoa(
                  arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
               );
    
               if(elements.user_id == element.user_id){
                profilepichold.src = `data:image/png;base64,${base64String1}`
               }
          })
          postownname.appendChild(name)
           postownname.appendChild(profilepichold)
           postownname.appendChild(postownuser_id)
           name.addEventListener('click',openacct)
    
           element.comments.forEach(e=>{
       
          const com=  document.createElement("li")
          const commentor = document.createElement("li")
          commentor.className = 'commentli'
          com.className = "commentli"
          com.innerHTML = e.comment
          commentor.innerHTML = e.username
          com.appendChild(commentor)
    
          allcommentshold.appendChild(com)
           })
    
         sendcomment.addEventListener("click",handlecommentsend)
    
         postfollow.addEventListener("click", handlefollow)
    
         postlike.addEventListener("click",handlelikes)
             postimg.className = "postimg"
             postcomment.className = "postcomment"
             postimg.src =  `data:image/png;base64,${base64String}`
            //  postimg.addEventListener('dblclick',handlefollow)
             postimg.loading = 'lazy'
             postimg.type = 'images/base64'
             postcomment_hold.innerText = element.caption
             postimgholder.className = "post-img-cap" 
    
             postdisp.className = "postdisp"
    
             followinglist.map(following=>{
          
              if(element.user_id == following.id){
                postfollow.innerHTML = "Following"
                followsym.innerText = ""
                postfollow.addEventListener("click",handleunfollow)
                postfollow.removeEventListener("click",handlefollow)
              }
             })
    
             if(likedposts1.length !=0){
    
              likedposts1.map(liked=>{
                if(element._id === liked ){
                  likenum.innerHTML = `${element.likes}`
                  likenum.style.color ='red'
                postlike.style.backgroundColor = '#fff'
                postlike.style.color = 'red'
                likesym.innerHTML = '❤️'
                postlike.addEventListener('click',handleremovelikes)
                postlike.removeEventListener('click',handlelikes)
                
                }
               })
             
             }
    
             postimgholder.appendChild(postimg)
             postimgholder.appendChild(postcomment)
            postlike.appendChild(likenum)
             postlike.appendChild(likesym)
             postfollow.appendChild(followsym)
             sendcomment.appendChild(commentsym)
         postdisp.appendChild(postimgholder)
         postdisp.appendChild(date)
         postdisp.appendChild(allcommentshold)
         postowner.appendChild(showcomment)
        postcomment.appendChild(postownname)
         postowner.appendChild(postownpass)
         postowner.appendChild(postlike)
         postowner.appendChild(postfollow)
         postowner.appendChild(postcommments_user)
         postowner.appendChild(sendcomment)
         postowner.appendChild(postid)
    
         postcomment.appendChild(postcomment_hold)
         postcomment.appendChild(postowner)
        
        
       document.getElementById("home").appendChild(postdisp)
       
       i++;
       };
}
     



 


   document.querySelectorAll('.postcomments_user').forEach(e=>{
    e.addEventListener("click",()=>{
      e.classList.add('click')  
      e.closest(".postowner").classList.add('click')
      e.closest(".postowner").closest(".postcomment").querySelector(".postcomment_hold").classList.add('click')
    e.closest(".postowner").querySelector(".sendcomment-btn").classList.add("click")

    })
})
    document.querySelectorAll('.postfollow').forEach(e=>{
      e.addEventListener("mouseover",()=>{
   console.log(e.innerText)
        if(e.innerText != "Following"){
        e.querySelector(".followsym").classList.add('hover')
        e.querySelector(".followsym").innerHTML = "📌"
              }  
      })
    })

    document.querySelectorAll('.postfollow').forEach(e=>{
      e.addEventListener("mouseleave",()=>{
        if(e.innerText!="Following"){
          e.querySelector(".followsym").innerHTML = "📌"
          e.querySelector(".followsym").classList.remove('hover')
        }
      })
    })

    document.querySelectorAll('.sendcomment-btn').forEach(e=>{
      e.addEventListener("click", async()=>{   
      })

      e.addEventListener("mouseover",()=>{
        e.querySelector(".commentsym").innerHTML = "📤"
        e.querySelector(".commentsym").classList.add('hover')
      })

      e.addEventListener("mouseleave",()=>{
        e.querySelector(".commentsym").innerHTML = "📤"
        e.querySelector(".commentsym").classList.remove('hover')
      })
    })
document.querySelectorAll(".showcomment").forEach(e=>{
  e.addEventListener("click",()=>{
    e.closest(".postdisp").querySelector('.allcommentshold').classList.toggle('show')
  })
}) 
 
  

  return (
   <>

  

 <div className="home" id='home'>
  <div className="logohome">COMMUNE
    <div className="logoanim">
    <iframe src="https://lottie.host/embed/34d1a88f-3548-427c-8957-4b232d15e76c/zN3N8fdCZp.lottie" frameborder="0"></iframe>
    </div>
  </div>

  <div className = "communeload" id='communeload' >
  {/* <video autoPlay muted loop>
        <source
                src="likesvideo.mp4"
                type="video/mp4"
                />
      </video>
      <h2 className='loadh2'>COMMUNE</h2> */}
<iframe id='loadinganime' src="https://lottie.host/embed/fb7368f5-4618-4c6d-a8da-641058d0018c/2i41WWJ7M2.lottie" frameborder="0"></iframe>
    </div> 

 </div>
 <div className="otheraccount" id='otheraccount'>
<button id='close' onClick={close}>X</button>

<div className="accthold">
   <div className="acctdet">
    <div className="acctname" id='acctname'>
      <div id="postownname1" className='postownname'><div className="name">{founduser.username}</div>
      
      <div className="postownuser_id">{founduser.user_id}</div>

      </div>
      <div id="postownpass" className='postownpass'>{founduser.password}</div>
    </div>

     <img loading='lazy' src="" alt="" id='profilepicdisp' className='profilepicdisp'/>
     <div className="followercount" id='follwercount' onClick={showfollowers}>Followers <br />({founduser.followerno})
     
     <div className="followerlist1" id='followerlist1'>
      {followerlist&&followerlist.map(follower=>{
      <li className='followername'>{follower.name}</li>
      })}
     </div>


     </div>
     <div className="followercount">Following <br />({founduser.followingno})</div>
   </div>
   <div className="acctposts" id='acctposts'>
   
   

   </div>
   
</div>


 </div>
 <Link to={'/post'}> <div className="post-btn" id='post-btn'>+ Post</div></Link>
   <Navbar/>

   </>
  )
}

export default Home1

