import { useState } from 'react'
import Profile from './components/profile'
import Home from './components/home'
import MyPosts from './components/MyPosts'
import LikedPosts from './components/LikedPosts'
import Login from './components/login'
import Chat from './components/chat'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Post from './components/post'

function App() {
  const [count, setCount] = useState(0)

  return (

    

<>

<BrowserRouter> 
        <Routes>
           <Route path='/' element={<Login/>}/>
           <Route path='/Profile' element={<Profile/>}/>
           <Route path='/Home' element={<Home/>}/>
           <Route path='/MyPosts' element={<MyPosts/>}/>
           <Route path='/LikedPosts' element={<LikedPosts/>}/>
           <Route path='/post' element={<Post/>}/>
           <Route path='/chat' element={<Chat/>}/>
           {/* <Route path='/about' element={</>}/> */}
        </Routes>
        </BrowserRouter>
{/* <Login/> */}
</>
      
  )
}

export default App
