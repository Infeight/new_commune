import React from 'react'
import './chat.css'
import { useEffect,useState,useRef } from 'react'
import Navbar from './navbar'
import InputEmoji from "react-input-emoji";
import {io} from 'socket.io-client'



const Chat = () => {
  const socket = useRef();
    const curuser = localStorage.getItem('current-users')
    const curuserpass = localStorage.getItem('current-users-pass')
    const curuserid = localStorage.getItem('curuserid')

    const [msg,setmsg] = useState({
        caption:""
      })
    const [to_id,setTo_id] = useState({
      to_id:""
    }) 

    const[currentmsg,setCurrentmsg] = useState({
      message:""
    })
    const [allmsgs,setAllmsgs] = useState([])
    const [arrivemsg,setArrivemsg] = useState(null)

    const scrollref = useRef();

    const setText =(e)=>{
        setmsg({
        caption:e
        })
      }
   
 useEffect(()=>{
   if(curuserid){
    socket.current = io('https://new-commune-1.onrender.com')
    socket.current.emit('add-user',curuserid)
   }
 },[curuserid])     

useEffect(()=>{
    logins()
},[])
useEffect(()=>{
   handlegetmsgs()
},[allmsgs,to_id])

const handlesend = ()=>{

  const sendmsg = {
    from_id: curuserid,
    toid: to_id.to_id,
    message:msg.caption
  }

  const msgs = [...allmsgs]
  msgs.push({fromself:true, message:msg.caption})

  setAllmsgs(msgs)

  socket.current.emit('sendmsg',{
    to: to_id.to_id,
    from: curuserid,
    message:msg.caption
  })

fetch('https://new-commune-1.onrender.com/sendmsg', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(sendmsg) })
setCurrentmsg({message:msg.caption})
document.querySelector('.react-input-emoji--input').innerText="";




}

const handlegetmsgs = async()=>{

 if(to_id.to_id){
  const getmsg = {
    from_id: curuserid,
    toid: to_id.to_id,

  }
let obj;
    const response = fetch('https://new-commune-1.onrender.com/getmsg', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(getmsg) })
    response.then(res => res.json())
  .then(data => {
    setAllmsgs(data)
   })
  
 }
  
}

useEffect(()=>{
  if(socket.current){
    socket.current.on('recievemsg',(msg)=>{
        setArrivemsg({fromself:false, message:msg})
    })
  }
},[])

useEffect(()=>{
  arrivemsg && setAllmsgs((prev)=>[...prev,arrivemsg])
},[arrivemsg])

useEffect(()=>{
   scrollref.current?.scrollIntoView({behaviour:'smooth'})
},[allmsgs])


const handleto_id = (e)=>{

  console.log(e.target.closest('.contacthold').querySelector('.contactname').innerText)
   document.getElementById('to_name').innerText = e.target.closest('.contacthold').querySelector('.contactname').innerText
  // document.getElementById('chatscont').innerHTML = ""

   const toid =e.target.closest('.contacthold').querySelector('.contactid').innerText

   setTo_id({
    to_id: toid
   })
   document.getElementById('chatscont').style.background = 'url()'
   document.querySelector('.input-send-cont').style.display = 'flex'
   document.getElementById('to_name').style.top = '0vw'
   document.getElementById('to_name').style.transitionDuration = '0.2s'
}
// console.log(to_id.to_id)

    const logins = async()=>{
        let allusers1 = await fetch('https://new-commune-1.onrender.com/login',{headers:{accept:'application/json'}})
        let allusers = await allusers1.json()
    
        allusers.map(Element=>{
            if(Element.username === curuser && Element.password === curuserpass){
                Element.following.map(contact =>{
                  const contacthold = document.createElement('li')
                  const contactname = document.createElement('li')
                  const profilehold = document.createElement('div')
                  const contactid = document.createElement('li')
                  contactid.className = 'contactid'
                  contacthold.className = 'contacthold'
                  profilehold.className = 'profilehold'
                  contactname.className = 'contactname'

                 contactid.style.display = 'none'
                 contactname.innerText = contact.name
                  contactid.innerText = contact.id

                  contacthold.addEventListener('click',handleto_id)

                  contacthold.append(profilehold)
                  contacthold.append(contactname)
                  contacthold.appendChild(contactid)
                 document.getElementById('allcontacts').appendChild(contacthold)

                })
            }
        })
    }
   
  return (
   <>
<Navbar/>
<div className="chatarea">

<div className="allcontacts" id='allcontacts'></div>

<div className="chathere">
<div className='to_name' id='to_name'>Username</div>

    <div className="chatscont" id='chatscont'>

{allmsgs ? allmsgs.map((message)=>{
  return(
    <div>
      <div className={`msg${message.fromself? 'sent' : 'received'}`}>
        <div className="content">
          <p>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  )
}):<>bg</>}

    </div>

    <div className='input-send-cont'>
    <InputEmoji 
       
       onChange={setText}
   
       placeholder="Type a message"
     />

     <button className='send-btn' onClick={handlesend}> <img style={{width:"100%"}} src="sendbtn.png" alt="" />
     </button>
    </div>
  
</div>

</div>
   </>
  )
}

export default Chat
