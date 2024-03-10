"use client";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteRegistryMutation } from "@/redux/slices/createApi";

type Registry = {
  id: number;
  wage: number;
  date: string;
  amount: number;
  user_id: number;
};

interface MyRegistryListProps {
  registryData: Registry[];
  refetch: any;
}

export default function MyRegistryList({
  registryData,
  refetch,
}: MyRegistryListProps) {
  const [deleteRegistry] = useDeleteRegistryMutation({});

  const handleDelete = async (id: number) => {
    try {
      await deleteRegistry(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Data
            </th>
            <th scope="col" className="py-3 px-6">
              Ilość stopów
            </th>
            <th scope="col" className="py-3 px-6">
              Stawka
            </th>
            <th scope="col" className="py-3 px-6">
              Działania
            </th>
          </tr>
        </thead>
        <tbody>
          {registryData?.map((registry) => (
            <tr
              key={registry.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6">
                {new Date(registry.date).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">{registry.amount}</td>

              <td className="py-4 px-6">{registry.wage}</td>

              <td className="py-4 px-6">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(registry?.id)}
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
