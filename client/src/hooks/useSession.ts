import { trpc } from "@/api/trpc";
import { useEffect, useState } from "react";

interface SessionData {
  id: string;
  userId: string;
  name: string;
  expiresAt: string;
}
type Status = "AUTHENTICATED" | "LOADING" | "NOT_AUTHENTICATED";

export function useSession() {
  const [session, setSessionData] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<Status>("LOADING");

  const { data, isSuccess, isError, isLoading } = trpc.user.session.useQuery();

  useEffect(() => {
    if (isLoading) setStatus("LOADING");
    else if (isSuccess) {
      setSessionData(data);
      setStatus("AUTHENTICATED");
    } else if (isError) setStatus("NOT_AUTHENTICATED");
  }, [data, isSuccess, isLoading, isError]);

  return { session, status };
}
