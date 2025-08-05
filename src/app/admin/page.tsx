
"use client";
import React from "react";
import AdminUserTable from "../../components/admin-user-table";
import { useAuth } from "../../contexts/auth-context";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { user, role } = useAuth();
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-4">You must be logged in to view this page.</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7] py-10">
      <h1 className="text-3xl font-bold mb-6 text-black">FS8B Admin Dashboard</h1>
      <div className="w-full max-w-3xl">
        <AdminUserTable />
      </div>
    </div>
  );
}
