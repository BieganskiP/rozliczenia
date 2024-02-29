"use client";
import { signout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

export default function SignoutButton() {
  const router = useRouter();

  async function onClickSignout() {
    try {
      await signout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={() => onClickSignout()} variant="ghost">
      Wyloguj
    </Button>
  );
}
