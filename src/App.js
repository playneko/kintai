import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNav from "./HeaderNav";
import BottomNav from "./BottomNav";
import Home from './pages/Home';
import Print from './pages/Print';
import Kintai from './pages/Kintai';
import NotFound from './pages/NotFound';
import PrintView from './pages/PrintView';
import Login from './pages/Login';
import useAuthStore from './store/useAuthStore';
import { useNavigate } from "react-router-dom";
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
  const { isLoggedIn } = useAuthStore();
  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) {
        navigate("/home");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, navigate]);

    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <HeaderNav />
        {
          isLoggedIn ? <BottomNav /> : null
        }
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          {
            isLoggedIn ?
              <>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/kintai/*" element={<Kintai />}></Route>
                <Route path="/print" element={<Print />}></Route>
                <Route path="/print/view/:postId" element={<PrintView />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </>
            :
              <Route path="/*" element={<Navigate replace to="/login" />} />
          }
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
