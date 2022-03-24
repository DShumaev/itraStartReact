import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
