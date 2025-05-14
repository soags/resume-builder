"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { withClientFeedback } from "@/lib/withClientFeedback";

export function LogoutButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    withClientFeedback(
      async () => {
        await signOut({ redirectTo: "/login" });
        return { ok: true, data: null };
      },
      {
        onLoadingChange: setLoading,
      },
    );
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      ログアウト
    </Button>
  );
}
