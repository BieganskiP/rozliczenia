"use client";
import { useSignoutMutation } from "@/redux/slices/createApi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import React from "react";

export default function SignoutButton() {
  const [signout] = useSignoutMutation();
  const router = useRouter();

  async function onClickSignout() {
    try {
      await signout({}).unwrap();

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={() => onClickSignout()} variant="ghost">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  );
}
