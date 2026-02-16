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
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

const loginInput = z.object({
  email: z.email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type LoginInput = z.infer<typeof loginInput>;

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginInput),
  });

  const navigate = useNavigate();
  const signin = useAuthStore((state) => state.signin);

  async function onSubmit({ email, password }: LoginInput) {
    try {
      const signinMutation = await signin({ email, password });

      if (signinMutation) navigate("/");
    } catch {
      toast.error("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-64 h-22" />

      <Card className="w-full max-w-sm rounded-xl gap-7 pt-7 pb-7">
        <CardHeader className="px-7">
          <CardTitle className="text-2xl font-bold">
            Acessa a plataforma
          </CardTitle>
          <CardDescription className="text-xs font-medium">
            Entre usando seu e-mail e senha cadastrados
          </CardDescription>
        </CardHeader>

        <CardContent className="px-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
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
            Ainda não tem uma conta?
          </CardTitle>
          <CardDescription className="text-xs font-medium">
            Cadastre agora mesmo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link to="/sign-up">
            <Button className="w-full h-10 bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200">
              Criar conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
