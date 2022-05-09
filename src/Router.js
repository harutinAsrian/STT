import React from 'react'
import Configure from './view/Configure'
import Profile from './view/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'

const Router = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/configure" element={<Configure />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/configure" replace />}/>
      </Routes>
    </>
  )
}

export default Router