import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import MyApp from './MyApp';
import ErrorBoundary from './common/ErrorBoundary';
import { LinearIndeterminate } from './common/LinearIndeterminate';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LinearIndeterminate />}>
        <MyApp />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
