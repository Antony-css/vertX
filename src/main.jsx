import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import { User } from './pages/User.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { MyProfilePage as Profile } from './pages/MyProfile.jsx'
import { Dashboard } from './pages/dashboard.jsx'
import { NotFound } from './pages/NotFind.jsx'

const router = createBrowserRouter([
  { path: "/", element: <User /> },
  { path: "/home", element: <User /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// Add a small runtime hint: if the device supports touch, add `no-hover` to html
// so our CSS can disable hover-specific effects on touch devices.
if (typeof window !== 'undefined' && 'ontouchstart' in window) {
  document.documentElement.classList.add('no-hover')
}