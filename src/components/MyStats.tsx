"use client";
type Registry = {
  id: number;
  wage: number;
  date: string;
  amount: number;
  user_id: number;
};

interface MyRegistryListProps {
  registryData: Registry[];
}

export default function MyStats({ registryData }: MyRegistryListProps) {
  const total = registryData?.reduce((acc, current) => {
    return acc + current.amount * current.wage;
  }, 0);

  return (
    <div>
      <h2>Moje Statystyki</h2>
      <p>Następna wypłata: {total?.toFixed(2)}</p>
    </div>
  );
}
