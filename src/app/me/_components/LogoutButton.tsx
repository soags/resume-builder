"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button variant="outline" onClick={async () => await signOut({ redirectTo: "/login" })}>
      ログアウト
    </Button>
  );
}
