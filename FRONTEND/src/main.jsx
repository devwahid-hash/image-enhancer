import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {Provider} from "react-redux"
import { store } from './redux/store.js'
export const serverURL="http://localhost:4000"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <Provider store={store}>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
    </Provider>
  </StrictMode>
  </BrowserRouter>,
)
