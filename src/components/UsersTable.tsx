"use client";
import { useState, useEffect } from "react";
import { getUsers } from "@/lib/actions";

export default function UsersTable() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUserData(userData);
      } catch (error) {
        console.error("Failed to fetch current user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              User ID
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Wage
            </th>
            <th scope="col" className="py-3 px-6">
              Region
            </th>
            <th scope="col" className="py-3 px-6">
              Car
            </th>
            <th scope="col" className="py-3 px-6">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((user: any) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6">{user.id}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.name || "N/A"}</td>
              <td className="py-4 px-6">{user.wage || "N/A"}</td>
              <td className="py-4 px-6">{user.region || "N/A"}</td>
              <td className="py-4 px-6">{user.car || "N/A"}</td>
              <td className="py-4 px-6">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
