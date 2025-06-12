import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.replace('/');
      return;
    }
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      const roles = decoded.roles || decoded.role || [];
      const allowedRoles = ["God Mode", "Administrator", "Developer", "Moderator"];
      const hasAllowedRole = Array.isArray(roles) ? roles.some(r => allowedRoles.includes(r)) : allowedRoles.includes(roles);
      if (!hasAllowedRole) {
        router.replace('/');
      } else {
        setIsAuthorized(true);
      }
    } catch (e) {
      console.error('Failed to decode token', e);
      router.replace('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <>{children}</> : null;
} 