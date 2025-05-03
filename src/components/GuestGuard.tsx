import { Navigate, Outlet } from 'react-router-dom'

export default function GuestGuard() {
  const token = localStorage.getItem('token')
  
  if (token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}