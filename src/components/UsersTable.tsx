"use client";
import { Button } from "./ui/button";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/redux/slices/createApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function UsersTable() {
  const {
    data: userData,
    isLoading: loadingUserData,
    refetch: refetchUsers,
  } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation({});

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);

      refetchUsers();
      console.log(`User with ID ${userId} has been deleted.`);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (loadingUserData) {
    return <div>Wczytywanie...</div>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              ID użytkownika
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Imię
            </th>
            <th scope="col" className="py-3 px-6">
              Stawka
            </th>
            <th scope="col" className="py-3 px-6">
              Region
            </th>
            <th scope="col" className="py-3 px-6">
              Samochód
            </th>
            <th scope="col" className="py-3 px-6">
              Rola
            </th>
            <th scope="col" className="py-3 px-6">
              Akcja
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
              <td className="py-4 px-6">{user.name || "-"}</td>
              <td className="py-4 px-6">{user.wage || "-"}</td>
              <td className="py-4 px-6">{user.region || "-"}</td>
              <td className="py-4 px-6">{user.car || "-"}</td>
              <td className="py-4 px-6">{user.role}</td>
              <td className="py-4 px-6">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
