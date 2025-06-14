import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/login' element={<UserLogin />}></Route>
        <Route path='/riding' element={<Riding/>}></Route>
        <Route path='/signup' element={<UserSignup />}></Route>
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainSignup />}></Route>
        <Route path='/captain-riding' element={<CaptainRiding />}></Route>

        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }></Route>

        <Route path='/user/logout' element={
          < UserProtectedWrapper>
            <UserLogout />
            </UserProtectedWrapper>
        }></Route>

  <Route path='/captain-home' element={
    <CaptainProtectedWrapper>
    <CaptainHome/>
    </CaptainProtectedWrapper>
    }></Route>
    <Route path='/captain-logout' element={
    <CaptainProtectedWrapper>
    <CaptainLogout/>
    </CaptainProtectedWrapper>
    }></Route>
    


      </Routes>
    </div>
  )
}

export default App