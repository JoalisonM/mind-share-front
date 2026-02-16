import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "@/assets/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

const signUpInput = z.object({
  name: z.string().nonempty("A senha é obrigatória"),
  email: z.email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type SignUpInput = z.infer<typeof signUpInput>;

export function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signUpInput),
  });

  const signup = useAuthStore((state) => state.signup);

  async function onSubmit({ name, email, password }: SignUpInput) {
    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      });

      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch {
      toast.error("Erro ao realizar o cadastro");
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-64 h-22" />

      <Card className="w-full max-w-sm rounded-xl gap-7 pt-7 pb-7">
        <CardHeader className="px-7">
          <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
          <CardDescription className="text-xs font-medium">
            Informe seu nome, e-mail e senha de acesso
          </CardDescription>
        </CardHeader>

        <CardContent className="px-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                {...register("name")}
              />
              {errors.name?.message && (
                <span className="text-xs text-red-700">
                  {errors.name?.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="exemplo@mail.com"
                {...register("email")}
              />
              {errors.email?.message && (
                <span className="text-xs text-red-700">
                  {errors.email?.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Senha</Label>
              <Input placeholder="Digite sua senha" {...register("password")} />
              {errors.password?.message && (
                <span className="text-xs text-red-700">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <Button
              className="w-full h-10 bg-indigo-700 hover:bg-indigo-800"
              disabled={isSubmitting || !isValid}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm rounded-xl gap-7 pt-7 pb-7">
        <CardHeader className="px-7">
          <CardTitle className="text-lg text-gray-800 font-medium">
            Já tem uma conta?
          </CardTitle>
          <CardDescription className="text-xs font-medium">
            Entre agora mesmo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link to="/sign-in">
            <Button className="w-full h-10 bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200">
              Acessar conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
