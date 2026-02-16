import type { ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CREATE_IDEA } from "@/graphql/mutations/idea";
import { toast } from "sonner";
import type { Idea } from "@/dtos/idea";

const createIdeaInput = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

type CreateIdeaInput = z.infer<typeof createIdeaInput>;

export function CreateIdeaDialog({
  onOpenChange,
  ...props
}: ComponentProps<typeof Dialog>) {
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(createIdeaInput),
  });

  const [createIdea] = useMutation<Idea>(CREATE_IDEA, {
    onCompleted(data) {
      if (data) {
        toast.success("Ideia criada com sucesso!");
        handleCancel();
      }
    },
    onError() {
      toast.error("Erro ao criar idea");
    },
  });

  function handleCancel() {
    reset();
    onOpenChange?.(false);
  }

  async function onSubmit({ title, description }: CreateIdeaInput) {
    await createIdea({
      variables: {
        data: {
          title,
          description,
        },
      },
    });
  }

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-7">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold leading-tight">
            Compartilhe sua ideia
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Adicione uma nova ideia para seu time
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Dê uma nome para a ideia"
              {...register("title")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              rows={6}
              id="description"
              className="resize-none"
              placeholder="Descreva sua ideia"
              {...register("description")}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCancel()}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
