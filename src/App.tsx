import React from 'react';
import Home from './components/pages/Home';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Information from './components/pages/Information';
import ReactGA from 'react-ga4';
import Admin from './components/pages/Admin';

ReactGA.initialize('G-J27DMM5J0W');
function App() {
  ReactGA.send({ hitType: 'pageview', page: '/' });

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/information'} element={<Information />} />
          <Route path={'/admin'} element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
