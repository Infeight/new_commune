import React from 'react'

import './home.css'
import './MyPosts.css'
import './people.css'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

const People = () => {

  const [allusername,setAllusernames] = useState([]);

  useEffect(()=>{
    allusers();
  },[])


  const allusers = async() =>{
       const alluserdet = await fetch('https://new-commune-2.onrender.com/alluserdet',{headers:{accept:'application/json'}}) 
       const alluserdet1 = alluserdet.json();
       setAllusernames(alluserdet1)
  }

  allusername && allusername.map(names=>{
      console.log(names);
  })


  return (
    <>
      <Navbar />

    </>
  )
}

export default People
