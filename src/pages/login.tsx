import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import GoogleLoginButton from "../components/googleLoginButton";
import Input from "../components/input";
import Button from "../components/button";
import { showAlert } from "../utils/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      showAlert("Login realizado com sucesso!", "success");
      navigate("/tarefas");
    } catch (err) {
      console.error("Erro ao logar:", err);
      setErro("Email ou senha inválidos.");
      showAlert("Email ou senha inválidos.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          showToggle
          required
        />

        <div className="flex justify-center ">
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <GoogleLoginButton disabled={loading} />
        </div>

        <div className="mt-4 text-center">
          <p>
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
