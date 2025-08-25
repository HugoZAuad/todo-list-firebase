import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import Login from "./pages/login"
import Register from "./pages/register"
import Tasks from "./pages/tasks"
import PrivateRoute from "./routes/routePrivate"
import { AlertManager } from "./components/alertManager"

const App = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoadingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  if (loadingAuth) {
    return <p>🔄 Verificando autenticação...</p>
  }

  return (
    <Router>
      <AlertManager />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <Tasks uid={user?.uid || ""} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
