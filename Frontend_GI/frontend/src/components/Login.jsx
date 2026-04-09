// src/components/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false) // Toggle login/registro
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isRegister) {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
      }
      // Aquí normalmente harías llamada a API para registrar
      console.log('Registro:', { email, password })
      alert(`¡Usuario registrado con éxito! Bienvenido, ${email}`)
    } else {
      // Login normal
      console.log('Login:', { email, password })
      alert(`Bienvenido, ${email}!`)
    }

    // Resetear campos y redirigir
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    navigate('/') // Redirige al listado
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'left' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {isRegister && (
          <div>
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isRegister ? 'Registrarse' : 'Entrar'}
        </button>
      </form>

      <p style={{ marginTop: '15px', fontSize: '14px' }}>
        {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {isRegister ? 'Iniciar sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  )
}