import type { Metadata } from "next";
import SignupForm from "@/components/pages/auth/SignupForm/SignupForm";

export const metadata: Metadata = {
  title: "Create Your Account | Shineweb Tech Creations",
  description:
    "Create your Shineweb Tech Creations customer account to manage quotations, orders, and service requests.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return <SignupForm />;
}