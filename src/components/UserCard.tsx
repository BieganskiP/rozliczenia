"use client";
import { useState, useEffect } from "react";
import { currentUser } from "@/lib/actions";
import { User } from "@/zod/userSchema";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserCard() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await currentUser();
        setUserData(userData);
      } catch (error) {
        console.error("Failed to fetch current user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {loading ? (
        <Skeleton className="w-32 h-6 rounded-md" />
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-900">
            User Information
          </h2>
          <p className="text-gray-600">Name: {userData?.name}</p>
          <p className="text-gray-600">Email: {userData?.email}</p>
          <p className="text-gray-600">Role: {userData?.role}</p>
          <p className="text-gray-600">Region: {userData?.region}</p>
          <p className="text-gray-600">Wage: {userData?.wage}</p>
        </>
      )}
    </div>
  );
}
