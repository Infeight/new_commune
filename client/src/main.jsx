import React from 'react'
import ReactDOM from 'react-dom/client'
import { Suspense,lazy } from 'react'

const App1 = lazy(()=>{
    import ('./App.jsx')
})

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

)
