import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx';
import { UnreadCountContextProvider } from './context/UnreadCountContext.jsx';
import { AllChatsContextProvider } from './context/AllChatsContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <UnreadCountContextProvider>
            <AllChatsContextProvider>
            <App />
            </AllChatsContextProvider>
          </UnreadCountContextProvider>
        </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
  
)
