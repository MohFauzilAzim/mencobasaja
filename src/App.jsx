import { useState } from 'react'

const DEMO_EMAIL = 'mohammadfauzilazim11@gmail.com'
const DEMO_PASSWORD = 'Fauziljill08899'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [isResetMode, setIsResetMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const showMessage = (type, text) => {
    setMessageType(type)  
    setMessage(text)
  }

  const handleLogin = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      showMessage('error', 'Email wajib diisi.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      showMessage('error', 'Format email tidak valid.')
      return
    }

    if (!password.trim()) {
      showMessage('error', 'Kata sandi wajib diisi.')
      return
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      showMessage('error', 'Email atau kata sandi salah. Coba Beberapa Saat Lagi.')
      return
    }

    setIsLoggedIn(true)
    showMessage('success', 'Login berhasil. Selamat datang kembali!')
  }

  const handleForgotPassword = (event) => {
    event.preventDefault()

    if (!resetEmail.trim()) {
      showMessage('error', 'Email untuk reset wajib diisi.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(resetEmail)) {
      showMessage('error', 'Format email tidak valid.')
      return
    }

    showMessage('success', `Instruksi reset kata sandi telah dikirim ke ${resetEmail}.`)
    setResetEmail('')
  }

  const switchToLogin = () => {
    setIsResetMode(false)
    showMessage('', '')
  }

  const switchToReset = () => {
    setIsResetMode(true)
    showMessage('', '')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    setResetEmail('')
    setIsResetMode(false)
    showMessage('', '')
  }

  if (isLoggedIn) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">
          <header className="dashboard-header">
            <div>
              <p className="dashboard-eyebrow">Dashboard 🚀</p>
              <h1>Welcome EveryOne 👋</h1>
              <p className="dashboard-copy">
                Beriku adalah ringkasan aktivitas terbaru dan statistik proyek Anda. Tetap produktif dan selesaikan tugas tepat waktu!
              </p>
            </div>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Keluar
            </button>
          </header>

          <div className="stats-grid">
            <article className="stat-card">
              <span className="stat-label">Total proyek</span>
              <strong>50</strong>
              <small>+5 dari minggu lalu</small>
            </article>
            <article className="stat-card">
              <span className="stat-label">Tugas selesai</span>
              <strong>25</strong>
              <small>85% target harian</small>
            </article>
            <article className="stat-card">
              <span className="stat-label">Sesi aktif</span>
              <strong>5</strong>
              <small>3 meeting terjadwal</small>
            </article>
          </div>

          <div className="dashboard-grid">
            <article className="dashboard-panel">
              <div className="panel-heading">
                <h2>Aktivitas terbaru</h2>
                <span>Hari ini</span>
              </div>
              <ul className="activity-list">
                <li>
                  <strong>Review UI landing page</strong>
                  <span>09.00 WIB</span>
                </li>
                <li>
                  <strong>Meeting tim produk</strong>
                  <span>11.30 WIB</span>
                </li>
                <li>
                  <strong>Update roadmap sprint</strong>
                  <span>15.00 WIB</span>
                </li>
                <li>
                  <strong>Update Store Harian</strong>
                  <span>17.00 WIB</span>
                </li>
              </ul>
            </article>

            <article className="dashboard-panel">
              <div className="panel-heading">
                <h2>Rencana Cepat</h2>
                <span>Prioritas</span>
              </div>
              <div className="todo-item">
                <div>
                  <p>Validasi desain mobile</p>
                  <small>Wajib selesai sebelum jam 13.00</small>
                </div>
                <span className="badge">On track</span>
              </div>
              <div className="todo-item">
                <div>
                  <p>Update copy halaman utama</p>
                  <small>Tambah CTA dan social proof</small>
                </div>
                <span className="badge accent">Review</span>
              </div>
              <div className="todo-item">
                <div>
                  <p>Publikasi changelog</p>
                  <small>Rencanakan notifikasi pengguna</small>
                </div>
                <span className="badge badge">On track</span>
              </div>
            </article>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="login-eyebrow">
          {isResetMode ? 'Reset kata sandi' : 'Welcome back'}
        </p>
        <h1>{isResetMode ? 'Lupa kata sandi?' : 'Log In'}</h1>
        <p className="login-copy">
          {isResetMode
            ? 'Masukkan email akun Anda, kami akan mengirim instruksi reset kata sandi.'
            : 'Enter your email and password to continue.'}
        </p>

        {message && (
          <p className={`form-message ${messageType}`} aria-live="polite">
            {message}
          </p>
        )}

        {isResetMode ? (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <label className="field-label" htmlFor="reset-email">
              Email akun
            </label>
            <input
              id="reset-email"
              type="email"
              placeholder="Masukkan email Anda"
              className="input-field"
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
            />

            <button type="submit" className="submit-button">
              Kirim instruksi reset
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={switchToLogin}
            >
              Kembali ke login
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit" className="submit-button">
              Log In
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={switchToReset}
            >
              Lupa kata sandi?
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default App