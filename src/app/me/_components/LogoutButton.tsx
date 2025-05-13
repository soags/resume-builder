"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { withClientLogging } from "@/lib/withClientLogging";

export function LogoutButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    withClientLogging(() => signOut({ redirectTo: "/login" }), {
      context: "logout",
      errorMessage: "ログアウトに失敗しました。",
      setLoading,
    });
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      ログアウト
    </Button>
  );
}
