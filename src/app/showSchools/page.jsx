"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSchools(data);
        } else {
          setError(data.error || "Unexpected response");
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Schools</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school.id}
              className="bg-white shadow rounded-lg overflow-hidden">
              <img src={school.image} alt={school.name}
                className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{school.name}</h3>
                <p className="text-gray-600">{school.city}, {school.state}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No schools found</p>
        )}
      </div>
    </div>
  );
}
