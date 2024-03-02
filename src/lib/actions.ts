"use client";

import { InviteSchema } from "@/zod/inviteSchema";
import { RegistrySchema } from "@/zod/registrySchema";
import { UserSchema, User } from "@/zod/userSchema";

const baseUrl: string = "https://cl-ds.up.railway.app";

export async function login(email: string, password: string) {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function signup(email: string, password: string) {
  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }

  return data;
}

export async function currentUser(): Promise<User> {
  const res = await fetch(`${baseUrl}/auth/current-user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = await res.json();
  const user = UserSchema.parse(data);

  return user;
}

export async function signout() {
  const res = await fetch(`${baseUrl}/auth/signout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
}

export async function getRegistry() {
  const res = await fetch(`${baseUrl}/registry`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch registry");
  }

  const data = await res.json();
  const registry = RegistrySchema.parse(data);

  console.log(registry);

  return registry;
}

export async function getInvite() {
  const invitationId = getInvitationIdFromUrl();

  const res = await fetch(`${baseUrl}/invitations/${invitationId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invite");
  }

  const data = await res.json();
  // const invite = InviteSchema.parse(data);

  return data;
}

export async function getUsers() {
  const res = await fetch(`${baseUrl}/auth`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invite");
  }

  const data = await res.json();
  // const users = UserSchema.parse(data);

  return data;
}

function getInvitationIdFromUrl() {
  const pathArray = window.location.pathname.split("/");

  const invitationId = pathArray[pathArray.length - 1];
  return invitationId;
}
