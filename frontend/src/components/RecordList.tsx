"use client";

import { useEffect, useState } from "react";
import { getPatientRecords } from "@/app/utils/healthcare";

type RecordItem = [object, string, string, string?, string?];
// adjust types to match what your data really looks like
//
//
const Field = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-lg font-medium">{value || "—"}</p>
  </div>
);

const RecordsList = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const result = await getPatientRecords(0); // your async fn
        setRecords(result);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <p>Loading records...</p>;

  return (
    <div className="space-y-4 px-4">
      <h2 className="text-xl font-bold">Private Records</h2>
      {records.length === 0 ? (
        <p>No records found</p>
      ) : (
        <ul className="space-y-2">
          {records.map((record, idx) => (
            <li
              key={idx}
              className="p-3 grid grid-cols-2 border rounded bg-gray-50 "
            >
              <Field label="Diagnosis" value={record[2]} />
              <Field label="Treatment" value={record[3]} />
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordsList;
