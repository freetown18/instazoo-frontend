import { Link, Outlet } from 'react-router-dom'
import styles from './styles/App.module.css'

export default function App() {
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link to="/">Главная</Link>
            <Link to="/profile">Профиль</Link>
            <button onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  )
}