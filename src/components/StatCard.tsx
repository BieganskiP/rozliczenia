"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRegistry } from "@/lib/actions";
import { Registry } from "@/zod/registrySchema";

export default function StatCard() {
  const [registryData, setRegistryData] = useState<Registry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRegistry = async () => {
      try {
        const data = await getRegistry();
        setRegistryData(data);
      } catch (error) {
        console.error("Failed to fetch registry", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistry();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      {loading ? (
        <Skeleton className="w-32 h-6 rounded-md" />
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
          {registryData &&
            registryData.map((item, index) => (
              <div key={index}>
                <p className="text-gray-600">{item.wage}</p>
                <p className="text-gray-600">{item.date}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
