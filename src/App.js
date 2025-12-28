import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderNav from "./HeaderNav";
import BottomNav from "./BottomNav";
import Home from './pages/Home';
import Kintai from './pages/Kintai';
import NotFound from './pages/NotFound';
import './assets/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderNav />
        <BottomNav />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/kintai/*" element={<Kintai />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
