import { Link, Outlet } from 'react-router-dom'
import styles from './styles/App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link to="/login">Вход</Link>
        <Link to="/signup">Регистрация</Link>
      </nav>
      <Outlet />
    </div>
  )
}