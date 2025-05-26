import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function useAuthRedirect(requiredRole?: string) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    try {
      const decoded: any = jwtDecode(token);
      if (requiredRole && decoded.role !== requiredRole) {
        router.replace("/");
      }
    } catch {
      sessionStorage.removeItem("token");
      router.replace("/");
    }
  }, [router, requiredRole]);
} 