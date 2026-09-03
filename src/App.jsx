import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DestinationDetails from './pages/DestinationDetails';
import ItineraryPlanner from './pages/ItineraryPlanner';
import ScrollToTop from './components/ScrollToTop';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <LocationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/planner" element={<ItineraryPlanner />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  );
}

export default App;
