"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();

  console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="flex justify-between bg-primary h-16 items-center px-4">
      <span className="font-bold text-xl text-white">PassManager</span>

      {status === "loading" ? (
        <p className="text-white">Loading...</p>
      ) : session ? (
        <div className="flex items-center gap-4">
          <p className="text-white">Welcome, {session.user?.email}</p>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
