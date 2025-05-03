import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Login.module.css'  // Было './styles/App.module.css'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/auth/signin`, {
                username,
                password
            });

            localStorage.setItem('token', response.data.token); // Сохраняем токен
            navigate('/'); // Переход на главную
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Неверные данные'); // Временное решение
        }
    };

    return (
        <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Вход в Instazoo</h2>
        <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логин"
        required
        />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
        />
        <button type="submit">Войти</button>
        </form>
        </div>
    )
}
