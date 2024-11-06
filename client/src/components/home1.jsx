import React from 'react'
import { lazy,Suspense } from 'react'
// const Home = lazy(
//     ()=>{
//   import ('./home')
// })
import Home from './home'
const Home1 = () => {
  return (
    <div>
     <Suspense fallback={<div>Loading</div>}>
        <Home/>
     </Suspense>

    </div>
  )
}

export default Home1
