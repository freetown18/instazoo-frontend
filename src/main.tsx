import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GuestGuard from './components/GuestGuard' // Добавляем импорт
import AuthGuard from './components/AuthGuard' // Добавляем импорт
import HomePage from './pages/HomePage' // Добавляем импорт
import ProfilePage from './pages/ProfilePage' // Добавляем импорт
import './styles/main.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Публичные маршруты
      {
        element: <GuestGuard />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> }
        ]
      },
      // Защищённые маршруты
      {
        element: <AuthGuard />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "profile", element: <ProfilePage /> }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)