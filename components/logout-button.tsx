"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-black px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}