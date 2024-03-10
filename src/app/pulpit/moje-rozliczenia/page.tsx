"use client";
import {
  useGetRegistriesByUserIdQuery,
  useCurrentUserQuery,
} from "@/redux/slices/createApi";
import AddRegistry from "@/components/forms/AddRegistry";
import MyRegistryList from "@/components/MyRegistryList";
import MyStats from "@/components/MyStats";

export default function MojeRozliczenia() {
  const { data: currentUserData } = useCurrentUserQuery();
  const userId = currentUserData?.id;

  const {
    data: registryData,
    isLoading,
    refetch: refetchRegistry,
  } = useGetRegistriesByUserIdQuery(userId, {
    skip: !userId,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 p-4">
      <AddRegistry refetch={refetchRegistry} />
      <MyStats registryData={registryData} />
      <MyRegistryList registryData={registryData} refetch={refetchRegistry} />
    </div>
  );
}
