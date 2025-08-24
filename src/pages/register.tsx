import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import Input from "../components/input";
import Button from "../components/button";
import { showAlert } from "../utils/alert";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmacao, setConfirmacao] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (senha !== confirmacao) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      showAlert("Registro realizado com sucesso!", "success");
      navigate("/login");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setErro("Erro ao cadastrar. Verifique os dados.");
      showAlert("Erro ao cadastrar. Verifique os dados.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

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

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          showToggle
          required
        />

        <div className="flex justify-center">
          <Button
            className="bg-green-600 hover:bg-green-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Entrar
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
