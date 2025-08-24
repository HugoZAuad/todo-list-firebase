import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/\d/, "A senha deve conter pelo menos um número"),
    confirmacao: z.string(),
  })
  .refine((data) => data.senha === data.confirmacao, {
    message: "As senhas não coincidem",
    path: ["confirmacao"],
  });
