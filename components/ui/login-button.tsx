"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Github } from "lucide-react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User profile"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="hidden md:inline text-sm font-medium">{session.user?.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md bg-secondary px-3 py-1 text-sm hover:bg-secondary/80 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-primary-foreground text-sm hover:bg-primary/80 transition-colors"
    >
      <Github className="h-4 w-4" />
      <span className="hidden md:inline">Sign in</span>
    </button>
  );
}