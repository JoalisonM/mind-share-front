import { useAuthStore } from "@/stores/auth";

import logoIcon from "@/assets/logo-icon.svg";
import { Button } from "./ui/button";
import { Lightbulb, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Menu() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="h-24 px-16 flex items-center">
      <div className="w-full flex items-center justify-between">
        <img src={logoIcon} className="h-12 w-12" />

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button className="bg-indigo-700 h-8 hover:bg-indigo-800">
              <Lightbulb className="h-4 w-4" />
              Ideas
            </Button>
          </Link>

          <Link to="/users">
            <Button className="bg-indigo-700 h-8 hover:bg-indigo-800">
              <Users className="h-4 w-4" />
              Usuários
            </Button>
          </Link>
        </nav>

        <div>sign-out</div>
      </div>
    </header>
  );
}
