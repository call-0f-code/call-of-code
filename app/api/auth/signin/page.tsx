"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome to Call of Code</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Github className="mr-2 h-5 w-5" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}