"use client";
import UsersTable from "@/components/UsersTable";
import AddDriver from "@/components/forms/AddDriver";

export default function kierowcy() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <AddDriver />
      <UsersTable />
    </div>
  );
}
