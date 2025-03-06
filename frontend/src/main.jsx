import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx';
import { UnreadCountContextProvider } from './context/UnreadCountContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <UnreadCountContextProvider>
            <App />
          </UnreadCountContextProvider>
        </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
  
)
