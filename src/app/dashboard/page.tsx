"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { fetchAllEmpUsers } from "../../services/emp";

export default function DashboardPage() {
  const { user, role } = useAuth();
  const [empUsers, setEmpUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "Admin") {
      fetchAllEmpUsers().then((users) => {
        setEmpUsers(users);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [role]);

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to your dashboard.
        </p>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">User Info</h2>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Name:</span> {user?.displayName || "-"}
            <br />
            <span className="font-medium">Email:</span> {user?.email || "-"}
            <br />
            <span className="font-medium">Role:</span> {role || "-"}
          </p>
        </div>
        {role === "Admin" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              All Users (emp collection)
            </h2>
            {loading ? (
              <div>Loading users...</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-gray-900">Name</th>
                    <th className="px-2 py-1 text-left text-gray-900">Email</th>
                    <th className="px-2 py-1 text-left text-gray-900">Role</th>
                    <th className="px-2 py-1 text-left text-gray-900">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {empUsers.map((u) => (
                    <tr key={u.uid} className="border-t">
                      <td className="px-2 py-1 text-gray-900">{u.Name || "-"}</td>
                      <td className="px-2 py-1 text-gray-900">{u.Email || "-"}</td>
                      <td className="px-2 py-1 text-gray-900">{u.role || "-"}</td>
                      <td className="px-2 py-1 text-gray-900">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
