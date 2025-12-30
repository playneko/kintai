import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNav from "./HeaderNav";
import BottomNav from "./BottomNav";
import Home from './pages/Home';
import Kintai from './pages/Kintai';
import NotFound from './pages/NotFound';
import './assets/App.css';

const theme = createTheme({
  palette: {
    brown: {
      light: '#bcaaa4',
      main: '#795548',
      dark: '#3e2723',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <HeaderNav />
        <BottomNav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/kintai/*" element={<Kintai />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
