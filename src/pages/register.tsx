import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import Input from "../components/input";
import Button from "../components/button";
import { showAlert } from "../utils/alert";
import { FirebaseError } from "firebase/app";
import { registerSchema } from "../utils/validationPassword";

const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validação individual dos critérios
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

    const parsed = registerSchema.safeParse({ email, senha, confirmacao });

    if (!parsed.success) {
      const mensagem = parsed.error.issues[0]?.message || "Preencha todos os campos corretamente.";
      setErro(mensagem);
      return;
    }

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

        <div className="mb-4 text-sm space-y-1">
          <p className={senha ? (temTamanhoMinimo ? "text-green-600" : "text-red-500") : "text-gray-500"}>
            • Mínimo de 6 caracteres
          </p>
          <p className={senha ? (temMaiuscula ? "text-green-600" : "text-red-500") : "text-gray-500"}>
            • Pelo menos uma letra maiúscula
          </p>
          <p className={senha ? (temNumero ? "text-green-600" : "text-red-500") : "text-gray-500"}>
            • Pelo menos um número
          </p>
        </div>

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
