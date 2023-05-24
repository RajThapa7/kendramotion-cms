import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "utils/auth";

export default function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, []);
  return <>{children}</>;
}
