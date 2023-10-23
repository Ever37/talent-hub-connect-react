import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Welcome = lazy(() => import('./common/Welcome'));
const Candidates = lazy(() => import('./candidates/Candidates'));
const NotFound = lazy(() => import('./common/NotFound'));

const MyApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyApp;
