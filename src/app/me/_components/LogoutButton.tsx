"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirectTo: "/login" });
    } catch (error) {
      logger.handle(error, "Logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      ログアウト
    </Button>
  );
}
