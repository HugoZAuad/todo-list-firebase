import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import Input from "../components/input";
import Button from "../components/button";
import { showAlert } from "../utils/alert";
import { FirebaseError } from "firebase/app";

const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const temTamanhoMinimo = senha.length >= 6;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumero = /\d/.test(senha);
  const senhaValida = temTamanhoMinimo && temMaiuscula && temNumero;
  const senhasIguais = senha === confirmacao;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const podeCadastrar = senhaValida && senhasIguais && emailValido;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      showAlert("Registro realizado com sucesso!", "success");
      navigate("/login");
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "auth/email-already-in-use") {
        setErro("Este email já está cadastrado.");
        showAlert("Este email já está cadastrado.", "danger");
      } else {
        setErro("Erro ao cadastrar. Verifique os dados.");
        showAlert("Erro ao cadastrar. Verifique os dados.", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-500 p-8 rounded shadow-md w-full max-w-md"
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
          secureInput
          required
        />

        <div className="mb-4 text-sm space-y-1">
          <p className={senha ? (temTamanhoMinimo ? "text-green-400 " : "text-red-400") : "text-white"}>
            • Deve ter no mínimo de 6 caracteres
          </p>
          <p className={senha ? (temMaiuscula ? "text-green-400" : "text-red-400") : "text-white"}>
            •  Deve ter pelo menos uma letra maiúscula
          </p>
          <p className={senha ? (temNumero ? "text-green-400" : "text-red-400") : "text-white"}>
            • Deve ter pelo menos um número
          </p>
          <p className={senha ? (senhasIguais ? "text-green-400" : "text-red-400") : "text-white"}>
            • As senhas devem ser iguais
          </p>
        </div>

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          showToggle
          secureInput
          required
        />

        <div className="flex justify-center">
          <Button
            className={`${
              podeCadastrar ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
            }`}
            type="submit"
            disabled={loading || !podeCadastrar}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-950 hover:text-blue-500">
              Entrar
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
