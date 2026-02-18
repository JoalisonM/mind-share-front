import logoIcon from "@/assets/logo-icon.svg";
import { Button } from "./ui/button";
import { Lightbulb, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignOut } from "./sign-out";

export function Menu() {
  return (
    <header className="h-24 px-8 flex items-center">
      <div className="w-full flex items-center justify-between">
        <img src={logoIcon} className="h-12 w-12" />

        <nav className="flex items-center gap-2">
          <NavLink to="/" className="outline-0">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} className="h-8">
                <Lightbulb className="h-4 w-4" />
                Ideias
              </Button>
            )}
          </NavLink>

          <NavLink to="/members" className="outline-0">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} className="h-8">
                <Users className="h-4 w-4" />
                Usuários
              </Button>
            )}
          </NavLink>
        </nav>

        <SignOut />
      </div>
    </header>
  );
}
