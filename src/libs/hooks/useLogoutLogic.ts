import { useAppStore } from "@/libs/store/useAppStore";
import { useRouter } from "next/navigation";
import { logoutUser } from "../apis/auth";
import { toast } from "sonner";

export function useLogoutLogic() {
  const router = useRouter();
  const logoutStore = useAppStore((state) => state.logout);

  const logout = async () => {
    try {
      const data = await logoutUser(); // Backend clears cookies
      if (data.success) {
        toast.success("Logout Successfully");
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      }

      logoutStore(); // Clear zustand

      router.push("/login"); // redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
}
