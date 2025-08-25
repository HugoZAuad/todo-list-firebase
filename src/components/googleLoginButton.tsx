import { useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useNavigate } from "react-router-dom"
import Button from "./button"
import { showAlert } from "../utils/alert"
import { FirebaseError } from "firebase/app"

interface Props {
  disabled?: boolean
}

export default function GoogleLoginButton({ disabled }: Props) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      showAlert("Conectando com Google...", "primary") 

      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account", 
      })

      await signInWithPopup(auth, provider)

      showAlert("Login com Google realizado com sucesso!", "success")
      navigate("/tarefas")
    } catch (error) {
      const firebaseError = error as FirebaseError

      if (firebaseError.code === "auth/popup-closed-by-user") {
        showAlert("Login cancelado pelo usuário.", "danger")
      } else {
        console.error("Erro ao logar com Google:", firebaseError)
        showAlert("Erro ao logar com Google.", "danger")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="bg-red-600 hover:bg-red-700 w-3/6"
      onClick={handleGoogleLogin}
      disabled={disabled || loading}
    >
      {loading ? "Conectando..." : "Entrar com Google"}
    </Button>
  )
}
