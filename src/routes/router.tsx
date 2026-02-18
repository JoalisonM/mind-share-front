import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/auth/login";
import { SignUp } from "@/pages/auth/sign-up";
import { ProtectedRoute } from "@/components/protected-route";
import { AuthLayout } from "@/layouts/auth-layout";
import { PublicRoute } from "@/components/public-route";
import { Ideas } from "@/pages/ideas";
import { AppLayout } from "@/layouts/app-layout";
import { Members } from "@/pages/members";

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
        path: "/login",
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
      {
        path: "/members",
        element: <Members />,
      },
    ],
  },
]);
