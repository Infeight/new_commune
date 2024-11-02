import React from 'react'
import './MyPosts.css'
import './home.css'
import Navbar from './navbar'
import { useEffect,useState } from 'react'

const MyPosts = () => {

  const [curuser,setCuruser] = useState ({
    username:"",
    password:""
  })
  const [load,setLoad] = useState(true)

  useEffect(()=>{
    curuserdata();
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      posts1()
    },200)
  })
 
  const deletepost = async( e)=>{
   document.getElementById('confirmdel').style.display = 'flex'
   document.getElementById('home').style.opacity = '50%'

   document.getElementById('confdel').addEventListener('click', async()=>{
    document.getElementById('home').removeChild( e.target.closest('.postdisp'))
    let del_id =  e.target.querySelector('.postid').innerHTML
  
    let del_id_det = {
      delid: del_id,
      
    }
      document.getElementById('confirmdel').style.display = 'none'
   document.getElementById('home').style.opacity = '100%'
      await fetch('https://new-commune.onrender.com/delpost',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(del_id_det)})
   })

   document.getElementById('cancdel').addEventListener('click', async()=>{
    document.getElementById('confirmdel').style.display = 'none'
   document.getElementById('home').style.opacity = '100%'



   })

   
  }

const curuserdata = async()=>{

  let userdata = {
   username: localStorage.getItem("current-users"),
   password:  localStorage.getItem("current-users-pass")
  }
 
 setCuruser(userdata)

}
// if(load == false){

// }

  const posts1 = async()=>{

    const allPosts = await fetch('https://new-commune.onrender.com/myPost',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(curuser)})
    
    const allPosts1 = await allPosts.json()
 
    const allpostsrev = allPosts1.reverse()
  
   allpostsrev.forEach(element => {
   
    let arr = element.post.data.data
  
    // console.log(JSON.parse(jsonstr2))
    const base64String = 

         btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
         );

        const postdisp = document.createElement ("div")
        const postimgholder = document.createElement("div")
         const postimg = document.createElement("img")
         const postcomment = document.createElement("div")
         const postowner = document.createElement('div')
       const  postcomment_hold = document.createElement("div")
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
        //  postimg.id = 'mypost-img'
         postcomment.className = "postcomment"
         postimg.src =  `data:image/png;base64,${base64String}`
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

       likesym.className='likesym'
       date.className = 'date'

       likesym.innerText = '❤️'

       date.innerHTML = `Posted on ${element.date}`


     

       element.comments.forEach(e=>{
        const comhold = document.createElement('div')
        const com=  document.createElement("li")
      const commentor = document.createElement("li")
      commentor.className = 'commentli'
      commentor.id = 'commentor'

        comhold.className = "commentli"
        comhold.id = "comhold"
        com.id = 'commentli1'
        com.innerHTML = e.comment

      commentor.innerHTML = e.username

        if(commdisp.innerText == 'No comments yet'){
          commdisp.innerText = ''

        }
        comhold.appendChild(com)
      comhold.appendChild(commentor)

        commdisp.appendChild(comhold)
         })

       
         
       deletebtn.addEventListener('click',deletepost)
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

     
    document.getElementById('communeload').style.display = "none"
    
   document.getElementById("home").appendChild(postdisp)

   });

 

  }




  return (
  <>



  <Navbar/>
  <div className="home" id='home'>
 <div className="yourposthead">Your Posts</div>

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

 <div className='confirmdel' id='confirmdel'>⚠ This post gets deleted permanently.

  <div style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
  <button id='cancdel'>Cancel</button>
   
  <button id='confdel'>Delete</button></div>
 </div>

  </>
  )
}

export default MyPosts
