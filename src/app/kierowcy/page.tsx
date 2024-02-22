"use client";
import data from "@/mockData/data.json";

export default function kierowcy() {
  return (
    <ul>
      {data.drivers.map((driver) => (
        <li key={driver.id}>{driver.name}</li>
      ))}
    </ul>
  );
}
