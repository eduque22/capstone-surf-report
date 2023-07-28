import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

import { Home,  SignIn, SignUp, WaveCard } from './components/index';
import { theme } from './Theme/themes';
import { store } from './redux/store';
import './index.css'
import { firebaseConfig } from './firebaseConfig';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path ='/' element={<Home title = {'Check Conditions:'}/>} />
              <Route path ='/signin' element={<SignIn />} />
              <Route path ='/signup' element={<SignUp />} />
              <Route path ='/wavecard' element={<WaveCard />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
