import type { Metadata } from "next";
import Login from "@/components/pages/auth/Login/Login";

export const metadata: Metadata = {
  title: "Sign In | Shineweb Tech Creations",
  description:
    "Sign in to your Shineweb Tech Creations account and access your digital workspace.",
};

export default function LoginPage() {
  return <Login />;
}