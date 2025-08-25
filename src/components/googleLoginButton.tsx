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
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
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
    }
  }

  return (
    <Button
      className="bg-red-600 hover:bg-red-700 w-full"
      onClick={handleGoogleLogin}
      disabled={disabled}
    >
      Entrar com Google
    </Button>
  )
}
