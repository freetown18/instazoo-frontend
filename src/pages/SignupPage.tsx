import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import styles from '../styles/Signup.module.css'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный email'
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsLoading(true)
    setErrors({})

    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })

      navigate('/login', { state: { success: 'Регистрация успешна! Теперь войдите.' } })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors)
        } else {
          setErrors({ form: err.response?.data?.message || 'Ошибка регистрации' })
        }
      } else {
        setErrors({ form: 'Неизвестная ошибка' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Регистрация в Instazoo</h2>
        
        {errors.form && <div className={styles.error}>{errors.form}</div>}

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Имя</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Фамилия</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Логин</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {errors.username && <span className={styles.fieldError}>{errors.username}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Подтвердите пароль</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <span className={styles.fieldError}>{errors.confirmPassword}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? styles.loading : ''}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}