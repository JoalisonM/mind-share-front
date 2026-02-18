import { useAuthStore } from "@/stores/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SignOut() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-zinc-950 text-primary-foreground">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => handleLogout()}>
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
  );
}
