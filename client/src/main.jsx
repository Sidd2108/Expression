import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
const App = lazy(() => import('./App.jsx'));
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />

      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
