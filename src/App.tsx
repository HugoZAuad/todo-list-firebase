import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Tasks from "./pages/tasks"
import PrivateRoute from "./routes/routePrivate"
import { AlertManager } from "./components/alertManager"

const App = () => {
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
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
