import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './Signup'
import Signin from './Signin'
import Appbar from './Appbar'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div style={{width:"100vw",height:"100vh",backgroundColor:"#eeeeee"}}>
      <Appbar></Appbar>
      <Router>
        <Routes>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addCourse' element={<AddCourse/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/course/:courseId' element={<Course/>}/>
          
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
