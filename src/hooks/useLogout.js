import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useNavigate } from "react-router";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.clear(); // Clear all cached data
      navigate("/login"); // Redirect to login
    },
    onError: () => {
      // Even if logout fails, clear local data and redirect
      queryClient.clear();
      navigate("/login");
    }
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
