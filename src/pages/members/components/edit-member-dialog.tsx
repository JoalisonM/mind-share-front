import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/dtos/user";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER } from "@/graphql/mutations/member";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type UpdateUserMutationData = { updateUser: User };
type UpdateUserVariables = {
  id: string;
  data: { name?: string; email?: string; role?: string };
};

const ROLE_OPTIONS = [
  { value: "USER", label: "Usuário" },
  { value: "ADMIN", label: "Admin" },
  { value: "MEMBER", label: "Membro" },
  { value: "VIEWER", label: "Leitor" },
];

const editMemberInput = z.object({
  name: z.string().optional(),
  role: z.enum(["USER", "ADMIN", "MEMBER", "VIEWER"]),
});

type EditeMemberInput = z.infer<typeof editMemberInput>;

interface EditMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: User | null;
  onUpdated?: (user: User) => void;
}

export function EditMemberDialog({
  open,
  onOpenChange,
  member,
  onUpdated,
}: EditMemberDialogProps) {
  const { handleSubmit, register, setValue, reset } = useForm({
    resolver: zodResolver(editMemberInput),
  });

  useEffect(() => {
    setValue("name", member?.name ?? "");
    setValue("role", member?.role ?? "MEMBER");
  }, [member]);

  const [updateUserMutation, { loading }] = useMutation<
    UpdateUserMutationData,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMutationData) => {
      reset();
      setValue("role", "MEMBER");
      const updated = res.updateUser;
      if (updated) {
        onUpdated?.(updated);
      }
      onOpenChange(false);
    },
  });

  const onSubmit = async ({ name, role }: EditeMemberInput) => {
    if (!member) return;

    await updateUserMutation({
      variables: {
        id: member.id,
        data: {
          name,
          role,
          email: member.email,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input id="edit-name" placeholder="Nome" {...register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Papel</Label>
            <select
              id="edit-role"
              className="w-full border rounded-md h-10 px-3 bg-background"
              {...register("role")}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input value={member?.email ?? ""} disabled />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
