import { useState } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SideBar from './components/layout'
import ChatManagement from './pages/chat-management'
import { LoginForm } from './pages/login'
import { SignUpForm } from './pages/sign-up'
import Chat from './pages/chat'

function App() { 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/signup' element={<SignUpForm/>} />


        <Route element={<SideBar/>}>

        <Route path='/chats' element={<ChatManagement/>} >
        <Route path="details/:id" element={<Chat />} />

        </Route>
          <Route path='/categories' element={<h2>sandansk</h2>} />
          <Route path='/Products' element={<h2>Product</h2>} />
        </Route>
        

      </Route>
    )
  )

  return (
    <>
<RouterProvider router={router}/>

    </>
  )
}

export default App
