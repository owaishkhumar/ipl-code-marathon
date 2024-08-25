import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Home from './Home';
import Navbar from './Navbar';
import AddPlayerComponent from './AddPlayerComponent';
import MatchesContainer from './MatchesContainer';
import FilterMatched from './FilterMatched';
import PlayerStats from './PlayerStats';

const RouteConfig = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addplayer' element={<AddPlayerComponent />} />
        <Route path='/matches' element={<MatchesContainer />} />
        <Route path='/filtermatches' element={<FilterMatched />} />
        <Route path='/playerstats' element={<PlayerStats />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default RouteConfig


