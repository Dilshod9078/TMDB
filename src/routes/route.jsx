import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Nowplaying from '../pages/NowPlaying'
import Popular from '../pages/Popular'
import TopRated from '../pages/Rated'
import Upcoming from '../pages/Upcoming'
import SinglePage from '../pages/SinglePage'

function route() {
  return (
    <Routes>
        <Route path='/' element={<Nowplaying/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/top-rated' element={<TopRated/>}/>
        <Route path='/upcoming' element={<Upcoming/>}/>
        <Route path='/singlepage/:id' element={<SinglePage/>}/>
    </Routes>
  )
}

export default route