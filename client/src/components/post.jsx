import React from 'react'
import './post.css'
import Navbar from './navbar'
import { useState,useEffect } from 'react'
import { IoMdImages } from "react-icons/io";
import InputEmoji from "react-input-emoji";

const Post = () => {
 
  let curuser = localStorage.getItem('current-users')
  const curuserpass = localStorage.getItem('current-users-pass')
  let curuserid = localStorage.getItem('curuserid')

  const [caption,setCaption] = useState({
    caption:""
  })
   const[user_id,setUser_id]= useState('');
  const[image,setImage]  = useState({
    file:null,
    url :""
  })

  useEffect(()=>{
    handleuser_id();

  },[])

  const handleCancel = ()=>{
    setImage({
      file:null,
      url:""
    })
  document.getElementById('cancelbtn').style.display = 'none'

  }

  const setText =(e)=>{
    setCaption({
    caption:e
    })
  }


  const handleimage = (e)=>{
    if(e.target.files[0]){
    setImage({
      file: e.target.files[0],
      url:URL.createObjectURL(e.target.files[0])
    })
  }
  document.getElementById('cancelbtn').style.display = 'flex'
  }

  const handleuser_id = async()=>{
  
    let userdet = {
      username:curuser,
      password:curuserpass
    }

    const user_id =  fetch('https://new-commune-3.onrender.com/user_id',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(userdet)})
    let user_id1;

    user_id.then(response=>response.json()).
    then(data=> user_id1 = data._id)

    setUser_id(user_id1)
    document.querySelector('.react-emoji').id = 'react-emoji'
  }

  return (
    <>
      <Navbar />
      <div className="home">

      <div className="logohome">COMMUNE
    <div className="logoanim">
    <iframe src="https://lottie.host/embed/34d1a88f-3548-427c-8957-4b232d15e76c/zN3N8fdCZp.lottie" frameborder="0"></iframe>
    </div>
  </div>

        <div className="addimghold">

          {image.url!=""? 
          <img  src={image.url? image.url: 'https://media.licdn.com/dms/image/v2/C5622AQGeP7zyiOkarQ/feedshare-shrink_800/feedshare-shrink_800/0/1626545969957?e=2147483647&v=beta&t=WR51NqmQGDvHJOmiMzj6ilG6hXYhEXaXMtnS352Q020'} className='checkimg' alt="" />
        :   
      
<label htmlFor='newPost' className='selectlabel'>
  <span className='selimgtext'>Select Image <IoMdImages style={{marginLeft:'1vw'}}/></span>
          <div className="addimgscroll" id='scroll1'>
          <div className="imgscrollcover"></div>
            <ul>

            <li><img src="f1.jpg" alt="" /></li>
              <li><img src="ram mandir.webp" alt="" /></li>
              <li><img src="benz.avif" alt="" /></li>
              <li><img src="virat1.jpg" alt="" /></li>
              <li><img src="football.webp" alt="" /></li>
              <li><img src="beaches.avif" alt="" /></li>
              <li><img src="apple.avif" alt="" /></li>
              <li><img src="worldcupwin.jpg" alt="" /></li>

            </ul>
            <div className="imgscrollcover"></div>
            <ul>

              <li><img src="f1.jpg" alt="" /></li>
              <li><img src="ram mandir.webp" alt="" /></li>
              <li><img src="benz.avif" alt="" /></li>
              <li><img src="virat1.jpg" alt="" /></li>
              <li><img src="football.webp" alt="" /></li>
              <li><img src="beaches.avif" alt="" /></li>
              <li><img src="apple.avif" alt="" /></li>
              <li><img src="worldcupwin.jpg" alt="" /></li>

            </ul>
          </div>

          <div className="addimgscroll" id='scroll2'>
          <div className="imgscrollcover"></div>
            <ul>

            <li><img src="pets.jpg" alt="" /></li>
              <li><img src="minions.jpeg" alt="" /></li>
              <li><img src="deadpool.jpeg" alt="" /></li>
              <li><img src="vrset.webp" alt="" /></li>
              <li><img src="kkr.webp" alt="" /></li>
              <li><img src="kfc.jpg" alt="" /></li>
              <li><img src="sugarpine.png" alt="" /></li>
              <li><img src="fitnesstech.jpg" alt="" /></li>

            </ul>
            <div className="imgscrollcover"></div>
            <ul>

              <li><img src="pets.jpg" alt="" /></li>
              <li><img src="minions.jpeg" alt="" /></li>
              <li><img src="deadpool.jpeg" alt="" /></li>
              <li><img src="vrset.webp" alt="" /></li>
              <li><img src="kkr.webp" alt="" /></li>
              <li><img src="kfc.jpg" alt="" /></li>
              <li><img src="sugarpine.png" alt="" /></li>
              <li><img src="fitnesstech.jpg" alt="" /></li>

            </ul>
          </div>
          
          <div className="addimgscroll" id='scroll3'>
          <div className="imgscrollcover"></div>
            <ul>

            <li><img src="samsung.avif" alt="" /></li>
              <li><img src="bmwbike.avif" alt="" /></li>
              <li><img src="pondy.jpg" alt="" /></li>
              <li><img src="kungfupanda.jpg" alt="" /></li>
              <li><img src="horses.jpg" alt="" /></li>
              <li><img src="hardik.avif" alt="" /></li>
              <li><img src="gta6.avif" alt="" /></li>
              <li><img src="oscars.webp" alt="" /></li>

            </ul>
            <div className="imgscrollcover"></div>
            <ul>

              <li><img src="samsung.avif" alt="" /></li>
              <li><img src="bmwbike.avif" alt="" /></li>
              <li><img src="pondy.jpg" alt="" /></li>
              <li><img src="kungfupanda.jpg" alt="" /></li>
              <li><img src="horses.jpg" alt="" /></li>
              <li><img src="hardik.avif" alt="" /></li>
              <li><img src="gta6.avif" alt="" /></li>
              <li><img src="oscars.webp" alt="" /></li>

            </ul>

          </div>
          <div className="addimgscroll" id='scroll4'>
          <div className="imgscrollcover"></div>
            <ul>

            <li><img src="kalki.avif" alt="" /></li>
              <li><img src="goldenglobe.webp" alt="" /></li>
              <li><img src="doctor doom.webp" alt="" /></li>
              <li><img src="virat1.jpg" alt="" /></li>
              <li><img src="fashion.jpg" alt="" /></li>
              <li><img src="spidey.jpg" alt="" /></li>
              <li><img src="vrset.webp" alt="" /></li>
              <li><img src="yoga.jpg" alt="" /></li>

            </ul>
            <div className="imgscrollcover"></div>
            <ul>

              <li><img src="kalki.avif" alt="" /></li>
              <li><img src="goldenglobe.webp" alt="" /></li>
              <li><img src="doctor doom.webp" alt="" /></li>
              <li><img src="virat1.jpg" alt="" /></li>
              <li><img src="fashion.jpg" alt="" /></li>
              <li><img src="spidey.jpg" alt="" /></li>
              <li><img src="vrset.webp" alt="" /></li>
              <li><img src="yoga.jpg" alt="" /></li>

            </ul>
          </div>
</label>
          }
        </div>


        <form action="https://new-commune-3.onrender.com/newPost" method='post' encType='multipart/form-data'>
        {/* {image.url!=""? document.getElementById('selectlabel').style.display = 'none': document.getElementById('selectlabel').style.display = 'flex'} */}
        {/* <label id='selectlabel' className='selectlabel' htmlFor="newPost">Select Image  <IoMdImages style={{marginLeft:'0.5vw'}}/>
        </label> */}
         <textarea name="username" id="" style={{display:'none'}} value={curuser}></textarea>
         <textarea name="userpass" id="" style={{display:'none'}} value={curuserpass}></textarea>
         <textarea name="curuserid" id="" style={{display:'none'}} value={curuserid}></textarea>
          <input type="file" name="newPost" id='newPost' style={{display:'none'}} onChange={handleimage}/>
        <div id='cancelbtn'  className='post-btn' onClick={handleCancel}>Cancel</div>
           
          <textarea style={{display:"none"}} type="text" name='caption' id='caption' placeholder='Add caption to your Image!'  value={caption.caption}/>
          <InputEmoji 
       
      onChange={setText}
  
      placeholder="Type a message"
    />
          <button id='post-btn' 
          onClick={()=>{
            document.getElementById('blockpost').style.display = 'flex'
            document.getElementById('cancelbtn').style.display = 'none'
            document.getElementById('post-btn').innerText = 'Posting...'
            document.getElementById('post-btn').style.backgroundColor = '#a064a0'
          }} 
          className='post-btn' type='submit'>Post</button>

    <div id='blockpost'></div>
        </form>

      </div>


    </>
  )
}

export default Post
