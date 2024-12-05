import {  useState } from 'react'
import { Suspense,lazy } from 'react'
import Profile from './components/profile'
// const Home1 = lazy(()=>{
//   import ('./components/home')
// })
import Home1 from './components/home1'
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



 const getCookie = (name) => {
  const cookieArray = document.cookie.split("; ");
  for (let cookie of cookieArray) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

// console.log(getCookie("user"));

  return (

    

<>
 
<BrowserRouter> 
        <Routes>
           <Route path='/' element={getCookie('user')?<Profile/>:<Login/>}/>
           <Route path='/Profile' element={<Profile/>}/>

         
           {/* <Suspense fallback={<div>Loading ...</div>}> <Route path='/Home' Component={<Home1/>}/></Suspense> */}


           <Route path='/Home' element={<Home1/>}/>
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
