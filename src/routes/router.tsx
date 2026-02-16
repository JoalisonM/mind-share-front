import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/auth/login";
import { SignUp } from "@/pages/auth/sign-up";
import { ProtectedRoute } from "@/components/protected-route";
import { AuthLayout } from "@/layouts/auth-layout";
import { PublicRoute } from "@/components/public-route";
import { Ideas } from "@/pages/ideas";
import { AppLayout } from "@/layouts/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Ideas />,
      },
    ],
  },
]);
