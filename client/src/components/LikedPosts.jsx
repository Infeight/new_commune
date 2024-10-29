import React from 'react'
import { useEffect,useState } from 'react'
import './home.css'

import Navbar from './navbar'
import MovingText from 'react-moving-text'
import { Link,useLocation } from 'react-router-dom'
import Post from './post'
import { IoIosHeartEmpty } from "react-icons/io";

const LikedPosts = () => {
  const location = useLocation()

  let curuser = localStorage.getItem('current-users')
  const curuserpass = localStorage.getItem('current-users-pass')
  let curuserid = localStorage.getItem('curuserid')

  console.log(localStorage.getItem('current-users'))
  const followinglist = JSON.parse(localStorage.getItem('followinglist2'))

console.log(followinglist)
  const [load,setLoad] = useState(true)

  const[newComment,setNewComment] = useState({
    comment:"",
    postid:""
  })

  useEffect(()=>{


    setTimeout(()=>{
      posts()
    
    },200)
  
  

  },[])


if(load == false){
  document.getElementById('communeload').style.display = "none"
}

const handlecommentsend = async(e)=>{
  e.target.closest(".postowner").classList.remove('click')
  e.target.closest(".postowner").closest(".postcomment").querySelector(".postcomment_hold").classList.remove('click')
  e.target.closest(".postowner").querySelector(".postcomments_user").classList.remove('click')
  e.target.classList.remove('click')
  let comment = e.target.closest(".postowner").querySelector(".postcomments_user").value
  let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

  let commentinfo = {
    comment: comment,
    postid:postid
  }

fetch('https://new-commune.onrender.com/comment', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(commentinfo) })

e.target.closest(".postowner").querySelector(".postcomments_user").value = ""
// setNewComment({...newComment, comment:commentinfo.comment, postid: commentinfo.postid})
let newcomli = document.createElement("li")
newcomli.className = "commentli"
newcomli.innerText = comment

e.target.closest('.postdisp').querySelector('.allcommentshold').appendChild(newcomli)

}

const handlelikes = async(e)=>{
  e.target.closest(".postowner").querySelector(".postlike").removeEventListener("click",handlelikes)
  e.target.closest(".postowner").querySelector(".postlike").addEventListener("click",handleremovelikes)
 let curlikes =  e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML
 curlikes = Number.parseInt(curlikes)+1


 let likes =curlikes
 let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

 let likeinfo = {
   likes: likes,
   postid:postid
 }


fetch('https://new-commune.onrender.com/likes', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(likeinfo) })
// e.target.closest(".postowner").querySelector(".postlike").querySelector(".likesym").innerHTML = ""

 e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML = `${curlikes}`


}

const handleremovelikes = async(e)=>{
  e.target.closest(".postowner").querySelector(".postlike").removeEventListener("click",handleremovelikes)
  e.target.closest(".postowner").querySelector(".postlike").addEventListener("click",handlelikes)
  e.target.closest('.postowner').querySelector('.postlike').querySelector('.likesym').innerHTML = '🤍'
  e.target.closest('.postowner').querySelector('.postlike').querySelector('.likenum').style.color = '#fff'
  e.target.closest('.postowner').querySelector('.postlike').style.backgroundColor= 'purple'

 let curlikes =  e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML
 curlikes = Number.parseInt(curlikes)-1
 let likes =curlikes
 let postid = e.target.closest(".postowner").querySelector('.postid').innerHTML

 let likeinfo = {
   likes: likes,
   postid:postid
 }
 e.target.closest(".postowner").querySelector(".postlike").querySelector(".likenum").innerHTML = `${curlikes}`


fetch('https://new-commune.onrender.com/removelikes', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(likeinfo) })
// e.target.closest(".postowner").querySelector(".postlike").querySelector(".likesym").innerHTML = ""




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


 fetch('https://new-commune.onrender.com/follow',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(followdetails)})
 e.target.closest('.postowner').querySelector('.postfollow').innerText = "Following"

 e.target.removeEventListener("click",handlefollow)

}

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

  const posts = async()=>{
    let userdet = {
      userid:curuserid
    }
    
    const allPosts = await fetch('https://new-commune.onrender.com/newPost',{headers:{accept:'application/json'}})
    const profilepics = await fetch('https://new-commune.onrender.com/profilepics',{headers:{accept:'application/json'}})
    const likedposts =  fetch('https://new-commune.onrender.com/likedposts',{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(userdet)})
    // const likedposts = await fetch('https://new-commune.onrender.com/likedposts',{headers:{accept:'application/json'}})
    
    const profilepics1 = await profilepics.json()
    const allPosts1 = await allPosts.json()
  let sortedlikes=[];
  let likes = Infinity;
    allPosts1.map(elem=>{
      sortedlikes.push(elem.likes)
    sortedlikes=  removeDuplicates(sortedlikes.sort((a,b)=>(a-b)).reverse())

 
   
      // if(elem.likes<=likes){
      //  sortedlikes.push(elem)
      //  likes = elem.likes
      // }
    })
    let trendingposts=[];
    sortedlikes.forEach(no=>{
      allPosts1.map(elem=>{
        if(elem.likes == no){
          trendingposts.push(elem)
        }
      })
    })
    // console.log(trendingposts)

    // const allpostsrev = allPosts1.reverse()
    const likedposts1 = []

    likedposts.then(response=>response.json()).then
    (data=> likedposts1 = data.likedposts)

    console.log(likedposts1)

   trendingposts.forEach(element => {

 
    
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
         const profilepichold = document.createElement('img')

         const postid = document.createElement('span')
         const allcommentshold = document.createElement("div")
         const date = document.createElement('div')
         profilepichold.className = 'profilepichold'



         
         postowner.className = 'postowner'
         postownname.className = 'postownname'
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

        postownname.innerText = element.username
        postownpass.innerText = element.password
        postid.innerHTML = element._id
        postfollow.innerText = "Follow"
        likesym.innerText = "🤍"
        followsym.innerText = "📌"
        commentsym.innerText = "📤"
        likenum.innerHTML = element.likes
        sendcomment.innerText = "Comment"
        showcomment.innerText=" Comments"
       postcomment_hold.className = "postcomment_hold"
       date.innerHTML = `Posted on ${element.date}`
       element.comments.forEach(e=>{
      const com=  document.createElement("li")
      com.className = "commentli"
      com.innerHTML = e
      allcommentshold.appendChild(com)
       })

     sendcomment.addEventListener("click",handlecommentsend)

     postfollow.addEventListener("click", handlefollow)

    //  postlike.addEventListener("click",handlelikes)

         postimg.className = "postimg"
         postcomment.className = "postcomment"
         postimg.src =  `data:image/png;base64,${base64String}`
         postimg.type = 'images/base64'
         postcomment_hold.innerText = element.caption
         postimgholder.className = "post-img-cap" 

         postdisp.className = "postdisp"


         followinglist.map(following=>{
          if(element.username=== following){
            postfollow.innerHTML = "Following"
            followsym.innerText = ""

           
            postfollow.removeEventListener("click",handlefollow)
          }
         })


         if(likedposts1.length !=0){
          likedposts1.map(liked=>{
            if(element._id == liked ){
              likenum.innerHTML = `${element.likes}`
              likenum.style.color ='red'
            postlike.style.backgroundColor = '#fff'
            postlike.style.color = 'red'
            likesym.innerHTML = '❤️'
            postlike.addEventListener('click',handleremovelikes)
  
            }
            else{
              postlike.addEventListener('click',handlelikes)
            }
           })
         
         }
         else{
          postlike.addEventListener('click',handlelikes)

         }
         
        

         profilepics1.map(elements=>{
          const arr1 = elements.profile.data.data
        const base64String1 = 
    
             btoa(
                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
             );
  
             if(elements.user_id == element.user_id){
              profilepichold.src = `data:image/png;base64,${base64String1}`
             }
        })
         

        


        postownname.appendChild(profilepichold)
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

     

    setLoad (false)
   document.getElementById("home").appendChild(postdisp)


   });

   document.querySelectorAll('.postcomments_user').forEach(e=>{
    e.addEventListener("click",()=>{
      e.classList.add('click')  
      e.closest(".postowner").classList.add('click')
      e.closest(".postowner").closest(".postcomment").querySelector(".postcomment_hold").classList.add('click')
      e.closest(".postowner").querySelector(".sendcomment-btn").classList.add("click")
    })
})
    document.querySelectorAll('.postlike').forEach(e=>{
      e.addEventListener("mouseover",()=>{
        e.querySelector(".likesym").innerHTML = "❤️"
        e.querySelector(".likesym").classList.add('hover')
      
      })
    })

    document.querySelectorAll('.postlike').forEach(e=>{
      e.addEventListener("mouseleave",()=>{
        e.querySelector(".likesym").innerHTML = "🤍"
        e.querySelector(".likesym").classList.remove('hover')
       
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

    
  }


  return (
   <>

 <div className="home" id='home'>
  <div className = "communeload" id='communeload' >
   
  <video autoPlay muted loop>
        <source
                src="likesvideo.mp4"
                type="video/mp4"
                />
      </video>
      <h2 className='loadh2'>COMMUNE</h2>






    </div> 
 </div>
 <Link to={'/post'}> <div className="post-btn" id='post-btn'>+ Post</div></Link>
   <Navbar/>

   </>
  )
}

export default LikedPosts
