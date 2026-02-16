import { Menu } from "@/components/menu";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-200">
      <Menu />
      <main className="px-16 py-4">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
