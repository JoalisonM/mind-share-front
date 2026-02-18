import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "@/graphql/mutations/member";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface InviteMemberProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

const inviteMemberInput = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
});

type InviteMemberInput = z.infer<typeof inviteMemberInput>;

export function InviteMemberDialog({
  open,
  onOpenChange,
  onCreated,
}: InviteMemberProps) {
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(inviteMemberInput),
  });

  const [createUserMutation, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      onOpenChange(false);
      reset();
      onCreated?.();
    },
  });

  const onSubmit = async ({ name, email }: InviteMemberInput) => {
    await createUserMutation({
      variables: {
        data: {
          name,
          email,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-name">Nome</Label>
            <Input
              id="invite-name"
              placeholder="Nome do usuário"
              {...register("name")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-email">E-mail</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="email@exemplo.com"
              {...register("email")}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Convidar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
