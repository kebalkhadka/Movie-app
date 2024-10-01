import { useState } from 'react'
import './App.css'
import Header from './component/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, imageListClasses, Switch } from '@mui/material'
import SimpleBottomNavigation from './component/MainNav'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Series from './Pages/Series/Series'
import NotFoundpage from './Pages/NotFoundpage/NotFoundpage'
import Moviedetail from './Pages/Movies/Moviedetail'
import Seriesdetail from './Pages/Series/Seriesdetail'



function App() {
  return (
  
    <BrowserRouter>
    <Header/>
    <div className='app'> 
    <Container>
    <Routes>
     <Route path='/' element={<Trending/>} exact/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/series' element={<Series/>}/>
      <Route path='/movie/:id' element={<Moviedetail/>}/>
      <Route path='/series/:id' element={<Seriesdetail/>}/>
      <Route path='*'element={<NotFoundpage/>}></Route>
     </Routes>
    </Container>

      
  
    </div>
     <SimpleBottomNavigation/>
    </BrowserRouter>
  
  )
}

export default App
