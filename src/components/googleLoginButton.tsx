import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { useState } from "react";
import { showAlert } from "../utils/alert";

interface Props {
  disabled?: boolean;
}

const GoogleLoginButton = ({ disabled }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      showAlert("Login realizado com sucesso!", "success"); 
      navigate("/tarefas");
    } catch (err) {
      console.error("Erro ao logar com Google:", err);
      showAlert("Erro ao logar com Google.", "danger"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="bg-red-600 hover:bg-red-700"
      onClick={handleGoogleLogin}
      disabled={disabled || loading}
    >
      {loading ? "Conectando..." : "Entrar com Google"}
    </Button>
  );
};

export default GoogleLoginButton;
