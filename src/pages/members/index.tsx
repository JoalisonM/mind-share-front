import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/dtos/user";
import { LIST_MEMBERS } from "@/graphql/queries/member";
import { useQuery } from "@apollo/client/react";
import { Crown, Plus, UserIcon } from "lucide-react";
import { MemberCard } from "./components/member-card";
import { useState } from "react";
import { DeleteMemberDialog } from "./components/delete-member-dialog";
import { EditMemberDialog } from "./components/edit-member-dialog";
import { useAuthStore } from "@/stores/auth";
import { InviteMemberDialog } from "./components/invite-member-dialog";

export function Members() {
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false);
  const [member, setMember] = useState<User | null>(null);
  const currentUserId = useAuthStore((state) => state.user?.id);

  const { data, refetch } = useQuery<{ listUsers: User[] }>(LIST_MEMBERS);

  const members = data?.listUsers ?? [];

  function handleAddUser() {
    setOpenInviteDialog(true);
  }

  function handleEditUser(editMember: User) {
    setMember(editMember);
    setOpenEditMemberDialog(true);
  }
  function handleDeleteUser(deleteMember: User) {
    setMember(deleteMember);
    setOpenDeleteDialog(true);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-medium text-purple-600">Usuários</h1>
          <div className="flex items-center gap-2 text-gray-900">
            <div className="flex items-center gap-3 px-2 rounded-lg bg-purple-200">
              <Crown className="h-4 w-4" />
              <div>
                <strong>2</strong> admin
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 rounded-lg bg-indigo-200">
              <UserIcon className="h-4 w-4" />
              <div>
                <strong>6</strong> membros
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Label className="text-nowrap">Busque membros:</Label>
            <Input placeholder="Nome ou e-mail" />
          </div>
          <Button onClick={() => handleAddUser()}>
            <Plus className="h-4 w-4" /> Novo membro
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isCurrentUser={member.id === currentUserId}
            onEdit={() => handleEditUser(member)}
            onDelete={() => handleDeleteUser(member)}
          />
        ))}
      </div>

      <InviteMemberDialog
        open={openInviteDialog}
        onOpenChange={setOpenInviteDialog}
        onCreated={() => refetch()}
      />

      <EditMemberDialog
        open={openEditMemberDialog}
        onOpenChange={setOpenEditMemberDialog}
        onUpdated={() => refetch()}
        member={member}
      />

      <DeleteMemberDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        member={member}
      />
    </div>
  );
}
